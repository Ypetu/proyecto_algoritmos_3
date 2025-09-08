import { TestBed } from '@angular/core/testing';

import { ErrorMessagesServiceService } from './error-messages.service.service';

describe('ErrorMessagesServiceService', () => {
  let service: ErrorMessagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
