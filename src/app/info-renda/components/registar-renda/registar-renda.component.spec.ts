import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarRendaComponent } from './registar-renda.component';

describe('RegistarRendaComponent', () => {
  let component: RegistarRendaComponent;
  let fixture: ComponentFixture<RegistarRendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarRendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
