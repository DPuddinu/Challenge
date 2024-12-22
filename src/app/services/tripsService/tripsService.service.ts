import { FlightFilterFields } from '@/models/Trip';
import { Injectable, resource } from '@angular/core';
import { fetchApi } from '../api/api.config';
import { BaseQueryParamsService } from '../shared/baseQueryParams.service';
import type { FlightResponse } from './trips.types';

const DEFAULT_LIMIT = 6;

@Injectable({
  providedIn: 'root'
})
export class TripsService extends BaseQueryParamsService<Promise<FlightResponse>> {
  tripsResource = resource({
    request: () => this.getQueryParams(),
    loader: ({ request, abortSignal }) => this.fetchData(request, abortSignal)
  });

  constructor() {
    super('trips-filters');
    this.init();
  }

  init() {
    this.setQueryParams({
      page: 1,
      limit: DEFAULT_LIMIT
    });
  }

  override reset(): void {
    super.reset();
    this.init();
  }

  protected override async fetchData(
    queryParams: Partial<FlightFilterFields> | null,
    abortSignal: AbortSignal
  ): Promise<FlightResponse> {
    const res = await fetchApi<FlightResponse>('/trips/', { params: queryParams ?? undefined, signal: abortSignal });
    return res;
  }
}
