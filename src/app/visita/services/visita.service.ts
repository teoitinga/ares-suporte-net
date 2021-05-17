import { ProducaoModel } from '../../producao/models/producao.model';
import { VisitaPostModel } from './../models/visita-post.model';
import { TecnicoModel } from '../../shared/models/tecnico.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicosPrestadosModel } from 'src/app/shared/models/servicos-prestados.model';
import { environment as env } from './../../../environments/environment.prod';
import { PesquisaModel } from 'src/app/info-view/painel-servicos/pesquisa.model';
import { InfoRendaModel } from 'src/app/producao/models/info-renda.model';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {


  servico: BehaviorSubject<ServicosPrestadosModel>
  tecnico: BehaviorSubject<TecnicoModel>;

  private readonly PATH: string = 'visitas';
  private readonly PATH_CALL: string = 'chamadas';
  private readonly PATH_FIND_PRODUTOR: string = 'produtores/find';
  private readonly PATH_INFO_RENDA: string = 'inforenda';

  loadVisitas(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`)
      ;
  }
  obterProdutor(cpf: string): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH_FIND_PRODUTOR}/${cpf}`);
    ;
  }
  loadVisitasManager(pesquisaModel: PesquisaModel): Observable<any> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('dataInicial', pesquisaModel.dataInicial);
    params = params.append('dataFinal', pesquisaModel.dataFinal);
    console.log(`${env.BASE_API_URL}${this.PATH_CALL}/gerenciar?` + params );
    return this.http.get(`${env.BASE_API_URL}${this.PATH_CALL}/gerenciar`, { params });
    ;
  }
  sendVisita(visita: VisitaPostModel): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, visita);
  }
  createInfoRenda(renda: InfoRendaModel): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH_INFO_RENDA}`, renda);
  }
  setServico(servico: ServicosPrestadosModel) {
    //this.servico.next(servico);
  }
  setTecnico(tecnico: TecnicoModel) {
    //this.tecnico.next(tecnico);
  }
  setProducao(producao: ProducaoModel) {

  }

  getServico(): BehaviorSubject<ServicosPrestadosModel> {
    if (this.servico) {
      return this.servico;
    } else {
      return new BehaviorSubject(
        new ServicosPrestadosModel()
      );
    }
  }

  getTecnico(): BehaviorSubject<TecnicoModel> {
    if (this.servico) {
      return this.tecnico;
    } else {
      return new BehaviorSubject(
        new TecnicoModel()
      );
    }
  }
  constructor(
    private http: HttpClient
  ) { }
}
