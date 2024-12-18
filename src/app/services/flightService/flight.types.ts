import { Trip } from '@/models/Trip';

export type FlightResponse = {
  items: Trip[];
  total: number;
  limit: number;
  page: number;
};
