import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRebanhoComponent } from './template-rebanho.component';

describe('TemplateRebanhoComponent', () => {
  let component: TemplateRebanhoComponent;
  let fixture: ComponentFixture<TemplateRebanhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRebanhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRebanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
