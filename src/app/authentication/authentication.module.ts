import { HeaderAuthenticationComponent } from './components/header-auth/header-auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components/logar/logar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    LoginComponent, 
    LogarComponent, 
    HeaderAuthenticationComponent,

    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderAuthenticationComponent,
    HomeComponent
  ]
})
export class AuthenticationModule { }
