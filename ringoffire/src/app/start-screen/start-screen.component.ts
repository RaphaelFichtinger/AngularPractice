import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from '../fire.service';
import { Firestore, addDoc, collection, doc, docData, onSnapshot, } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private fireService: FireService) { }

  ngOnInit(): void {};
  newGame() {
    let game = new Game();
    this.addNewGame(game.toJson());
  }


async addNewGame(item:object){
await addDoc(this.getGamesRef(), item)
.catch( (err)=> {
console.log(err);
})
.then( (docRef)=>{
console.log(docRef);
this.router.navigateByUrl('game/' + docRef?.id)
})
}








  getGamesRef(){
    return collection(this.firestore, 'games');
  }
}



