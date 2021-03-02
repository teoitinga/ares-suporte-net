import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ApiServicesService } from 'src/app/visita/services/api-services.service';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { TecnicoModel } from '../../models/tecnico.model';
 
@Component({
  selector: 'search-tecnico-auto-complete',
  templateUrl: './search-tecnico-auto-complete.component.html',
  styleUrls: ['./search-tecnico-auto-complete.component.css']
})
export class SearchTecnicoAutoCompleteComponent implements OnInit {

  @Input() inputObject: TecnicoModel;
  
  @Output() updated = new EventEmitter();

  formGroup: FormGroup;

  formControl = new FormControl();
  
  filtered$: Observable<TecnicoModel[]>;

  selected$: Observable<TecnicoModel>;
  
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
        filter(value => value.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this.apiService.getTecnicosForApi(value)),
        );
  }
  displayfn(value){
    return value?value.name:value;
  }
  
  seleciona(value){
        
    this.selected$ = (value);
    this.inputObject = value;
    this.atedimentoService.setTecnico(this.inputObject);

    //emitindo notificação para atualização de serviço
    this.updated.emit(this.inputObject)

  }
}
