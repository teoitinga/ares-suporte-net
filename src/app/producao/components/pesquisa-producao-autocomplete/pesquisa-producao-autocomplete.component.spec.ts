import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaProducaoAutocompleteComponent } from './pesquisa-producao-autocomplete.component';

describe('PesquisaProducaoAutocompleteComponent', () => {
  let component: PesquisaProducaoAutocompleteComponent;
  let fixture: ComponentFixture<PesquisaProducaoAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaProducaoAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaProducaoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
