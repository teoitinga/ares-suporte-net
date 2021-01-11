import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMunicipioComponent } from './search-municipio.component';

describe('SearchMunicipioComponent', () => {
  let component: SearchMunicipioComponent;
  let fixture: ComponentFixture<SearchMunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
