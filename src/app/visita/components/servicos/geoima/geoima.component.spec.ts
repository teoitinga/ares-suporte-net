import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoimaComponent } from './geoima.component';

describe('GeoimaComponent', () => {
  let component: GeoimaComponent;
  let fixture: ComponentFixture<GeoimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
