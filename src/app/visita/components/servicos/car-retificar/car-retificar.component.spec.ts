import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRetificarComponent } from './car-retificar.component';

describe('CarRetificarComponent', () => {
  let component: CarRetificarComponent;
  let fixture: ComponentFixture<CarRetificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRetificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRetificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
