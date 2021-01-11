import { TestBed } from '@angular/core/testing';

import { ResponsesErrorsService } from './responses-errors.service';

describe('ResponsesErrorsService', () => {
  let service: ResponsesErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsesErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
