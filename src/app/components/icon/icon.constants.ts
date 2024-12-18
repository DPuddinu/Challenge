export const icons = ['star', 'flight', 'train', 'car', 'hotel', 'crown'] as const;
export type IconName = (typeof icons)[number];

