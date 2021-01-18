import { RegistarRendaComponent } from './../info-renda/components/registar-renda/registar-renda.component';
import { InfoRendaComponent } from './../info-renda/components/info-renda/info-renda.component';
import { HomeComponent } from './components/home/home.component';
import { LogarComponent } from './components/logar/logar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaAcoesComponent } from '../chamadas/components/lista-acoes/lista-acoes.component';


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
      },
      {
        path: 'chamadas',
        component: ListaAcoesComponent
      },
      {
        path: 'renda',
        component: InfoRendaComponent,
        children: [
          {
            path: '',
            component: RegistarRendaComponent
          }
        ]
          
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
