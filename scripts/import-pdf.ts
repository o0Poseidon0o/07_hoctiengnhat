/**
 * Import vocabulary + kanji from the Dung Mori PDFs into JSON.
 *
 * Usage:  node scripts/import-pdf.ts n5
 * Input:  content-src/<level>/vocab.pdf, content-src/<level>/kanji.pdf
 * Output: src/data/<level>/vocab.json, src/data/<level>/kanji.json
 *         content-src/<level>/import-report.txt (lines that could not be parsed)
 *
 * The PDF text layer splits furigana onto separate lines, so this is a
 * best-effort parser. Always review the report and fix data by hand when needed.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extractText, getDocumentProxy } from 'unpdf';
import type { Kanji, KanjiExample, LevelId, RubySegment, Vocab } from '../src/data/types.ts';

const level = (process.argv[2] ?? 'n5') as LevelId;
const srcDir = `content-src/${level}`;
const outDir = `src/data/${level}`;
const report: string[] = [];

async function pdfPages(file: string): Promise<string[]> {
  const buf = await readFile(file);
  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const { text } = await extractText(pdf, { mergePages: false });
  return text;
}

// ---------- helpers ----------
const KANJI_RE = /[\u3400-\u9fff々〆]/;
const KANA_ONLY_RE = /^[\u3040-\u30ffー・〜～]+$/;
const LATIN_RE = /[A-Za-zÀ-ỹĐđ]/;
const JA_RE = /[\u3040-\u30ff\u3400-\u9fff々ー〜～]/;
const HEADER_RE = /Tài liệu khóa online/;

function lessonMarker(line: string, title: string): string | null {
  const s = line.replace(/\s+/g, '');
  const t = title.replace(/\s+/g, '');
  const m = s.match(new RegExp(`^(\\d{1,2})${t}([A-D])\\2$`)) ?? s.match(new RegExp(`^${t}(\\d{1,2})([A-D])\\2$`));
  return m ? `${Number(m[1])}${m[2]}` : null;
}

/** Split "reading meaning": the meaning starts at the first token beginning with a Latin letter, digit or "(". */
function splitJaVi(text: string): [ja: string, vi: string] {
  const tokens = text.split(/\s+/).filter(Boolean);
  const idx = tokens.findIndex((t) => /^[0-9A-Za-zÀ-ỹĐđ]/.test(t) || (t.startsWith('(') && LATIN_RE.test(t)));
  if (idx === -1) return [text.trim(), ''];
  return [tokens.slice(0, idx).join(' '), tokens.slice(idx).join(' ')];
}

// ---------- vocabulary ----------
const POS_RE = /^(.+?)\s*[（(]\s*([A-Za-zいな./\s]{1,14}?)\s*[）)]\s*(.*)$/;
const VOCAB_SKIP = new Set(['言', 'こと', '葉', 'ば', '意', 'い', '味', 'み', '表', 'ひょう', '現', 'げん', 'アクセント', 'アクセント 意']);

