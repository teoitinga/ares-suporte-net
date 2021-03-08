import { Component, OnInit } from '@angular/core';
import { InfoRendaModel } from '../../models/info-renda.model';

@Component({
  selector: 'app-info-renda',
  templateUrl: './info-renda.component.html',
  styleUrls: ['./info-renda.component.css']
})
export class InfoRendaComponent implements OnInit {

  fonteDerenda: InfoRendaModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
