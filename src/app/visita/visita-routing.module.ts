import { CadastrarVisitaComponent } from './components/cadastrar-visita/cadastrar-visita.component';
import { VisitaComponent } from './components/visita/visita.component';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaRoutingModule { }
