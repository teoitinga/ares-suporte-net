import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRendaComponent } from './info-renda.component';

describe('InfoRendaComponent', () => {
  let component: InfoRendaComponent;
  let fixture: ComponentFixture<InfoRendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
