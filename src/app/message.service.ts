import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Message } from './message.model';

@Injectable()
export class MessageService {

  user: Observable<firebase.User>;
  messages: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.messages = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;
  }

  login() {
    // this.afAuth.auth.signInAnonymously();
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

logout() {
    this.afAuth.auth.signOut();
}

send(newMessage: Message) {

    this.messages.push(newMessage);
    // this.msgVal = '';
}

getMessages() {
  return this.messages;
}

}
