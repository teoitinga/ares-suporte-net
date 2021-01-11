import { VisitaPostModel } from './../models/visita-post.model';
import { TecnicoModel } from '../../shared/models/tecnico.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  servico: BehaviorSubject<ServicosPrestadosModel>
  tecnico: BehaviorSubject<TecnicoModel>;
  
  private readonly PATH: string = 'visitas';
  
  loadVisitas(): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`)
    ;
  }
  sendVisita(visita: VisitaPostModel): Observable<any>{
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, visita);
  }
  setServico(servico: ServicosPrestadosModel) {
    //this.servico.next(servico);
  }
  setTecnico(tecnico: TecnicoModel) {
    //this.tecnico.next(tecnico);
  }

  getServico(): BehaviorSubject<ServicosPrestadosModel> {
    if(this.servico){
      return this.servico;
    }else{
      return new BehaviorSubject(
        new ServicosPrestadosModel()
      );
    }
  }
  getTecnico(): BehaviorSubject<TecnicoModel> {
    if(this.servico){
      return this.tecnico;
    }else{
      return new BehaviorSubject(
        new TecnicoModel()
      );
    }
  }
  constructor(
    private http: HttpClient
  ) { }
}
