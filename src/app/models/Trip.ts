export type VerticalType = 'flight' | 'train' | 'car' | 'hotel';
export interface Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: VerticalType;
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
  page: number;
  limit: number;
};
export const flightSortByFields: Array<keyof Trip> = ['title', 'price', 'rating', 'creationDate'];
export const flightFilterFields: Array<keyof FlightFilterFields> = [
  'title',
  'minPrice',
  'maxPrice',
  'minRating',
  'maxRating',
  'tags',
  'page',
  'limit'
];
export const flightSessionKey = 'flightSession';
