import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteViewsComponent } from './cliente-views.component';

describe('ClienteViewsComponent', () => {
  let component: ClienteViewsComponent;
  let fixture: ComponentFixture<ClienteViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
