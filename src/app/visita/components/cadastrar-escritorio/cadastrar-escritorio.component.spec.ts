import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEscritorioComponent } from './cadastrar-escritorio.component';

describe('CadastrarEscritorioComponent', () => {
  let component: CadastrarEscritorioComponent;
  let fixture: ComponentFixture<CadastrarEscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
