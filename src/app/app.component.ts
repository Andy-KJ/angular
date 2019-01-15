import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';
import { AuthService } from "./services/auth.service";
import {fromEvent, Observable, Subscription} from 'rxjs';
// import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'angular';
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;

  message;
  public isLogin:boolean;
  public userName:string;
  public userEmail:string;
  public userPhoto: string;
  public userUid: string;

  constructor(private msgService:MessagingService, private authService:AuthService){ }

  ngOnInit(): void {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;

      this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.isLogin=true;
          this.userName = auth.displayName;
          this.userEmail = auth.email;
          this.userPhoto = auth.photoURL;
          this.userUid = auth.uid;
        }else{
        this.isLogin = false;
        }
      });
      this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      console.log('Online . .');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = "You're in Offline Mode";
      this.connectionStatus = 'offline';
      console.log('Offline - No connection internet !');
    }));
    }
    ngOnDestroy(): void {
      /**
      * Unsubscribe all subscriptions to avoid memory leak
      */
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    onClickLogout(){
      this.authService.logout();
    }
    
}