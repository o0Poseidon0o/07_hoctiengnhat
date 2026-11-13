import type { Grammar, Kanji, Lesson, LevelContent, LevelId, LevelInfo, SentenceChallenge, Vocab } from './types.ts';
import { lessons as n5Lessons } from './n5/lessons.ts';
import { grammar as n5Grammar } from './n5/grammar.ts';
import { sentences as n5Sentences } from './n5/sentences.ts';
import { n5Topics, getTopicForLesson, type TopicInfo } from './n5/topics.ts';
import n5VocabRaw from './n5/vocab.json' with { type: 'json' };
import n5KanjiRaw from './n5/kanji.json' with { type: 'json' };

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
    description: 'Sơ cấp 2 — Sẽ mở rộng sau khi hoàn thiện N5.',
    available: false,
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

const LEVEL_MAP: Partial<Record<LevelId, LevelContent>> = {
  n5: n5Content,
};

export function getLevelContent(level: LevelId = 'n5'): LevelContent {
  return LEVEL_MAP[level] ?? n5Content;
}

export function getLessonBundle(lessonId: string, level: LevelId = 'n5'): {
  lesson: Lesson | undefined;
  topic: TopicInfo | undefined;
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
} {
  const data = getLevelContent(level);
  const normalized = lessonId.toUpperCase();
  return {
    lesson: data.lessons.find((l) => l.id === normalized),
    topic: getTopicForLesson(normalized),
    vocab: data.vocab.filter((v) => v.lessonId === normalized),
    kanji: data.kanji.filter((k) => k.lessonId === normalized),
    grammar: data.grammar.filter((g) => g.lessonId === normalized),
    sentences: data.sentences.filter((s) => s.lessonId === normalized),
  };
}

export function getTopicBundle(slug: string): {
  topic: TopicInfo | undefined;
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
} {
  const topic = n5Topics.find((t) => t.slug === slug);
  if (!topic) {
    return { topic: undefined, vocab: [], kanji: [], grammar: [], sentences: [] };
  }
  const set = new Set(topic.lessonIds);
  return {
    topic,
    vocab: n5Content.vocab.filter((v) => set.has(v.lessonId)),
    kanji: n5Content.kanji.filter((k) => set.has(k.lessonId)),
    grammar: n5Content.grammar.filter((g) => set.has(g.lessonId)),
    sentences: n5Content.sentences.filter((s) => set.has(s.lessonId)),
  };
}

export { n5Topics };
export type { TopicInfo };

