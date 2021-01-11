import { HomeComponent } from './components/home/home.component';
import { LogarComponent } from './components/logar/logar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
      path: '',
      component: LogarComponent
    },
    {
      path: 'home',
      component: HomeComponent
    }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
 