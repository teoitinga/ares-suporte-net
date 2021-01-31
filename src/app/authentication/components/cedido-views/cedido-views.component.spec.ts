import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CedidoViewsComponent } from './cedido-views.component';

describe('CedidoViewsComponent', () => {
  let component: CedidoViewsComponent;
  let fixture: ComponentFixture<CedidoViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CedidoViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CedidoViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
