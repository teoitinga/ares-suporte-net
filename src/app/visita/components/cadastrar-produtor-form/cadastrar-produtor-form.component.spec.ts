import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProdutorFormComponent } from './cadastrar-produtor-form.component';

describe('CadastrarProdutorFormComponent', () => {
  let component: CadastrarProdutorFormComponent;
  let fixture: ComponentFixture<CadastrarProdutorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarProdutorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarProdutorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
