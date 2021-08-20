import { EscritorioModel } from './../../../shared/models/escritorio';
import { EscritorioService } from './../../../shared/services/escritorio.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastrar-escritorio',
  templateUrl: './cadastrar-escritorio.component.html',
  styleUrls: ['./cadastrar-escritorio.component.css']
})
export class CadastrarEscritorioComponent implements OnInit {

  escritorios$: Observable<EscritorioModel[]>;

  escritorio: EscritorioModel;

  constructor(
    private escritorioService: EscritorioService
  ) {
    this.escritorioService.emitirEscritorio.subscribe(
      esloc => this.escritorio = esloc
    );
  }

  ngOnInit(): void {
    this.escritorios$ = this.escritorioService.loadAllOffice();
  }
  onRemoveEscritorio(value: any) {
    console.log(value);

  }
  onSelecionaEscritorio(value: any) {
    this.escritorioService.setEscritorio(value);
  }
  onRegistraEscritorio(value: any) {
    let esloc: EscritorioModel = this.escritorioService.getEscritorio();

    this.escritorioService.update(this.escritorioService.getEscritorio(), esloc.codigo).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
}
