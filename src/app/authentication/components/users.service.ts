import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.prod';
import { UserModel } from './users/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private readonly PATH: string = 'users';
  
  constructor(
    private http: HttpClient
    ) { }
    
    loadUser(login: string): Observable<any> {
      return this.http.get(`${env.BASE_API_URL}${this.PATH}/${login}`);
    }
    updateUser(usuario: UserModel): Observable<any> {
        return this.http.put(`${env.BASE_API_URL}${this.PATH}/${usuario.login}`, usuario);
      
    }
}
