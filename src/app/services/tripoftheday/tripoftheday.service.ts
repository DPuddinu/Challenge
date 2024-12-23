import { Trip } from '@/models/Trip';
import { LoadingState, toLoadingStateStream } from '@/utils/toLoadingStateStream';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripofthedayService {
  private readonly http = inject(HttpClient);
  private tripOfTheDay$: Observable<LoadingState<Trip>> | undefined;

  getTripOfTheDay() {
    return this.tripOfTheDay$;
  }

  loadTripOfTheDay() {
    this.tripOfTheDay$ = toLoadingStateStream<Trip>(this.http.get<Trip>('/trips/random/trip-of-the-day'));
  }
}
