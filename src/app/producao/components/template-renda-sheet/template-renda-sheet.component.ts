import { Component, Input, OnInit } from '@angular/core';
import { InfoRendaModel, ProducaoAnual, Produtore } from '../../models/info-renda.model';
import { ProducaoModel } from '../../models/producao.model';

@Component({
  selector: 'template-renda-sheet',
  templateUrl: './template-renda-sheet.component.html',
  styleUrls: ['./template-renda-sheet.component.css']
})
export class TemplateRendaSheetComponent implements OnInit {

  @Input('fonteDerenda') fonteDerenda: InfoRendaModel;

  constructor() { }

  ngOnInit(): void {
  }

}
