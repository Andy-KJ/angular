import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public email:string;
  constructor(public authService:AuthService, 
              public router:Router,
              public flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  resetPassword() {
    this.authService.resetPassword(this.email)
    .then((res)=>{
      this.flashMessage.show('We have sent email to reset your password !'  , 
           {cssClass:'alert-success && text-center' , 
           timeout:4000})
      this.router.navigate(['/login-page']);
      console.log(res);
    }).catch((err)=>{
      console.log(err);
        this.router.navigate(['register-page'])
    });
  }
}