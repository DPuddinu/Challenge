export interface Flight {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: string;
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: Date;
}
export type FlightFilterFields = {
  title: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  maxRating: number;
  tags: string[];
};
export const flightSortByFields: Array<keyof Flight> = ['title', 'price', 'rating', 'creationDate'];
export const flightFilterFields: Array<keyof FlightFilterFields> = ['title', 'minPrice', 'maxPrice', 'minRating', 'maxRating', 'tags'];
export const flightSessionKey = 'flightSession';