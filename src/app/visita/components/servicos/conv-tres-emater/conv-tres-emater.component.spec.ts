import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvTresEmaterComponent } from './conv-tres-emater.component';

describe('ConvTresEmaterComponent', () => {
  let component: ConvTresEmaterComponent;
  let fixture: ComponentFixture<ConvTresEmaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvTresEmaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvTresEmaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
