import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
import { TecnicoModel } from 'src/app/shared/models/tecnico.model';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { SearchMunicipioService } from 'src/app/shared/service/search-municipio.service';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator';
import { Chamada, VisitaPostModel } from 'src/app/visita/models/visita-post.model';
import { VisitaService } from 'src/app/visita/services/visita.service';

@Component({
  selector: 'app-car-segundavia',
  templateUrl: './car-segundavia.component.html',
  styleUrls: ['./car-segundavia.component.css']
})
export class CarSegundaviaComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'O beneficiário procurou apoio neste escritório pois necessita da emissão da 2ª via deste documento.';
  ORIENTACAO_TEXT: string = 'Obter do órgão competente a devida autorização antes de implantar qualquer atividade em sua propriedade.';
  RECOMENDACAO_TEXT: string = '***';
  
  TEMPLATE_TITLE: string = '2 Via de CAR';
  TEMPLATE_SUB: string = 'Emissão de 2 via de Cadastro ambiental rural a produtor beneficiário';

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
      serviceProvidedCode: 'ATERMACAR2V',
      status: 'FINALIZADA',
      servicoPrestado: 'Emissão de 2ª via de Cadastro ambiental rural a produtor beneficiário',
      valor: 0
    }
    this.chamadas.push(servico01);

  }

}