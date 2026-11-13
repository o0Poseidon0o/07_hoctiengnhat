import type { RubySegment } from '@/data/types';

const KANA_RE = /^[\u3040-\u309f\u30a0-\u30ffー]$/;
const HAS_KANJI_RE = /[\u4e00-\u9faf々ヶ]/;

/**
 * Split a vocabulary word + reading into RubySegment[] by stripping matching
 * leading/trailing kana so furigana sits directly over the kanji portion.
 */
export function buildWordRuby(word: string, reading?: string): RubySegment[] {
  if (!reading || reading === word || !HAS_KANJI_RE.test(word)) {
    return [[word]];
  }
  if (/[\/／～~()]/.test(reading) || /[\/／～~()]/.test(word)) {
    return [[word, reading]];
  }

  let wStart = 0;
  let rStart = 0;
  while (
    wStart < word.length &&
    rStart < reading.length &&
    KANA_RE.test(word.charAt(wStart)) &&
    word.charAt(wStart) === reading.charAt(rStart)
  ) {
    wStart++;
    rStart++;
  }

  let wEnd = word.length;
  let rEnd = reading.length;
  while (
    wEnd > wStart &&
    rEnd > rStart &&
    KANA_RE.test(word.charAt(wEnd - 1)) &&
    word.charAt(wEnd - 1) === reading.charAt(rEnd - 1)
  ) {
    wEnd--;
    rEnd--;
  }

  const coreWord = word.slice(wStart, wEnd);
  const coreReading = reading.slice(rStart, rEnd);
  if (!coreWord || !coreReading || !HAS_KANJI_RE.test(coreWord)) {
    return [[word, reading]];
  }

  const segments: RubySegment[] = [];
  if (wStart > 0) segments.push([word.slice(0, wStart)]);
  segments.push([coreWord, coreReading]);
  if (wEnd < word.length) segments.push([word.slice(wEnd)]);
  return segments;
}
