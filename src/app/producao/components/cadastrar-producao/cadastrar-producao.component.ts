import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { Produtore } from 'src/app/visita/models/visita-post.model';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { InfoRendaModel, Producao, ProducaoVO } from '../../models/info-renda.model';
import { ProducaoModel } from '../../models/producao.model';

@Component({
  selector: 'app-cadastrar-producao',
  templateUrl: './cadastrar-producao.component.html',
  styleUrls: ['./cadastrar-producao.component.css']
})
export class CadastrarProducaoComponent implements OnInit {
  //Forms Utilizados no registro
  producaoForm: FormGroup;
  
  fonteDerenda: InfoRendaModel;
  producao: ProducaoModel;
  produtores: Produtore[] = [];
  produtor: Produtore;

  rendaProduzida: ProducaoVO;
  producoes: ProducaoVO[] = [];

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.producaoLoadForm();
  }

  private producaoLoadForm() {
    this.producaoForm = this.fb.group({
      quantidade: ['', [Validators.required]],
      valorUnitario: [{ value: '', disabled: false }, [Validators.required]]
    });

  }

  onSelecionaProducao($event){
    console.log($event);
    this.rendaProduzida = this.toProducaoVO($event);
    console.log('conferindo');
    console.log(this.rendaProduzida);

  }
  toProducaoVO(producao): ProducaoVO{
    console.log('valores');
    console.log(producao);
    return {
      codItemProducao: producao.codigo,
      descItemProducao: producao.descricao,
      dataProducao: producao.dataProducao,
      quantidade: producao.quantidade,
      valorUnitario: producao.valorUnitario ,    
      producaoAgropecuaria: producao.producaoAgropecuaria     
    };
  }
  onRemoveProducao($event){
    this.producoes = $event;
  }
  insereProducao(){
    event.preventDefault();
    const component = this;
    this.rendaProduzida = this.producaoForm.value;
    if (!this.producoes.includes(this.rendaProduzida)) {
      this.producoes.push(this.rendaProduzida);
    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Já existe este elemento!");
    }

  }
  onInsereProdutor($event){
    this.produtores = $event;
    console.log(this.produtores);
  }

}
