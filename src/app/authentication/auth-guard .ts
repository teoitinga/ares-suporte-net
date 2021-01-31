import { AuthenticationService } from './authentication.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../shared/service/responses-messages.service';

@Injectable()
export class AuthGuard implements CanActivate {

  role_acess: string[];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private messageService: MessageService,

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
    ) {
    this.role_acess = route.data.role_acess;
    const role_atual = this.authService.getRoleUser();
    const permitido = this.role_acess.includes(role_atual);

    //Verifica se o token expirou
    if (this.authService.isExpired()) {
      this.messageService.sendError(this._snackBar, "Credencial expirada", "Seu login não é mais válido. Faça login novamente para continuar acessando o sistema.");
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
    if (!this.authService.isLoggedIn()) {
      this.messageService.sendError(this._snackBar, "Credencial inválida", "Você não está logado. Faça login novamente para continuar acessando o sistema.");
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
      
    }
    if (!permitido) {
      this.messageService.sendError(this._snackBar, "Credencial restrita", "Você não tem permissão para acessar esta página.");
      this.router.navigate(['login/home']);
      return false;

    }
    
      return true;
    

  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}