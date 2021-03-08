import { InfoRendaComponent } from './components/info-renda/info-renda.component';
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
        },
        {
          path:'info',
          component: InfoRendaComponent
        }
      ]
    }
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProducaoRoutingModule { }