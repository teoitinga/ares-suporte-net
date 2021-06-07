import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableRebanhoComponent } from './template-table-rebanho.component';

describe('TemplateTableRebanhoComponent', () => {
  let component: TemplateTableRebanhoComponent;
  let fixture: ComponentFixture<TemplateTableRebanhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableRebanhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableRebanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
