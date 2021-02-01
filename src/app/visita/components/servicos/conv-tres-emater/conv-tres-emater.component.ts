import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-conv-tres-emater',
  templateUrl: './conv-tres-emater.component.html',
  styleUrls: ['./conv-tres-emater.component.css']
})
export class ConvTresEmaterComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.';
  ORIENTACAO_TEXT: string = 'Escolha da área: Evitar solos arenosos por apresentarem baixa capacidade de retenção de água, bem como os sujeitos a encharcamento. Solos profundos, sem problemas de drenagem e com pequena declividade são os mais indicados. A adubação ideal é deve ser realizada conforme os resultados da análise de solo.';
  RECOMENDACAO_TEXT: string = '';
  TEMPLATE_TITLE: string = 'Sementes de Feijão';
  TEMPLATE_SUB: string = 'Registros Entregas de Sementes de feijão - Emenda Parlamentar Convênio 891349/2019 ';

  usuario: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.usuario = this.authenticationService.getUserName();
  }

  ngOnInit(): void {
    
    let servico01: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMF2020',
      servicoPrestado: 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMF2020V1',
      servicoPrestado: 'Assistencia técnica em produção de Feijão - Visita de acompanhamento 01',
      valor: 0
    }
    this.chamadas.push(servico02);

    let servico03: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMF2020V2',
      servicoPrestado: 'Assistencia técnica em produção de Feijão - Visita de acompanhamento 02',
      valor: 0
    }
    this.chamadas.push(servico03);

    let servico04: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMF2020V3',
      servicoPrestado: 'Assistencia técnica em produção de Feijão - Visita de acompanhamento 03',
      valor: 0
    }
    this.chamadas.push(servico04);

    let servico05: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'ATERCULTFEIJAO',
      servicoPrestado: 'Assistencia técnica em produção de Feijção',
      valor: 0
    }
    this.chamadas.push(servico05);

    let servico06: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'AGREC',
      servicoPrestado: 'Assistencia técnica em produção agroecológia com o uso de caldas no combate a pragas',
      valor: 0
    }
    this.chamadas.push(servico06);
  
  }

}
