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
  
  /*
  GET all servicos for report actual YEAR"
  @RequestParam String esloc
  */
  private readonly PATH_CALL_YEAR: string = 'relatorioReportAnual';
  
  /*
  GET all servicos for report actual month
  @RequestParam String esloc, 
  @RequestParam String mes
  */
  private readonly PATH_CALL_MONTH: string = 'relatorioReportMensal';
  /*
  GET all servicos for report actual month 
  @RequestParam String esloc, @RequestParam String mes
  private readonly PATH_CALL: string = 'relatorioReport';
  */
  /*
  API de busca de serviços concluidos no dia atual pelo escritório logado
  GET all servicos for report actual day
  @RequestParam String esloc
  */
  private readonly PATH_CALL_DIARY: string = 'relatorioDiario';
  /*
  GET all servicos for report actual day
  */
  private readonly PATH_CALL_USER: string = 'relatorioReportUser';//

  private _servicos = new BehaviorSubject<TotalServices[]>(
    []
  );

  private _servicosMesais = new BehaviorSubject<TotalServices[]>(
    []
  );

  get servicos(): TotalServices[] {
    return this._servicos.value;
  }

  get servicosMesais(): TotalServices[] {
    return this._servicosMesais.value;
  }

  set servicos(srv: TotalServices[]) {
    this._servicos.next(srv);
  }
  set servicosMesais(srv: TotalServices[]) {
    this._servicosMesais.next(srv);
  }

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }
  /*
  * Retorna os dados de serviços anuais feito pelo escritório no qual o usuário logado
  * é registrado.
  */

  loadDadosDiarios(): Observable<any> {

    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('esloc', this.authService.getCodEsloc());

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_CALL_DIARY}`, { params });
  }
  loadDadosMensais(): Observable<any> {

    let params = new HttpParams();
    const mesAtual = moment().format('MM');

    // Begin assigning parameters
    params = params.append('esloc', this.authService.getCodEsloc());
    params = params.append('mes', mesAtual);

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_CALL_MONTH}`, { params });
  }

  loadDadosDiaUsuario(): Observable<any> {

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_CALL_USER}`);
  }

  loadDadosAnuais(): Observable<any> {
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('esloc', this.authService.getCodEsloc());

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_CALL_YEAR}`, { params });

  }

}
