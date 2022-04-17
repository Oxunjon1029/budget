import { TestBed } from '@angular/core/testing';

import { SnackbarserviceService } from './snackbarservice.service';

describe('SnackbarserviceService', () => {
  let service: SnackbarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
