import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdaDeCargaComponent } from './perda-de-carga.component';

describe('PerdaDeCargaComponent', () => {
  let component: PerdaDeCargaComponent;
  let fixture: ComponentFixture<PerdaDeCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdaDeCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdaDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
