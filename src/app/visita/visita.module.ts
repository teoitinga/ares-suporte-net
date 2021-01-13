import { HeaderAuthenticationComponent } from './../authentication/components/header-auth/header-auth.component';
import { AuthenticationModule } from './../authentication/authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitaRoutingModule } from './visita-routing.module';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';
import { VisitaComponent } from './components/visita/visita.component';
import { CadastrarVisitaComponent } from './components/cadastrar-visita/cadastrar-visita.component';
import { SearchMunicipioService } from '../shared/service/search-municipio.service';

import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ApiServicesService } from './services/api-services.service';
import { VisitaService } from './services/visita.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { PesquisaServicosComponent } from './components/search-servicos/search-servicos.component';
import { SearchTecnicoAutoCompleteComponent } from '../shared/components/search-tecnico-auto-complete/search-tecnico-auto-complete.component';

@NgModule({
  declarations: [
    ListaVisitasComponent, 
    VisitaComponent,
    CadastrarVisitaComponent,
    PesquisaServicosComponent,
    SearchTecnicoAutoCompleteComponent,
    
    
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AuthenticationModule,

    VisitaRoutingModule
  ],
  providers:[
    ApiServicesService,
    VisitaService,
    SearchMunicipioService,
 
  ]
})
export class VisitaModule { }