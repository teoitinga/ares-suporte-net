import { environment as env } from './../../environments/environment.prod';
import { UserPost } from './models/user-post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserToken } from './models/user.token';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs/operators';
import { LoginModel } from '../shared/models/login.model';
import { Router } from '@angular/router';
import { ChamadaService } from '../chamadas/services/chamada.service';
import { dataAttributes } from '@material/data-table';
import { QueryBindingType } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private readonly PATH: string = 'auth';
  private readonly TOKEN_DATA: string = 'token';
  private readonly EXPIRES_DATA: string = 'expiration';
  private readonly ROLE_DATA: string = 'role';
  private readonly CREATED_DATA: string = 'created';
  private readonly NAME_DATA: string = 'name';
  private readonly USERNAME_DATA: string = 'sub';

  usuarioLogado: UserToken = new UserToken('','','','');
  numCalls: number = 0;

  private _headerData = new BehaviorSubject<LoginModel>({
    nome: '',
    route: 'login/home',
    icon: 'home',
    role: '',
    title: '',
    expires: moment().format('LLL'),
    callsNum: 0
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private chamadaService: ChamadaService
  ) { 
    this.getCallsNumber();
  }

  getCallsNumber(): any {
    this.chamadaService.countCalls().subscribe(
      data=>{
        const num = data;
        console.log("Dentro do obs ...");
        console.log(data);
        this.numCalls = num;
      },
      err=>{
        console.log(err);
      }
      
    );
    return this.numCalls;
  }
  logar(login: UserPost): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, login)
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      );
    ;
  }

  public getUsuarioLogado(): UserToken{
    return this.usuarioLogado;
  }
  private setSession(authResult) {
    const token = authResult.token;
    const payload = this.parseJwt(token);
    const expiresAt = moment.unix(payload.exp);

    this.usuarioLogado.login = payload.sub;
    this.usuarioLogado.name = payload.name;
    this.usuarioLogado.role = payload.role;


    localStorage.setItem(this.TOKEN_DATA, token);
    localStorage.setItem(this.EXPIRES_DATA, JSON.stringify(payload.expiration));

    const header: LoginModel = {
      nome: '',
      route: 'login/home',
      icon: 'home',
      role: '',
      title: '',
      expires: moment().format('LLL'),
      callsNum: this.numCalls
    };
    this.headerData = header;

  }
  private parseJwt(token: string) {
    try {
      // Get Token Header
      const base64HeaderUrl = token.split('.')[0];
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
      const headerData = JSON.parse(window.atob(base64Header));

      // Get Token payload and date's
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const dataJWT = JSON.parse(window.atob(base64));
      dataJWT.header = headerData;

      // TODO: add expiration at check ...


      return dataJWT;
    } catch (err) {
      return false;
    }
  }
  logout() {

    localStorage.removeItem(this.TOKEN_DATA);
    localStorage.removeItem(this.EXPIRES_DATA);
    this.router.navigate(['/login']);
  }
  get token(): string {
    return localStorage.getItem(this.TOKEN_DATA);
  }
  /*
    refreshToken() {
      if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
        return this.http.post(
          this.apiRoot.concat('refresh-token/'),
          { token: this.token }
        ).pipe(
          tap(response => this.setSession(response)),
          shareReplay(),
        ).subscribe();
      }
    }
  */
  public getExpiration() {
    const expiration = localStorage.getItem(this.EXPIRES_DATA);
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
  public getUserName() {
    const userName = localStorage.getItem(this.NAME_DATA);
    return userName;
  }
  public getRoleUser() {
    const roleData = localStorage.getItem(this.ROLE_DATA);
    return roleData;
  }
  public getNumCalls() {
    const num = this.headerData.callsNum;
    return num;
  }
  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  get headerData(): LoginModel{
    return this._headerData.value;
  }
  set headerData(headerData: LoginModel){
    const token = localStorage.getItem(this.TOKEN_DATA);
    const payload = this.parseJwt(token);
    headerData.nome = payload.name;
    headerData.role = payload.role;
    headerData.callsNum = this.numCalls;

    this._headerData.next(headerData);
  }
}
