import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvDoisEmaterComponent } from './conv-dois-emater.component';

describe('ConvDoisEmaterComponent', () => {
  let component: ConvDoisEmaterComponent;
  let fixture: ComponentFixture<ConvDoisEmaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvDoisEmaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvDoisEmaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
