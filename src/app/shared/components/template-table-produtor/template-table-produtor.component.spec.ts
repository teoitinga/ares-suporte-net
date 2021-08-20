import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableProdutorComponent } from './template-table-produtor.component';

describe('TemplateTableProdutorComponent', () => {
  let component: TemplateTableProdutorComponent;
  let fixture: ComponentFixture<TemplateTableProdutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableProdutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableProdutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
