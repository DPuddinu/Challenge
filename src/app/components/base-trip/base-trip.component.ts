import { RatingCalculable } from '@/models/rating-calculable';
import { Trip } from '@/models/trip.types';
import { TripScore } from '@/models/tripScore';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-base-trip',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTripComponent implements RatingCalculable<Pick<Trip, 'rating' | 'nrOfRatings' | 'co2'>, TripScore> {

  getTripScore(trip: Trip): TripScore {
    return this.calculateRating({ rating: trip.rating, nrOfRatings: trip.nrOfRatings, co2: trip.co2 });
  }
  
  calculateRating({ rating, nrOfRatings, co2 }: Pick<Trip, 'rating' | 'nrOfRatings' | 'co2'>): TripScore {
    // Rating score (0-5) * 20 to get 0-100
    const ratingScore = rating * 20;

    // Ratings count score (0-1000 normalized to 0-100)
    const ratingsCountScore = Math.min(nrOfRatings / 10, 100);

    // CO2 score (inverse, lower is better, normalized to 0-100)
    const maxCO2 = 1000; // assuming this is a reasonable max
    const co2Score = 100 - (Math.min(co2, maxCO2) / maxCO2) * 100;

    // Weighted average
    const finalScore =
      ratingScore * 0.4 + // 40% weight on rating
      ratingsCountScore * 0.3 + // 30% weight on number of ratings
      co2Score * 0.3; // 30% weight on CO2

    // Determine tier
    function getTier(score: number): TripScore['tier'] {
      switch (true) {
        case score >= 80:
          return {
            label: 'awesome',
            color: 'text-gold'
          };
        case score >= 60:
          return {
            label: 'good',
            color: 'text-silver'
          };
        default:
          return {
            label: 'average',
            color: 'text-bronze'
          };
      }
    }

    return {
      score: Math.round(finalScore),
      tier: getTier(finalScore)
    };
  }
}
