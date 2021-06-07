import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/service/responses-messages.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  hmanCalc(){
    this.router.navigate(['login/hman']);
  }
  piquetesCalc(){
    this.router.navigate(['login/dm-pastagem']);
  }
  capineiraCalc(){
  }
}
