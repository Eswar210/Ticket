import { TestBed } from '@angular/core/testing';

import { ChangerequestService } from './changerequest.service';

describe('ChangerequestService', () => {
  let service: ChangerequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangerequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
