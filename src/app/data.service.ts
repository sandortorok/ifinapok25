import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore: Firestore = inject(Firestore); // 🔹 modular Firestore

  async addItem(data: any) {
    console.log('Adding item');
    try {
      const colRef = collection(this.firestore, 'participants');
      return await addDoc(colRef, data); // 🔹 dokumentum hozzáadása
    } catch (err) {
      console.error('Hiba a Firestore-ba mentéskor:', err);
      throw err;
    }
  }
}
