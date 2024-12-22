import { Trip } from '@/models/Trip';
import { inject, Injectable, resource, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { fetchApi } from '../api/api.config';

@Injectable({
  providedIn: 'root'
})
export class TripofthedayService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly tripOfTheDay = signal<Trip | null>(null);
  private readonly lastFetchDate = signal<string | null>(null);

  tripsResource = resource({
    loader: ({ abortSignal }) => this.fetchTripOfTheDay(abortSignal)
  });

  constructor() {
    // Listen for service worker updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        // Clear signals when new version is available
        this.tripOfTheDay.set(null);
        this.lastFetchDate.set(null);
      });
    }
  }
  private async fetchTripOfTheDay(abortSignal: AbortSignal): Promise<Trip> {
    const today = new Date().toDateString();
    const currentTrip = this.tripOfTheDay();
    const lastFetch = this.lastFetchDate();

    // Return cached trip if it's from today
    if (currentTrip && lastFetch === today) {
      return currentTrip;
    }

    try {
      const trip = await fetchApi<Trip>(`/trips/random/trip-of-the-day`, {
        signal: abortSignal,
        headers: {
          'Cache-Control': 'max-age=86400' // 24 hours
        }
      });

      // Update signals
      this.lastFetchDate.set(today);

      return trip;
    } catch (error) {
      // If offline and we have a cached trip, return it
      if (!navigator.onLine && currentTrip) {
        return currentTrip;
      }
      throw error;
    }
  }
}
