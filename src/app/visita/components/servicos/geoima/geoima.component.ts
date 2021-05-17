import { Chamada } from 'src/app/visita/models/visita-post.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-geoima',
  templateUrl: './geoima.component.html',
  styleUrls: ['./geoima.component.css']
})
export class GeoimaComponent implements OnInit {
  SERVICO_COD: string = 'GMPIMA';
  SERVICO_TEXTO: string = 'Georeferenciamento de propriedades rurais junto ao IMA';
  
 
  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'O beneficiário procurou apoio neste escritório pois necessita atualizar o seu registro junto ao IMA para vacinação do rebanho.';
  ORIENTACAO_TEXT: string = '';
  
  RECOMENDACAO_TEXT: string = '';

  TEMPLATE_TITLE: string = 'Georeferenciameno de propriedades rurais';
  TEMPLATE_SUB: string = 'Georeferenciamento de propriedades rurais junto ao IMA';

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
      serviceProvidedCode: 'GMPIMA',
      status: 'FINALIZADA',
      servicoPrestado: 'Georeferenciamento de propriedades rurais junto ao IMA',
      valor: 0
    }
    this.chamadas.push(servico01);

  }
}
