import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthenticationComponent implements OnInit {

  qtdCall: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.setCallsQtd();
    this.authService.headerData = {
      nome: this.authService.getUsuarioLogado().name,
      route: 'login/home',
      icon: 'home',
      role: this.authService.getUsuarioLogado().role,
      title: 'tela  home',
      expires: this.authService.getExpiration().calendar(),
      callsNum: this.authService.getCallsNumber()
    }
  }

  ngOnInit(): void {

  }
  async setCallsQtd(){
    await this.espereEDecida();
    this.funcaoteste2();
  }
  async espereEDecida(){
    // Vamos esperar um segundo primeiro
  const num = await this.authService.getCallsNumber();
  console.info("aqui...");
  console.info(num);
  }
  funcaoteste2(){
    console.log("arquivo 02assasasyhiuyhiasyihiUASYZ");
  }
  logout(){
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
  get numCalls(): number {
    return this.authService.headerData.callsNum;
  }
  private normalizeString(texto: string):string{
    return  texto.replace(/Ã£/g,"ã");
  }
  conferirChamadas(){
    this.router.navigate(['/login/chamadas']);
  }
}