function parseVocab(pages: string[]): Vocab[] {
  const out: Vocab[] = [];
  let lesson = '';
  const counters = new Map<string, number>();
  let current: Vocab | null = null;

  const push = (v: Omit<Vocab, 'id' | 'level'>) => {
    const n = (counters.get(v.lessonId) ?? 0) + 1;
    counters.set(v.lessonId, n);
    current = { id: `${level}-${v.lessonId}-v${String(n).padStart(3, '0')}`, level, ...v };
    out.push(current);
  };

  pages.forEach((page, pageIdx) => {
    const all = page.split('\n').map((l) => l.trim()).filter(Boolean);
    const marker = all.map((l) => lessonMarker(l, 'TỪ VỰNG')).find(Boolean);
    if (marker) lesson = marker;
    if (!lesson) return; // cover page
    const lines = all.filter((l) => !(HEADER_RE.test(l) || lessonMarker(l, 'TỪ VỰNG') || VOCAB_SKIP.has(l)));

    // Group block: N words, optional "（N）", N readings, then Latin meaning lines
    // e.g. ～人 / ベトナム人 / 日本人 ... （N） ～じん / ベトナムじん ... người ～ (...) / người Việt Nam ...
    const isJaOnly = (l: string) => JA_RE.test(l) && !LATIN_RE.test(l) && !POS_RE.test(l) && l.split(/\s+/).length === 1;
    const isLatin = (l: string) => LATIN_RE.test(l) && !JA_RE.test(l[0]!);

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i]!;

      if (isJaOnly(raw)) {
        let j = i;
        const block: string[] = [];
        let groupPos: string | undefined;
        while (j < lines.length) {
          const l = lines[j]!;
          const posOnly = l.match(/^[（(]\s*([A-Za-zいな./\s]{1,14}?)\s*[）)]$/);
          if (posOnly) { groupPos = posOnly[1]!.trim(); j++; continue; }
          if (!isJaOnly(l)) break;
          block.push(l);
          j++;
        }
        const meanings: string[] = [];
        let k = j;
        while (k < lines.length && isLatin(lines[k]!)) {
          const l = lines[k++]!;
          const prev = meanings[meanings.length - 1];
          // keep "(...)" notes that wrap over several lines together
          if (prev !== undefined && (prev.split('(').length > prev.split(')').length)) meanings[meanings.length - 1] = `${prev} ${l}`;
          else meanings.push(l);
        }
        const n = block.length / 2;
        if (block.length >= 4 && Number.isInteger(n) && meanings.length >= n) {
          const tail = meanings.slice(meanings.length - (n - 1));
          const head = meanings.slice(0, meanings.length - (n - 1)).join(' ');
          const headMatch = head.match(/^([^(]*)\s*(\(.*)?$/);
          for (let x = 0; x < n; x++) {
            push({
              lessonId: lesson,
              kind: 'word',
              word: block[x]!,
              reading: block[n + x]!,
              pos: groupPos,
              meaning: x === 0 ? (headMatch?.[1] ?? head).trim() : tail[x - 1]!,
              note: x === 0 && headMatch?.[2] ? headMatch[2].trim() : undefined,
            });
          }
          current = null;
          i = k - 1;
          continue;
        }
      }

      const line = raw;

      const pos = line.match(POS_RE);
      if (pos && JA_RE.test(pos[1]!)) {
        const [reading, meaning] = splitJaVi(pos[3]!);
        push({ lessonId: lesson, kind: 'word', word: pos[1]!.trim(), pos: pos[2]!.replace(/\s+/g, ' ').trim(), reading, meaning });
        continue;
      }

      const [ja, vi] = splitJaVi(line);
      if (ja && JA_RE.test(ja)) {
        const parts = ja.split(/\s+/).filter((p) => !['...', '…', '～', '〜'].includes(p));
        if (parts.length === 2) {
          push({ lessonId: lesson, kind: 'expression', word: parts[0]!, reading: parts[1]!, meaning: vi });
          continue;
        }
        if (parts.length === 1 && vi) {
          push({ lessonId: lesson, kind: 'expression', word: parts[0]!, reading: parts[0]!, meaning: vi });
          continue;
        }
        // Japanese-only fragment: maybe an alternative reading of the current entry.
        const cur = current as Vocab | null;
        if (cur && !cur.meaning && KANA_ONLY_RE.test(ja.replace(/[\s/、]/g, ''))) {
          cur.reading = cur.reading ? `${cur.reading} / ${ja}` : ja;
          continue;
        }
        report.push(`[vocab p${pageIdx + 1} ${lesson}] ${raw}`);
        current = null; // avoid attaching following meanings to the wrong word
        continue;
      }

      // Latin-only line → meaning / note continuation of the current entry.
      const cur = current as Vocab | null;
      if (cur && LATIN_RE.test(line)) {
        if (!cur.meaning) cur.meaning = line;
        else cur.note = cur.note ? `${cur.note} ${line}` : line;
        continue;
      }
      report.push(`[vocab p${pageIdx + 1} ${lesson}] ${raw}`);
    }
  });

  for (const v of out) {
    v.reading = v.reading.replace(/[。]/g, '').trim() || v.word;
    v.word = v.word.trim();
  }
  // Merge "word (POS) [no meaning]" + "kana  kana  meaning" pairs produced by wrapped rows.
  for (let i = 0; i < out.length - 1; i++) {
    const v = out[i]!;
    const next = out[i + 1]!;
    if (!v.meaning && next.lessonId === v.lessonId && !next.pos && KANA_ONLY_RE.test(next.word) && next.meaning) {
      if (next.word !== v.reading && !v.reading.includes(next.word)) v.reading = `${v.reading} / ${next.word}`;
      v.meaning = next.meaning;
      v.note ??= next.note;
      out.splice(i + 1, 1);
    }
  }
  const clean = out.filter((v) => {
    const broken = !v.meaning || LATIN_RE.test(v.word) || !JA_RE.test(v.reading);
    if (broken) report.push(`[vocab dropped ${v.lessonId}] ${v.word} | ${v.reading} | ${v.meaning}`);
    return !broken;
  });
  // Re-number ids per lesson so they stay stable and contiguous.
  const seq = new Map<string, number>();
  for (const v of clean) {
    const n = (seq.get(v.lessonId) ?? 0) + 1;
    seq.set(v.lessonId, n);
    v.id = `${level}-${v.lessonId}-v${String(n).padStart(3, '0')}`;
    if (v.note === undefined) delete v.note;
    if (v.pos === undefined) delete v.pos;
  }
  return clean;
}

