import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';

export const LEARNER_COOKIE = 'nihongo_learner_id';

/** Read existing learnerId from cookies in Server Components (returns null if first visit). */
export async function readLearnerId(): Promise<string | null> {
  const store = await cookies();
  return store.get(LEARNER_COOKIE)?.value ?? null;
}

/** Read or create a persistent anonymous learnerId cookie inside Route Handlers. */
export async function getOrCreateLearnerId(): Promise<{ learnerId: string; isNew: boolean }> {
  const store = await cookies();
  const existing = store.get(LEARNER_COOKIE)?.value;
  if (existing && existing.length >= 8) {
    return { learnerId: existing, isNew: false };
  }
  const learnerId = `lrn_${randomUUID()}`;
  return { learnerId, isNew: true };
}

export const LEARNER_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
};

