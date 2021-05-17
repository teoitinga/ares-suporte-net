import { Chamada } from './../../../visita/models/visita-post.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'template-table-servicos',
  templateUrl: './template-table-servicos.component.html',
  styleUrls: ['./template-table-servicos.component.css']
})
export class TemplateTableServicosComponent implements OnInit {

  @Input('inputChamadas') inputChamadas: Chamada[] = [];
  @Output() removed = new EventEmitter();
  
  constructor() { } 

  ngOnInit(): void {
  } 
  
  removerChamada(value, event){
    event.preventDefault();
    this.inputChamadas = this.inputChamadas.filter(item => item != value);

    //emitindo notificação para atualização de serviço
    this.removed.emit(this.inputChamadas)

  }
}
