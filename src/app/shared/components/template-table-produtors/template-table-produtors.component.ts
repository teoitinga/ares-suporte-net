import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produtore } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'template-table-produtors',
  templateUrl: './template-table-produtors.component.html',
  styleUrls: ['./template-table-produtors.component.css']
}) 
export class TemplateTableProdutorsComponent implements OnInit {
  
  @Input('inputProdutores') inputProdutores: Produtore[] = [];

  @Output() removed = new EventEmitter();

  constructor() { }
 
  ngOnInit(): void {
  }
   
  removerProdutor(value, event){
    event.preventDefault();
    
    this.inputProdutores = this.inputProdutores.filter(item => item !== value);

    //emitindo notificação para atualização de serviço
    this.removed.emit(this.inputProdutores)

  }
}
