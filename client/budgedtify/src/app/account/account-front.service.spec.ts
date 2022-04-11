import { TestBed } from '@angular/core/testing';

import { AccountFrontService } from './account-front.service';

describe('AccountFrontService', () => {
  let service: AccountFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
