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
export const flightSortByFields = ['title', 'price', 'rating', 'creationDate'] as const;
export type FlightFilterFields = {
  titleFilter: string;
  sortBy: (typeof flightSortByFields)[number];
  sortOrder: 'ASC' | 'DESC';
  // minPrice: number;
  // maxPrice: number;
  // minRating: number;
  // tags: string[];
  page: number;
  limit: number;
};
export const flightFilterFields: Array<keyof FlightFilterFields> = [
  'titleFilter',
  // 'minPrice',
  // 'maxPrice',
  // 'minRating',
  // 'tags',
  'page',
  'limit'
];
export const flightSessionKey = 'flightSession';
