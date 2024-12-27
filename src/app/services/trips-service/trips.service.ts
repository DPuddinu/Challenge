import { FlightFilterFields, Trip } from '@/models/trip.types';
import { Injectable, resource } from '@angular/core';
import { fetchApi } from '../api/api.config';
import { BaseQueryParamsService } from '../shared/baseQueryParams.service';
import { INITIAL_QUERY_PARAMS } from './trips.constants';

export type TripsResponse = {
  items: Trip[];
  total: number;
  limit: number;
  page: number;
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

  override async fetchData(
    queryParams: Partial<FlightFilterFields> | undefined,
    abortSignal: AbortSignal
  ): Promise<TripsResponse> {
    const res = await fetchApi<TripsResponse>('/trips/', { params: queryParams , signal: abortSignal });
    return res;
  }
}
