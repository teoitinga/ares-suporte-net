import { UsersService } from './../../users.service';
import { UserModel } from './../user-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { SearchMunicipioService } from 'src/app/shared/service/search-municipio.service';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  //Forms Utilizados no registro
  
  userForm: FormGroup;
  municipios: any;
  loading: boolean;
  senhachecked: boolean = false;

  usuario: UserModel = {
    login: '',
    name: '',
    contato: '',
    municipio: '',
    password: '',
    role: ''
  }
  
  constructor(
    private fb: FormBuilder,
    private municipioService: SearchMunicipioService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
    this.loadMunicipios();
  }
  
  ngOnInit(): void {
    //Carrega o formulário de produtores
    this.initForm();
    this.loadUser();
  }

  get senhacheck(): boolean{

    const senhaCript = /^(?=.*[\d])(?=.*[\w])([\d\w\S]{6,12})$/;
  
    let pwd01 = this.userForm.controls['password'].value;
    let pwd02 = this.userForm.controls['passwordcheck'].value;

    this.senhachecked = senhaCript.test(pwd01);

    return this.senhachecked;
  }
  get formCheck(): boolean{
    let formOk = this.userForm.valid;
    let pwd01 = this.userForm.controls['password'].value;
    let pwd02 = this.userForm.controls['passwordcheck'].value;
    
 
    if((pwd01 === pwd02) && formOk === true){
      return true;
    }

    return false;

  }
  private async loadUser(){
    //obtendo registros do usuario logado
    const login = await this.authenticationService.getUserName();
    this.usuario = await this.usersService.loadUser(login).toPromise().then(us=>{return us});
    this.userLoadForm();
  }
  private async initForm(){
    this.userForm = this.fb.group({
      login: [{ value:'', disabled: true }, [Validators.required, CpfValidator]],
      name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
      contato: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      municipio: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      password: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      passwordcheck: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      role: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]]
    });

  }
  private async userLoadForm() {
    const usuario = this.usuario;

    this.userForm = this.fb.group({
      login: [{ value: usuario['login'], disabled: true }, [Validators.required, CpfValidator]],
      name: [{ value: usuario['name'], disabled: true }, [Validators.required, Validators.minLength(6)]],
      contato: [{ value: usuario['contato'], disabled: false }, [Validators.required, Validators.minLength(6)]],
      municipio: [{ value: usuario['municipio'], disabled: false }, [Validators.required, Validators.minLength(6)]],
      password: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      passwordcheck: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      role: [{ value: usuario['role'], disabled: true }, [Validators.required, Validators.minLength(6)]]
    });
    
  }

  loadMunicipios() {
    const component = this;
    this.municipioService.getMunicipios().subscribe(
      data => {
        this.municipios = data;
        this.loading = !true;
      },
      error => {
        this.messageService.sendError(this._snackBar, "Erro na API IBGE", 'Não foi possível conectar ao IBGE para obter as cidades.');
        this.loading = !true;
      }
    );
  }

  cancela(){
    this.router.navigate(['login/home']);
  }

  registra(){
    //Recuperando form de usuário
    this.usuario.name = this.userForm.controls['name'].value;
    this.usuario.login = this.userForm.controls['login'].value;
    this.usuario.municipio = this.userForm.controls['municipio'].value;
    this.usuario.role = this.userForm.controls['role'].value;
    this.usuario.password = this.userForm.controls['password'].value;

    this.usersService.updateUser(this.usuario).subscribe(
      data=>{
        this.messageService.sendInfoMessage(this._snackBar, 'Confirmado', "Registro modificado com sucesso");
        this.router.navigate(['login/home']);

      },
      error=>{
        this.messageService.sendError(this._snackBar, 'Erro', error.error);
      }
    );
  }
}
