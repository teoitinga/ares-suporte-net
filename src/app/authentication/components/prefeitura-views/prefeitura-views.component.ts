import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prefeitura-views',
  templateUrl: './prefeitura-views.component.html',
  styleUrls: ['./prefeitura-views.component.css']
})
export class PrefeituraViewsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  kitHorta(){
    this.router.navigate(['/visitas/cadastrar-boa-horta']);
  }
  carEmissao(){
    this.router.navigate(['/visitas/cadastrar-car-emissao']);
    
  }
  carRetificacao(){
    this.router.navigate(['/visitas/cadastrar-car-retificar']);
    
  }
  car2via(){
    this.router.navigate(['/visitas/cadastrar-car-segundavia']);
    
  }
  geoIma(){
    this.router.navigate(['/visitas/geo-ima']);
    
  }
}
