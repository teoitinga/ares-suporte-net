import { Component, OnInit } from '@angular/core';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-prg-horta',
  templateUrl: './prg-horta.component.html',
  styleUrls: ['./prg-horta.component.css']
})
export class PrgHortaComponent implements OnInit {
  SERVICO_COD: string = 'ATERMACAR';
  SERVICO_TEXTO: string = 'Doação de sementes de hortaliças';
  
 
  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'O beneficiário procurou apoio neste escritório pois tem interesse em cultivar hortaliças em seu quintal.';
  ORIENTACAO_TEXT: string = 'Utilizar produtor naturais para o controle de pragas.';
  
  RECOMENDACAO_TEXT: string = '';

  TEMPLATE_TITLE: string = 'Kit - Sementes de Hortaliças';
  TEMPLATE_SUB: string = 'Registros de beneficiários do programa de distribuição de sementes de hortaliças';

  usuario: string = '';
  constructor() { }

  ngOnInit(): void {
    let servico01: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'PRGMDSMH',
      status: 'FINALIZADA',
      servicoPrestado: 'Doação de sementes de hostaliças a beneficiário',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'ATERCULTHORTA',
      status: 'FINALIZADA',
      servicoPrestado: 'Orientações gerais em produção de hortaliças',
      valor: 0
    }
    this.chamadas.push(servico02);
  }

}
