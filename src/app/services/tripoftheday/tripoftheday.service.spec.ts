import { TestBed } from '@angular/core/testing';

import { TripofthedayService } from './tripoftheday.service';

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
