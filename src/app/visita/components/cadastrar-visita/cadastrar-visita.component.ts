import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CpfValidator } from './../../../shared/validators/cpf-validator';
import { MessageService } from 'src/app/shared/service/responses-messages.service';

import { VisitaService } from 'src/app/visita/services/visita.service';
import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
import { SearchMunicipioService } from 'src/app/shared/service/search-municipio.service';
import { TecnicoModel } from 'src/app/shared/models/tecnico.model';
import { Chamada, Produtore, VisitaPostModel } from '../../models/visita-post.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-cadastrar-visita',
  templateUrl: './cadastrar-visita.component.html',
  styleUrls: ['./cadastrar-visita.component.css']
})
export class CadastrarVisitaComponent implements OnInit {

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

  loading: boolean = false;

  //FIELDS of form
  FIELD_NAME_PRODUTOR: string = 'nome';

  constructor(
    private fb: FormBuilder,
    private municipioService: SearchMunicipioService,
    private authenticationService: AuthenticationService,
    private visitaService: VisitaService,
    private router: Router,
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {
    this.loadMunicipios();

  }

  ngOnInit(): void {
    //Carrega o formulário de produtores
    this.produtorLoadForm();
    //Carrega o formulário de servicos
    this.servicoLoadForm();
    //Carrega o formulário de visita
    this.visitaLoadForm();
  }

  private visitaLoadForm() {
    const municipioDoTecnico = this.authenticationService.getMunicipioDoTecnico();
    this.visitaForm = new FormGroup({
      createFolder: new FormControl('true', [Validators.required]),
      localDoAtendimeno: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dataDaVisita: new FormControl('', [Validators.required]),
      situacaoAtual: new FormControl('O produtor solicitou apoio pois necessita da prestação deste serviço', [Validators.required]),
      orientacao: new FormControl('***'),
      recomendacao: new FormControl('***'),
      municipio: new FormControl(municipioDoTecnico)
    });
  }

  onRemoveProdutor(array) {
    this.produtores = array;
  }

  onRemoveServico(array) {
    this.chamadas = array;
  }

  private servicoLoadForm() {
    this.servicosForm = new FormGroup({
      serviceProvidedCode: new FormControl('', [Validators.required]),
      servicoPrestado: new FormControl('', [Validators.required]),
      ocorrencia: new FormControl(''),
      valor: new FormControl('', [Validators.required])
    });
  }

  private produtorLoadForm() {

    this.produtoresForm = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator]],
      nome: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]]
    });

  }

  loadMunicipios() {
    this.loading = true;
    const component = this;
    this.municipioService.getMunicipios().subscribe(
      data => {
        this.municipios = data;
        this.loading = !true;
      },
      error => {
        this.messageService.sendError(this._snackBar, "Erro na API IBGE", 'Não foi possível conectar ao IBGE para obter as cidades.');
        this.loading = !true;
      }
    );
  }

  incluirProdutor(event) {
    event.preventDefault();

    const prd: Produtore = this.produtoresForm.value;

    //verifica se existe o produtor na lista
    const containing = this.produtores.find(pr => pr.cpf == prd.cpf);

    if (!containing) {
      this.produtores.push(prd);
    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Já existe este elemento!");
    }

    this.produtoresFormClean();
  }

  verificarNomeProdutor(value: any){

    const prd: Produtore = this.produtoresForm.value;
    try{
      
      prd.nome = prd.nome.replace(/[^a-zA-Z -]/g, "");
      //Remove espaços ni inicio ou final do nome
      prd.nome = prd.nome.trim();
      this.produtoresForm[this.FIELD_NAME_PRODUTOR] = prd.nome;

    }catch{
      
    }

  }
  incluirServico(event) {
    event.preventDefault();
    this.chamada = this.servicosForm.value;

    //verifica se existe o produtor na lista
    const containing = this.chamadas.find(ch => ch.servicoPrestado == this.chamada.servicoPrestado);

    if (!containing) {
      //Configura a chamada
      this.chamada.cpfReponsavel = this.tecnicoResponsavel.login;

      //imprime os dados para auditoria
      console.log('Chamadas atual');
      console.log(this.chamada);

      this.chamadas.push(this.chamada);
    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Você já registrou este atendimento, por favor especifique os detalhes deste serviço.");
    }

    this.servicosFormClean();
  }
  verificarProdutor(value: any) {
    this.loading = true;

    const cpf: string = value.target.value.replace(/\.|\-/g, '');
    
    let nomeProdutor: string = '';
    
    this.visitaService.obterProdutor(cpf).subscribe(
      data => {
        if(data!=null){
          nomeProdutor = data['nome'];
          this.produtoresForm.controls['nome'].disable();
          this.produtoresForm.controls['nome'].setValue(nomeProdutor);
  
          this.produtor = this.produtoresForm.value;
  
          this.produtor.nome = this.produtoresForm.controls['nome'].value;
          this.loading = !true;
        }else{
          this.habilitaInfoNome()
          this.loading = !true;
        }
      },
      error => {
      }
    );

  }
  habilitaInfoNome() {
    this.produtoresForm.controls['nome'].enable();
    this.produtoresForm.controls['nome'].setValue('');
    this.produtoresForm.controls['nome'].setValidators([Validators.required, Validators.minLength(6)]);
  }
  
  produtoresFormClean() {
    this.produtor = null;
    this.produtoresForm = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator]],
      nome: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.produtoresForm.controls['nome'].disable();
  }


  servicosFormClean() {
    this.chamada = null;
    this.servicosForm = new FormGroup({
      serviceProvidedCode: new FormControl('', [Validators.required]),
      servicoPrestado: new FormControl('', [Validators.required]),
      ocorrencia: new FormControl(''),
      valor: new FormControl('', [Validators.required])
    });
  }

  formularioValido(): boolean {
    return this.chamadas.length > 0 ? true : false;
  }

  registrarVisita() {

    //Configurando visita com os dados do form

    this.visita = this.visitaForm.value;
    this.visita.chamadas = this.chamadas;
    this.visita.produtores = this.produtores;
    this.loading = true;

    console.log('>>> Registrando visita');
    console.log(this.visita);
    
    this.visitaService.sendVisita(this.visita).subscribe(
      data => {
        this.loading = !true;
        this.router.navigate(['login/home']);
        this.messageService.sendInfoMessage(this._snackBar, "Sucesso!", "O Atendimento foi registrado com sucesso")
      },
      error => {
        console.log(error);
        this.loading = !true;
        this.messageService.sendError(this._snackBar, "Erro", error.error.errors)
      }
    );
  }

  onSelecionaServico(servicoInf) {
    this.servico = servicoInf;
    this.atualizaFormularioServico();
  }

  onSelecionaTecnico(information) {
    this.tecnicoResponsavel = information;
  }

  atualizaFormularioServico() {
    //Atualiza campos do formulário de servicos
    this.servicosForm.patchValue({
      serviceProvidedCode: this.servico.codigo,
      servicoPrestado: this.servico.descricao,
      valor: this.servico.defaultValue
    });
  }
}
