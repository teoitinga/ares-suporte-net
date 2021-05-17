import { GeoimaComponent } from './components/servicos/geoima/geoima.component';
import { PrgHortaComponent } from './components/servicos/prg-horta/prg-horta.component';

import { PainelServicosComponent } from './../info-view/painel-servicos/painel-servicos.component';
import { AuthGuard } from './../authentication/auth-guard ';
import { DesbloqueioDapComponent } from './components/servicos/desbloqueio-dap/desbloqueio-dap.component';
import { ConvDoisEmaterComponent } from './components/servicos/conv-dois-emater/conv-dois-emater.component';
import { ConvTresEmaterComponent } from './components/servicos/conv-tres-emater/conv-tres-emater.component';
import { CadastrarVisitaComponent } from './components/cadastrar-visita/cadastrar-visita.component';
import { VisitaComponent } from './components/visita/visita.component';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarEmissaoComponent } from './components/servicos/car-emissao/car-emissao.component';
import { CarSegundaviaComponent } from './components/servicos/car-segundavia/car-segundavia.component';
import { CarRetificarComponent } from './components/servicos/car-retificar/car-retificar.component';
import { ConvUmEmaterComponent } from './components/servicos/conv-um-emater/conv-um-emater.component';
import { EmissaoDapComponent } from './components/servicos/emissao-dap/emissao-dap.component';


const routes: Routes = [
  {
    path: 'visitas',
    component: VisitaComponent,
    canActivate: [AuthGuard],
    data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    children: [
      {
      path: '',
      component: ListaVisitasComponent
    },
    {
      path: 'cadastrar',
      component: CadastrarVisitaComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'lista-visitas',
      component: ListaVisitasComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'cadastrar-car-emissao',
      component: CarEmissaoComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    },
    {
      path: 'cadastrar-boa-horta',
      component: PrgHortaComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    },
    {
      path: 'cadastrar-car-segundavia',
      component: CarSegundaviaComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    },
    {
      path: 'cadastrar-car-retificar',
      component: CarRetificarComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    },
    {
      path: 'geo-ima',
      component: GeoimaComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO', 'PREFEITURA']},
    },
    {
      path: 'conv-um-emater',
      component: ConvUmEmaterComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'conv-dois-emater',
      component: ConvDoisEmaterComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'conv-tres-emater',
      component: ConvTresEmaterComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'dap-emissao',
      component: EmissaoDapComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'dap-dbl',
      component: DesbloqueioDapComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
    {
      path: 'info',
      component: PainelServicosComponent,
      canActivate: [AuthGuard],
      data: {role_acess: ['TECNICO', 'CEDIDO']},
    },
      {
        path: 'renda',
        loadChildren: () => import('../producao/producao.module').then(m => m.ProducaoModule)
      }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaRoutingModule { }
