import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissaoDapComponent } from './emissao-dap.component';

describe('EmissaoDapComponent', () => {
  let component: EmissaoDapComponent;
  let fixture: ComponentFixture<EmissaoDapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissaoDapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissaoDapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
