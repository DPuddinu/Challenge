import { Injectable, resource } from '@angular/core';
import { BaseQueryParamsService } from '../shared/baseQueryParams.service';
import { FlightFilterFields } from '@/models/Trip';
import { environment } from 'environments/environment.dev';
import type { FlightResponse } from './flight.types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class FlightService extends BaseQueryParamsService<Partial<FlightFilterFields>, Promise<FlightResponse>> {
  flightsResource = resource({
    request: () => this.getQueryParams(),
    loader: ({ request, abortSignal }) => this.fetchData(request, abortSignal)
  });

  constructor() {
    super('flight-filters');
    this.setQueryParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT
    });
  }

  protected override async fetchData(
    queryParams: Partial<FlightFilterFields> | null,
    abortSignal: AbortSignal
  ): Promise<FlightResponse> {
    const baseUrl = `${environment.apiUrl}/trips`;
    const url = queryParams ? `${baseUrl}?${this.getQueryParamsString(queryParams)}` : baseUrl;
    const res = await fetch(url, { signal: abortSignal });
    if (!res.ok) {
      throw new Error('Failed to fetch flights');
    }

    return res.json() as Promise<FlightResponse>;
  }
}
