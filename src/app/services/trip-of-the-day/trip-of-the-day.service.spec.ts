import { Trip } from '@/models/trip.types';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TripofthedayService } from './trip-of-the-day.service';
import { take, toArray } from 'rxjs/operators';
import { ErrorState } from '@/utils/toLoadingStateStream';

describe('TripofthedayService', () => {
  let service: TripofthedayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripofthedayService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(TripofthedayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTripOfTheDay', () => {
    const mockTrip: Trip = {
      id: 'test1234',
      title: 'Test Trip',
      description: 'This is a test trip',
      price: 100,
      rating: 4.5,
      nrOfRatings: 100,
      verticalType: 'car',
      tags: ['skiing', 'winter'],
      co2: 100,
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      imageUrl: 'https://example.com/image.jpg',
      creationDate: new Date()
    };

    it('should make HTTP request only once for multiple calls', () => {
      // First call to loadTripOfTheDay
      service.loadTripOfTheDay();

      // Subscribe to the observable to trigger the HTTP request
      service.getTripOfTheDay()?.subscribe();

      // Expect the HTTP request to be made
      const req = httpMock.expectOne('/trips/random/trip-of-the-day');
      expect(req.request.method).toBe('GET');
      req.flush(mockTrip); // Respond with mock data

      // Second call to loadTripOfTheDay
      service.loadTripOfTheDay();

      // Assert that no new HTTP request was made
      httpMock.expectNone('/trips/random/trip-of-the-day');
    });



    it('should emit loading state and then data', async () => {
      // Trigger the load
      service.loadTripOfTheDay();
      const tripStream = service.getTripOfTheDay();

      expect(tripStream).toBeTruthy();
      if (!tripStream) return;

      // Collect all emissions (loading and loaded states)
      const emissionsPromise = firstValueFrom(tripStream.pipe(take(2), toArray()));

      // Simulate HTTP response
      const req = httpMock.expectOne('/trips/random/trip-of-the-day');
      expect(req.request.method).toBe('GET');
      req.flush(mockTrip);

      // Await emissions
      const emissions = await emissionsPromise;

      // Assert emissions
      expect(emissions).toEqual([{ state: 'loading' }, { state: 'loaded', data: mockTrip }]);
    });


    it('should handle error states', async () => {
      // Trigger the load
      service.loadTripOfTheDay();
      const tripStream = service.getTripOfTheDay();

      expect(tripStream).toBeTruthy();
      if (!tripStream) return;

      // Collect all emissions (loading and error states)
      const emissionsPromise = firstValueFrom(tripStream.pipe(take(2), toArray()));

      // Simulate HTTP error
      const req = httpMock.expectOne('/trips/random/trip-of-the-day');
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });

      // Await emissions
      const emissions = await emissionsPromise;

      // Assert emissions
      expect(emissions[0]).toEqual({ state: 'loading' });
      expect(emissions[1].state).toBe('error');
      expect((emissions[1] as ErrorState).error.message).toBe(
        'Http failure response for /trips/random/trip-of-the-day: 500 Internal Server Error'
      );
    });

  });

  describe('getTripOfTheDay', () => {
    it('should return undefined if loadTripOfTheDay was not called', () => {
      const result = service.getTripOfTheDay();
      expect(result).toBeUndefined();
    });
  });
});
