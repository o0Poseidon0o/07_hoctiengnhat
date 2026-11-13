import type { Grammar, Kanji, Lesson, LevelContent, LevelId, LevelInfo, SentenceChallenge, Vocab } from './types.ts';
import { lessons as n5Lessons } from './n5/lessons.ts';
import { grammar as n5Grammar } from './n5/grammar.ts';
import { sentences as n5Sentences } from './n5/sentences.ts';
import { n5Topics, getTopicForLesson as getN5TopicForLesson, type TopicInfo } from './n5/topics.ts';
import n5VocabRaw from './n5/vocab.json' with { type: 'json' };
import n5KanjiRaw from './n5/kanji.json' with { type: 'json' };
import { lessons as n4Lessons } from './n4/lessons.ts';
import { grammar as n4Grammar } from './n4/grammar.ts';
import { sentences as n4Sentences } from './n4/sentences.ts';
import { n4Topics } from './n4/topics.ts';
import n4VocabRaw from './n4/vocab.json' with { type: 'json' };
import n4KanjiRaw from './n4/kanji.json' with { type: 'json' };

export const LEVELS: LevelInfo[] = [
  {
    id: 'n5',
    name: 'JLPT N5',
    description: 'Sơ cấp 1 — 14 bài (1A–14C): Từ vựng, Kanji, Ngữ pháp & Ghép câu.',
    available: true,
  },
  {
    id: 'n4',
    name: 'JLPT N4',
    description: 'Sơ cấp 2 — 19 bài (15A–33B): Từ vựng, Kanji, Ngữ pháp & Ghép câu.',
    available: true,
  },
];

const n5Content: LevelContent = {
  level: LEVELS[0]!,
  lessons: n5Lessons,
  vocab: n5VocabRaw as Vocab[],
  kanji: n5KanjiRaw as Kanji[],
  grammar: n5Grammar,
  sentences: n5Sentences,
};

const n4Content: LevelContent = {
  level: LEVELS[1]!,
  lessons: n4Lessons,
  vocab: n4VocabRaw as Vocab[],
  kanji: n4KanjiRaw as Kanji[],
  grammar: n4Grammar,
  sentences: n4Sentences,
};

const LEVEL_MAP: Partial<Record<LevelId, LevelContent>> = {
  n5: n5Content,
  n4: n4Content,
};

const N4_LESSON_IDS = new Set(n4Lessons.map((l) => l.id));

export function detectLessonLevel(lessonId: string): LevelId {
  return N4_LESSON_IDS.has(lessonId.toUpperCase()) ? 'n4' : 'n5';
}

export function getLevelContent(level: LevelId = 'n5'): LevelContent {
  return LEVEL_MAP[level] ?? n5Content;
}

export function getTopicsForLevel(level: LevelId = 'n5'): TopicInfo[] {
  return level === 'n4' ? n4Topics : n5Topics;
}

export function getLessonBundle(lessonId: string, level?: LevelId): {
  lesson: Lesson | undefined;
  topic: TopicInfo | undefined;
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
} {
  const normalized = lessonId.toUpperCase();
  const resolvedLevel = level ?? detectLessonLevel(normalized);
  const data = getLevelContent(resolvedLevel);
  const topic =
    resolvedLevel === 'n4'
      ? n4Topics.find((t) => t.lessonIds.includes(normalized))
      : getN5TopicForLesson(normalized);
  return {
    lesson: data.lessons.find((l) => l.id === normalized),
    topic,
    vocab: data.vocab.filter((v) => v.lessonId === normalized),
    kanji: data.kanji.filter((k) => k.lessonId === normalized),
    grammar: data.grammar.filter((g) => g.lessonId === normalized),
    sentences: data.sentences.filter((s) => s.lessonId === normalized),
  };
}

export function getTopicBundle(slug: string): {
  topic: TopicInfo | undefined;
  level: LevelId;
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
} {
  const n5Topic = n5Topics.find((t) => t.slug === slug);
  if (n5Topic) {
    const set = new Set(n5Topic.lessonIds);
    return {
      topic: n5Topic,
      level: 'n5',
      vocab: n5Content.vocab.filter((v) => set.has(v.lessonId)),
      kanji: n5Content.kanji.filter((k) => set.has(k.lessonId)),
      grammar: n5Content.grammar.filter((g) => set.has(g.lessonId)),
      sentences: n5Content.sentences.filter((s) => set.has(s.lessonId)),
    };
  }
  const n4Topic = n4Topics.find((t) => t.slug === slug);
  if (n4Topic) {
    const set = new Set(n4Topic.lessonIds);
    return {
      topic: n4Topic,
      level: 'n4',
      vocab: n4Content.vocab.filter((v) => set.has(v.lessonId)),
      kanji: n4Content.kanji.filter((k) => set.has(k.lessonId)),
      grammar: n4Content.grammar.filter((g) => set.has(g.lessonId)),
      sentences: n4Content.sentences.filter((s) => set.has(s.lessonId)),
    };
  }
  return { topic: undefined, level: 'n5', vocab: [], kanji: [], grammar: [], sentences: [] };
}

export { n5Topics, n4Topics };
export type { TopicInfo };

