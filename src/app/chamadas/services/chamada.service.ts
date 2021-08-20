import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChamadaService {
  expireCall(call: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/expirated/${call['codigo']}`, call['codigo']);
  }
  incializarCall(call: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/initialize/${call['codigo']}`, call['codigo']);
  }
  private readonly PATH: string = 'chamadas';
  
  constructor(
    private http: HttpClient
    ) { }

    finalizeCall(call: any): Observable<any>{
      return this.http.put(`${env.BASE_API_URL}${this.PATH}/finalize/${call['codigo']}`, call['codigo']);
      ;
    }
    cancelCall(call: any): Observable<any>{
      return this.http.put(`${env.BASE_API_URL}${this.PATH}/cancel/${call['codigo']}`, call['codigo']);
      ;
    }
    

  loadCalls(pageSize, length): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}?size=${pageSize}&Number=${length}`)
    ;
  }
  countCalls(): Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/count`);
    ;
  }
}
