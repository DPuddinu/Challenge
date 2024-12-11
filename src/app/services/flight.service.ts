import { Injectable, resource } from '@angular/core';
import { BaseQueryParamsService } from './shared/baseQueryParams.service';
import { Flight, FlightFilterFields } from '@/models/Flight';
import { environment } from 'environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FlightService extends BaseQueryParamsService<Partial<FlightFilterFields>, Promise<Flight[]>> {
  
  flightsResource = resource({
    request: () => this.getQueryParams(),
    loader: ({request, abortSignal}) => this.fetchData(request, abortSignal),
    
  })
  
  constructor() {
    super('flight-filters');
  }


  protected override async fetchData(queryParams: Partial<FlightFilterFields> | null, abortSignal: AbortSignal): Promise<Flight[]> {
    const baseUrl = `${environment.apiUrl}/trips`;
    const url = queryParams ? `${baseUrl}?${this.getQueryParamsString(queryParams)}` : baseUrl;
    const res = await fetch(url, {signal: abortSignal});
    if (!res.ok) {
      throw new Error('Failed to fetch flights');
    }

    return res.json() as Promise<Flight[]>;
  }
}
