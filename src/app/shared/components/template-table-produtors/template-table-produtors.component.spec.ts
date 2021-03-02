import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableProdutorsComponent } from './template-table-produtors.component';

describe('TemplateTableProdutorsComponent', () => {
  let component: TemplateTableProdutorsComponent;
  let fixture: ComponentFixture<TemplateTableProdutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableProdutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableProdutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
