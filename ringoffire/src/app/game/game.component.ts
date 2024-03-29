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
import { Firestore, collection, doc, collectionData, setDoc, getDoc, addDoc, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



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
   Data = {
    Es: "Klappt perfekt  !",  
  }
  DataID:string = "";

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { 
    this.items$ = collectionData(this.getGameRef());
    this.items = this.items$.subscribe((game:any) => {
    });
  }



  getGameRef(){
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId);
  }



  async addNew(){
    await addDoc(collection(this.firestore, "games"), {
      game: this.game.toJson()
    });
  }


async subGame(id: string){
  return onSnapshot(doc(this.getGameRef(), id), (doc) => {
    if(doc.exists()) {
      const game = doc.data();
      this.game.currentPlayer = game['currentPlayer'];
      this.game.playedCards = game['playedCards'];
      this.game.players = game['players'];
      this.game.stack = game['stack'];
         console.log(game, doc.id);
    }
  });
}

async updateGame(id: string, game: Game) {
  await setDoc(doc(this.getGameRef(), id), game.toJson());
}




ngOnInit(): void {
  this.newGame();
  this.route.params.subscribe((params) => {
  console.log(params['id']);
  console.log(this.game)
  this.DataID = params['id'];
    
 

})
 

}



newGame(){
  this.game = new Game();  
  this.addNew();
}



takeCard() {
  if (!this.pickCardAnimation) {
    const card = this.game.stack.pop();
    if (card !== undefined) {
      this.currentCard = card;
      this.pickCardAnimation = true;
    console.log('game.playedCards is ', this.game.playedCards);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      setTimeout(() => {
        if (card !== undefined) {
          this.currentCard = card;
        this.game.playedCards.push(this.currentCard);
        
        }
        this.updateGame(this.DataID, this.game);
        
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
    this.updateGame(this.DataID, this.game);

    console.log('The dialog was closed', name);}
  });
}
}

