import { readFile, writeFile } from 'node:fs/promises';
import type { GrammarExample, RubySegment } from '../src/data/types.ts';

const HAS_KANJI_RE = /[\u3400-\u9fff々]/;
const HEADER_RE = /^\d*\s*Tài liệu khóa online/;
const LESSON_MARKER_RE = /NGỮ\s*PHÁP\s*(\d{1,2})\s*([A-D]{1,2})/;

function detectLesson(lines: string[]): string | null {
  for (const l of lines) {
    const m = l.match(LESSON_MARKER_RE);
    if (m) return `${Number(m[1])}${m[2]![0]}`;
  }
  return null;
}

/** Remove inline PDF furigana artifacts like "多 た 分 ぶん" -> "多分" in prose/headings. */
function cleanInlineFurigana(text: string): string {
  // Replace "Kanji <1-4 hiragana> " inside Japanese runs
  return text
    .replace(/([\u3400-\u9fff々])\s+[\u3040-\u309fー]{1,4}(?=\s*[\u3400-\u9fff々\u3040-\u30ff「」』」】＋+（(])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildRubyFromLines(rawLines: string[]): { ja: string; ruby: RubySegment[] } {
  const ruby: RubySegment[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i]!.trim();
    if (!line) continue;

    const compactKana = line.replace(/\s+/g, '');
    if (
      ruby.length > 0 &&
      /^[\u3040-\u309fー]+$/.test(compactKana) &&
      compactKana.length <= 8
    ) {
      const last = ruby[ruby.length - 1]!;
      if (last.length === 1 && HAS_KANJI_RE.test(last[0]!)) {
        const m = last[0]!.match(/^(.*?)([\u3400-\u9fff々]+)$/);
        if (m) {
          ruby.pop();
          if (m[1]) ruby.push([m[1]]);
          ruby.push([m[2]!, compactKana]);
          continue;
        }
      }
    }

    if (
      ruby.length > 0 &&
      ruby[ruby.length - 1]!.length === 2 &&
      /^[\u3400-\u9fff々]/.test(line)
    ) {
      const nextLine = rawLines[i + 1]?.trim().replace(/\s+/g, '') ?? '';
      const nextIsKana = /^[\u3040-\u309fー]+$/.test(nextLine) && nextLine.length <= 8;
      if (!nextIsKana) {
        const prev = ruby[ruby.length - 1]!;
        const leadKanji = line.match(/^([\u3400-\u9fff々]+)(.*)$/);
        if (leadKanji) {
          prev[0] = prev[0] + leadKanji[1]!;
          if (leadKanji[2]) ruby.push([leadKanji[2]]);
          continue;
        }
      }
    }

    ruby.push([line]);
  }

  const merged: RubySegment[] = [];
  for (const seg of ruby) {
    if (seg.length === 1 && merged.length > 0 && merged[merged.length - 1]!.length === 1) {
      merged[merged.length - 1]![0] += seg[0]!;
    } else {
      merged.push(seg);
    }
  }

  const ja = merged.map((s) => s[0]).join('').replace(/\s+/g, ' ').trim();
  return { ja, ruby: merged };
}

interface RawGrammar {
  lessonId: string;
  no: number;
  pattern: string;
  meaning: string;
  explanation: string;
  notes: string[];
  examples: GrammarExample[];
}

function isPatternHeading(line: string, currentState: string): { no: number; title: string } | null {
  const m = line.match(/^(\d{1,2})\s+(.+)$/);
  if (!m) return null;
  const no = Number(m[1]);
  const title = m[2]!.trim();
  if (no < 1 || no > 20) return null;
  if (line.endsWith('。') || line.endsWith('？') || line.endsWith('?') || line.endsWith('！')) return null;
  if (/^(giờ|phút|ngày|tháng|năm|tuổi|cái|người|lần|quyển|bài|chữ|thứ|ví dụ|時|歳|分|日|円|人|本|枚|回)/i.test(title)) {
    return null;
  }
  // Must look like a grammar heading (starts with V/N/A/Thể/Cách/Tôn/Khiêm/Mệnh/「/～/~/(/（/+)
  if (
    currentState === 'example' &&
    !/^(Thể|Cách|Tôn|Khiêm|Mệnh|[VNAＶＮＡ][てたないるます\s/+＋]|「|～|~|\(|（|\+)/.test(title)
  ) {
    return null;
  }
  return { no, title };
}

async function main() {
  const pages: string[] = JSON.parse(await readFile('content-src/n4/grammar-pages.json', 'utf8'));
  const patterns: RawGrammar[] = [];
  let currentLesson = '15A';
  let current: RawGrammar | null = null;
  let state: 'idle' | 'meaning' | 'note' | 'example' = 'idle';
  let exampleLines: string[] = [];

  const flushExample = () => {
    if (!current || exampleLines.length === 0) return;
    const { ja, ruby } = buildRubyFromLines(exampleLines);
    if (ja && ja.length >= 2) {
      current.examples.push({ ja, ruby, vi: '' });
    }
    exampleLines = [];
  };

  const flushPattern = () => {
    flushExample();
    if (current) {
      current.pattern = cleanInlineFurigana(current.pattern);
      current.meaning = cleanInlineFurigana(current.meaning);
      current.explanation = cleanInlineFurigana(current.explanation);
      current.notes = current.notes.map(cleanInlineFurigana).filter(Boolean);
      if (!current.explanation && current.notes.length > 0) {
        current.explanation = current.notes.shift()!;
      }
      if (!current.explanation && current.meaning) {
        current.explanation = `Mẫu ngữ pháp ${current.pattern} mang nghĩa "${current.meaning}".`;
      }
      patterns.push(current);
      current = null;
    }
  };

  for (let p = 1; p < pages.length; p++) {
    const rawLines = pages[p]!.split('\n').map((l) => l.trim()).filter(Boolean);
    const detected = detectLesson(rawLines);
    if (detected && detected !== currentLesson) {
      flushPattern();
      currentLesson = detected;
      state = 'idle';
      if (detected === '20B') {
        current = {
          lessonId: '20B',
          no: 1,
          pattern: 'Mệnh đề bổ nghĩa danh từ (MĐBNDT)',
          meaning: 'Danh từ được bổ nghĩa bởi mệnh đề phía trước',
          explanation: 'Mệnh đề đứng trước danh từ để giải thích tính chất, trạng thái, nội dung hoặc trang phục của danh từ đó.',
          notes: [],
          examples: [],
        };
      }
    }

    const lines = rawLines.filter(
      (l) =>
        !HEADER_RE.test(l) &&
        !LESSON_MARKER_RE.test(l) &&
        !/^Học mỗi ngày cùng Mori$/.test(l) &&
        !/^\d+$/.test(l),
    );

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const heading = isPatternHeading(line, state);
      if (heading) {
        flushPattern();
        current = {
          lessonId: currentLesson,
          no: heading.no,
          pattern: heading.title,
          meaning: '',
          explanation: '',
          notes: [],
          examples: [],
        };
        state = 'idle';
        continue;
      }

      if (!current) continue;

      if (line.startsWith('→')) {
        flushExample();
        const mText = line.slice(1).trim();
        current.meaning = current.meaning ? `${current.meaning} / ${mText}` : mText;
        state = 'meaning';
        continue;
      }

      if (line.startsWith('・') || line.startsWith('❖')) {
        flushExample();
        const nText = line.slice(1).trim();
        if (!current.explanation) current.explanation = nText;
        else current.notes.push(nText);
        state = 'note';
        continue;
      }

      if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(line) || line.startsWith('例')) {
        flushExample();
        const cleaned = line.replace(/^[①②③④⑤⑥⑦⑧⑨⑩例]\s*/, '').trim();
        if (cleaned) exampleLines.push(cleaned);
        state = 'example';
        continue;
      }

      if (state === 'example') {
        exampleLines.push(line);
      } else if (state === 'note') {
        if (current.notes.length > 0) {
          current.notes[current.notes.length - 1] += ' ' + line;
        } else if (current.explanation) {
          current.explanation += ' ' + line;
        }
      } else if (state === 'meaning') {
        current.meaning += ' ' + line;
      } else if (state === 'idle' && !current.meaning) {
        current.pattern += ' ' + line;
      }
    }
  }
  flushPattern();

  await writeFile('content-src/n4/grammar-raw.json', JSON.stringify(patterns, null, 2));
  const byLesson: Record<string, number> = {};
  for (const g of patterns) byLesson[g.lessonId] = (byLesson[g.lessonId] ?? 0) + 1;
  console.log('Total N4 Grammar patterns:', patterns.length);
  console.log('Lessons covered:', Object.keys(byLesson).length);
}

main();
