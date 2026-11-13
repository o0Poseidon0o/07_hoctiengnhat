import { createEmptyCard, fsrs, Rating, State, type Card, type Grade } from 'ts-fsrs';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface StoredCardState {
  vocabId: string;
  due: string; // ISO string
  stability: number;
  difficulty: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  learning_steps: number;
  state: number;
  last_review?: string;
}

const scheduler = fsrs();

const RATING_MAP: Record<ReviewRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

function toFsrsCard(stored?: StoredCardState | null): Card {
  if (!stored) return createEmptyCard(new Date());
  return {
    due: new Date(stored.due),
    stability: stored.stability,
    difficulty: stored.difficulty,
    scheduled_days: stored.scheduled_days,
    reps: stored.reps,
    lapses: stored.lapses,
    learning_steps: stored.learning_steps ?? 0,
    state: stored.state as State,
    last_review: stored.last_review ? new Date(stored.last_review) : undefined,
  };
}

export function scheduleCardReview(
  vocabId: string,
  rating: ReviewRating,
  current?: StoredCardState | null,
  now = new Date(),
): StoredCardState {
  const card = toFsrsCard(current);
  const next = scheduler.next(card, now, RATING_MAP[rating]).card;
  return {
    vocabId,
    due: next.due.toISOString(),
    stability: next.stability,
    difficulty: next.difficulty,
    scheduled_days: next.scheduled_days,
    reps: next.reps,
    lapses: next.lapses,
    learning_steps: next.learning_steps,
    state: next.state,
    last_review: next.last_review ? next.last_review.toISOString() : now.toISOString(),
  };
}

export function formatIntervalHint(dueIso: string, now = new Date()): string {
  const diffMs = new Date(dueIso).getTime() - now.getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins} phút`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} giờ`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} ngày`;
  const months = Math.round(days / 30);
  return `${months} tháng`;
}

export function previewIntervals(current?: StoredCardState | null): Record<ReviewRating, string> {
  const now = new Date();
  const ratings: ReviewRating[] = ['again', 'hard', 'good', 'easy'];
  const out = {} as Record<ReviewRating, string>;
  for (const r of ratings) {
    const next = scheduleCardReview(current?.vocabId ?? 'preview', r, current, now);
    out[r] = formatIntervalHint(next.due, now);
  }
  return out;
}
