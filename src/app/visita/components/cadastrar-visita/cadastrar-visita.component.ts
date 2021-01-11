import { VisitaService } from 'src/app/visita/services/visita.service';

import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
import { Component, OnInit } from '@angular/core';
import { SearchMunicipioService } from 'src/app/shared/service/search-municipio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TecnicoModel } from 'src/app/shared/models/tecnico.model';
import { Chamada, Produtore, VisitaPostModel } from '../../models/visita-post.model';
import { MessageService } from 'src/app/shared/service/responses-errors.service';
import { Router } from '@angular/router';

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
  
  constructor(
    private fb: FormBuilder,
    private municipioService: SearchMunicipioService,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private router: Router
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
    this.visitaForm = new FormGroup({
      createFolder: new FormControl('', [Validators.required]),
      localDoAtendimeno: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dataDaVisita: new FormControl('', [Validators.required]),
      situacaoAtual: new FormControl('O produtor solicitou apoio pois necessita da prestação deste serviço', [Validators.required]),
      orientacao: new FormControl(''),
      recomendacao: new FormControl(''),
      municipio: new FormControl('', [Validators.required])
    });
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
    this.produtoresForm = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required])
    });
  }

  loadMunicipios(){
    this.municipioService.getMunicipios().subscribe(
      data=>{
        this.municipios = data;
      },
      error=>{
        this.messageService.sendError(error);
      }
    );
  }

  incluirProdutor(event){
    event.preventDefault();
    this.produtor = this.produtoresForm.value;
    console.log(this.produtoresForm.value);
    if(!this.produtores.includes(this.produtor)){
      this.produtores.push(this.produtor);
    }else{

      this.messageService.sendError("Já existe este elemento!");
    }
  }
  produtoresFormClean() {
    this.produtor = null;
    this.produtoresForm.reset();
  }
  
  incluirServico(event){
    event.preventDefault();
    this.chamada = this.servicosForm.value;
    
    if(!this.chamadas.includes(this.chamada)){
      this.chamada.cpfReponsavel = this.tecnicoResponsavel.login;
      this.chamadas.push(this.chamada);
    }else{
      this.messageService.sendError("Já existe este serviço!");
    }

  }
  servicosFormClean() {
    this.servicosForm.reset();
  }
  removerChamada(value, event){
    event.preventDefault();
    this.chamadas = this.chamadas.filter(item => item != value);
    
  }
  removerProdutor(value, event){
    event.preventDefault();
    this.produtores = this.produtores.filter(item => item != value);
    
  }
  registrarVisita(){

    this.messageService.sendInfoMessage(JSON.stringify(this.visitaForm.value))
    //Configurando visita com os dados do form
    /*
    this.visita = new VisitaPostModel(
      this.chamadas,//chamadas: ChamadasPost[],
      this.produtores,//produtores: ProdutoresMin[],
      this.visitaForm['criarPasta'],
      this.visitaForm['dataDaVisita'],
      this.visitaForm['localDoAtendimento'],
      this.visitaForm['situacaoAtual'],
      this.visitaForm['orientacoes'],
      this.visitaForm['recomendaoes'],
      this.visitaForm['municipio']
      );
      */
      this.visita = this.visitaForm.value;
      this.visita.chamadas = this.chamadas;
      this.visita.produtores = this.produtores;
      console.log("Visita: " + JSON.stringify(this.visita));
      //console.log("localDoAtendimento: " + this.visitaForm['localDoAtendimento']);
      //console.log("dataDaVisita: " + this.visitaForm['dataDaVisita']);
      this.visitaService.sendVisita(this.visita).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['login/home']);
        },
        error=>{
          console.log(error.error.errors);

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
