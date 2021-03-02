import { Chamada } from './../../../visita/models/visita-post.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'template-table-servicos',
  templateUrl: './template-table-servicos.component.html',
  styleUrls: ['./template-table-servicos.component.css']
})
export class TemplateTableServicosComponent implements OnInit {
  @Input('inputChamadas') inputChamadas: Chamada[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  removerChamada(value, event){
    event.preventDefault();
    this.inputChamadas = this.inputChamadas.filter(item => item != value);
    
  }
}
