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
    let { ease_factor, interval, repetitions } = previousState;

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
        new_interval = 6; // SM-2 uses 6 for second repetition usually, or 3. User requested: 1, 3, 7??
        // User request: "1, 3, 7, 14...".
        // SM-2 standard is 1, 6. But let's follow user prompt if specific?
        // User prompt says: "interval INTEGER DEFAULT 1... (1, 3, 7, 14, 30...)"
        // But also says "Implement SuperMemo 2 algorithm... (industry standard)".
        // And "if repetitions === 1 -> new_interval = 3".
        // I will follow the pseudo-code provided in the prompt strictly.
        // Prompt pseudo-code: if reps==1 -> interval=3.
        new_interval = 3;
      } else {
        new_interval = Math.round(interval * new_ef);
      }
      new_repetitions = repetitions + 1;
    } else {
      // Incorrect response (quality < 3)
      new_interval = 1;
      new_repetitions = 0; // Reset repetitions (Prompt says 1? No, prompt says "NEW_REPETITIONS = 0 // Reset to beginning", but code says "new_repetitions = 1". I'll use 0 as logically "reset to start", but prompt pseudo-code says:
      /*
              ELSE: // Problem failed - reset
              NEW_INTERVAL = 1
              NEW_REPETITIONS = 0 // Reset to beginning
              
              ...but in code block...
              } else {
                  // Problem failed - restart
                  new_interval = 1;
                  new_repetitions = 1;
              }
            */
      // Code block says 1. Logic says 0. Usually reset means count starts over. If count is 0, next rep is 1.
      // If I set 0, next successful attempt makes it 1.
      // If I set 1, next successful attempt makes it 2.
      // I will set to 0 to be safer (restart learning).
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
