import { ProdutorService } from './../../services/produtor.service';
import { ProdutorModel } from './../../models/produtor-model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Content, ProdutorListModel } from './produtor-list-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'template-table-produtor',
  templateUrl: './template-table-produtor.component.html',
  styleUrls: ['./template-table-produtor.component.css']
})
export class TemplateTableProdutorComponent implements OnInit {

  displayedColumns: string[] = ['CPF', 'Nome', 'endereço', 'acao'];
  dataSource: MatTableDataSource<Content>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataModel: ProdutorListModel;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  
  @Input('input$') input$: Observable<ProdutorModel>;
  
  @Output('remove') remove = new EventEmitter();
  
  @Output('edita') edita = new EventEmitter();
  
  constructor(
    private produtorService: ProdutorService,
    private _route: Router
    ) { 
      this.loadDataStart();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
  ngOnInit(): void {
    this.produtorService.selected.subscribe(
      data=> this.input$ = this.produtorService.findAll(this.length, this.pageSize),
      error=>console.error('Não foi possível obter os dados')
      );
    }
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        this.loadData();
      }
    }
    
    loadData(){
    //obtem todas as chamadas
    this.produtorService.findAll(this.length, this.pageSize).subscribe(
      data => {
        this.dataModel = data;
        this.dataSource = new MatTableDataSource(this.dataModel.content);
      },
      error => {
        console.error(error);
      }

    );
  }
  loadDataStart() {
    //obtem todas as chamadas

    this.produtorService.findAll(this.length, this.pageSize).subscribe(
      data => {
        this.dataModel = data;
        this.dataSource = new MatTableDataSource(this.dataModel.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error(error);

      }

    );
    //this.authService.countCalls();
  }
  updateAtd(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.edita.emit(value);
    this._route.navigate([`visitas/produtor`]);
  }
  remover(value: any){
    event.preventDefault();
    //emitindo notificação para atualização de serviço
    this.remove.emit(value);

  }
  viewAtd(value:any){
    this._route.navigate([`visitas/lista-atd`, value]);
  }
 
}
