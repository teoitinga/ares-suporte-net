import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProducaoComponent } from './components/cadastrar-producao/cadastrar-producao.component';
import { ProducaoComponent } from './components/producao/producao.component';
export const routes: Routes = [
    {
      path: 'registro-renda',
      component: ProducaoComponent,
      children: [
        {
          path: '',
          component: CadastrarProducaoComponent
        }
      ]
    }
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProducaoRoutingModule { }