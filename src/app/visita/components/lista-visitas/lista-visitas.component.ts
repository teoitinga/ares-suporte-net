import { MatDialog } from '@angular/material/dialog';
import { VisitaService } from './../../services/visita.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaChamadasModel } from './lista-chamadas.model';
import { ConfirmDialogComponent } from 'src/app/chamadas/components/confirm-dialog/confirm-dialog.component';
import { ChamadaService } from 'src/app/chamadas/services/chamada.service';
import { PesquisaModel } from 'src/app/info-view/painel-servicos/pesquisa.model';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {

  panelOpenState = false;
  public visitas: ListaChamadasModel;

  viewData = false;
  viewSpinner = true;
  pesquisaModel: PesquisaModel;

  constructor(
    private visitaService: VisitaService,
    private callService: ChamadaService,
    private mesageService: MessageService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadVisitas();
  }
  loadVisitas(): any {
    const component = this;

    //obtem a data de dois meses atras que será considerada a data inicial para exibir os registros
    const atual = moment().subtract(2, 'M');

    let inicio: string = atual.format('01-MM-YYYY');
    let fim: string = moment().format('DD-MM-YYYY');

    this.pesquisaModel = {
      dataFinal: fim,
      dataInicial:  inicio
    }
    console.log(this.pesquisaModel);
    this.visitaService.loadVisitasManager(this.pesquisaModel).subscribe(
      data=>{
        this.visitas = data;
        this.viewData=true;
        this.viewSpinner = false;
      },
      error=>{
        this.mesageService.sendError(this._snackBar, "Erro ao carregar dados!", error);
      }
    );
  }
  incluirChamada(value){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Criar chamada", info: "Tem certeza que deseja incluir uma nova chamada de serviço?" }
    });
    alert('Esta função ainda nã foi implementada');
/*
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callService.finalizeCall(value).subscribe(
          success => {
            this.loadVisitas();
          },
          error => {
            this.mesageService.sendError(this._snackBar, "Erro", "Esta chamada não pode ser adicionada!");
          }
        );
      }
    });
    */
  }
  reiniciarChamada(call){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Iniciando chamada", info: "Tem certeza que você deseja reabrir esta chamada?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callService.incializarCall(call).subscribe(
          success => {
            this.loadVisitas();
          },
          error => {
            this.mesageService.sendError(this._snackBar, "Erro", "Esta chamada não pode ser reinicializada!");
          }
        );
      }
    });
  }
  cancelarChamada(value:string){
    console.log("Cancelando");
    console.log(value);
  }
  cancelar(call) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Cancelando chamada", info: "Tem certeza que você deseja cancelar esta chamada?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callService.cancelCall(call).subscribe(
          success => {
            this.loadVisitas();
          },
          error => {
            this.mesageService.sendError(this._snackBar, "Erro", "Esta chamada não pode ser cancelada!");
          }
        );
      }
    });
  }
  concluirChamada(call){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Concluir chamada", info: "Tem certeza que esta chamada está concluída?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callService.finalizeCall(call).subscribe(
          success => {
            this.loadVisitas();
          },
          error => {
            this.mesageService.sendError(this._snackBar, "Erro", "Esta chamada não pode ser concluída!");
          }
        );
      }
    });
  }

  isIniciada(value: any):boolean{
    if(value.status == 'INICIADA'){
      return true;
    }
    return false;
  }
}
