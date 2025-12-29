export interface ReviewItem {
    id: string;
    interval: number; // Current interval in days
    repetition: number; // Number of successful reviews
    easeFactor: number; // Review ease factor (min 1.3)
    lastReviewDate: number; // Timestamp of last review
    dueDate: number; // Timestamp of next due date
}

// Initial state for a new item
export const createReviewItem = (id: string): ReviewItem => ({
    id,
    interval: 0,
    repetition: 0,
    easeFactor: 2.5,
    lastReviewDate: Date.now(),
    dueDate: Date.now(),
});

// Quality ratings: 0 (blackout) to 5 (perfect)
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

// Calculate next review state using SuperMemo-2 (SM-2) algorithm
export const calculateNextReview = (
    item: ReviewItem,
    quality: ReviewQuality
): ReviewItem => {
    let { interval, repetition, easeFactor } = item;

    // 1. Update Ease Factor
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q)*0.02))
    if (quality >= 3) {
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
        // If failed, reset repetition
        repetition = 0;
        interval = 1;
    }

    if (easeFactor < 1.3) easeFactor = 1.3;

    // 2. Update Repetition & Interval
    if (quality >= 3) {
        if (repetition === 0) {
            interval = 1;
        } else if (repetition === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetition += 1;
    }

    const now = Date.now();
    const nextDueDate = now + interval * 24 * 60 * 60 * 1000;

    return {
        id: item.id,
        interval,
        repetition,
        easeFactor,
        lastReviewDate: now,
        dueDate: nextDueDate,
    };
};

// Helper: Get urgency color
export const getUrgencyColor = (dueDate: number): string => {
    const diffHours = (Date.now() - dueDate) / (1000 * 60 * 60); // Positive = Overdue

    if (diffHours > 24) return 'bg-red-500/20 text-red-400 border-red-500/30'; // Very overdue
    if (diffHours > 0) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'; // Due now/recently
    return 'bg-green-500/20 text-green-400 border-green-500/30'; // Not due yet
};

// Helper: Format due time
export const formatDueTime = (dueDate: number): string => {
    const diffHours = (dueDate - Date.now()) / (1000 * 60 * 60);

    if (diffHours < 0) return 'Overdue';
    if (diffHours < 1) return '< 1h';
    if (diffHours < 24) return `${Math.ceil(diffHours)}h`;
    return `${Math.ceil(diffHours / 24)}d`;
};
