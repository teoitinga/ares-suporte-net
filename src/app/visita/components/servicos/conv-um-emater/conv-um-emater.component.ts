import { AuthenticationService } from './../../../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Chamada } from 'src/app/visita/models/visita-post.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-conv-um-emater',
  templateUrl: './conv-um-emater.component.html',
  styleUrls: ['./conv-um-emater.component.css']
})
export class ConvUmEmaterComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.';
  ORIENTACAO_TEXT: string = 'Escolha da área: Evitar solos arenosos por apresentarem baixa capacidade de retenção de água, bem como os sujeitos a encharcamento.';
  RECOMENDACAO_TEXT: string = '';
  TEMPLATE_TITLE: string = 'Kit Horta';
  TEMPLATE_SUB: string = 'Registros Entregas de Kit Horta - Emenda Parlamentar Convênio 891349/2019 ';

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
      serviceProvidedCode: 'PRGDKTHT2019',
      servicoPrestado: 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDKTHT2019V1',
      servicoPrestado: 'Assistência técnica a beneficiário  Convênio 891349/2019 no ano de 2021.',
      valor: 0
    }
    this.chamadas.push(servico02);

    let servico03: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'ATERCULTHORTA',
      servicoPrestado: 'Assistencia técnica em produção de hortaliças',
      valor: 0
    }
    this.chamadas.push(servico03);

    let servico04: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'AGREC',
      servicoPrestado: 'Assistencia técnica em produção agroecológia com o uso de caldas no combate a pragas',
      valor: 0
    }
    this.chamadas.push(servico04);
  }

}
