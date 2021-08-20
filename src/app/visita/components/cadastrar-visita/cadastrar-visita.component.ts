import { EscritorioService } from './../../../shared/services/escritorio.service';
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
import { ConfirmDialogComponent } from 'src/app/chamadas/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import { geraDocumentoPdf } from './docpdf';

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

  idFileReport: string;//Nome do Arquivo de relatório

  //Forms Utilizados no registro
  produtoresForm: FormGroup;
  servicosForm: FormGroup;
  visitaForm: FormGroup;
  tecnicoResponsavel: TecnicoModel;

  //Variáveis de controle
  loading: boolean = false;
  //readonly hoje: any = moment();

  //FIELDS of form
  FIELD_NAME_PRODUTOR: string = 'nome';
  esloc: any;
  files: Set<any>;
  timeNow: string;
  isAnexed: boolean = false;//Indica se existe um arquivo anexado à este atendimento

  constructor(
    private fb: FormBuilder,
    private municipioService: SearchMunicipioService,
    private authenticationService: AuthenticationService,
    private visitaService: VisitaService,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _escritorioService: EscritorioService
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

    this.timeNow = moment().format('YYYYMMDDHHmmss');
    const codEsloc = this.authenticationService.getCodEsloc();
    const idChamada = `${codEsloc}-${this.timeNow}`;

    this.idFileReport = idChamada;
  }

  private visitaLoadForm() {
    const municipioDoTecnico = this.authenticationService.getMunicipioDoTecnico();

    this.visitaForm = new FormGroup({
      createFolder: new FormControl('true'),
      localDoAtendimento: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dataDaVisita: new FormControl('', [Validators.required]),
      situacaoAtual: new FormControl('', [Validators.maxLength(256)]),
      orientacao: new FormControl('', [Validators.maxLength(512)]),
      recomendacao: new FormControl('', [Validators.maxLength(126)]),
      municipio: new FormControl(municipioDoTecnico),
      documento: new FormControl('')
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
  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    document.getElementById('documentoLabel').innerHTML = selectedFiles[0].name;
    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i]);
      this.files.add(selectedFiles[i]);
    }
  }

  get uploadValid(): boolean {
    let valid: boolean;

    try {
      this.files.size;
    } catch {
      return false;
    }
    if ((this.files.size > 0) && (this.formValid)) {
      valid = true;
    } else {
      valid = false;
    }

    return valid;
  }
  async uploadFiles() {

    await this.visitaService.uploadReport(this.files, this.idFileReport)
      .subscribe(
        data => {
          this.messageService.sendInfoMessage(this._snackBar, "Sucesso!", "O Arquivo foi enviado com sucesso");
          this.isAnexed = true;
        },
        error => {
          console.error(error);
          this.messageService.sendError(this._snackBar, "Erro", "Não foi possível registrar este arquivo!");
        }
      )
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

  private clearFormProdutor() {
    this.produtoresForm.controls['nome'].disable();
    this.produtoresForm.controls['nome'].setValue('');
    this.produtoresForm.controls['cpf'].setValue('');
  }

  incluirProdutor(event) {
    event.preventDefault();

    const prd: Produtore = this.produtoresForm.value;

    //verifica se existe o produtor na lista
    const containing = this.produtores.find(pr => pr.cpf == prd.cpf);

    if (!containing) {

      this.produtores.push(prd);
      this.clearFormProdutor();

    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Este beneficiário já é atendido!");
    }

    this.produtoresFormClean();
  }

  verificarNomeProdutor(value: any) {

    const prd: Produtore = this.produtoresForm.value;
    try {

      prd.nome = prd.nome.replace(/[^a-zA-Z -]/g, "");
      //Remove espaços ni inicio ou final do nome
      prd.nome = prd.nome.trim();
      this.produtoresForm[this.FIELD_NAME_PRODUTOR] = prd.nome;

    } catch {

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
        if (data != null) {
          nomeProdutor = data['nome'];
          this.produtoresForm.controls['nome'].disable();
          this.produtoresForm.controls['nome'].setValue(nomeProdutor);

          this.produtor = this.produtoresForm.value;

          this.produtor.nome = this.produtoresForm.controls['nome'].value;
          this.loading = !true;
        } else {
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

  async onPrintReport() {
    const eslocCod = this.authenticationService.getCodEsloc();
    const userName =  this.authenticationService.getUserNameDesc();
    const escritorio = await this._escritorioService.loadEscritorio(eslocCod).toPromise()
      .then(
        data => {
          this.esloc = data;
        }
      );


    this.atualizaVisitaData();
    const imagem = this.esloc.imageLogo;

    const pdf = new geraDocumentoPdf(
      this.visita,
      this.esloc,
      userName,
      imagem
    );
    pdf.geraDocumento();
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
  get formValid(): boolean {
    const valid = (this.produtores.length > 0 && this.chamadas.length > 0 && this.visitaForm.valid) ? true : false;
    return valid;
  }
  formularioValido(): boolean {
    return this.chamadas.length > 0 ? true : false;
  }

  //Checa se o campo já foi clicado/tocado
  checkTouched(campo: string) {
    const field = this.visitaForm.get(campo);

    return (
      !field.valid && (field.touched || field.dirty)
    );
  }
  async onSubmit() {
    //Verifica se o arquivo anexado foi enviado corretamente
    let uploadDirty: boolean = false;
    try {
      uploadDirty = this.files.size ? true : false;

    } catch { }

    if (uploadDirty && !this.isAnexed) {
      //Caixa de diálogo informando o acontecido
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        restoreFocus: false,
        data: { title: "Esqueceu de anexar o arquivo", info: "Você anexou um arquivo mas não enviou. Deseja continuar com a operação?" }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.idFileReport = null;
          this.registrarVisita();
        }else{
          Object.keys(this.visitaForm.controls).forEach(campo => {
            const controle = this.visitaForm.get(campo);
            controle.markAsDirty;
            controle.markAsTouched;
            const valido = controle.valid;
            
          });
        }
      });
      //Fim da caixa de diálogo
    }else{
      this.registrarVisita();
    }
  }
  registrarVisita() {

    //Configurando visita com os dados do form

    this.atualizaVisitaData();


    console.log('>>> Registrando visita');
    console.log(this.visita);

    //Verifica se pretende cria pasta de atendimento
    let hasCreateFolder: boolean = false;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Criando pasta de atendimento", info: "É necessário criar uma pasta para este atendimento?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        hasCreateFolder = true;
        this.visita.createFolder = hasCreateFolder;

        this.visitaService.sendVisita(this.visita).subscribe(
          data => {
            this.loading = !true;
            this.router.navigate(['login/home']);
            this.messageService.sendInfoMessage(this._snackBar, "Sucesso!", "O Atendimento foi registrado com sucesso")
          },
          error => {
            this.loading = !true;
            this.messageService.sendError(this._snackBar, "Erro", error.error.errors)
          }
        );
      } else {
        hasCreateFolder = false;
        this.visita.createFolder = hasCreateFolder;

        this.visitaService.sendVisita(this.visita).subscribe(
          data => {
            this.loading = !true;
            this.router.navigate(['login/home']);
            this.messageService.sendInfoMessage(this._snackBar, "Sucesso!", "O Atendimento foi registrado com sucesso")
          },
          error => {
            this.loading = !true;
            this.messageService.sendError(this._snackBar, "Erro", error.error.errors)
          }
        );

      }
    });

    ///////////////////////////////////////////////////
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

  atualizaVisitaData() {
    this.visita = this.visitaForm.value;
    this.visita.chamadas = this.chamadas;
    this.visita.produtores = this.produtores;
    this.visita.idReport = this.idFileReport;
    this.loading = true;
  }
}



