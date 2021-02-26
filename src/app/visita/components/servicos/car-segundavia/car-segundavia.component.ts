import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Produtore } from 'src/app/info-renda/models/info-renda.model';
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

  SERVICO_COD: string = 'ATERMACAR2V';
  SERVICO_TEXTO: string = 'Emissão de 2ª via de Cadastro ambiental rural a produtor beneficiário';
  SITUACAO_TEXT: string = 'O beneficiário procurou apoio neste escritório pois necessita da emissão da 2ª via deste documento.';
  ORIENTACAO_TEXT: string = 'Obter do órgão competente a devida autorização antes de implantar qualquer atividade em sua propriedade.';
  RECOMENDACAO_TEXT: string = '***';
  produtores: Produtore[] = [];
  produtor: Produtore;

  chamadas: Chamada[] = [];
  chamada: Chamada;

  municipios: string[] = [];

  servico: ServicosPrestadosModel;

  visita: VisitaPostModel;

  //Forms Utilizados no registro
  produtoresForm: FormGroup;
  servicosForm: FormGroup;
  visitaForm: FormGroup;
  tecnicoResponsavel: TecnicoModel;
  usuario: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private municipioService: SearchMunicipioService,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loadMunicipios();
  }

  ngOnInit(): void {
    
    //Carrega usuario logado
    this.usuario = this.authService.getUserName();
    //Carrega o formulário de produtores
    this.produtorLoadForm();
    //Carrega o formulário de visita
    this.visitaLoadForm();
  }
  private produtorLoadForm() {
    this.produtoresForm = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator]],
      nome: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  loadMunicipios() {
    const component = this;
    this.municipioService.getMunicipios().subscribe(
      data => {
        this.municipios = data;
      },
      error => {
        this.messageService.sendError(this._snackBar, "Erro na API IBGE", JSON.stringify(error.message));
      }
    );
  }

  private visitaLoadForm() {
    this.visitaForm = new FormGroup({
      localDoAtendimeno: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dataDaVisita: new FormControl('', [Validators.required]),
      municipio: new FormControl('***', [Validators.required])
    });
  }

  private incluirServico() {

    //this.chamada = this.servicosForm.value;
    this.chamada = {
      ocorrencia: '***',
      serviceProvidedCode: this.SERVICO_COD,
      servicoPrestado: this.SERVICO_TEXTO,
      cpfReponsavel: this.usuario,
      valor: 0
    };

    if (!this.chamadas.includes(this.chamada)) {
      this.chamada.ocorrencia = '***';
      this.chamada.serviceProvidedCode = this.SERVICO_COD;
      this.chamada.servicoPrestado = this.SERVICO_TEXTO;
      this.chamada.cpfReponsavel = this.usuario;
      this.chamadas.push(this.chamada);
    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Já existe este serviço!");
    }

  }

  incluirProdutor(event) {
    const component = this;
    this.produtor = this.produtoresForm.value;
    if (!this.produtores.includes(this.produtor)) {
      this.produtores.push(this.produtor);
    } else {

      this.messageService.sendError(this._snackBar, "Erro", "Já existe este elemento!");
    }

  }
  removerProdutor(value, event){
    event.preventDefault();
    this.produtores = this.produtores.filter(item => item != value);
    
  }
  registrarServico(event) {
    //Configura a chamada
    const component = this;
    event.preventDefault();

    if(!(this.produtores.length>0)){
      this.messageService.sendError(this._snackBar, "Erro", "Deve haver pelo menos um beneficiário!");
      return;
    }

    this.incluirServico();


    //Configurando visita com os dados do form

    this.visita = this.visitaForm.value;
    this.visita.situacaoAtual = this.SITUACAO_TEXT;
    this.visita.orientacao = this.ORIENTACAO_TEXT;
    this.visita.recomendacao = this.RECOMENDACAO_TEXT;
    this.visita.chamadas = this.chamadas;
    this.visita.produtores = this.produtores;
    console.log(JSON.stringify(this.visita));

    
    this.visitaService.sendVisita(this.visita).subscribe(
      data=>{
        this.router.navigate(['login/home']);
        this.messageService.sendInfoMessage(this._snackBar, "Sucesso!", "O Atendimento foi registrado com sucesso")
       },
       error=>{
         this.messageService.sendError(this._snackBar, "Erro", error.error.errors)
       }
     );
    
  }
}