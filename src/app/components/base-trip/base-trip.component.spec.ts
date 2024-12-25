import { TripScore } from '@/models/tripScore';
import { BaseTripComponent } from './base-trip.component';

describe('BaseTripComponent', () => {
  let component: BaseTripComponent;

  beforeEach(() => {
    component = new BaseTripComponent();
  });

  it('should calculate average tier rating correctly', () => {
    const input = { rating: 4, nrOfRatings: 50, co2: 200 };
    const expectedScore: TripScore = { score: 58, tier: { label: 'average', color: 'text-bronze' } };
    
    const result = component.calculateRating(input);
    
    expect(result).toEqual(expectedScore);
  });

  it('should calculate silver tier rating correctly', () => {
    const input = { rating: 4, nrOfRatings: 50, co2: 50 };
    const expectedScore: TripScore = { score: 62, tier: { label: 'good', color: 'text-silver' } };
    
    const result = component.calculateRating(input);
    
    expect(result).toEqual(expectedScore);
  });

  it('should calculate gold tier rating correctly', () => {
    const input = { rating: 5, nrOfRatings: 800, co2: 0 };
    const expectedScore: TripScore = { score: 94, tier: { label: 'awesome', color: 'text-gold' } };
    
    const result = component.calculateRating(input);
    
    expect(result).toEqual(expectedScore);
  });
});
