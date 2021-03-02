import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private readonly PATH: string = 'services/';
  private readonly PATH_TECNICOS: string = 'users/name/';
  private readonly PATH_PRODUCAO: string = 'inforenda/search-producao/';
  
  getProducaoForApi(value: any):  Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH_PRODUCAO}${value}`)
    ;
  }
  getServicesForApi(service: string): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}${service}`)
    ;
  }
  getTecnicosForApi(name: string): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH_TECNICOS}${name}`)
    ;
  }
  constructor(
    private http: HttpClient
  ) { }
}
