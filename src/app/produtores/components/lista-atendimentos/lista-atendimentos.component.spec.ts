import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAtendimentosComponent } from './lista-atendimentos.component';

describe('ListaAtendimentosComponent', () => {
  let component: ListaAtendimentosComponent;
  let fixture: ComponentFixture<ListaAtendimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAtendimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
