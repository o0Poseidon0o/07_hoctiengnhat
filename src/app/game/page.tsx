import Link from 'next/link';
import { BookOpen, Layers } from 'lucide-react';
import { getLevelContent } from '@/data';
import { SentenceBuilderGame } from '@/components/SentenceBuilderGame';

export default function GamePage() {
  const n5 = getLevelContent('n5');

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Đấu trường Ghép câu N5</h1>
          <p className="mt-1 text-sm text-stone-600">
            Sắp xếp các thẻ từ vựng và trợ từ vừa học thành câu tiếng Nhật đúng ngữ pháp để tích lũy XP.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/lessons/1A"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
          >
            <BookOpen className="h-3.5 w-3.5 text-rose-600" />
            Học Bài 1A–1C
          </Link>
          <Link
            href="/flashcards?mode=weak"
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <Layers className="h-3.5 w-3.5" />
            Ôn từ hay sai
          </Link>
        </div>
      </header>

      <SentenceBuilderGame
        challenges={n5.sentences}
        title="Thử thách ghép câu tổng hợp N5 (Bài 1A – 1C)"
      />
    </div>
  );
}

