import { TotalServices } from './../models/chamadas-custom-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Servico } from '../models/chamadas-custom-model';
import { environment as env } from './../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashBoardServiceService {

  private readonly PATH: string = 'chamadas';
  private readonly PATH_CALL: string = 'relatorioReport';

  private _servicos = new BehaviorSubject<TotalServices[]>(
    []
  );

  private _servicosMesais = new BehaviorSubject<TotalServices[]>(
    []
  );

  get servicos(): TotalServices[]{
    return this._servicos.value;
  }

  get servicosMesais(): TotalServices[]{
    return this._servicosMesais.value;
  }

  set servicos(srv: TotalServices[]){
    this._servicos.next(srv);
  }
  set servicosMesais(srv: TotalServices[]){
    this._servicosMesais.next(srv);
  }

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  loadServicosAnoCorrente(flag: any): Observable<any> {

    if (flag === 'true') {
      flag = "0";
    } else {
      flag = moment().format('D');
    }
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('id', this.authService.getCodEsloc());
    params = params.append('mes', "0");

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_CALL}`, { params });

  }
  loadData(): any{
    this.servicosMesais = this.getServicoAgrupadosMensal(5);
    this.servicos = this.getServicoAgrupadosMensal(0);
  }

  getServicoAgrupadosMensal(flag: any): any {
    let response;
    this.loadServicosAnoCorrente(flag).subscribe(
      data => {
        return this._agrupa(data['servico']);
      }
    );
  }
  private _agrupa(list: Servico[]): any {

    const total = list.reduce(function (acumulador, servico) {


      //achar o indice do objeto no acumulador através do id
      const indice = acumulador.map(o => o.servicoPrestado).indexOf(servico.servicoPrestado);

      if (indice == -1) { //se não existe no acumulador adiciona o objeto corrente
        servico['quantidade'] = 1;
        acumulador.push(servico);
      }
      else { //se já existe incrementa 1
        acumulador[indice]['quantidade'] += 1;

      }
      
      return acumulador;
      
    }, []); //iniciar o acumulador com array vazio
    const lista: TotalServices[] = total.map(item => {
      let response: TotalServices = {
        'servicoDesc': item.servicoPrestado,
        'quantidade': item.quantidade
      };
      return response;
    });

    
    this.servicos = lista;
    //return lista;
  }
}
