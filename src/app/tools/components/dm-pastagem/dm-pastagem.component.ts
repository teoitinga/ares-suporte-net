import { CULTURAS } from '../../../shared/components/pastagem-model';
import { Component, Inject, OnInit } from '@angular/core';
import { PastagemModel } from '../../../shared/components/pastagem-model';
import { RebanhoModel } from '../../../shared/components/rebanho-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../../shared/service/responses-messages.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dm-pastagem',
  templateUrl: './dm-pastagem.component.html',
  styleUrls: ['./dm-pastagem.component.css']
})
export class DmPastagemComponent implements OnInit {
  
  rebanho: RebanhoModel[] = [];

  culturaSelected: PastagemModel;
  culturas: PastagemModel[] = [];

  form: FormGroup;

  private _areaPiquete: number;
  private _qtdPiquetes: number;
  private _lotacao: number;
  private _consumoAnual: number;
  private _pastagem: string;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.culturas = CULTURAS;
  }

  incluir(value: any){

  }
  remove(value: any){
    this.rebanho = value;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      pasto: ['Mombaça', Validators.required],
      ocupacao: ['1', Validators.required],
      aguas: ['210', Validators.required],
    });

  }

  calcular(value: any){

    //Calcula a lotação do rebanho
    const lotacao = this.rebanho.reduce(function(total, rb){
      return total + (rb.categoria.ua * rb.quantidade);
    },0);
    this._lotacao = Math.round(lotacao);

    //Obtem a produção anual de forragem
    const producao = this.form.controls['pasto'].value;
    this._pastagem = producao['cultura'];

    //Obtem o periodo de ocupacao do pasto
    const ocupacao = this.form.controls['ocupacao'].value;

    //obtem o tempo(dias) necessários para o fornecimento de MS
    const aguas = this.form.controls['aguas'].value;

    //Consumo de forragem em %PV em MS para clima tropical
    const consumo = 2.5

    //Cálculo
    const prodMs = producao['ms'];
    let necessidadeMs = lotacao*450*(1.8/100);

    //Necessidade de MS para a época das águas
    let necessidadeEpocaAguas = (necessidadeMs*aguas)/(1-0.3);

    //Necessidade de MS para o ano  - Kg de MS por ano para o rebanho informado
    let necessidadeMSano = necessidadeEpocaAguas/(1-0.1);

    this._consumoAnual = Math.round(necessidadeMSano);

    //Cálculo da área necessária

    let areaNecessaria = (necessidadeMSano/1000)/prodMs;

    //Calcula a quantidade de piquete
    const descanso = producao['descanso']

    let qtdPiquetes = (descanso/ocupacao) + 1;
    this._qtdPiquetes = Math.round(qtdPiquetes);

    //Calcula o tamanho do piquete

    let tamanhoPiquete = areaNecessaria*10000/qtdPiquetes;
    this._areaPiquete = Math.round(tamanhoPiquete);

    /* Abrindo modal para exibir os dados */
    this.openDialog();

    /* finalizando os cálculo */
  }
  openDialog() {
    this.dialog.open(DialogViewData, {
      data: {
        areaPiquete: this._areaPiquete,
        qtdPiquetes: this._qtdPiquetes,
        lotacao: this._lotacao,
        consumoAnual: this._consumoAnual,
        pastagem: this._pastagem,
      }
    });
  }
}
@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <div mat-dialog-title class="d-flex justify-content-center bg-success text-light overflow-hidden;">
    <div>Dimensionamento de pastagem</div>
  </div>
  <div class="" style="height:200px;">
      <div class="d-flex justify-content-center align-items-center">
          <p>
            <strong>
                 
            </strong>
          </p>
      </div>

      <div class="border p-2" style="width: 400px;">
        <div class="d-flex align-items-center">
        <p>Uma pastagem com lotação de {{data.lotacao}} UA, da cultivar <strong>{{ data.pastagem }}</strong>
          deve ser dividida em <strong>{{data.qtdPiquetes}} piquetes/pastos</strong> com área média de {{ data.areaPiquete}} m<sup>2</sup>
          para suprir uma demanda de consumo anual de aproximadamente {{data.consumoAnual}} kg de matéria seca.
        </div>
      </div>
  </div>
  `,
})
export class DialogViewData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Response) { }
}
export interface Response {
  areaPiquete: number,
  qtdPiquetes: number,
  lotacao: number,
  consumoAnual: number,
  pastagem: string,
}