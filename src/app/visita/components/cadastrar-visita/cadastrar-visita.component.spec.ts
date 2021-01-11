import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVisitaComponent } from './cadastrar-visita.component';

describe('CadastrarVisitaComponent', () => {
  let component: CadastrarVisitaComponent;
  let fixture: ComponentFixture<CadastrarVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
