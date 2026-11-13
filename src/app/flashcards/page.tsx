import { getLevelContent } from '@/data';
import { FlashcardDeck } from '@/components/FlashcardDeck';

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string; mode?: string }>;
}) {
  const { lesson, mode } = await searchParams;
  const n5 = getLevelContent('n5');

  const initialMode =
    mode === 'due' || mode === 'weak' || mode === 'all' ? mode : 'all';

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-stone-900">Flashcard Từ vựng &amp; Kanji N5</h1>
        <p className="text-sm text-stone-600">
          Ôn tập theo thuật toán lặp lại ngắt quãng FSRS. Hệ thống tự ưu tiên các từ bạn từng ghép sai.
        </p>
      </header>

      <FlashcardDeck
        vocab={n5.vocab}
        kanji={n5.kanji}
        lessons={n5.lessons}
        initialLessonId={lesson}
        initialMode={initialMode}
      />
    </div>
  );
}

