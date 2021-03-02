import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProdutorMinComponent } from './template-produtor-min.component';

describe('TemplateProdutorMinComponent', () => {
  let component: TemplateProdutorMinComponent;
  let fixture: ComponentFixture<TemplateProdutorMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProdutorMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProdutorMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
