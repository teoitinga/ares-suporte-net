import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as printJS from 'print-js';

@Component({
  selector: 'app-confirm-dialog-renda',
  templateUrl: './confirm-dialog-renda.component.html',
  styleUrls: ['./confirm-dialog-renda.component.css']
})
export class ConfirmDialogRendaComponent{

  rendaOk:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogRendaComponent>,
    private router: Router
  ) {
    console.log(data);
   }
   close() {
    this.dialogRef.close(false);
  }
  confirm() {
    this.dialogRef.close(true);

  }
  print(){
    this.rendaOk = true;
  }
}
