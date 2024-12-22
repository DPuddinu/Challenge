export const icons = ['star', 'flight', 'train', 'car', 'hotel', 'crown', 'house'] as const;
export type IconName = (typeof icons)[number];

