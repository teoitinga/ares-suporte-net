import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProducaoComponent } from './cadastrar-producao.component';

describe('CadastrarProducaoComponent', () => {
  let component: CadastrarProducaoComponent;
  let fixture: ComponentFixture<CadastrarProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
