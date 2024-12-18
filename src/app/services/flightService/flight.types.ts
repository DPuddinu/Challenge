import { Flight } from "@/models/Flight";

export type FlightResponse = {
  items: Flight[];
  total: number;
  limit: number;
  page: number;
};
