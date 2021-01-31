import { AuthenticationService } from './../../../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-conv-um-emater',
  templateUrl: './conv-um-emater.component.html',
  styleUrls: ['./conv-um-emater.component.css']
})
export class ConvUmEmaterComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'Critérios de priorização: agricultores já trabalhados pela EMATER, que comercializem no PNAE, PAA e Feira livre. Priorizando agricultores de baixa renda, e que tradicionalmente plantam hortaliças.';
  ORIENTACAO_TEXT: string = 'Escolha da área: Evitar solos arenosos por apresentarem baixa capacidade de retenção de água, bem como os sujeitos a encharcamento. Solos profundos, sem problemas de drenagem e com pequena declividade são os mais indicados.Semeadura: Recomenda-se o plantio em linha, usando 6 a 7 sementes/m de sulco e espaçamento entre linhas de 0,90m, totalizando cerca de 55.555 plantas/ha. Caso o produtor opte pelo plantio em covas, semear 2 a 3 sementes/cova e usar 0,40m entre covas e 0,90m entre linhas, deixando 2 plantas/cova após a germinação. O ideal é ser realizada conforme os resultados da análise de solo. Para produções médias, pode-se aplicar 20kg de N, 70kg de P2O5 e 40kg de K2O/ha (equivalente a 500kg de 04-14-08/ha) - Adubação de cobertura: Para sistemas não irrigados, recomendam-se de 40 a 70kg/ha de nitrogênio, quando as plantas apresentarem de 8 a 10 folhas totalmente expandidas. Em sistemas de produção irrigados, utilizar doses mais elevadas (100 a 120kg/ha), parceladas em duas épocas (com 6 a 8 folhas e com 10 a 12 folhas).';
  RECOMENDACAO_TEXT: string = 'Secagem e armazenamento: O milho em espiga ou debulhado deve ser seco em torno de 13% de umidade, obtido na prática quando os grãos apresentarem-se firmes e resistentes à pressão com a unha. Para sementes, tratar com produtos específicos (polvilhamento e/ou expurgo), sempre com orientação técnica. O armazenamento deve ser feito em local seco, fresco e livre de roedores.';
  TEMPLATE_TITTLE: string = 'Registros Sementes de milho - Emenda Parlamentar Convênio 891349/2019 ';

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
