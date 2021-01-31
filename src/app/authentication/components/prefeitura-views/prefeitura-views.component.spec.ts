import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefeituraViewsComponent } from './prefeitura-views.component';

describe('PrefeituraViewsComponent', () => {
  let component: PrefeituraViewsComponent;
  let fixture: ComponentFixture<PrefeituraViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefeituraViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefeituraViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
