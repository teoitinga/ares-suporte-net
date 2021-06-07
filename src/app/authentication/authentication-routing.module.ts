import { UpdateComponent } from './components/users/update/update.component';
import { PerdaDeCargaComponent } from './../tools/components/perda-de-carga/perda-de-carga.component';
import { ToolsComponent } from './../tools/components/tools/tools.component';
import { HomeComponent } from './components/home/home.component';
import { LogarComponent } from './components/logar/logar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaAcoesComponent } from '../chamadas/components/lista-acoes/lista-acoes.component';
import { AuthGuard } from './auth-guard ';


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
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
      },
      {
        path: 'chamadas',
        component: ListaAcoesComponent,
        canActivate: [AuthGuard],
        data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
      },
      {
        path: 'user',
        component: UpdateComponent,
        canActivate: [AuthGuard],
        data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
      },
      {
        path: 'tools',
        component: ToolsComponent,
        canActivate: [AuthGuard],
        data: {role_acess: ['TECNICO', 'CEDIDO']},
      },
      {
        path: 'hman',
        component: PerdaDeCargaComponent,
        canActivate: [AuthGuard],
        data: {role_acess: ['TECNICO', 'CEDIDO']},
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
