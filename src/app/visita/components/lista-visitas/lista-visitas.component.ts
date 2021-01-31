import { VisitaService } from './../../services/visita.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Content, VisitaVOModel } from './lista-visita.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  panelOpenState = false;
  public visitas: VisitaVOModel;

  viewTable = false;

  displayedColumns: string[] = ['position'];
  dataSource: MatTableDataSource<Content[]> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private visitaService: VisitaService,
    private mesageService: MessageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadVisitas();

  }
  loadVisitas(): any {
    const component = this;
    this.visitaService.loadVisitasManager().subscribe(
      data=>{
        this.visitas = data.content;
        this.dataSource = data.content;
        this.viewTable=true;
      },
      error=>{
        this.mesageService.sendError(this._snackBar, "Erro ao carregar dados!", error);
      }
    );
  }
  incluirChamada(value:string){
    console.log(value);
  }
  get (){
    return this.viewTable;
  }
  set ( view: boolean){
    this.viewTable = view;
  }
}
