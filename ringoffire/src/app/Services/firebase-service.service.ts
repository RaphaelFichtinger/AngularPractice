import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor() {
    let aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
   }
}
