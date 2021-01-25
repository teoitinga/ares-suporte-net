import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEmissaoComponent } from './car-emissao.component';

describe('CarEmissaoComponent', () => {
  let component: CarEmissaoComponent;
  let fixture: ComponentFixture<CarEmissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEmissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEmissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
