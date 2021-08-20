import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { ApiServicesService } from '../visita/services/api-services.service';
import { VisitaService } from 'src/app/visita/services/visita.service';
//Directives
import { MascaraDirective } from './diretives/mascara.directive';
import { StatusDirective } from './directives/status.directive';
//Components
import { SearchMunicipioComponent } from './components/search-municipio/search-municipio.component';
import { TemplateProdutorMinComponent } from './components/template-produtor-min/template-produtor-min.component';
import { TemplateTableProdutorsComponent } from './components/template-table-produtors/template-table-produtors.component';
import { TemplateTableServicosComponent } from './components/template-table-servicos/template-table-servicos.component';
import { TemplateTableProducaoComponent } from './components/template-table-producao/template-table-producao.component';
import { ValoresDecimaisDirective } from './directives/valores.decimais.directive';
import { TemplateRebanhoComponent } from './components/template-rebanho/template-rebanho.component';
import { TemplateTableRebanhoComponent } from './components/template-table-rebanho/template-table-rebanho.component';
import { TemplatePastagemComponent } from './components/template-pastagem/template-pastagem.component';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { TemplateTableEscritorioComponent } from './components/template-table-escritorio/template-table-escritorio.component';
import { TemplateEscritorioComponent } from './components/template-escritorio/template-escritorio.component';
import { TemplateProdutorComponent } from './components/template-produtor/template-produtor.component';
import { TemplateTableProdutorComponent } from './components/template-table-produtor/template-table-produtor.component';

//Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    SearchMunicipioComponent,
    MascaraDirective,
    StatusDirective,
    TemplateProdutorMinComponent,
    TemplateTableProdutorsComponent,
    TemplateTableServicosComponent,
    TemplateTableProducaoComponent,
    ValoresDecimaisDirective,
    TemplateRebanhoComponent,
    TemplateTableRebanhoComponent,
    TemplatePastagemComponent,
    ErrorMessagesComponent,
    TemplateTableEscritorioComponent,
    TemplateEscritorioComponent,
    TemplateProdutorComponent,
    TemplateTableProdutorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  exports: [
    SearchMunicipioComponent,
    MascaraDirective,
    TemplateProdutorMinComponent,
    TemplateTableProdutorsComponent,
    TemplateTableServicosComponent,
    TemplateTableProducaoComponent,
    TemplateRebanhoComponent,
    TemplateTableRebanhoComponent,
    TemplatePastagemComponent,
    StatusDirective,
    ValoresDecimaisDirective,
    TemplateTableEscritorioComponent,
    TemplateEscritorioComponent,
    TemplateProdutorComponent,
    TemplateTableProdutorComponent,
    ErrorMessagesComponent
  ],
  providers:[
    ApiServicesService,
    VisitaService
  ]
})
export class SharedModule { }