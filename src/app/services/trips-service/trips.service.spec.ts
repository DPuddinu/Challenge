import { TestBed } from '@angular/core/testing';
import { TRIPS_PER_PAGE, TripsResponse, TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripsService]
    });
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default query params', () => {
    service.reset();
    const queryParams = service.getQueryParams();
    expect(queryParams).toEqual({
      page: 1,
      limit: TRIPS_PER_PAGE
    });
  });

  it('should fetch data correctly', async () => {
    const mockResponse: TripsResponse = {
      items: [],
      total: 0,
      limit: TRIPS_PER_PAGE,
      page: 1
    };

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: () => Promise.resolve(mockResponse)
    } as Response));

    const controller = new AbortController();
    const response = await service.fetchData(null, controller.signal);
    expect(response).toEqual(mockResponse);
  });

  it('should handle fetch errors', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers(),
      redirected: false,
      type: 'default',
      url: '',
      json: () => Promise.reject(new Error('Fetch error'))
    } as Response));

    const controller = new AbortController();
    try {
      await service.fetchData(null, controller.signal);
    } catch (error) {
      expect((error as Error).message).toEqual('HTTP Error 404');
    }
  });

  it('should reset query params', () => {
    service.reset();
    const queryParams = service.getQueryParams();
    expect(queryParams).toEqual({
      page: 1,
      limit: TRIPS_PER_PAGE
    });
  });
});
