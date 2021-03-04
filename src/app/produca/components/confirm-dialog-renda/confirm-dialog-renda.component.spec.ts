import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogRendaComponent } from './confirm-dialog-renda.component';

describe('ConfirmDialogRendaComponent', () => {
  let component: ConfirmDialogRendaComponent;
  let fixture: ComponentFixture<ConfirmDialogRendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogRendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
