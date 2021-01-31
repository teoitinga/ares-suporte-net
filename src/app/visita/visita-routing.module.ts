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
    children: [
      {
      path: '',
      component: ListaVisitasComponent
    },
    {
      path: 'cadastrar',
      component: CadastrarVisitaComponent
    },
    {
      path: 'cadastrar-car-emissao',
      component: CarEmissaoComponent
    },
    {
      path: 'cadastrar-car-segundavia',
      component: CarSegundaviaComponent
    },
    {
      path: 'cadastrar-car-retificar',
      component: CarRetificarComponent
    },
    {
      path: 'conv-um-emater',
      component: ConvUmEmaterComponent
    },
    {
      path: 'conv-dois-emater',
      component: ConvDoisEmaterComponent
    },
    {
      path: 'conv-tres-emater',
      component: ConvTresEmaterComponent
    },
    {
      path: 'dap-emissao',
      component: EmissaoDapComponent
    },
    {
      path: 'dap-dbl',
      component: DesbloqueioDapComponent
    },
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaRoutingModule { }
