import { readFile, writeFile } from 'node:fs/promises';
import type { Kanji, KanjiExample, RubySegment } from '../src/data/types.ts';

const KANJI_RE = /[\u3400-\u9fff々〆]/;
const KANA_ONLY_RE = /^[\u3040-\u30ffー・〜～]+$/;
const LATIN_RE = /[A-Za-zÀ-ỹĐđ]/;
const HV_RE = /^(?:[A-ZÀ-ỸĐ]+(?:[\s,/-]+[A-ZÀ-ỸĐ]+)*|-{2,})$/u;

const UNIT_LESSONS: Record<number, string[]> = {
  15: ['15A', '15B'],
  16: ['16A', '16B'],
  17: ['17A', '17B'],
  18: ['18A', '18B'],
  19: ['19A', '19B'],
  20: ['20A', '20B', '20C'],
  21: ['21A', '21B'],
  22: ['22A', '22B'],
  23: ['23A', '23B', '23C'],
  24: ['24A', '24B'],
  25: ['25A', '25B', '25C'],
  26: ['26A', '26B'],
  27: ['27A', '27B', '27C'],
  28: ['28A', '28B'],
  29: ['29A', '29B'],
  30: ['30A', '30B', '30C'],
  31: ['31A', '31B'],
  32: ['32A', '32B', '32C'],
  33: ['33A', '33B'],
};

function mapLesson(unit: number, sub: number): string {
  const list = UNIT_LESSONS[unit] ?? [`${unit}A`];
  const idx = Math.min(Math.max(sub - 1, 0), list.length - 1);
  return list[idx]!;
}

function splitJaVi(text: string): [string, string] {
  const tokens = text.split(/\s+/).filter(Boolean);
  const idx = tokens.findIndex(
    (t) => /^[0-9A-Za-zÀ-ỹĐđ]/.test(t) || (t.startsWith('(') && LATIN_RE.test(t)),
  );
  if (idx === -1) return [text.trim(), ''];
  return [tokens.slice(0, idx).join(' '), tokens.slice(idx).join(' ')];
}

function buildRuby(tokens: string[]): { ruby: RubySegment[]; meaning: string } {
  const ruby: RubySegment[] = [];
  let meaning = '';
  for (let i = 0; i < tokens.length; i++) {
    let tok = tokens[i]!;
    const [ja, vi] = splitJaVi(tok);
    if (vi) {
      if (ja) ruby.push([ja.replace(/\s+/g, '')]);
      meaning = [vi, ...tokens.slice(i + 1)].join(' ');
      break;
    }
    tok = ja.replace(/\s+/g, '');
    const next = tokens[i + 1];
    if (KANJI_RE.test(tok) && next && KANA_ONLY_RE.test(next.trim())) {
      const mixed = tok.match(/^(.*?[^\u3400-\u9fff々])([\u3400-\u9fff々]+)$/);
      if (mixed) {
        ruby.push([mixed[1]!]);
        ruby.push([mixed[2]!, next.trim()]);
      } else {
        ruby.push([tok, next.trim()]);
      }
      i++;
    } else {
      ruby.push([tok]);
    }
  }
  return { ruby, meaning: meaning.trim() };
}

function splitReadings(raw: string): string[] {
  return raw
    .split(/[、,]+/)
    .map((s) => s.trim())
    .filter((s) => s && !/^-{2,}$/.test(s));
}

async function main() {
  const pages: string[] = JSON.parse(await readFile('content-src/n4/kanji-pages.json', 'utf8'));
  const out: Kanji[] = [];
  const seenChars = new Set<string>();
  const counters = new Map<string, number>();

  for (let p = 1; p < pages.length; p++) {
    const rawLines = pages[p]!.split('\n').map((l) => l.trim()).filter(Boolean);
    const markerLine = rawLines.find((l) => /CHỮ HÁN\s+\d+\.\d+/.test(l));
    const m = markerLine?.match(/CHỮ HÁN\s+(\d+)\.(\d+)/);
    if (!m) continue;
    const lessonId = mapLesson(Number(m[1]), Number(m[2]));

    const lines = rawLines.filter(
      (l) => !/Tài liệu khóa online/.test(l) && !/CHỮ HÁN\s+\d+\.\d+/.test(l) && !/^\d+$/.test(l),
    );

    let pendingExamples: KanjiExample[] = [];
    let exampleTokens: string[] | null = null;
    let current: Kanji | null = null;
    let mode: 'none' | 'kun' | 'on' = 'none';

    const flushExample = () => {
      if (!exampleTokens) return;
      const { ruby, meaning } = buildRuby(exampleTokens);
      const word = ruby.map((r) => r[0]).join('');
      const reading = ruby.map((r) => r[1] ?? r[0]).join('');
      if (word) pendingExamples.push({ word, reading, ruby, meaning });
      exampleTokens = null;
    };

    const flushKanji = () => {
      if (!current) return;
      current.kun = splitReadings(current.kun.join(' '));
      current.on = splitReadings(current.on.join(' '));
      if (!seenChars.has(current.char)) {
        seenChars.add(current.char);
        out.push(current);
      }
      current = null;
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]!;
      const next = lines[i + 1] ?? '';

      // Handle "kun tail 音 ON" on same line
      const onInside = line.match(/^(.+?)\s+音\s*(.*)$/);
      if (onInside && (mode === 'kun' || line.startsWith('訓'))) {
        if (line.startsWith('訓')) current?.kun.push(onInside[1]!.slice(1).trim());
        else current?.kun.push(onInside[1]!.trim());
        mode = 'on';
        current?.on.push(onInside[2]!.trim());
        continue;
      }

      // Single Kanji header followed by Hán-Việt
      if (/^[\u3400-\u9fff]$/.test(line) && HV_RE.test(next)) {
        flushExample();
        flushKanji();
        const n = (counters.get(lessonId) ?? 0) + 1;
        counters.set(lessonId, n);
        current = {
          id: `n4-${lessonId}-k${String(n).padStart(2, '0')}`,
          level: 'n4',
          lessonId,
          char: line,
          hanViet: next,
          kun: [],
          on: [],
          examples: pendingExamples,
        };
        pendingExamples = [];
        mode = 'none';
        i++;
        continue;
      }

      if (line.startsWith('訓')) {
        mode = 'kun';
        const rest = line.slice(1).trim();
        if (rest) current?.kun.push(rest);
        continue;
      }
      if (line.startsWith('音')) {
        mode = 'on';
        const rest = line.slice(1).trim();
        if (rest) current?.on.push(rest);
        continue;
      }

      if (line.startsWith('・')) {
        flushExample();
        flushKanji();
        mode = 'none';
        exampleTokens = [line.slice(1).trim()];
        continue;
      }

      if (mode === 'kun') {
        current?.kun.push(line);
      } else if (mode === 'on') {
        current?.on.push(line);
      } else if (exampleTokens) {
        exampleTokens.push(line);
      }
    }
    flushExample();
    flushKanji();
  }

  await writeFile('src/data/n4/kanji.json', JSON.stringify(out, null, 2));
  console.log('Parsed N4 Kanji:', out.length);
  const bad = out.filter((k) => !k.hanViet || k.examples.length === 0);
  console.log('Missing hanViet or examples:', bad.length);
  if (bad.length > 0) console.log(bad.slice(0, 5));
}

main();

