import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchMunicipioService {

  readonly API_IBGE: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
  readonly COD_MG: string = '31';

  constructor(
    private http: HttpClient
  ) { }
  getMunicipios(): Observable<any> {
    return this.http.get(`${this.API_IBGE}${this.COD_MG}/municipios`);
  }
}
