import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { protractor } from 'protractor/built/ptor';
import { ProducaoAnual } from 'src/app/producao/models/info-renda.model';

@Component({
  selector: 'template-table-producao',
  templateUrl: './template-table-producao.component.html',
  styleUrls: ['./template-table-producao.component.css']
})
export class TemplateTableProducaoComponent implements OnInit {

  @Input('inputProducao') inputProducao: ProducaoAnual[] = [];
  @Output() updated = new EventEmitter();

  rendaAgro: number = 0;
  rendaNAgro: number = 0;
  rendaTotal: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  removerProducao(value, $event) {
    event.preventDefault();
    this.inputProducao = this.inputProducao.filter(item => item != value);
    //emitindo notificação para atualização
    this.updated.emit(this.inputProducao)
  }
  getTotalProducao(prd: ProducaoAnual) {
    return prd.quantidade * prd.valorUnitario;
  }
  getRendaTotal():number {
    const total = this.inputProducao.reduce(getTotal, 0);
    function getTotal(total, item) {
      return total + (item.valorUnitario * item.quantidade);
    }
    return total;
  }
  getRendaAgro():number {
    const total = this.inputProducao.filter(value => value.producaoAgropecuaria==="SIM").reduce(getTotal, 0);
    function getTotal(total, item) {
      return total + (item.valorUnitario * item.quantidade);
    }
    return total;
  }
  getRendaNAgro():number {
    const total = this.inputProducao.filter(value => value.producaoAgropecuaria!=="SIM").reduce(getTotal, 0);
    function getTotal(total, item) {
      return total + (item.valorUnitario * item.quantidade);
    }
    return total;
  }
  percentualAgro():number{
    const pct = (this.getRendaAgro() / this.getRendaTotal())*100;
    return !Number.isNaN(pct) ? pct : 0;
  }
}
