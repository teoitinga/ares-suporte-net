import { ProdutorModel } from './../models/produtor-model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProdutorService {
  
  private readonly PATH: string = 'produtores';
  private readonly PATH_DOWNLOAD: string = 'visitas';
  private readonly FIND: string = 'find';
  private readonly FIND_BY_NAME: string = 'findByName';
  
  selected = new EventEmitter<ProdutorModel>();
  
  constructor(
    private http: HttpClient
    ) { }
    
    find(cpf: string): Observable<any> {
      
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.FIND}/${cpf}`);
      
    }
    findByName(cpf: string): Observable<any> {
      console.log('Pesquisando' + cpf);
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.FIND_BY_NAME}/${cpf}`);
      
    }
    findAtdByProdutor(cpf: string): Observable<any> {
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/${this.FIND}/atd/${cpf}`);
      
    }
    donwloadReport(idReport: any) {
      return this.http.get(`${env.BASE_API_URL}${this.PATH_DOWNLOAD}/download?codVisita=${idReport}`, {
        responseType: 'blob' as 'json'
        //reportProgress: true,
        //content-length
      });
    }
    setSelected(selected: ProdutorModel){
      this.selected.next(selected);
    }
    getSelected():any{
      return this.selected.asObservable();
    }
    findAll(pageSize, length): Observable<any>{
      let params = new HttpParams();
      
      params = params.append('number', length);
      params = params.append('size', pageSize);
      params = params.append('page', pageSize);
      return this.http.get<ProdutorModel[]>(`${env.BASE_API_URL}${this.PATH}`);
    }
    save(tosave: any) {
      return this.http.post<ProdutorModel[]>(`${env.BASE_API_URL}${this.PATH}`, tosave);
    }
    update(toupdate: any, cod: any) {

      if(cod){
        return this.http.put<ProdutorModel[]>(`${env.BASE_API_URL}${this.PATH}/${cod}`, toupdate);
      }
      return this.http.post<ProdutorModel[]>(`${env.BASE_API_URL}${this.PATH}`, toupdate);
      
    }
}
