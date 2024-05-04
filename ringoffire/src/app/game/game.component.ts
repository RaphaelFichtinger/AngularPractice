import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, collectionData, setDoc, getDoc, addDoc, onSnapshot, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../fire.service';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent,AppComponent,  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game!: Game;
  gameID?:string;
  firestore: Firestore = inject(Firestore);
  DataID:string = "";
  unsubList:any;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private fireService: FireService) { 
    
  }






ngOnInit(): void {
  this.newGame();
}



async saveGame(colId: string, docId: string, item: Game) {
  await updateDoc(this.getSingleGameRef(colId, docId), item.toJson()) // update method
    .catch((err) => {
      console.log(err);
    });
}





newGame() {
  this.game = new Game(); 
  this.route.params.subscribe((params) => {
    let gameId = params['id'];
    this.gameID = gameId;
    
    
    if (gameId) {
      this.unsubList = onSnapshot(this.getSingleGameRef("games", gameId), (snapshot) => {
        const gameData:any = snapshot.data(); 
        this.game.currentPlayer = gameData.currentPlayer,
        this.game.playedCards = gameData.playedCards,
        this.game.players = gameData.players,
        this.game.stack = gameData.stack,
        this.game.pickCardAnimation = gameData.pickCardAnimation,
        this.game.currentCard = gameData.currentCard
      });
    }
  });
 // this.addNewGame();
}


getGamesRef(){
  return collection(this.firestore, 'games');
}

getSingleGameRef(colId: string, docId: any) {
  return doc(collection(this.firestore, colId), docId);
}

addNewGame(){
  this.fireService.addGame(this.game.toJson())
}



takeCard() {
  if (!this.game.pickCardAnimation) {
    const card = this.game.stack.pop();

    if (card !== undefined) {
      this.game.currentCard = card;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      if(this.gameID){
        this.saveGame("games", this.gameID, this.game);
        }
      setTimeout(() => {
        if (card !== undefined) {
          this.game.currentCard = card;
        this.game.playedCards.push(this.game.currentCard);

        }
        this.game.pickCardAnimation = false;
        if(this.gameID){
          this.saveGame("games", this.gameID, this.game);
          }
      }, 1000);
}
}
}
openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent,);

  dialogRef.afterClosed().subscribe(name => {
    if(name && name.length > 0){
    this.game.players.push(name);
    if (this.gameID) {
    this.saveGame("games", this.gameID, this.game);
    }
    }
  });
}
}

