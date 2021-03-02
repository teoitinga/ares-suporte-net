import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableServicosComponent } from './template-table-servicos.component';

describe('TemplateTableServicosComponent', () => {
  let component: TemplateTableServicosComponent;
  let fixture: ComponentFixture<TemplateTableServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
