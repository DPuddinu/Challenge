import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { TripofthedayService } from './trip-of-the-day.service';

describe('TripofthedayService', () => {
  let service: TripofthedayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(TripofthedayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
