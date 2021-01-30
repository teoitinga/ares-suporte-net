import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string =  '';

  isTecnico: boolean = false;
  isPrefeitura: boolean = false;
  isCedido: boolean = false;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.role =  this.authService.getRoleUser();
    this.updateView();
  }
  updateView(){
    if(this.role==='TECNICO'){
      this.isTecnico = true;
    }
    if(this.role==='PREFEITURA'){
      this.isPrefeitura = true;
    }
    if(this.role==='CEDIDO'){
      this.isCedido = true;
    }

  }

}
