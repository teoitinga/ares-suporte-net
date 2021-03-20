import { tubulacao } from './data/tubulacao.model';
import { TBL_CONV, TUBOS } from './data/data.tubulacao';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalPerdaDeCargaComponent } from '../perda-de-carga.modal/perda-de-carga.modal.component';

@Component({
  selector: 'app-perda-de-carga',
  templateUrl: './perda-de-carga.component.html',
  styleUrls: ['./perda-de-carga.component.css']
})
export class PerdaDeCargaComponent implements OnInit {

  tubos = TUBOS;
  tubo_sel: tubulacao;
  formCalc: FormGroup;

  /* Variáveis a calcular */
  _hman: number;// altura manométrica total
  _vms: number;//velocidade
  _fm: number;//fator de multiplicação

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formCalc = this.fb.group({
      tubo: ['', Validators.required],
      di: ['', Validators.required],
      vazao: ['', Validators.required],
      comprimento: ['', Validators.required],
      qtdSaida: ['', Validators.required],
    });
  }
  calcular() {
    /* obtem o tubo informado */
    const tubo = this.formCalc.get('tubo').value;

    /* obtem o coeficiente de rugosidade do tubo selecionado */
    const cf = tubo.k;

    /* calcula a área do tubo e converte para m2*/
    const di = tubo.di;
    const area_tub = 3.14 * ((di * di) / 1000000) / 4;

    /*Calcula a velocidade da agua */
    const q = this.formCalc.get('vazao').value;
    const v = (q / 3600) / area_tub;

    /* Calcula a perda de carga por metro linear */
    const h = Math.pow(v / (0.355 * cf * Math.pow(di / 1000, 0.63)), (1 / 0.54));

    /* Calcula o fator de conversão */
    const saidas = this.formCalc.get('qtdSaida').value;
    let ft = TBL_CONV.filter(function (conv) {
      return conv.numSaidas === saidas;
    });

    if (ft.length === 0) {
      ft = TBL_CONV.filter(function (conv) {
        return conv.numSaidas <= saidas;
      });
    }
    let fator = [...ft].pop().fator;

    /* Calcula a perda de carga na linha*/
    const comprimento = this.formCalc.get('comprimento').value;
    const hman = h * comprimento * fator;

    /* configurando as variáveis calculadas */
    this._fm = fator;
    this._hman = hman;
    this._vms = v;

    /* Abrindo modal para exibir os dados */
    this.openDialog();

    /* finalizando os cálculo */
  }
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        hman: this._hman,
        vel: this._vms
      }
    });
  }

}
@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h1 mat-dialog-title>Perda de Carga</h1>
<div mat-dialog-content>
  Equação de Hazzen/Willians
  <ul>
    <li>
     {{data.hman}} mca
    </li>
    <li>
     {{data.vel }} m/s
    </li>
  </ul>
</div>
  `,
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}