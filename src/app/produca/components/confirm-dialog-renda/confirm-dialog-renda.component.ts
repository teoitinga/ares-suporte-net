import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-renda',
  templateUrl: './confirm-dialog-renda.component.html',
  styleUrls: ['./confirm-dialog-renda.component.css']
})
export class ConfirmDialogRendaComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogRendaComponent>
  ) {
    console.log(data);
   }
   close() {
    this.dialogRef.close(false);
  }
  confirm() {
    this.dialogRef.close(true);
  }

}
