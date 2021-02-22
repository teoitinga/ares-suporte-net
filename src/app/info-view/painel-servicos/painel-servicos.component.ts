import { VisitaService } from './../../visita/services/visita.service';
import { PesquisaModel } from './pesquisa.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InfoModel } from './info.model';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-painel-servicos',
  templateUrl: './painel-servicos.component.html',
  styleUrls: ['./painel-servicos.component.css']
})
export class PainelServicosComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  servico = 'informe o serviço';
  status = 'INICIADA';

  pesquisaModel: PesquisaModel;
  info: InfoModel;
  
  disableSelect = new FormControl(false);
  constructor(
    private visitaService: VisitaService,
    private _snackBar: MatSnackBar,
    private mesageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  pesquisar() {
    this.pesquisaModel = this.range.value;

    let dateInicial = moment(this.range.value['start']).format('DD-MM-YYYY');
    let dateFinal = moment(this.range.value['end']).format('DD-MM-YYYY');

    this.pesquisaModel.dataInicial = dateInicial;
    this.pesquisaModel.dataFinal = dateFinal;

    this.visitaService.loadVisitasManager(this.pesquisaModel).subscribe(
      data => {
        this.info = data;
      },
      error => {
        this.mesageService.sendError(this._snackBar, "Erro ao carregar dados!", error);
      }

    );
  }
}
