import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableProducaoComponent } from './template-table-producao.component';

describe('TemplateTableProducaoComponent', () => {
  let component: TemplateTableProducaoComponent;
  let fixture: ComponentFixture<TemplateTableProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
