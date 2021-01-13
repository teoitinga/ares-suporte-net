import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  constructor(    
    private authService: AuthenticationService
    ) {

    }
  async ngOnInit(): Promise<void> {
    this.authService.headerData = {
      nome: this.authService.getUsuarioLogado().name,
      route: 'login/visitas',
      icon: 'home',
      role: this.authService.getUsuarioLogado().role,
      title: 'tela  Visitas',
      expires: this.authService.getExpiration().calendar(),
      callsNum: await this.authService.getCallsNumber()
    }
  }

}
