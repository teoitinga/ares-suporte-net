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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    SearchMunicipioComponent,
    MascaraDirective,
    TemplateProdutorMinComponent,
    TemplateTableProdutorsComponent,
    TemplateTableServicosComponent,
    TemplateTableProducaoComponent,
    StatusDirective,
    ValoresDecimaisDirective
  ],
  providers:[
    ApiServicesService,
    VisitaService
  ]
})
export class SharedModule { }