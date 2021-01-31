import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesbloqueioDapComponent } from './desbloqueio-dap.component';

describe('DesbloqueioDapComponent', () => {
  let component: DesbloqueioDapComponent;
  let fixture: ComponentFixture<DesbloqueioDapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesbloqueioDapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesbloqueioDapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
