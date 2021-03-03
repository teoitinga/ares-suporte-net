import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { Produtore } from 'src/app/visita/models/visita-post.model';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { InfoRendaModel, ProducaoAnual} from '../../models/info-renda.model';
import { ProducaoModel } from '../../models/producao.model';

@Component({
  selector: 'app-cadastrar-producao',
  templateUrl: './cadastrar-producao.component.html',
  styleUrls: ['./cadastrar-producao.component.css']
})
export class CadastrarProducaoComponent implements OnInit {
  //Forms Utilizados no registro
  producaoForm: FormGroup;
  infoRendaForm: FormGroup;
  
  fonteDerenda: InfoRendaModel;
  produtores: Produtore[] = [];
  produtor: Produtore;

  rendaProduzida: ProducaoAnual;
  producoes: ProducaoAnual[] = [];
  itemProduzido: ProducaoModel;

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.infoRendaLoadForm();
    this.producaoAnualLoadForm();
  }

  private producaoAnualLoadForm() {
    this.producaoForm = this.fb.group({
      dataProducao: ['', [Validators.required]],
      descricao: [{ value: '', disabled: false }, [Validators.required]],
      quantidade: [{ value: '', disabled: false }, [Validators.required]],
      valorUnitario: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  private infoRendaLoadForm() {
    this.infoRendaForm = this.fb.group({
      quantidade: ['', [Validators.required]],
      valorUnitario: [{ value: '', disabled: false }, [Validators.required]],
      areaExplorada: [{ value: '', disabled: false }, [Validators.required]],
      areaImovelPrincipal: [{ value: '', disabled: false }, [Validators.required]],
      dataDaVisita: [{ value: '', disabled: false }, [Validators.required]],
      localDoAtendimeno: [{ value: '', disabled: false }, [Validators.required]],
      membrosDaFamilia: [{ value: '', disabled: false }, [Validators.required]],
      orientacao: [{ value: '', disabled: false }, [Validators.required]],
      quantidadePropriedades: [{ value: '', disabled: false }, [Validators.required]],
      recomendacao: [{ value: '', disabled: false }, [Validators.required]],
      situacaoAtual: [{ value: '', disabled: false }, [Validators.required]],
      valorCobrado: [{ value: '', disabled: false }, [Validators.required]]
    });

  }

  onSelecionaProducao($event){
    this.itemProduzido = $event;
    this.producaoForm.controls.descricao.setValue(this.itemProduzido['referencia']);

  }

  onRemoveProducao($event){
    this.producoes = $event;
  }
  insereItemDeProducao(){
    const component = this;
    this.rendaProduzida = this.producaoForm.value;
    this.rendaProduzida.codItemProducao = this.itemProduzido['codigo'];
    this.rendaProduzida.producaoAgropecuaria = this.itemProduzido['producaoAgropecuaria'];

    if (!this.producoes.includes(this.rendaProduzida)) {
      this.producoes.push(this.rendaProduzida);
    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Já existe este elemento!");
    }
    console.log('Renda anual');
    console.log(this.producoes);
  }
  insereProducao(){
    event.preventDefault();


  }
  onInsereProdutor($event){
    this.produtores = $event;
    console.log(this.produtores);
  }

}
