import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  email: string;
  password: string;
  
  constructor(
    public afAuth: AngularFireAuth
  ) { }

    registerUser(email:string, pass:string){
      return new Promise((resolve,reject)=>{
        this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err => reject(err));
      });
    }

    loginEmail(email:string, pass:string){
      return new Promise((resolve,reject)=>{
        this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err => reject(err));
      });
    }

    loginGoogle(){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    
    loginFacebook(){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    getAuth(){
      return this.afAuth.authState.pipe(map(auth => auth));
    }

    logout(){      
      return this.afAuth.auth.signOut();
    }

    resetPassword(email: string) {
      const fbAuth = firebase.auth();
  
      return fbAuth.sendPasswordResetEmail(email)
        .then(() => console.log('sent Password Reset Email!'))
        .catch((error) => console.log(error))
  }

}
