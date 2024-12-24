export interface RatingCalculable<T, K> {
  calculateRating(args: T): K;
}
