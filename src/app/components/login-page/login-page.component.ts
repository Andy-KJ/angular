import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public email:string;
  public password:string;

  constructor(
    public authService:AuthService,
    public router:Router,
    public flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onClickFacebookLogin(){
    this.authService.loginFacebook()
    .then((res) => {
        this.router.navigate(['/private-page']);
    }).catch(err => console.log(err.message));
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then((res)=>{
      this.flashMessage.show('Login Success and Welcome !'  , 
           {cssClass:'alert-success' , 
           timeout:4000})
      this.router.navigate(['/private-page']);
      console.log(res);
    }).catch((err)=>{
      console.log(err);
      this.flashMessage.show('Your Email or Password is Invalid !'  , 
           {cssClass:'alert-danger' , 
           timeout:4000})
      this.router.navigate(['/login-page'])
    });
  }
  

  onClickGoogleLogin(){
    this.authService.loginGoogle()
    .then((res) => {
        this.router.navigate(['/private-page']);
    }).catch(err => console.log(err.message));
  }

  
}