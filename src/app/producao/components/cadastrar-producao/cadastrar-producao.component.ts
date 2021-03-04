import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/chamadas/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogRendaComponent } from 'src/app/produca/components/confirm-dialog-renda/confirm-dialog-renda.component';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { Produtore } from 'src/app/visita/models/visita-post.model';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { InfoRendaModel, ProducaoAnual } from '../../models/info-renda.model';
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
    private dialog: MatDialog,
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

  onSelecionaProducao($event) {
    this.itemProduzido = $event;
    this.producaoForm.controls.descricao.setValue(this.itemProduzido['referencia']);

  }

  onRemoveProducao($event) {
    this.producoes = $event;
  }
  insereItemDeProducao() {
    const component = this;
    this.rendaProduzida = this.producaoForm.value;
    this.rendaProduzida.codItemProducao = this.itemProduzido['codigo'];
    this.rendaProduzida.producaoAgropecuaria = this.itemProduzido['producaoAgropecuaria'];

    if (!this.producoes.includes(this.rendaProduzida)) {
      this.producoes.push(this.rendaProduzida);
      this.rendaProduzida = this.producaoForm.value;
      this.producaoForm.controls['quantidade'].setValue('');
      this.producaoForm.controls['valorUnitario'].setValue('');
      this.producaoForm.controls['descricao'].setValue('');

    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Já existe este elemento!");
    }
    console.log('Renda anual');
    console.log(this.producoes);
  }
  insereProducao() {
    event.preventDefault();

    this.fonteDerenda = this.infoRendaForm.value;
    this.fonteDerenda.produtores = this.produtores;
    this.fonteDerenda.producaoAnual = this.producoes;
    
    //abre caixa de dialogo
    const dialogRef = this.dialog.open(ConfirmDialogRendaComponent, {
      restoreFocus: false,
      data: this.fonteDerenda
    });
        dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        //executa a ação de registro
        this.visitaService.createInfoRenda(this.fonteDerenda).subscribe(
          data => {
            
            this.messageService.sendInfoMessage(this._snackBar, "Registrado", 'As informações foram registrada com sucesso.');
          },
          error => {
            
            if(error.status==500){
              this.messageService.sendError(this._snackBar, "Erro no Servidor", 'Não foi possível registrar esta renda.');
            }else{
              this.messageService.sendError(this._snackBar, "Erro", 'Não foi possível registrar esta renda.');
    
            }
          }
        );

      }
    });
    //

  }
  onInsereProdutor($event) {
    this.produtores = $event;
  }

}
