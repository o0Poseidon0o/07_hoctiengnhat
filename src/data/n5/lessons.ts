import type { Lesson, LevelId } from '../types.ts';

/** Sub-lesson layout of the Dung Mori N5 course (same for vocab, kanji and grammar books). */
const PARTS: Record<number, string[]> = {
  1: ['A', 'B', 'C'],
  2: ['A', 'B', 'C'],
  3: ['A', 'B', 'C', 'D'],
  4: ['A', 'B'],
  5: ['A', 'B', 'C'],
  6: ['A', 'B', 'C'],
  7: ['A', 'B', 'C', 'D'],
  8: ['A', 'B', 'C'],
  9: ['A', 'B', 'C'],
  10: ['A', 'B'],
  11: ['A', 'B'],
  12: ['A', 'B', 'C'],
  13: ['A', 'B', 'C'],
  14: ['A', 'B', 'C'],
};

const level: LevelId = 'n5';

export const lessons: Lesson[] = Object.entries(PARTS).flatMap(([unit, parts]) =>
  parts.map((part) => ({
    id: `${unit}${part}`,
    level,
    unit: Number(unit),
    part,
    title: `Bài ${unit}${part}`,
  })),
);

