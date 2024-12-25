import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTripComponent } from './base-trip.component';

describe('BaseTripComponent', () => {
  let component: BaseTripComponent;
  let fixture: ComponentFixture<BaseTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTripComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('calculateRating', () => {
    it('should calculate awesome tier for high scores', () => {
      const result = component.calculateRating({
        rating: 5,           // 100 points
        nrOfRatings: 1000,   // 100 points
        co2: 0               // 100 points
      });

      expect(result.score).toBe(100);
      expect(result.tier.label).toBe('awesome');
      expect(result.tier.color).toBe('text-gold');
    });

    it('should calculate good tier for medium-high scores', () => {
      const result = component.calculateRating({
        rating: 4,           // 80 points
        nrOfRatings: 750,    // 75 points
        co2: 250             // 75 points
      });

      expect(result.score).toBe(77);
      expect(result.tier.label).toBe('good');
      expect(result.tier.color).toBe('text-silver');
    });

    it('should calculate average tier for medium scores', () => {
      const result = component.calculateRating({
        rating: 3,           // 60 points
        nrOfRatings: 500,    // 50 points
        co2: 500             // 50 points
      });

      expect(result.score).toBe(54);
      expect(result.tier.label).toBe('average');
      expect(result.tier.color).toBe('text-bronze');
    });

    it('should calculate average tier for low scores', () => {
      const result = component.calculateRating({
        rating: 2,           // 40 points
        nrOfRatings: 100,    // 10 points
        co2: 800             // 20 points
      });

      expect(result.score).toBe(25);
      expect(result.tier.label).toBe('average');
      expect(result.tier.color).toBe('text-bronze');
    });

    it('should handle edge cases correctly', () => {
      const maxCO2Result = component.calculateRating({
        rating: 5,
        nrOfRatings: 1000,
        co2: 2000            // Should be capped at 1000 for 0 points
      });
      expect(maxCO2Result.score).toBe(70); // (100 * 0.4) + (100 * 0.3) + (0 * 0.3)

      const maxRatingsResult = component.calculateRating({
        rating: 5,
        nrOfRatings: 2000,   // Should be capped at 1000 for 100 points
        co2: 0
      });
      expect(maxRatingsResult.score).toBe(100);
    });

    it('should round the final score', () => {
      const result = component.calculateRating({
        rating: 3.7,         // 74 points
        nrOfRatings: 333,    // 33.3 points
        co2: 333             // 66.7 points
      });

      // (74 * 0.4) + (33.3 * 0.3) + (66.7 * 0.3) = 59.99
      expect(result.score).toBe(60);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
