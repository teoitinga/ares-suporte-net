import { CadastrarProducaoComponent } from './../producao/components/cadastrar-producao/cadastrar-producao.component';
import { ProducaoRoutingModule } from './../producao/producao-routing.module';
import { ProducaoModule } from './../producao/producao.module';
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
import { CarEmissaoComponent } from './components/servicos/car-emissao/car-emissao.component';
import { CarRetificarComponent } from './components/servicos/car-retificar/car-retificar.component';
import { CarSegundaviaComponent } from './components/servicos/car-segundavia/car-segundavia.component';
import { ConvUmEmaterComponent } from './components/servicos/conv-um-emater/conv-um-emater.component';
import { TemplateComponent } from './components/servicos/template/template.component';
import { ConvDoisEmaterComponent } from './components/servicos/conv-dois-emater/conv-dois-emater.component';
import { ConvTresEmaterComponent } from './components/servicos/conv-tres-emater/conv-tres-emater.component';
import { EmissaoDapComponent } from './components/servicos/emissao-dap/emissao-dap.component';
import { DesbloqueioDapComponent } from './components/servicos/desbloqueio-dap/desbloqueio-dap.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PainelServicosComponent } from '../info-view/painel-servicos/painel-servicos.component';
import {MatSelectModule} from '@angular/material/select';
import { ProducaoComponent } from '../producao/components/producao/producao.component';
import { PesquisaProducaoAutocompleteComponent } from '../producao/components/pesquisa-producao-autocomplete/pesquisa-producao-autocomplete.component';

@NgModule({
  declarations: [
    ListaVisitasComponent, 
    VisitaComponent,
    CadastrarVisitaComponent,
    PesquisaServicosComponent,
    SearchTecnicoAutoCompleteComponent,
    CarEmissaoComponent,
    CarRetificarComponent,
    CarSegundaviaComponent,
    ConvUmEmaterComponent,
    TemplateComponent,
    ConvDoisEmaterComponent,
    ConvTresEmaterComponent,
    EmissaoDapComponent,
    DesbloqueioDapComponent,
    PainelServicosComponent,
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
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    SharedModule,
    AuthenticationModule,
    ProducaoModule,
    ProducaoRoutingModule,
    VisitaRoutingModule
  ],
  providers:[
    ApiServicesService,
    VisitaService,
    SearchMunicipioService,
 
  ]
})
export class VisitaModule { }
