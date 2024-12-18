import { VerticalType } from "@/models/Flight";

export const icons = ['star', 'flight', 'train', 'car', 'hotel'] as const;
export type IconName = (typeof icons)[number];

export const iconClassMap: Record<VerticalType, string> = {
  train: 'text-green-500',
  flight: 'text-blue-500',
  hotel: 'text-yellow-500',
  car: 'text-red-500'
};