import { Component, OnInit } from '@angular/core';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-conv-dois-emater',
  templateUrl: './conv-dois-emater.component.html',
  styleUrls: ['./conv-dois-emater.component.css']
})
export class ConvDoisEmaterComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.';
  ORIENTACAO_TEXT: string = 'realizar amostra de solo';
  RECOMENDACAO_TEXT: string = 'abubar essa porra';
  TEMPLATE_TITTLE: string = 'Registros Sementes de milho - Emenda Parlamentar Convênio 891349/2019 ';
  
  constructor() { }

  ngOnInit(): void {
    let servico01: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDKTHT2019',
      servicoPrestado: 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDKTHT2019V1',
      servicoPrestado: 'Assistência técnica a beneficiário  Convênio 891349/2019 no ano de 2021.',
      valor: 0
    }
    this.chamadas.push(servico02);

    let servico03: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'ATERCULTHORTA',
      servicoPrestado: 'Assitencia técnica em produção de hortaliças',
      valor: 0
    }
    this.chamadas.push(servico03);

    let servico04: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'AGREC',
      servicoPrestado: 'Assitencia técnica em produção agroecológia com o uso de caldas no combate a pragas',
      valor: 0
    }
    this.chamadas.push(servico04);
  }
}
