

export class Game {
    [x: string]: any;
    id(id: any, arg1: { game: { players: string[]; stack: string[]; playedCards: string[]; currentPlayer: number; }; data: { Es: string; }; }) {
      throw new Error('Method not implemented.');
    }
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
       
       for(let i = 1; i < 14; i++){
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
       }

        shuffle(this.stack);

    }

    public toJson(){
      return {
        players: this.players,
        stack: this.stack,
        playedCards: this.playedCards,
        currentPlayer: this.currentPlayer
      };
    }
  
}





 function shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }