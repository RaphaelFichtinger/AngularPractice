import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game = new Game;


constructor() { }

ngOnInit(): void {
  this.newGame();
  
}


newGame(){
  this.game = new Game();
  console.log(this.game);
}


takeCard(){
  this.currentCard = this.game.stack.pop();
  console.log(this.currentCard);
  this.pickCardAnimation = true;

}






}
