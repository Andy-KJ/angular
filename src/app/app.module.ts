import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { PrivatePageComponent } from './components/private-page/private-page.component';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";

import { FlashMessagesModule, FlashMessagesService } from "angular2-flash-messages";
import { MessagingService } from './services/messaging.service';

import { environment } from '../environments/environment';

import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { FooterComponent } from './components/footer/footer.component';
import { OnlineStatusComponent } from './components/online-status/online-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NotFound404Component,
    NavbarComponent,
    ForgetPasswordComponent,
    PrivatePageComponent,
    FooterComponent,
    OnlineStatusComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlashMessagesModule
  ],
  providers: [AuthService,AuthGuard, FlashMessagesService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
