import { EscritorioModel } from './../../models/escritorio';
import { element } from 'protractor';
import { EscritorioService } from './../../services/escritorio.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MessageService } from '../../service/responses-messages.service';
import { SearchMunicipioService } from '../../service/search-municipio.service';
declare var $: any;

@Component({
  selector: 'template-escritorio',
  templateUrl: './template-escritorio.component.html',
  styleUrls: ['./template-escritorio.component.css']
})
export class TemplateEscritorioComponent implements OnInit {

  @Input('input') input: EscritorioModel;

  @Output('salvar') salvar = new EventEmitter();

  //Forms Utilizados no registro
  form: FormGroup;
  municipios: string[] = [];
  //Variáveis de controle
  loading: boolean = false;

  arquivoLogo: File;

  constructor(
    private fb: FormBuilder,
    private municipioService: SearchMunicipioService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private escritorioService: EscritorioService
  ) {
    this.loadMunicipios();

    this.escritorioService.emitirEscritorio.subscribe(
      esloc => {
        this.loadFormWithData(esloc)

        //Atualiza o image src ao selecionar um novo esloc
        this.loadImage(esloc.imageLogo)
      }
    );
    //Carrega o formulário de produtores
    this.loadFormReset();

  }

  async loadImage(image: any) {
    if (!image) {
      //se não existir imagem para este escritorio carrega a default
      //configura a imagem no Data deste escritório
      const url: string = '../../../assets/noimage.png';
      //exibe a imagem na moldura
      $('#imagem').attr('src', url);
    } else {
      $('#imagem').attr('src', image);
    }
  }

  ngOnInit(): void {
  }
  loadFormReset() {
    this.form = this.fb.group({
      descricao: ['', [Validators.required]],
      endereco: [''],
      email: [''],
      fone: [''],
      referency: [''],
      zap: [''],
      municipio: ['']
    });
    this.disableFields();
    //limpa a imagem da moldura
    this.arquivoLogo = null;
    this.loadImage(this.arquivoLogo);
  }

  disableFields() {
    Object.keys(this.form.controls).forEach(ctrl => {
      //this.form.controls[ctrl].disable({ emitEvent: false });
    });
  }
  enableFields() {
    Object.keys(this.form.controls).forEach(ctrl => {
      this.form.controls[ctrl].enable({ emitEvent: false });
    });
  }
  loadFormWithData(e: EscritorioModel) {
    this.input = e;
    this.form = this.fb.group({
      descricao: [e.descricao, [Validators.required]],
      endereco: [e.endereco],
      email: [e.email],
      fone: [e.fone],
      referency: [e.referency],
      zap: [e.zap],
      municipio: [e.municipio],
    });
    this.enableFields();
  }

  onChangeFile(element) {
    this.encodeImageFileAsURL(element);

  }

  private encodeImageFileAsURL(element) {
    const file = element.target.files[0];
    const maxSize = 500000;//KB

    //Verifica se o arquivo é maior que o MAXSIZE e cancela a operação em caso positivo
    if (file.size > maxSize) {
      return this.messageService.sendError(this._snackBar, 'Tamanho de arquivo não permitido', 'O tamanho máximo do arquivo deve ser de 500 KB.');
    }
    const reader = new FileReader();
    reader.onloadend = function () {
      $('#imagem').attr('src', reader.result)
    }
    reader.readAsDataURL(file);

    this.arquivoLogo = file;

  }
  getBase64(file) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    } catch {
      console.error('Não selecionou uma imagem')
    }
  }

  async add(value: any) {
    //limpa o form
    await this.loadFormReset();
    this.input = { descricao: '' };
  }
  async save(value: any) {
    let escritorio: EscritorioModel = this.form.value;
    let esloc = this.input;
    //obtem arquivo de imagemselecionado
    const file = await this.getBase64(this.arquivoLogo).catch(reject => {
      console.error('Não selecionou uma imagem válida!')
      return null;
    });

    //Atualizando o input
    console.log(escritorio);
    console.log(esloc);
    esloc.descricao = escritorio.descricao;
    esloc.referency = escritorio.referency;
    esloc.endereco = escritorio.endereco;
    esloc.fone = escritorio.fone;
    esloc.municipio = escritorio.municipio;
    esloc.email = escritorio.email;
    esloc.imageLogo = file;
    esloc.zap = escritorio.zap;

    this.input = esloc;

    await this.salvar.emit(this.input);
    this.escritorioService.update(this.input, this.input.codigo)
      .subscribe(
        data => {
          this.messageService.sendInfoMessage(this._snackBar, 'Sucesso', 'Escritório registrado!');
        },
        error => {
          this.messageService.sendError(this._snackBar, 'Erro', 'Não foi possível registrar este escritório!');
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
}
