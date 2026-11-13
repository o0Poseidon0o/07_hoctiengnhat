import { getDb } from './mongodb.ts';
import type { StoredCardState } from './srs.ts';

export interface LearnerStats {
  xp: number;
  streak: number;
  bestStreak: number;
  totalReviews: number;
  totalGameSolved: number;
  completedSentenceIds: string[];
  weakVocabIds: string[];
  updatedAt: string;
}

export interface LearnerProgressSnapshot {
  flashcards: Record<string, StoredCardState>;
  stats: LearnerStats;
  dbConnected: boolean;
}

const DEFAULT_STATS: LearnerStats = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  totalReviews: 0,
  totalGameSolved: 0,
  completedSentenceIds: [],
  weakVocabIds: [],
  updatedAt: new Date(0).toISOString(),
};

let indexesReady = false;

async function ensureIndexes() {
  if (indexesReady) return;
  const db = await getDb();
  await Promise.all([
    db.collection('flashcard_states').createIndex({ learnerId: 1, vocabId: 1 }, { unique: true }),
    db.collection('flashcard_states').createIndex({ learnerId: 1, due: 1 }),
    db.collection('learner_stats').createIndex({ learnerId: 1 }, { unique: true }),
  ]);
  indexesReady = true;
}

export async function getLearnerProgress(learnerId: string | null): Promise<LearnerProgressSnapshot> {
  if (!learnerId || !process.env.MONGODB_URI) {
    return {
      flashcards: {},
      stats: { ...DEFAULT_STATS },
      dbConnected: Boolean(process.env.MONGODB_URI),
    };
  }

  await ensureIndexes();
  const db = await getDb();
  const [cards, statsDoc] = await Promise.all([
    db
      .collection<StoredCardState & { learnerId: string }>('flashcard_states')
      .find({ learnerId }, { projection: { _id: 0, learnerId: 0 } })
      .toArray(),
    db
      .collection<LearnerStats & { learnerId: string }>('learner_stats')
      .findOne({ learnerId }, { projection: { _id: 0, learnerId: 0 } }),
  ]);

  const flashcards: Record<string, StoredCardState> = {};
  for (const c of cards) {
    flashcards[c.vocabId] = c;
  }

  return {
    flashcards,
    stats: statsDoc ?? { ...DEFAULT_STATS },
    dbConnected: true,
  };
}

export async function saveFlashcardReview(
  learnerId: string,
  card: StoredCardState,
  xpGain: number,
  isRemembered: boolean,
): Promise<void> {
  await ensureIndexes();
  const db = await getDb();
  const now = new Date().toISOString();

  await db.collection('flashcard_states').updateOne(
    { learnerId, vocabId: card.vocabId },
    { $set: { ...card, learnerId } },
    { upsert: true },
  );

  const updateOps: Record<string, unknown> = {
    $inc: { xp: xpGain, totalReviews: 1 },
    $set: { updatedAt: now },
    $setOnInsert: {
      learnerId,
      streak: 0,
      bestStreak: 0,
      totalGameSolved: 0,
      completedSentenceIds: [],
    },
  };

  if (isRemembered) {
    updateOps.$pull = { weakVocabIds: card.vocabId };
  } else {
    updateOps.$addToSet = { weakVocabIds: card.vocabId };
  }

  await db.collection('learner_stats').updateOne({ learnerId }, updateOps, { upsert: true });
}

export async function saveSentenceAttempt(params: {
  learnerId: string;
  challengeId: string;
  correct: boolean;
  xpGain: number;
  relatedVocabIds?: string[];
}): Promise<LearnerStats> {
  const { learnerId, challengeId, correct, xpGain, relatedVocabIds = [] } = params;
  await ensureIndexes();
  const db = await getDb();
  const now = new Date().toISOString();

  const existing = await db
    .collection<LearnerStats & { learnerId: string }>('learner_stats')
    .findOne({ learnerId });

  const nextStreak = correct ? (existing?.streak ?? 0) + 1 : 0;
  const nextBest = Math.max(existing?.bestStreak ?? 0, nextStreak);
  const completedSet = new Set(existing?.completedSentenceIds ?? []);
  if (correct) completedSet.add(challengeId);

  const weakSet = new Set(existing?.weakVocabIds ?? []);
  if (!correct) {
    for (const id of relatedVocabIds) weakSet.add(id);
  }

  const nextStats: LearnerStats = {
    xp: (existing?.xp ?? 0) + xpGain,
    streak: nextStreak,
    bestStreak: nextBest,
    totalReviews: existing?.totalReviews ?? 0,
    totalGameSolved: (existing?.totalGameSolved ?? 0) + (correct ? 1 : 0),
    completedSentenceIds: [...completedSet],
    weakVocabIds: [...weakSet],
    updatedAt: now,
  };

  await db
    .collection('learner_stats')
    .updateOne({ learnerId }, { $set: { ...nextStats, learnerId } }, { upsert: true });

  return nextStats;
}

