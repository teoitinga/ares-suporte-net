import { TemplateTableRebanhoComponent } from './../shared/components/template-table-rebanho/template-table-rebanho.component';
import { TemplateRebanhoComponent } from './../shared/components/template-rebanho/template-rebanho.component';
import { SharedModule } from './../shared/shared.module';
import { ToolsComponent } from './../tools/components/tools/tools.component';
import { ProducaoModule } from './../producao/producao.module';
import { HeaderAuthenticationComponent } from './components/header-auth/header-auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components/logar/logar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ListaAcoesComponent } from '../chamadas/components/lista-acoes/lista-acoes.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { PrefeituraViewsComponent } from './components/prefeitura-views/prefeitura-views.component';
import { CedidoViewsComponent } from './components/cedido-views/cedido-views.component';
import { TecnicoViewsComponent } from './components/tecnico-views/tecnico-views.component';
import { AdministradorViewsComponent } from './components/administrador-views/administrador-views.component';
import { CoordenadorViewsComponent } from './components/coordenador-views/coordenador-views.component';
import { GerenteViewsComponent } from './components/gerente-views/gerente-views.component';
import { ClienteViewsComponent } from './components/cliente-views/cliente-views.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogViewData, PerdaDeCargaComponent } from '../tools/components/perda-de-carga/perda-de-carga.component';
import { DashboardPanelComponent } from './components/reports/dashboard-panel/dashboard-panel.component';
import { UpdateComponent } from './components/users/update/update.component';
import { DmPastagemComponent } from '../tools/components/dm-pastagem/dm-pastagem.component';

///
//charts mdbbootstrap

@NgModule({
  declarations: [
    LoginComponent, 
    LogarComponent, 
    HeaderAuthenticationComponent,
    ListaAcoesComponent,
    HomeComponent,
    PrefeituraViewsComponent,
    CedidoViewsComponent,
    TecnicoViewsComponent,
    AdministradorViewsComponent,
    CoordenadorViewsComponent,
    GerenteViewsComponent,
    ClienteViewsComponent,
    ToolsComponent,
    PerdaDeCargaComponent,
    DmPastagemComponent,
    DialogViewData,
    DashboardPanelComponent,
    UpdateComponent,
    
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ProducaoModule,
    MatAutocompleteModule,
    SharedModule   
    
  ],
  exports:[
    HeaderAuthenticationComponent,
    HomeComponent
  ]
})
export class AuthenticationModule { }
