import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { ApiServicesService } from '../visita/services/api-services.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchMunicipioComponent } from './components/search-municipio/search-municipio.component';
import { MascaraDirective } from './diretives/mascara.directive';
import { StatusDirective } from './directives/status.directive';
import { TemplateProdutorMinComponent } from './components/template-produtor-min/template-produtor-min.component';
import { TemplateTableProdutorsComponent } from './components/template-table-produtors/template-table-produtors.component';
import { TemplateTableServicosComponent } from './components/template-table-servicos/template-table-servicos.component';
import { TemplateTableProducaoComponent } from './components/template-table-producao/template-table-producao.component';
import { ValoresDecimaisDirective } from './directives/valores.decimais.directive';
import { TemplateRebanhoComponent } from './components/template-rebanho/template-rebanho.component';
import { TemplateTableRebanhoComponent } from './components/template-table-rebanho/template-table-rebanho.component';
import { TemplatePastagemComponent } from './components/template-pastagem/template-pastagem.component';
import { MatDialogModule } from '@angular/material/dialog';

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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
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
    ValoresDecimaisDirective
  ],
  providers:[
    ApiServicesService,
    VisitaService
  ]
})
export class SharedModule { }