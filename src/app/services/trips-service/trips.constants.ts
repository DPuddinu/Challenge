import { FlightFilterFields } from "@/models/trip.types";

export const TRIPS_PER_PAGE = 5;

export const INITIAL_QUERY_PARAMS: Partial<FlightFilterFields> = {
  page: 1,
  limit: TRIPS_PER_PAGE,
  sortBy: 'creationDate',
  sortOrder: 'ASC',
  minRating: 1,
  maxPrice: 10000,
  minPrice: 1
};
