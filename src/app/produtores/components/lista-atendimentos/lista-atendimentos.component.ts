import { ProdutorService } from './../../../shared/services/produtor.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoModel } from '../../atendimentos-model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { VisitaService } from 'src/app/visita/services/visita.service';
import { ProdutorModel } from './../../models/Produtor-model';

@Component({
  selector: 'app-lista-atendimentos',
  templateUrl: './lista-atendimentos.component.html',
  styleUrls: ['./lista-atendimentos.component.css']
})
export class ListaAtendimentosComponent implements OnInit {
  @Input('input$') input$: Observable<AtendimentoModel>;

  @Output('remove') remove = new EventEmitter();

  @Output('edita') edita = new EventEmitter();

  dataAtual: string;
  beneficiario$: Observable<ProdutorModel>;

  constructor(
    private visitaService: VisitaService,
    private produtorService: ProdutorService,
    private activatedRoute: ActivatedRoute
    ) { 
    this.dataAtual = moment().format('DD/MM/YYYY hh:mm');

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const produtor = params['params']['produtor'];
      this.beneficiario$ = this.visitaService.obterProdutor(produtor);
      this.input$ = this.produtorService.findAtdByProdutor(produtor)
    });
  }
  onDonwload(value: any){
    const idReport = value['idReport'];
    this.produtorService.donwloadReport(idReport).subscribe(
      (res:any)=>{
        const file = new Blob([res], {
          type: res.type
        });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = `Relatorio_${idReport}`;
        link.click();
        window.URL.revokeObjectURL(blob);
        link.remove();

      }
    );


  }
  editar(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.edita.emit(value);
  }
  remover(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.remove.emit(value);

  }
}
