import { CadastrarVisitaComponent } from './components/cadastrar-visita/cadastrar-visita.component';
import { VisitaComponent } from './components/visita/visita.component';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarEmissaoComponent } from './components/servicos/car-emissao/car-emissao.component';
import { CarSegundaviaComponent } from './components/servicos/car-segundavia/car-segundavia.component';
import { CarRetificarComponent } from './components/servicos/car-retificar/car-retificar.component';


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
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaRoutingModule { }
