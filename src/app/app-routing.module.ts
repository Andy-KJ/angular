import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PrivatePageComponent  } from './components/private-page/private-page.component';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'register-page', component: RegisterPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'private-page', component: PrivatePageComponent, canActivate:[AuthGuard]},
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
