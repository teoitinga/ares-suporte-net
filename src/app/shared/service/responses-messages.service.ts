import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  durationInSeconds: number = 3000;
  config = new MatSnackBarConfig();

  sendInfoMessage(snackBar: MatSnackBar, head: string, msg:any) {
    this._snackBar = snackBar;
    this.config.panelClass = ['success-snackbar'];
    this._snackBar.open(msg, head, this.config);
  }

  constructor(
    private _snackBar: MatSnackBar
  ) { 
    this.config.duration = this.durationInSeconds;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'top';
  }
  //success-snackbar
  sendError(snackBar: MatSnackBar, head: string, msg:any){
    this._snackBar = snackBar;
    this.config.panelClass = ['error-snackbar'];
    this._snackBar.open(msg, head, this.config);
    
  }
}
