import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcoesComponent } from './lista-acoes.component';

describe('ListaAcoesComponent', () => {
  let component: ListaAcoesComponent;
  let fixture: ComponentFixture<ListaAcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
