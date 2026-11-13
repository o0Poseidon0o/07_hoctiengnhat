import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getOrCreateLearnerId, LEARNER_COOKIE, LEARNER_COOKIE_OPTIONS } from '@/lib/learner';
import { getLearnerProgress, saveFlashcardReview } from '@/lib/progress-repo';
import { scheduleCardReview } from '@/lib/srs';

const BodySchema = z.object({
  vocabId: z.string().min(1),
  rating: z.enum(['again', 'hard', 'good', 'easy']),
});

const XP_BY_RATING = {
  again: 2,
  hard: 6,
  good: 10,
  easy: 12,
} as const;

export async function POST(req: Request) {
  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { vocabId, rating } = parsed.data;
    const { learnerId, isNew } = await getOrCreateLearnerId();
    const snapshot = await getLearnerProgress(learnerId);
    const nextCard = scheduleCardReview(vocabId, rating, snapshot.flashcards[vocabId]);
    const xpGain = XP_BY_RATING[rating];

    await saveFlashcardReview(learnerId, nextCard, xpGain, rating !== 'again');

    const res = NextResponse.json({
      card: nextCard,
      xpGain,
    });
    if (isNew) {
      res.cookies.set(LEARNER_COOKIE, learnerId, LEARNER_COOKIE_OPTIONS);
    }
    return res;
  } catch (err) {
    console.error('[POST /api/flashcards/review] Failed:', err);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

