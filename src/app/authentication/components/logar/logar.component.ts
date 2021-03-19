import { UserPost } from './../../models/user-post';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import * as moment from 'moment';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private mesageService: MessageService,
    private _snackBar: MatSnackBar
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
    const component = this;
    this.authService.logar(login).subscribe(
      async data=>{
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
        console.error(error);
        if( error.status===0 ){
          this.mesageService.sendError(this._snackBar, "Erro", error.message);

        }else{
          this.mesageService.sendError(this._snackBar, "Erro", error.message);
          this.status = error.status;
          this.loginmessage = error.message;

        }
      }
    )

  }
  logout(){
    this.authService.logout();
  }
}
