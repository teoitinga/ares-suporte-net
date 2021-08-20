import { EscritorioModel } from 'src/app/shared/models/escritorio';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EscritorioService {
  
  private readonly PATH: string = 'esloc';
  private readonly PATH_ALL: string = 'eslocs';
  private readonly PATH_DETALHE: string = 'detalhe';
  
  emitirEscritorio = new EventEmitter<EscritorioModel>();
  
  
  constructor(
    private http: HttpClient
    ) { }
    
    loadEscritorio(cod: string): Observable<any> {
      
      let params = new HttpParams();
      
      params = params.append('codEsloc', cod);
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.PATH_DETALHE}`, {params});
      
    }
    setEscritorio(escritorio: EscritorioModel){
      this.emitirEscritorio.next(escritorio);
    }
    getEscritorio():any{
      return this.emitirEscritorio.asObservable();
    }
    loadAllOffice(): Observable<any>{
      return this.http.get<EscritorioModel[]>(`${env.BASE_API_URL}${this.PATH}/${this.PATH_ALL}`);
    }
    save(escritorio: any) {
      return this.http.post<EscritorioModel[]>(`${env.BASE_API_URL}${this.PATH}`, escritorio);
    }
    update(escritorio: any, cod: any) {
      let params = new HttpParams();
      
      params = params.append('codEsloc', cod);

      if(cod){
        return this.http.put<EscritorioModel[]>(`${env.BASE_API_URL}${this.PATH}`, escritorio, {params});
      }
      return this.http.post<EscritorioModel[]>(`${env.BASE_API_URL}${this.PATH}`, escritorio);
      
    }
  }
  