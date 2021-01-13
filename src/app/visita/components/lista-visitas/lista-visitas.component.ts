import { VisitaService } from './../../services/visita.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/service/responses-errors.service';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  
  public visitas = [];

  viewTable = false;

  constructor(
    private visitaService: VisitaService,
    private mesageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.visitas = this.loadVisitas();
  }
  loadVisitas(): any {
    this.visitaService.loadVisitas().subscribe(
      data=>{
        this.visitas = data.content;
          this.viewTable=true;
        
      },
      error=>{
        this.mesageService.sendError(error);
      }
    );
  }

  get (){
    return this.viewTable;
  }
  set ( view: boolean){
    this.viewTable = view;
  }
}