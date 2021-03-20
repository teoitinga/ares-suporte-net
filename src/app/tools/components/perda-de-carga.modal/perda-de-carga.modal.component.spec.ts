import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdaDeCarga.ModalComponent } from './perda-de-carga.modal.component';

describe('PerdaDeCarga.ModalComponent', () => {
  let component: PerdaDeCarga.ModalComponent;
  let fixture: ComponentFixture<PerdaDeCarga.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdaDeCarga.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdaDeCarga.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
