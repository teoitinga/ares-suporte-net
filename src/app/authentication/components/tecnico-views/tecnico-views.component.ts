import { ReportService } from './../../../shared/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tecnico-views',
  templateUrl: './tecnico-views.component.html',
  styleUrls: ['./tecnico-views.component.css']
})
export class TecnicoViewsComponent implements OnInit {

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
  }

  relatorio(){
    alert('Gerando relatório')
    this.reportService.relatorioAtendimentos('2021-01-22', '2021-02-15', 'v', 'publicoAtendido').subscribe(
      data=> {

        let file = data;
        // TRECHO QUE EXECUTA O DOWNLOAD
        let fileName = "teste.pdf";
        let a = document.createElement("a");
        document.body.appendChild(a);

        let fileURL = window.URL.createObjectURL(file);
        a.href = fileURL;
        a.download = fileName;
        a.click();
      },
      error=>{
        console.log(error);                    

      }
    );
    }
}
