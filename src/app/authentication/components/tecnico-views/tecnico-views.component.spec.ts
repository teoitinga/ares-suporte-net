import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoViewsComponent } from './tecnico-views.component';

describe('TecnicoViewsComponent', () => {
  let component: TecnicoViewsComponent;
  let fixture: ComponentFixture<TecnicoViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
