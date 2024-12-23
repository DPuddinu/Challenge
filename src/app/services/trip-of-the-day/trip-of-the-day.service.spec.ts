import { TestBed } from '@angular/core/testing';

import { TripofthedayService } from './trip-of-the-day.service';

describe('TripofthedayService', () => {
  let service: TripofthedayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripofthedayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
