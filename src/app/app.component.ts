import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MarsPhotosService } from './mars-photos.service';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//
// import * as firebase from 'firebase/app';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MarsPhotosService, MessageService, AngularFireAuth ]
})
export class AppComponent {
  user;
  photos: any[]=null;
  noPhotos: boolean=false;
  newMessages: Message[] = [];
  messages;
  // user: Observable<firebase.User>;
  // items: FirebaseListObservable<any[]>;
  // msgVal: string = '';

  constructor(private marsRoverPhotos: MarsPhotosService, private messageService: MessageService) {
    this.messageService.user.subscribe(user =>  {
         console.log(user);
       });
     }



    // this.items = af.list('/messages', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

  //   this.user = this.afAuth.authState;
  //
  // }


  ngOnInit() {
    this.noPhotos = false;
    this.marsRoverPhotos.getImages().subscribe(response => {
      if(response.json().photos.length > 0)
    {
      this.photos = response.json();
    }
    else {
      this.noPhotos = true;
    }
    });

  }

login() {
this.messageService.login()
}
logout() {
this.messageService.logout()
}

send(){
  this.messages = this.messageService.getMessages().subscribe(messages => {
    messages.forEach(message => {
  let newMessage = new Message(message.name, message.text);
  this.newMessages.push(newMessage)

    });
})
};

//   login() {
//     // this.afAuth.auth.signInAnonymously();
//     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
// }
//
// logout() {
//     this.afAuth.auth.signOut();
// }
//
// Send(desc: string) {
//
//     this.items.push({ message: desc});
//     this.msgVal = '';
// }

}
