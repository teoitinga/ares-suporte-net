import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServicosComponent } from './search-servicos.component';

describe('SearchServicosComponent', () => {
  let component: SearchServicosComponent;
  let fixture: ComponentFixture<SearchServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
