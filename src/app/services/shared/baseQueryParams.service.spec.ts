import { BaseQueryParamsService, TQueryParams } from './baseQueryParams.service';

class TestQueryParamsService extends BaseQueryParamsService<void> {
  protected fetchData(_queryParams: TQueryParams | null, _abortSignal: AbortSignal): void {
    // Mock implementation for testing
  }
}

describe('BaseQueryParamsService', () => {
  let service: TestQueryParamsService;
  const storageKey = 'testKey';

  beforeEach(() => {
    service = new TestQueryParamsService(storageKey);
    sessionStorage.clear(); // Clear session storage before each test
  });

  it('should initialize with stored query params', () => {
    const params = { key1: 'value1' };
    sessionStorage.setItem(storageKey, JSON.stringify(params));
    const newService = new TestQueryParamsService(storageKey);
    expect(newService.getQueryParams()).toEqual(params);
  });

  it('should set a single query param', () => {
    service.reset();
    service.setQueryParam('key1', 'value1');
    expect(service.getQueryParams()).toEqual({ key1: 'value1' });
  });

  it('should set multiple query params', () => {
    service.setQueryParams({ key1: 'value1', key2: 'value2' });
    expect(service.getQueryParams()).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should reset query params', () => {
    service.setQueryParam('key1', 'value1');
    service.reset();
    expect(service.getQueryParams()).toBeNull();
  });

  it('should delete stored query params', () => {
    service.setQueryParam('key1', 'value1');
    service.deleteStoredQueryParams();
    expect(service.getStoredQueryParams()).toBeNull();
  });
}); 