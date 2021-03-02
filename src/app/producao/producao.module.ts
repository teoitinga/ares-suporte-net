import { SharedModule } from './../shared/shared.module';
import { ProducaoRoutingModule } from './producao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarProducaoComponent } from './components/cadastrar-producao/cadastrar-producao.component';
import { PesquisaProducaoAutocompleteComponent } from './components/pesquisa-producao-autocomplete/pesquisa-producao-autocomplete.component';
import { ProducaoComponent } from './components/producao/producao.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CadastrarProducaoComponent, 
    PesquisaProducaoAutocompleteComponent, 
    ProducaoComponent],
  exports: [
    CadastrarProducaoComponent, 
    PesquisaProducaoAutocompleteComponent, 
    ProducaoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    SharedModule,
    ProducaoRoutingModule
  ]
})
export class ProducaoModule { }
