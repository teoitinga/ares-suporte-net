import { BehaviorSubject } from 'rxjs';
import { ChamadasCustomModel, Servico, TotalServices } from './../models/chamadas-custom-model';
import { Component, OnInit } from '@angular/core';
import { DashBoardServiceService } from '../services/dash-board-service.service';
import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

//declaração de variável do google -> por não fazer parte do padrão ecmascript, deve ser declarada aqui para ser reconhecida
//(gambiarra...mas funciona)
declare var google: any;

@Component({
  selector: 'dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.css']
})
export class DashboardPanelComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(undefined);

  reportServices: ChamadasCustomModel;

  //Estrutura de dados a exibir
  reportDiario: TotalServices[] = [];//Dados de serviços concluidos pelo escritório no DIA atual

  chartHeaderDiario: string;
  srvDiaLoading: boolean = true;

  reportMensal: TotalServices[] = [];//Dados de serviços concluidos pelo escritório no MÊS atual
  chartHeaderMensal: string;
  srvMesLoading: boolean = true;

  reportAnual: TotalServices[] = [];//Dados de serviços concluidos pelo escritório no ANO atual
  chartHeaderAnual: string;
  srvLoading: boolean = true;

  reportDiaUsuario: TotalServices[] = [];//Dados de serviços concluidos pelo usuário no dia atual
  chartHeaderDiaUsuario: string;
  srvDiaUsuarioLoading: boolean = true;

  constructor(
    private dashService: DashBoardServiceService,
    private mesageService: MessageService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    //1 - carrega os dados
    this.loadData();

  }
  async loadData() {

    //Recupera dados de todos os serviços prestado no ano corrente
    const srv = await this.loadDadosAnuais().then(x => { return x });

    //Recupera registros de todo os serviços executado por este escritório no dia atual
    const srvD = await this.loadDadosDiarios().then(x=>{return x});

    //Recupera todos os registros executados no mes corrente pelo escritório no qual o usuario pertence
    const srvM = await this.loadDadosMensais().then(x => { return x });

    //Recupera todos os registros executados pelo usuario atual no dia corrente
    const srvDU = await this.loadDadosDiaUsuario().then(x => { return x });

    this.reportAnual = srv;

    this.reportDiario = srvD;

    this.reportMensal = srvM;

    this.reportDiaUsuario = srvDU;

    this.init();

  }
  init(): void {
    const component = this;
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });

      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
        this.loading$.next(false);
      }, 1000);

    }
  }
  exibirGraficos(): any {
    this.exibirChartAnualEsloc();
    this.exibirChartMensalEsloc();
    this.exibirChartDiarioEsloc();
    this.exibirChartDiarioUsuario();
    /*
    
    */
  }

  getOpcoesChartAnualEsloc(): any {
    return {
      title: this.chartHeaderAnual,
      titleTextStyle: {
        bold: true,
        italic: true,
      },
      isStacked: true,
      legend: 'none',
      hAxis: { textPosition: 'none', title: 'Serviços prestados', ticks: 'none' },
      vAxis: {
        title: 'quantidade',
        textPosition: 'center',
        gridlines: { count: 4 },
        viewWindow: { min: 0 },
        format: 0
      },
    }
  }
  getOpcoesChartMensal(): any {
    return {
      title: this.chartHeaderMensal,
      titleTextStyle: {
        bold: true,
        italic: true,
      },
      isStacked: true,
      legend: 'none',
      hAxis: { textPosition: 'none', title: 'Serviços prestados', ticks: 'none' },
      vAxis: {
        title: 'quantidade',
        textPosition: 'center',
        gridlines: { count: 4 },
        viewWindow: { min: 0 },
        format: 0
      },
    }

  }
  getOpcoesChartDiario(): any {
    return {
      title: this.chartHeaderDiario,
      titleTextStyle: {
        bold: true,
        italic: true,
      },
      isStacked: true,
      legend: 'none',
      hAxis: { textPosition: 'none', title: 'Serviços prestados', ticks: 'none' },
      vAxis: {
        title: 'quantidade',
        textPosition: 'center',
        gridlines: { count: 4 },
        viewWindow: { min: 0 },
        format: 0
      },
    }

  }
  getOpcoesChartDiarioUsuario(): any {
    return {
      title: this.chartHeaderDiaUsuario,
      titleTextStyle: {
        bold: true,
        italic: true,
      },
      isStacked: true,
      legend: 'none',
      hAxis: { textPosition: 'none', title: 'Serviços prestados', ticks: 'none' },
      vAxis: {
        title: 'quantidade',
        textPosition: 'center',
        gridlines: { count: 4 },
        viewWindow: { min: 0 },
        format: 0
      },
    }

  }

  /*
  Gráficos a serem exibidos
  */
  exibirChartAnualEsloc() {
    const el = document.getElementById('ano_chart');

    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);
    //recupera registros da API
    //Desenha o gráfico
    chart.draw(this.getDataTable(this.reportAnual), this.getOpcoesChartAnualEsloc());
  }
  exibirChartDiarioUsuario() {
    const el = document.getElementById('diario_usuario_chart');

    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);
    //recupera registros da API
    //Desenha o gráfico
    chart.draw(this.getDataTable(this.reportDiaUsuario), this.getOpcoesChartDiarioUsuario())
  }
  exibirChartMensalEsloc() {
    const el = document.getElementById('mensal_chart');

    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);
    //recupera registros da API
    //Desenha o gráfico
    chart.draw(this.getDataTable(this.reportMensal), this.getOpcoesChartMensal())
  }
  exibirChartDiarioEsloc() {
    const el = document.getElementById('diario_chart');

    // Instantiate and draw the chart.
    const chart = new google.visualization.ColumnChart(el);
    //recupera registros da API
    //Desenha o gráfico

    chart.draw(this.getDataTable(this.reportDiario), this.getOpcoesChartDiario())
  }

  /*
  *
  */
  getDataTable(servicos: any): any {
    // Define the chart to be drawn.
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'servicoDesc');
    data.addColumn('number', 'quantidade');
    data.addColumn({ type: 'string', role: 'style' });

    const arr = servicos.map(srv => {
      let item = [srv['servicoDesc'], srv['quantidade'], `color: ${randomColor()}`];
      return item;
    });

    //Obtem as cores aleatórias para desenho do gráfico
    const array = servicos.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });

    data.addRows(arr);

    return data;
  }
  private _agrupa(list: Servico[]): TotalServices[] {

    const total = list.reduce(function (acumulador, servico) {


      //achar o indice do objeto no acumulador através do id
      const indice = acumulador.map(o => o.servicoPrestado).indexOf(servico.servicoPrestado);

      if (indice == -1) { //se não existe no acumulador adiciona o objeto corrente
        servico['quantidade'] = 1;
        acumulador.push(servico);
      }
      else { //se já existe incrementa 1
        acumulador[indice]['quantidade'] += 1;

      }

      return acumulador;

    }, []); //iniciar o acumulador com array vazio
    const lista: TotalServices[] = total.map(item => {
      let response: TotalServices = {
        'servicoDesc': item.servicoPrestado,
        'quantidade': item.quantidade
      };
      return response;
    });
    return lista;
  }

  async loadDadosDiarios() {
    const servicos = await this.dashService.loadDadosDiarios().toPromise().then(
      data => {
        this.chartHeaderDiario = `${data['relatorio']}`
        return this._agrupa(data['servico']);
      }
    );
    return servicos;
  }

  async loadDadosMensais() {
    const servicos = await this.dashService.loadDadosMensais().toPromise().then(
      data => {
        this.chartHeaderMensal = `${data['relatorio']} de ${data['dataInicial']} a ${data['dataFinal']}`
        return this._agrupa(data['servico']);
      }
    );
    return servicos;
  }

  async loadDadosDiaUsuario() {
    const servicos = await this.dashService.loadDadosDiaUsuario().toPromise().then(
      data => {
        this.chartHeaderDiaUsuario = `${data['relatorio']}`
        return this._agrupa(data['servico']);
      }
    );
    return servicos;
  }

  async loadDadosAnuais() {
    const servicos = await this.dashService.loadDadosAnuais().toPromise().then(
      data => {
        this.chartHeaderAnual = `${data['relatorio']} de ${data['dataInicial']} a ${data['dataFinal']}`
        return this._agrupa(data['servico']);
      }
    );
    return servicos;
  }
}
function getCores(reportAnual: TotalServices[]) {
  let cores = [];
  const qtdCores = reportAnual;
  let arrayCores = reportAnual.map(srv => cores.push(randomColor()));
  return cores;
}

function randomColor(curto = false) {
  const max_hex = curto ? 0xFFF : 0xFFFFFF;

  return '#' + parseInt((Math.random() * max_hex).toString())
    .toString(16)
    .padStart(curto ? 3 : 6, '0');
}

