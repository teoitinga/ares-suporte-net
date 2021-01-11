import { TestBed } from '@angular/core/testing';

import { SearchMunicipioService } from './search-municipio.service';

describe('SearchMunicipioService', () => {
  let service: SearchMunicipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMunicipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
