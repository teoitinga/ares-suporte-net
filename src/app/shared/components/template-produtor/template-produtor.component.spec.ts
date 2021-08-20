import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProdutorComponent } from './template-produtor.component';

describe('TemplateProdutorComponent', () => {
  let component: TemplateProdutorComponent;
  let fixture: ComponentFixture<TemplateProdutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProdutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProdutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
