import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ProdutorModel } from 'src/app/produtores/models/Produtor-model';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { MessageService } from '../../service/responses-messages.service';
import { SearchMunicipioService } from '../../service/search-municipio.service';
import { EscritorioService } from '../../services/escritorio.service';
import { CpfValidator } from '../../validators/cpf-validator';

@Component({
  selector: 'template-produtor',
  templateUrl: './template-produtor.component.html',
  styleUrls: ['./template-produtor.component.css']
})
export class TemplateProdutorComponent implements OnInit {

  produtor: ProdutorModel;

  //Forms Utilizados no registro
  form: FormGroup;
  controles: FormControl[] = [];

  loading: boolean;
  municipios: any;
  categorias: any;

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    private municipioService: SearchMunicipioService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _escritorioService: EscritorioService
  ) { 
    this.loadMunicipios();
  }

  ngOnInit(): void {
    this.loadForm();
    this.categorias = CATEGORIAS;
  }
  private loadForm() {
    const municipioDoTecnico = this.authenticationService.getMunicipioDoTecnico();
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      telefone: new FormControl('', [Validators.required]),
      nascimento: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cidade: new FormControl(municipioDoTecnico, [Validators.required]),
      cep: new FormControl('', [Validators.required]),
    });
  }
  onClick(){
  }
  verificaCpf(value){
    const cpf: string = value.target.value.replace(/\.|\-/g, '');
    const cpfEl = document.getElementById("cpf");
    this.visitaService.obterProdutor(cpf).subscribe(
      data => {
        if(data){
          this.messageService.sendError(this._snackBar, "CPF existente", "Esta pessoa já está cadastrada!");
          cpfEl['value'] = '';
          cpfEl['valid'] = false;
        }
        this.loading = !true;
      },
      error => {
        this.loading = !true;
      }
    );
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
export const CATEGORIAS = [
  {value: "AGRICULTOR_FAMILIAR", descricao: "Agricultor familiar"},
  {value: "MEDIO_PRODUTOR", descricao: "Médio Produtor"},
  {value: "AGRICULTOR_URBANO", descricao: "Agricultor Urbano"},
  {value: "OUTROS", descricao: "Outros"}
]