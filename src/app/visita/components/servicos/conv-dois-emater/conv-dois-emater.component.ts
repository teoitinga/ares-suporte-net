import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-conv-dois-emater',
  templateUrl: './conv-dois-emater.component.html',
  styleUrls: ['./conv-dois-emater.component.css']
})
export class ConvDoisEmaterComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.';
  ORIENTACAO_TEXT: string = 'Escolha da área: Evitar solos arenosos por apresentarem baixa capacidade de retenção de água, bem como os sujeitos a encharcamento. Solos profundos, sem problemas de drenagem e com pequena declividade são os mais indicados.Semeadura: Recomenda-se o plantio em linha, usando 6 a 7 sementes/m de sulco e espaçamento entre linhas de 0,90m, totalizando cerca de 55.555 plantas/ha. Caso o produtor opte pelo plantio em covas, semear 2 a 3 sementes/cova e usar 0,40m entre covas e 0,90m entre linhas, deixando 2 plantas/cova após a germinação. O ideal é ser realizada conforme os resultados da análise de solo. Para produções médias, pode-se aplicar 20kg de N, 70kg de P2O5 e 40kg de K2O/ha (equivalente a 500kg de 04-14-08/ha) - Adubação de cobertura: Para sistemas não irrigados, recomendam-se de 40 a 70kg/ha de nitrogênio, quando as plantas apresentarem de 8 a 10 folhas totalmente expandidas. Em sistemas de produção irrigados, utilizar doses mais elevadas (100 a 120kg/ha), parceladas em duas épocas (com 6 a 8 folhas e com 10 a 12 folhas).';
  RECOMENDACAO_TEXT: string = 'Secagem e armazenamento: O milho em espiga ou debulhado deve ser seco em torno de 13% de umidade, obtido na prática quando os grãos apresentarem-se firmes e resistentes à pressão com a unha. Para sementes, tratar com produtos específicos (polvilhamento e/ou expurgo), sempre com orientação técnica. O armazenamento deve ser feito em local seco, fresco e livre de roedores.';
  //TEMPLATE_TITLE: BehaviorSubject<string>;//string = 'Sementes de Milho';
  TEMPLATE_TITLE: string = 'Sementes de Milho';
  TEMPLATE_SUB: string = 'Registros Entregas de Sementes de milho - Emenda Parlamentar Convênio 891349/2019 ';

  usuario: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.usuario = this.authenticationService.getUserName();
    //this.TEMPLATE_TITLE = new BehaviorSubject<string>("Milho");
  }

  ngOnInit(): void {

    let servico01: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'PRPRGDSMM2020',
      servicoPrestado: 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMM2020V1',
      servicoPrestado: 'Assistencia técnica em produção de Milho - Visita de acompanhamento 01',
      valor: 0
    }
    this.chamadas.push(servico02);

    let servico03: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMM2020V2',
      servicoPrestado: 'Assistencia técnica em produção de Milho - Visita de acompanhamento 02',
      valor: 0
    }
    this.chamadas.push(servico03);

    let servico04: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'PRGDSMM2020V3',
      servicoPrestado: 'Assistencia técnica em produção de Milho - Visita de acompanhamento 03',
      valor: 0
    }
    this.chamadas.push(servico04);

    let servico05: Chamada = {
      cpfReponsavel: '04459471604',
      ocorrencia: '***',
      serviceProvidedCode: 'ATERCULTMILHO',
      servicoPrestado: 'Assistencia técnica em produção de Milho',
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
