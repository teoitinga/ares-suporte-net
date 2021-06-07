import { Categoria, CATEGORIAS, RebanhoModel } from './../rebanho-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../service/responses-messages.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'template-rebanho',
  templateUrl: './template-rebanho.component.html',
  styleUrls: ['./template-rebanho.component.css']
})
export class TemplateRebanhoComponent implements OnInit {
  
  categoria: Categoria[] = [];

  @Input() rebanho: RebanhoModel[] = [];

  @Output() updated = new EventEmitter();
  
  //Animal do rebanho em edição
  animalSelected: RebanhoModel;

  formCalc: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.categoria = CATEGORIAS;
  }

  ngOnInit(): void {
    this.formCalc = this.fb.group({
      categoria: ['', Validators.required],
      quantidade: ['', Validators.required],
    });

  }
  incluir(value: any){
    
    event.preventDefault();

    const catAnimal: RebanhoModel = this.formCalc.value;
        
    console.log(this.formCalc.value);

    //verifica se existe o produtor na lista
    const containing = this.rebanho.find(pr => pr == catAnimal);

    if (!containing) {

      this.rebanho.push(catAnimal);
      this.clearForm();

    } else {
      this.messageService.sendError(this._snackBar, "Erro", "Você já registrou esta categoria animal");
    }

    //emitindo notificação para atualização de serviço
    //this.updated.emit(this.rebanho);
    this.clearForm();
  }
  clearForm() {
    this.animalSelected = null;
    this.formCalc = this.fb.group({
      categoria: ['', Validators.required],
      quantidade: ['', Validators.required],
    });    
  }
  calcular(value: any){
    this.updated.emit(this.rebanho);
  }
}
