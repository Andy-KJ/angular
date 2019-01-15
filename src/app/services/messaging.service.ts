import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) { }


  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .then(()=>{
        this.db.object('/messages/{userId}/{messageId}').set(event => {


          const message = event.after.val()
          const userId  = event.params.userId
        
          const payload = {
                notification: {
                  title: message.title,
                  body: message.body,
                  icon: "assets/icons/icon-512x512.png"
                }
          }
  
        });
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload);
      });
    }


    saveMessage(){
      this.db.object('/messages/{userId}/{messageId}').set(event => {


        const message = event.after.val()
        const userId  = event.params.userId
      
        const payload = {
              notification: {
                title: message.title,
                body: message.body,
                icon: "assets/icons/icon-512x512.png"
              }
    }

  });
}}