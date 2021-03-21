import { tubulacao } from './data/tubulacao.model';
import { TBL_CONV, TUBOS } from './data/data.tubulacao';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    const area_tub = (Math.PI * (Math.pow(di/1000,2))) / 4;

    /*Calcula a velocidade da agua */
    const form_q = this.formCalc.get('vazao').value;
    let velocidade = (form_q / 3600) / area_tub;
    
    /* Calcula a perda de carga por metro linear */
    const h = Math.pow(velocidade / (0.355 * cf * Math.pow(di / 1000, 0.63)), (1 / 0.54));

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

    /* Calcula velocidade compensada */

    velocidade = Math.pow(di/1000,0.63) * Math.pow( (hman/comprimento*fator),0.54 ) * ( 0.355*cf );

    /* configurando as variáveis calculadas */
    this._fm = fator;
    this._hman = hman;
    this._vms = velocidade;

    /* exibindo logs */
    /*
    console.log('area do tubo');
    console.log(area_tub);

    console.log('Diam. interno');
    console.log(di);

    console.log('Vazao');
    console.log(form_q);

    console.log('Velocidade');
    console.log(velocidade);

    console.log('fator');
    console.log(fator);

    */
   
    /* Abrindo modal para exibir os dados */
    this.openDialog();

    /* finalizando os cálculo */
  }
  openDialog() {
    this.dialog.open(DialogViewData, {
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
  <div mat-dialog-title class="d-flex justify-content-center bg-success text-light overflow-hidden;">
    <div>Perda de Carga</div>
  </div>
  <div class="" style="height:200px;">
      <div class="d-flex justify-content-center align-items-center">
          <p>
            <strong>
                Equação de Hazen-Williams 
            </strong>
          </p>
      </div>

      <div class="border p-2" style="width: 400px;">
        <div class="d-flex align-items-center">
            <div class=""><strong>Perda de carga:</strong></div>
            <div class="d-inline-flex p-2"><strong>{{ data.hman | number:'0.2-2'}}</strong></div>
            <div class=""> mca</div>
        </div>
        <div class="d-flex align-items-center">
            <div class="">Velocidade:</div>
            <div class="d-inline-flex p-2">{{ data.vel | number:'0.2-2'}}</div>
            <div class=""> m/s</div>
        </div>
      </div>
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Confirma</button>
      </mat-dialog-actions>
  </div>
  `,
})
export class DialogViewData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Response) { }
}
export interface Response {
  hman: number,
  vel: number
}