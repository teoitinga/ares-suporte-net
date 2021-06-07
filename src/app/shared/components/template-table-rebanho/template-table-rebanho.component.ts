import { RebanhoModel } from './../rebanho-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'template-table-rebanho',
  templateUrl: './template-table-rebanho.component.html',
  styleUrls: ['./template-table-rebanho.component.css']
})
export class TemplateTableRebanhoComponent implements OnInit {
  
  @Input('inputRebanho') inputRebanho: RebanhoModel[] = [];

  @Output('remove') remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removerCategoria(value, event){
    event.preventDefault();
    
    const rebanho = this.inputRebanho.filter(item => item !== value);

    //emitindo notificação para atualização de serviço
    this.remove.emit(rebanho)

  }
  uaRebanho(){
    return this.inputRebanho.reduce(function(total, rb){
      return total + (rb.categoria.ua * rb.quantidade)
    },0);
  }
  totalUa(value: RebanhoModel){
    return value.categoria.ua * value.quantidade;
  }
}
