import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEscritorioComponent } from './template-escritorio.component';

describe('TemplateEscritorioComponent', () => {
  let component: TemplateEscritorioComponent;
  let fixture: ComponentFixture<TemplateEscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateEscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
