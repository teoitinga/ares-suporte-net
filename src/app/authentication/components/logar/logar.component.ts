import { UserPost } from './../../models/user-post';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import * as moment from 'moment';
import { MessageService } from 'src/app/shared/service/responses-errors.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  form: FormGroup;
  loginmessage = "Error";
  status = 200;
  
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private mesageService: MessageService
  ) {
    
   }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group( {
      senha: ['',[Validators.required]],
      login: ['',[Validators.required, Validators.minLength(6)]]
      })
  }
  logar(){
    if(this.form.invalid){
      return;
    }
    const login: UserPost = this.form.value;
    this.authService.logar(login).subscribe(
      data=>{
        this.router.navigate(['login/home']);
        this.authService.headerData = {
          nome: this.authService.getUsuarioLogado().login,
          route: 'login/home',
          icon: 'home',
          role: this.authService.getUsuarioLogado().role,
          title: 'tela  home',
          expires: this.authService.getExpiration().calendar()
        }
      },
      error=>{
       this.mesageService.sendError(error.error.message);
       this.status = error.error.status;
       this.loginmessage = error.error.message;
      }
    )

  }
  logout(){
    this.authService.logout();
  }
}
