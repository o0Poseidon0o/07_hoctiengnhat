import type { Vocab } from '@/data/types';

export interface VocabChunk {
  /** e.g. "6A1", "6A2", or "1A" when the lesson is small enough not to split. */
  key: string;
  label: string;
  items: Vocab[];
}

/**
 * Split a lesson's vocabulary into manageable parts (~10 words per part)
 * when the lesson has more than 12 words, e.g. 6A -> 6A1, 6A2, 6A3.
 */
export function splitVocabChunks(
  lessonId: string,
  vocab: Vocab[],
  targetSize = 10,
): VocabChunk[] {
  if (vocab.length <= 12) {
    return [{ key: lessonId, label: lessonId, items: vocab }];
  }

  const partCount = Math.ceil(vocab.length / targetSize);
  const perPart = Math.ceil(vocab.length / partCount);
  const chunks: VocabChunk[] = [];

  for (let i = 0; i < partCount; i++) {
    const start = i * perPart;
    const items = vocab.slice(start, start + perPart);
    if (items.length === 0) continue;
    const key = `${lessonId}${i + 1}`;
    chunks.push({
      key,
      label: key,
      items,
    });
  }

  return chunks;
}

