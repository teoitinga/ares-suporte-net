import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvUmEmaterComponent } from './conv-um-emater.component';

describe('ConvUmEmaterComponent', () => {
  let component: ConvUmEmaterComponent;
  let fixture: ComponentFixture<ConvUmEmaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvUmEmaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvUmEmaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
