import { FlightFilterFields, Trip } from '@/models/trip.types';
import { Injectable, resource } from '@angular/core';
import { fetchApi } from '../api/api.config';
import { BaseQueryParamsService } from '../shared/baseQueryParams.service';

export type TripsResponse = {
  items: Trip[];
  total: number;
  limit: number;
  page: number;
};
export const TRIPS_PER_PAGE = 5;

export const INITIAL_QUERY_PARAMS: Partial<FlightFilterFields> = {
  page: 1,
  limit: TRIPS_PER_PAGE,
  sortBy: 'creationDate',
  sortOrder: 'ASC',
  minRating: 1,
  maxPrice: 10000,
  minPrice: 1
};

@Injectable({
  providedIn: 'root'
})
export class TripsService extends BaseQueryParamsService<Promise<TripsResponse>> {

  tripsResource = resource({
    request: () => this.getQueryParams(),
    loader: ({ request, abortSignal }) => this.fetchData(request, abortSignal)
  });

  constructor() {
    super('trips-filters', INITIAL_QUERY_PARAMS);
  }

  private init() {
    this.setQueryParams(INITIAL_QUERY_PARAMS);
  }

  override reset(): void {
    super.reset();
    this.init();
  }

  override async fetchData(
    queryParams: Partial<FlightFilterFields> | undefined,
    abortSignal: AbortSignal
  ): Promise<TripsResponse> {
    const res = await fetchApi<TripsResponse>('/trips/', { params: queryParams , signal: abortSignal });
    return res;
  }
}
