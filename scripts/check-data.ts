import { z } from 'zod';
import { getLevelContent } from '../src/data/index.ts';

const VocabSchema = z.object({
  id: z.string().min(1),
  level: z.enum(['n5', 'n4']),
  lessonId: z.string().min(2),
  kind: z.enum(['word', 'expression']),
  word: z.string().min(1),
  reading: z.string().min(1),
  pos: z.string().optional(),
  meaning: z.string().min(1),
  note: z.string().optional(),
});

const KanjiSchema = z.object({
  id: z.string().min(1),
  level: z.enum(['n5', 'n4']),
  lessonId: z.string().min(2),
  char: z.string().length(1),
  hanViet: z.string(),
  kun: z.array(z.string()),
  on: z.array(z.string()),
  examples: z.array(
    z.object({
      word: z.string().min(1),
      reading: z.string().min(1),
      ruby: z.array(z.tuple([z.string()]).or(z.tuple([z.string(), z.string()]))),
      meaning: z.string(),
    }),
  ),
});

for (const lvl of ['n5', 'n4'] as const) {
  const data = getLevelContent(lvl);
  const lessonIds = new Set(data.lessons.map((l) => l.id));

  for (const v of data.vocab) {
    VocabSchema.parse(v);
    if (!lessonIds.has(v.lessonId)) throw new Error(`Unknown lessonId on vocab ${v.id}: ${v.lessonId}`);
  }
  for (const k of data.kanji) {
    KanjiSchema.parse(k);
    if (!lessonIds.has(k.lessonId)) throw new Error(`Unknown lessonId on kanji ${k.id}: ${k.lessonId}`);
  }
  for (const g of data.grammar) {
    if (!lessonIds.has(g.lessonId)) throw new Error(`Unknown lessonId on grammar ${g.id}: ${g.lessonId}`);
  }
  for (const s of data.sentences) {
    if (!lessonIds.has(s.lessonId)) throw new Error(`Unknown lessonId on sentence ${s.id}: ${s.lessonId}`);
    if (s.answer.length === 0) throw new Error(`Empty answer on sentence ${s.id}`);
  }

  console.log(
    `${lvl.toUpperCase()} data OK: ${data.lessons.length} lessons, ${data.vocab.length} vocab, ${data.kanji.length} kanji, ${data.grammar.length} grammar, ${data.sentences.length} sentence challenges.`,
  );
}

