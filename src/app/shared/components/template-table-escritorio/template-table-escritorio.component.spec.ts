import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableEscritorioComponent } from './template-table-escritorio.component';

describe('TemplateTableEscritorioComponent', () => {
  let component: TemplateTableEscritorioComponent;
  let fixture: ComponentFixture<TemplateTableEscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTableEscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTableEscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
