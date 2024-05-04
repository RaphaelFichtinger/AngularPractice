import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, setDoc, getDoc, addDoc, onSnapshot} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameComponent } from './game/game.component';
import { Router } from '@angular/router'; // Router importieren

@Injectable({
  providedIn: 'root'
})
export class FireService {

  firestore: Firestore = inject(Firestore)
  
  constructor(private route: ActivatedRoute,private router: Router) { 

  }
  
  async addGame(item:any){
    await addDoc(this.getGamesRef(), item)
  }





  newGame(){
    const newGameItem = {  };

    this.addGame(newGameItem).then(() => {
     
      this.router.navigateByUrl('/game');
    }).catch((error) => {
      console.error('Fehler beim Hinzufügen des Spiels:', error);
    });
  }











  

  getGamesRef(){
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
  

}
