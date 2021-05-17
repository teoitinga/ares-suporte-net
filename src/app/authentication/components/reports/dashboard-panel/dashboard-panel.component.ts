import { map } from 'rxjs/operators';
import { DATA } from './../models/data._test';
import { Observable } from 'rxjs';
import { ChamadasCustomModel, Servico, TotalServices } from './../models/chamadas-custom-model';
import { Component, OnInit } from '@angular/core';
import { DashBoardServiceService } from '../services/dash-board-service.service';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { MessageService } from 'src/app/shared/service/responses-messages.service';

//declaração de variável do google -> por não fazer parte do padrão ecmascript, deve ser declarada aqui para ser reconhecida
//(gambiarra...mas funciona)
declare var google: any;

@Component({
  selector: 'dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.css']
})
export class DashboardPanelComponent implements OnInit {

  reportServices: ChamadasCustomModel;

  constructor(
    private dashService: DashBoardServiceService,
    private mesageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadServicosPrestados(3);

  }
  init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
      
    }
  }
  exibirGraficos(): any {
    this.exibirMesChart();
  }
  exibirMesChart() {
    const el = document.getElementById('ano_chart');
 
    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.getDataTable(), this.getOpcoes())
  }
  getOpcoes(): any {
    return {
      'title': "Serviços prestados durante o ano corrente"
    }
  }
  getDataTable(): any {
    // Define the chart to be drawn.
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'servicoDesc');
    data.addColumn('number', 'quantidade');

    const records = this.dashService.servicos;

    const arr = records.map(function(obj) {
      return Object.keys(obj).map(function(key) {
          return obj[key];
      });
  });
   
    data.addRows(arr);

    return data;
  }
  //Carrega e agrupa os dados 
  loadServicosPrestados(flag: any) {
    this.obterDados().subscribe(
      dados => {
        this.init();
      }
    );
  }
  obterDados(): Observable<TotalServices[]> {
    return new Observable(
      observable => {
        observable.next(this.dashService.getServicoAgrupadosMensal(0));
        observable.complete();
      }
    );
  }
}
