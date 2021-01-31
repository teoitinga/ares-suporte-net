import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorViewsComponent } from './administrador-views.component';

describe('AdministradorViewsComponent', () => {
  let component: AdministradorViewsComponent;
  let fixture: ComponentFixture<AdministradorViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
