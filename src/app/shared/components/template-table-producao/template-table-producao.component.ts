import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producao, ProducaoVO } from 'src/app/producao/models/info-renda.model';

@Component({
  selector: 'template-table-producao',
  templateUrl: './template-table-producao.component.html',
  styleUrls: ['./template-table-producao.component.css']
})
export class TemplateTableProducaoComponent implements OnInit {

  @Input('inputProducao') inputProducao: ProducaoVO[] = [];
  @Output() updated = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removerProducao(value, $event) {
    event.preventDefault();
    this.inputProducao = this.inputProducao.filter(item => item != value);
    //emitindo notificação para atualização
    this.updated.emit(this.inputProducao)
  }
  getTotalProducao(prd: Producao) {
    console.log(prd);
    return prd.quantidade * prd.valorUnitario;
  }
  getRendaTotal() {
    const total = this.inputProducao.reduce(getTotal, 0);
    function getTotal(total, item) {
      return total + (item.valorUnitario * item.quantidade);
    }
    return total;
  }

}
