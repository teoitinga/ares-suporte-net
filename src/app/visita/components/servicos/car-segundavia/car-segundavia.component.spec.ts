import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSegundaviaComponent } from './car-segundavia.component';

describe('CarSegundaviaComponent', () => {
  let component: CarSegundaviaComponent;
  let fixture: ComponentFixture<CarSegundaviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSegundaviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSegundaviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
