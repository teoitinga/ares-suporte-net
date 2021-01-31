import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteViewsComponent } from './gerente-views.component';

describe('GerenteViewsComponent', () => {
  let component: GerenteViewsComponent;
  let fixture: ComponentFixture<GerenteViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenteViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
