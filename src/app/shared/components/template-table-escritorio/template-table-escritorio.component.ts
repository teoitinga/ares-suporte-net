import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EscritorioModel } from '../../models/escritorio';
import { EscritorioService } from '../../services/escritorio.service';

@Component({
  selector: 'template-table-escritorio',
  templateUrl: './template-table-escritorio.component.html',
  styleUrls: ['./template-table-escritorio.component.css']
})
export class TemplateTableEscritorioComponent implements OnInit {
  
  @Input('input$') input$: Observable<EscritorioModel>;

  @Output('remove') remove = new EventEmitter();

  @Output('edita') edita = new EventEmitter();
  
  constructor(
    private escritorioService: EscritorioService
  ) { }

  ngOnInit(): void {
    this.escritorioService.emitirEscritorio.subscribe(
      esloc=> this.input$ = this.escritorioService.loadAllOffice()
    );
  }

  editar(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.edita.emit(value);
  }
  remover(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.remove.emit(value);

  }
}
