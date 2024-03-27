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
import { Firestore, collection, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent,AppComponent,  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = "";
  game!: Game;

  firestore: Firestore = inject(Firestore);

  items$;
  items;

  constructor(public dialog: MatDialog) { 
    this.items$ = collectionData(this.getGameRef());
    this.items = this.items$.subscribe((game) => {
      console.log('game update', game);
    });
  }
  
  

  getGameRef(){
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId);
  }



ngOnInit(): void {
  this.newGame();
}




newGame(){
  this.game = new Game();
  console.log(this.game);
}



takeCard() {
  if (!this.pickCardAnimation) {
    const card = this.game.stack.pop();
    if (card !== undefined) {
      this.currentCard = card;
      this.pickCardAnimation = true;
    console.log('game.stack is ', this.game.stack);
    console.log('game.playedCards is ', this.game.playedCards);
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (card !== undefined) {
          this.currentCard = card;
        this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
}
}
}
openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent,);

  dialogRef.afterClosed().subscribe(name => {
    if(name && name.length > 0){
    this.game.players.push(name);
    console.log('The dialog was closed', name);}
  });
}
}

