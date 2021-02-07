import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { ApiServicesService } from '../visita/services/api-services.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchMunicipioComponent } from './components/search-municipio/search-municipio.component';
import { MascaraDirective } from './diretives/mascara.directive';
import { StatusDirective } from './directives/status.directive';

@NgModule({
  declarations: [
    SearchMunicipioComponent,
    MascaraDirective,
    StatusDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    SearchMunicipioComponent,
    MascaraDirective,
    StatusDirective
  ],
  providers:[
    ApiServicesService,
    VisitaService
  ]
})
export class SharedModule { }