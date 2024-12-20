import { TestBed } from '@angular/core/testing';
import { TripsService } from './flight.service';

describe('FilterService', () => {
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
