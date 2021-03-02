import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ApiServicesService } from 'src/app/visita/services/api-services.service';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { ProducaoModel } from '../../models/producao.model';
@Component({
  selector: 'pesquisa-producao-autocomplete',
  templateUrl: './pesquisa-producao-autocomplete.component.html',
  styleUrls: ['./pesquisa-producao-autocomplete.component.css']
})
export class PesquisaProducaoAutocompleteComponent implements OnInit {
  @Input() inputObject: ProducaoModel;
  
  @Output() updated = new EventEmitter();

  formGroup: FormGroup;

  formControl = new FormControl();
  
  filtered$: Observable<ProducaoModel[]>;

  selected$: Observable<ProducaoModel>;
  
  constructor(
    private apiService: ApiServicesService,
    private atedimentoService: VisitaService

  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      formControl: new FormControl() 
  }
    );
    this._carregaTecnicosApi();
  }
  private _carregaTecnicosApi() {
    this.filtered$ = this.formControl.valueChanges
      .pipe(
        filter(value => value.length > 1),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(value => this.apiService.getProducaoForApi(value)),
        );
  }
  displayfn(value){
    return value?value.descricao:value;
  }
  
  seleciona(value){
        
    this.selected$ = (value);
    this.inputObject = value;
    this.atedimentoService.setProducao(this.inputObject);

    //emitindo notificação para atualização de serviço
    this.updated.emit(this.inputObject)

  }
}
