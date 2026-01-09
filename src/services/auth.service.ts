import {AngularFireAuth} from "@angular/fire/compat/auth";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(private angularFireAuth: AngularFireAuth) {

  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.angularFireAuth.signOut();
  }
}

