import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-car-emissao',
  templateUrl: './car-emissao.component.html',
  styleUrls: ['./car-emissao.component.css']
})
export class CarEmissaoComponent implements OnInit {

  SERVICO_COD: string = 'ATERMACAR';
  SERVICO_TEXTO: string = 'Elaboração de Cadastro ambiental rural a produtor beneficiário';
  
 
  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'O beneficiário procurou apoio neste escritório pois necessita da emissão deste documento para atender a legislação vigente.';
  ORIENTACAO_TEXT: string = 'Obter do órgão competente a devida autorização antes de implantar qualquer atividade em sua propriedade.';
  
  RECOMENDACAO_TEXT: string = '';

  TEMPLATE_TITLE: string = 'Emissão de CAR';
  TEMPLATE_SUB: string = 'Registros Cadastro ambiental rural - Serviço gratuito prestado pela prefeitura municipal de Tarumirim';

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
      serviceProvidedCode: 'ATERMACAR',
      status: 'FINALIZADA',
      servicoPrestado: 'Elaboração de Cadastro ambiental rural a produtor beneficiário',
      valor: 0
    }
    this.chamadas.push(servico01);

  }

}
