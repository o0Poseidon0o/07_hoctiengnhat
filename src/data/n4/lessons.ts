import type { Lesson, LevelId } from '../types.ts';

/** Sub-lesson layout of the Dung Mori N4 course (Units 15–33, 44 sub-lessons). */
const PARTS: Record<number, string[]> = {
  15: ['A', 'B'],
  16: ['A', 'B'],
  17: ['A', 'B'],
  18: ['A', 'B'],
  19: ['A', 'B'],
  20: ['A', 'B', 'C'],
  21: ['A', 'B'],
  22: ['A', 'B'],
  23: ['A', 'B', 'C'],
  24: ['A', 'B'],
  25: ['A', 'B', 'C'],
  26: ['A', 'B'],
  27: ['A', 'B', 'C'],
  28: ['A', 'B'],
  29: ['A', 'B'],
  30: ['A', 'B', 'C'],
  31: ['A', 'B'],
  32: ['A', 'B', 'C'],
  33: ['A', 'B'],
};

const level: LevelId = 'n4';

export const lessons: Lesson[] = Object.entries(PARTS).flatMap(([unit, parts]) =>
  parts.map((part) => ({
    id: `${unit}${part}`,
    level,
    unit: Number(unit),
    part,
    title: `Bài ${unit}${part}`,
  })),
);

