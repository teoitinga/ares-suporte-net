import { VisitaService } from '../../services/visita.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApiServicesService } from '../../services/api-services.service';
import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
 
@Component({
  selector: 'search-servicos',
  templateUrl: './search-servicos.component.html',
  styleUrls: ['./search-servicos.component.css']
})
export class PesquisaServicosComponent implements OnInit {
  
  @Input('atendimento') atendimento: string = '';

  @Input() servico: ServicosPrestadosModel;
  
  @Output() atualizouServico = new EventEmitter();

  srvForm: FormGroup;

  controlservicos = new FormControl();
  
  servicosFiltered$: Observable<ServicosPrestadosModel[]>;

  servicoSelecionado$: Observable<ServicosPrestadosModel>;
  

  constructor(
    private apiService: ApiServicesService,
    private atedimentoService: VisitaService
  ) { }

  ngOnInit(): void {
    this.srvForm = new FormGroup({
      controlservicos: new FormControl() 
  }
    );
    this._carregaServicosApi();
  }
  private _carregaServicosApi() {
    this.servicosFiltered$ = this.controlservicos.valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this.apiService.getServicesForApi(value)),
        );
      }

      selecionaServico(value){
        
        this.servicoSelecionado$ = (value);
        this.servico = value;
        this.atedimentoService.setServico(this.servico);
        
        //emitindo notificação para atualização de serviço
        this.atualizouServico.emit(this.servico)
    
      }
    
      displayfn(value){
        return value?value.descricao:value;
      }
}
