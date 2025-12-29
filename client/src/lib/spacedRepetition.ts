export interface SRState {
  ease_factor: number;
  interval: number;
  repetitions: number;
}

export interface SRResult extends SRState {
  next_review_date: Date;
}

export class SpacedRepetition {
  /**
   * Calculates the next review schedule using SuperMemo 2 algorithm.
   * @param quality - User rating (0-5)
   * @param previousState - Current state of the card/problem
   * @returns New state and next review date
   */
  static calculate(
    quality: number,
    previousState: SRState = { ease_factor: 2.5, interval: 0, repetitions: 0 },
  ): SRResult {
    const { ease_factor, interval, repetitions } = previousState;

    // Quality must be between 0 and 5
    if (quality < 0) quality = 0;
    if (quality > 5) quality = 5;

    // Calculate new Ease Factor
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    let new_ef =
      ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (new_ef < 1.3) new_ef = 1.3; // Minimum EF is 1.3

    let new_interval: number;
    let new_repetitions: number;

    if (quality >= 3) {
      // Correct response
      if (repetitions === 0) {
        new_interval = 1;
      } else if (repetitions === 1) {
        new_interval = 3; // Follows prompt pseudo-code logic (1->3)
      } else {
        new_interval = Math.round(interval * new_ef);
      }
      new_repetitions = repetitions + 1;
    } else {
      // Incorrect response (quality < 3) - Reset
      new_interval = 1;
      new_repetitions = 0;
    }

    const next_review_date = new Date();
    next_review_date.setDate(next_review_date.getDate() + new_interval);

    return {
      ease_factor: new_ef,
      interval: new_interval,
      repetitions: new_repetitions,
      next_review_date,
    };
  }
}
