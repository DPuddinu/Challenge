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

@Injectable({
  providedIn: 'root'
})
export class TripsService extends BaseQueryParamsService<Promise<TripsResponse>> {
  tripsResource = resource({
    request: () => this.getQueryParams(),
    loader: ({ request, abortSignal }) => this.fetchData(request, abortSignal)
  });

  constructor() {
    super('trips-filters');
    this.init();
  }

  private init() {
    this.setQueryParams({
      page: 1,
      limit: TRIPS_PER_PAGE
    });
  }

  override reset(): void {
    super.reset();
    this.init();
  }

  protected override async fetchData(
    queryParams: Partial<FlightFilterFields> | null,
    abortSignal: AbortSignal
  ): Promise<TripsResponse> {
    const res = await fetchApi<TripsResponse>('/trips/', { params: queryParams ?? undefined, signal: abortSignal });
    return res;
  }
}
