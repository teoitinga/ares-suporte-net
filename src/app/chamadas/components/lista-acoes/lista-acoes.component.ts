import { AuthenticationService } from './../../../authentication/authentication.service';
import { MessageService } from './../../../shared/service/responses-messages.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CallData, Content } from '../../models/call-get-list';
import { ChamadaService } from '../../services/chamada.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-acoes',
  templateUrl: './lista-acoes.component.html',
  styleUrls: ['./lista-acoes.component.css']
})
export class ListaAcoesComponent implements AfterViewInit {
  displayedColumns: string[] = ['data-previsao', 'servico', 'progress', 'produtor', 'acao'];
  dataSource: MatTableDataSource<Content>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  callData: CallData;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      this.loadCalls(this.pageSizeOptions);
    }
  }

  loadCalls(pageSizeOptions) {
    //obtem todas as chamadas
    this.callService.loadCalls(this.length, this.pageSize).subscribe(
      data => {
        this.callData = data;
        console.info(this.callData.content);
        this.dataSource = new MatTableDataSource(this.callData.content);
      },
      error => {
        console.error(error);

      }

    );
  } 
  constructor(
    private callService: ChamadaService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.loadCallsStart();

  }

  //////////////////////////////////////////////////////////////////////
  finalizar(call) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: { title: "Finalizando chamada", info: "Tem certeza que você já concluiu este serviço?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.callService.finalizeCall(call).subscribe(
          success => {
            this.loadCallsStart();
          },
          error => {
            this.messageService.sendError(this.snackBar, "Erro", "Esta chamada não pode ser finalizada!");
          }
        );
      }
    });
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
            this.loadCallsStart();
          },
          error => {
            this.messageService.sendError(this.snackBar, "Erro", "Esta chamada não pode ser cancelada!");
          }
        );
      }
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  //////////////////////////////////////////////////////////////////////
  loadCallsStart() {
    //obtem todas as chamadas

    this.callService.loadCalls(this.length, this.pageSize).subscribe(
      data => {
        this.callData = data;
        this.dataSource = new MatTableDataSource(this.callData.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error(error);

      }

    );
    this.authService.countCalls();
  }

  ngAfterViewInit() {
    //      this.dataSource.paginator = this.paginator;
    //      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
