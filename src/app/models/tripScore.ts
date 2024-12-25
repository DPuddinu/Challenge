
type TripScoreTier = 'average' | 'good' | 'awesome';
export interface TripScore {
  score: number;
  tier: {
    label: TripScoreTier;
    color: string;
  };
}
