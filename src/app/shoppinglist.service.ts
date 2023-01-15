import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  firestoreCollection: AngularFirestoreCollection;
  fireAuth: any;
  router: any;

  constructor(firestore: AngularFirestore, auth: AngularFireAuth, rt: Router) {
    this.firestoreCollection = firestore.collection('ShoppingItems');
    this.fireAuth = auth;
    this.router = rt;
  }

  logIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/shopping-list']);
    }, (err: any) => {
      alert('Something went wrong');
      this.router.navigate(['/login']);
    });
  }

  logOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (err: any) => {
      alert('Something went wrong');
    });
  }

  addItem(item: string) {
    this.firestoreCollection.add({
      item,
      isDone: false
    })
  }

  updateShoppingListStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteShoppingItem(id: string) {
    this.firestoreCollection.doc(id).delete();
  }
}
