import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cedido-views',
  templateUrl: './cedido-views.component.html',
  styleUrls: ['./cedido-views.component.css']
})
export class CedidoViewsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  informaProducao(){
    this.router.navigate(['/visitas/renda/registro-renda']);
  }
}