// ---------- kanji ----------
const HV_RE = /^(?:[A-ZÀ-ỸĐ]+(?:[\s,/-]+[A-ZÀ-ỸĐ]+)*|-{2,})$/u;

function buildRuby(tokens: string[]): { ruby: RubySegment[]; meaning: string } {
  const ruby: RubySegment[] = [];
  let meaning = '';
  for (let i = 0; i < tokens.length; i++) {
    let tok = tokens[i]!;
    // token may be "で Một mình" → kana part + meaning
    const [ja, vi] = splitJaVi(tok);
    if (vi) {
      if (ja) ruby.push([ja.replace(/\s+/g, '')]);
      meaning = [vi, ...tokens.slice(i + 1)].join(' ');
      break;
    }
    tok = ja.replace(/\s+/g, '');
    const next = tokens[i + 1];
    if (KANJI_RE.test(tok) && next && KANA_ONLY_RE.test(next.trim())) {
      // "あの人" + "ひと" → "あの" (plain) + "人"(ひと)
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

function parseKanji(pages: string[]): Kanji[] {
  const out: Kanji[] = [];
  let lesson = '';
  const counters = new Map<string, number>();
  let pendingExamples: KanjiExample[] = [];
  let exampleTokens: string[] | null = null;
  let mode: 'none' | 'kun' | 'on' = 'none';
  let current: Kanji | null = null;

  const flushExample = () => {
    if (!exampleTokens) return;
    const { ruby, meaning } = buildRuby(exampleTokens);
    const word = ruby.map((r) => r[0]).join('');
    const reading = ruby.map((r) => r[1] ?? r[0]).join('');
    if (word) pendingExamples.push({ word, reading, ruby, meaning });
    exampleTokens = null;
  };

  pages.forEach((page, pageIdx) => {
    const lines = page.split('\n').map((l) => l.trim()).filter(Boolean);
    const marker = lines.map((l) => lessonMarker(l, 'CHỮ HÁN')).find(Boolean);
    if (marker) lesson = marker;
    if (!lesson) return;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]!;
      if (HEADER_RE.test(line) || lessonMarker(line, 'CHỮ HÁN') || /^\d+$/.test(line)) continue;
      // "と 音 ジュウ、" → kun tail + on reading on the same line
      const onInside = line.match(/^(.+?)\s+音\s*(.*)$/);
      if (onInside && (mode === 'kun' || line.startsWith('訓'))) {
        if (line.startsWith('訓')) current?.kun.push(onInside[1]!.slice(1).trim());
        else current?.kun.push(onInside[1]!.trim());
        mode = 'on';
        current?.on.push(onInside[2]!.trim());
        continue;
      }
      const next = lines[i + 1] ?? '';

      // "Tháng 6六" → meaning tail + kanji header glued together
      const glued = line.match(/^(.*[^\u3400-\u9fff\s])\s*([\u3400-\u9fff])$/);
      if (glued && HV_RE.test(next) && LATIN_RE.test(glued[1]!)) {
        if (exampleTokens) exampleTokens.push(glued[1]!);
        line = glued[2]!;
      }

      // Kanji header: single kanji followed by the Hán-Việt line
      if (/^[\u3400-\u9fff]$/.test(line) && HV_RE.test(next)) {
        flushExample();
        const n = (counters.get(lesson) ?? 0) + 1;
        counters.set(lesson, n);
        const examples = pendingExamples;
        pendingExamples = [];
        current = {
          id: `${level}-${lesson}-k${String(n).padStart(2, '0')}`,
          level,
          lessonId: lesson,
          char: line,
          hanViet: /^-+$/.test(next) ? '' : next,
          kun: [],
          on: [],
          examples,
        };
        out.push(current);
        mode = 'none';
        i++;
        continue;
      }

      if (line.startsWith('訓')) {
        flushExample();
        mode = 'kun';
        current?.kun.push(line.slice(1).trim());
        continue;
      }
      if (line.startsWith('音')) {
        flushExample();
        mode = 'on';
        current?.on.push(line.slice(1).trim());
        continue;
      }
      if (line.startsWith('・')) {
        flushExample();
        mode = 'none';
        exampleTokens = [line.slice(1).trim()];
        continue;
      }
      if (exampleTokens) {
        exampleTokens.push(line);
        continue;
      }
      if (current && mode === 'kun') { current.kun.push(line); continue; }
      if (current && mode === 'on') { current.on.push(line); continue; }
      report.push(`[kanji p${pageIdx + 1} ${lesson}] ${line}`);
    }
  });
  flushExample();
  if (pendingExamples.length) report.push(`[kanji] ${pendingExamples.length} trailing examples without header`);

  const splitReadings = (parts: string[]) =>
    parts.join('').split(/[、,]/).map((s) => s.trim()).filter((s) => s && !/^-+$/.test(s));
  for (const k of out) {
    k.kun = splitReadings(k.kun);
    k.on = splitReadings(k.on);
    const bad = k.examples.filter((e) => !e.word.includes(k.char));
    if (bad.length) report.push(`[kanji ${k.lessonId} ${k.char}] examples not containing the kanji: ${bad.map((b) => b.word).join(', ')}`);
  }
  return out;
}

// ---------- main ----------
await mkdir(outDir, { recursive: true });

const vocab = parseVocab(await pdfPages(`${srcDir}/vocab.pdf`));
await writeFile(`${outDir}/vocab.json`, JSON.stringify(vocab, null, 1) + '\n', 'utf8');

const kanji = parseKanji(await pdfPages(`${srcDir}/kanji.pdf`));
await writeFile(`${outDir}/kanji.json`, JSON.stringify(kanji, null, 1) + '\n', 'utf8');

await writeFile(`${srcDir}/import-report.txt`, report.join('\n') + '\n', 'utf8');

const byLesson = (items: { lessonId: string }[]) =>
  Object.entries(items.reduce<Record<string, number>>((acc, it) => ((acc[it.lessonId] = (acc[it.lessonId] ?? 0) + 1), acc), {}))
    .map(([k, v]) => `${k}:${v}`)
    .join(' ');
console.log(`vocab: ${vocab.length}  →  ${byLesson(vocab)}`);
console.log(`kanji: ${kanji.length}  →  ${byLesson(kanji)}`);
console.log(`report lines: ${report.length} (see ${srcDir}/import-report.txt)`);
