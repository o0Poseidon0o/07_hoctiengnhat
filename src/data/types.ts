/**
 * Shared content types for every JLPT level (N5, N4, ...).
 * Pure type declarations so they can be imported by Next.js and by Node scripts
 * (Node 24 strips types natively).
 */

export type LevelId = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export interface LevelInfo {
  id: LevelId;
  name: string; // "N5"
  description: string;
  available: boolean;
}

/** A sub-lesson such as "1A", "3D", "14C". */
export interface Lesson {
  id: string; // "1A"
  level: LevelId;
  unit: number; // 1..14
  part: string; // "A" | "B" | "C" | "D"
  title: string;
}

export type VocabKind = 'word' | 'expression';

export interface Vocab {
  id: string; // "n5-1A-v001"
  level: LevelId;
  lessonId: string;
  kind: VocabKind;
  word: string; // 銀行員
  reading: string; // ぎんこういん
  pos?: string; // N, Aい, Aな, V I, V II, V III, Adv. ...
  meaning: string; // Vietnamese meaning
  note?: string;
}

/** A ruby segment: [text, reading?] — reading only for kanji parts. */
export type RubySegment = [text: string, reading?: string];

export interface KanjiExample {
  word: string; // 一人で
  reading: string; // ひとりで
  ruby: RubySegment[];
  meaning: string;
}

export interface Kanji {
  id: string; // "n5-1A-k01"
  level: LevelId;
  lessonId: string;
  char: string; // 一
  hanViet: string; // NHẤT
  kun: string[];
  on: string[];
  examples: KanjiExample[];
}

export interface GrammarExample {
  ja: string; // plain Japanese sentence
  ruby?: RubySegment[];
  vi: string;
}

export interface GrammarAnalysisPart {
  token: string;
  role: string;
}

export interface GrammarAnalysis {
  formula: string;
  parts: GrammarAnalysisPart[];
  tip?: string;
}

export interface Grammar {
  id: string; // "n5-1A-g01"
  level: LevelId;
  lessonId: string;
  no: number; // number inside the unit in the textbook
  pattern: string; // （N1 は） N2 です
  meaning: string; // N1 là N2
  explanation: string;
  notes: string[];
  examples: GrammarExample[];
  analysis?: GrammarAnalysis;
}

/**
 * Sentence-building challenge: the learner rebuilds `answer` from shuffled tiles
 * (answer tokens + distractors).
 */
export interface SentenceChallenge {
  id: string;
  level: LevelId;
  lessonId: string;
  grammarId?: string;
  vi: string; // Vietnamese prompt
  answer: string[]; // ordered tokens, e.g. ["わたし", "は", "学生", "です"]
  distractors: string[]; // wrong tiles, e.g. ["も", "じゃありません"]
  hint?: string; // shown after a wrong attempt
}

export interface LevelContent {
  level: LevelInfo;
  lessons: Lesson[];
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
}

