import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthenticationComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    //carrega as chamadas não atendidas pelo tecnico
    this.authService.countCalls();
    //carrega o header
    this.authService.headerData = {
      nome: this.authService.getUsuarioLogado().name,
      route: 'login/home',
      icon: 'home',
      role: this.authService.getUsuarioLogado().role,
      title: 'tela  home',
      expires: this.authService.getExpiration().calendar()
    }
  }

  ngOnInit(): void {

  }
  get callNumber(): number {
    return this.authService.callNumber;
  }
  logout() {
    this.authService.logout();
  }
  get title(): string {
    return this.authService.headerData.title;
  }
  get expires(): string {
    return this.authService.headerData.expires;
  }
  get icon(): string {
    return this.authService.headerData.icon;
  }
  get nome(): string {
    const str = 'ÁÉÍÓÚáéíóúâêîôûàèìòùÇç/.,~!@#$%&_-12345';
    const parsed = this.authService.headerData.nome;//.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    return this.normalizeString(parsed);
  }
  get role(): string {
    return this.authService.headerData.role;
  }
  get route(): string {
    return this.authService.headerData.route;
  }

  private normalizeString(texto: string): string {
    return texto.replace(/Ã£/g, "ã");
  }
  conferirChamadas() {

    this.router.navigate(['/login/chamadas']);
  }
  home() {
    this.router.navigate(['/login/home']);

  }
}
