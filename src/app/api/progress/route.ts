import { NextResponse } from 'next/server';
import { getOrCreateLearnerId, LEARNER_COOKIE, LEARNER_COOKIE_OPTIONS } from '@/lib/learner';
import { getLearnerProgress } from '@/lib/progress-repo';

export async function GET() {
  try {
    const { learnerId, isNew } = await getOrCreateLearnerId();
    const progress = await getLearnerProgress(learnerId);
    const res = NextResponse.json({ learnerId, ...progress });
    if (isNew) {
      res.cookies.set(LEARNER_COOKIE, learnerId, LEARNER_COOKIE_OPTIONS);
    }
    return res;
  } catch (err) {
    console.error('[GET /api/progress] Failed to load learner progress:', err);
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}

