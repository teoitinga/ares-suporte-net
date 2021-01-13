import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChamadaService {
  
  private readonly PATH: string = 'chamadas';

  constructor(
    private http: HttpClient
  ) { }

  loadCalls(): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`)
    ;
  }
  countCalls(): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/count`);
    ;
  }
}
