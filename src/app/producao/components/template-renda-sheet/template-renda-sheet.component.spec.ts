import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRendaSheetComponent } from './template-renda-sheet.component';

describe('TemplateRendaSheetComponent', () => {
  let component: TemplateRendaSheetComponent;
  let fixture: ComponentFixture<TemplateRendaSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRendaSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRendaSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
