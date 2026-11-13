import Link from 'next/link';
import { detectLessonLevel, getLevelContent } from '@/data';
import type { LevelId } from '@/data/types';
import { FlashcardDeck } from '@/components/FlashcardDeck';

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; lesson?: string; part?: string; mode?: string }>;
}) {
  const { level, lesson, part, mode } = await searchParams;
  const activeLevel: LevelId =
    level === 'n4' ? 'n4' : level === 'n5' ? 'n5' : lesson ? detectLessonLevel(lesson) : 'n5';
  const data = getLevelContent(activeLevel);

  const initialMode =
    mode === 'due' || mode === 'weak' || mode === 'all' ? mode : 'all';

  return (
    <div className="space-y-6 py-2">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-stone-900">
            Flashcard Từ vựng &amp; Kanji {activeLevel.toUpperCase()}
          </h1>
          <p className="text-sm text-stone-600">
            Ôn tập theo thuật toán lặp lại ngắt quãng FSRS. Hệ thống tự ưu tiên các từ bạn từng ghép sai.
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-stone-200 bg-stone-100 p-1 text-xs font-semibold">
          <Link
            href="/flashcards?level=n5"
            className={`rounded-lg px-3.5 py-1.5 transition ${
              activeLevel === 'n5' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            JLPT N5
          </Link>
          <Link
            href="/flashcards?level=n4"
            className={`rounded-lg px-3.5 py-1.5 transition ${
              activeLevel === 'n4' ? 'bg-rose-600 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            JLPT N4
          </Link>
        </div>
      </header>

      <FlashcardDeck
        vocab={data.vocab}
        kanji={data.kanji}
        lessons={data.lessons}
        initialLessonId={lesson}
        initialPart={part}
        initialMode={initialMode}
      />
    </div>
  );
}

