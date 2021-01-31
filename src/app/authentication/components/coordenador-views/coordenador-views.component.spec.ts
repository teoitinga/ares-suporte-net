import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenadorViewsComponent } from './coordenador-views.component';

describe('CoordenadorViewsComponent', () => {
  let component: CoordenadorViewsComponent;
  let fixture: ComponentFixture<CoordenadorViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordenadorViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadorViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
