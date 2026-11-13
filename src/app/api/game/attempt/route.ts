import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getLevelContent } from '@/data';
import { getOrCreateLearnerId, LEARNER_COOKIE, LEARNER_COOKIE_OPTIONS } from '@/lib/learner';
import { saveSentenceAttempt } from '@/lib/progress-repo';

const BodySchema = z.object({
  challengeId: z.string().min(1),
  correct: z.boolean(),
  usedHint: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { challengeId, correct, usedHint } = parsed.data;
    const { learnerId, isNew } = await getOrCreateLearnerId();

    const data = getLevelContent('n5');
    const challenge = data.sentences.find((s) => s.id === challengeId);
    const relatedVocabIds = challenge
      ? data.vocab
          .filter(
            (v) =>
              v.lessonId === challenge.lessonId &&
              challenge.answer.some((tok) => tok.includes(v.word) || v.word.includes(tok)),
          )
          .map((v) => v.id)
      : [];

    const xpGain = correct ? (usedHint ? 8 : 15) : 0;
    const stats = await saveSentenceAttempt({
      learnerId,
      challengeId,
      correct,
      xpGain,
      relatedVocabIds,
    });

    const res = NextResponse.json({ stats, xpGain });
    if (isNew) {
      res.cookies.set(LEARNER_COOKIE, learnerId, LEARNER_COOKIE_OPTIONS);
    }
    return res;
  } catch (err) {
    console.error('[POST /api/game/attempt] Failed:', err);
    return NextResponse.json({ error: 'Failed to save attempt' }, { status: 500 });
  }
}

