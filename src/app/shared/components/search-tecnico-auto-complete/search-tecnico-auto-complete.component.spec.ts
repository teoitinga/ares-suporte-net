import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTecnicoAutoCompleteComponent } from './search-tecnico-auto-complete.component';

describe('SearchTecnicoAutoCompleteComponent', () => {
  let component: SearchTecnicoAutoCompleteComponent;
  let fixture: ComponentFixture<SearchTecnicoAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTecnicoAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTecnicoAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
