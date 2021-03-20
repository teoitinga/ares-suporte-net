import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-perda-de-carga.modal',
  templateUrl: './perda-de-carga.modal.component.html',
  styleUrls: ['./perda-de-carga.modal.component.css']
})
export class ModalPerdaDeCargaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
