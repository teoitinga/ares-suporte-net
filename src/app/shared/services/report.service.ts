import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly PATH: string = 'reports/pdf';

  constructor(
    private http: HttpClient
  ) { }

  relatorioAtendimentos(inicio:string, fim:string, acao:string, code:string):Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/atendimentos?inicio=${inicio}&fim=${fim}&acao=${acao}&code=${code}`);
  }
}
