import Link from 'next/link';
import { BookOpen, Layers } from 'lucide-react';
import { getLevelContent } from '@/data';
import type { LevelId } from '@/data/types';
import { SentenceBuilderGame } from '@/components/SentenceBuilderGame';

export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const activeLevel: LevelId = level === 'n4' ? 'n4' : 'n5';
  const levelLabel = activeLevel.toUpperCase();
  const data = getLevelContent(activeLevel);
  const firstLesson = activeLevel === 'n4' ? '15A' : '1A';
  const rangeLabel = activeLevel === 'n4' ? 'Bài 15A – 33B' : 'Bài 1A – 14C';

  return (
    <div className="space-y-6 py-2">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <div className="mb-2 inline-flex rounded-xl border border-stone-200 bg-stone-100 p-1 text-xs font-semibold">
            <Link
              href="/game?level=n5"
              className={`rounded-lg px-3 py-1 transition ${
                activeLevel === 'n5' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              JLPT N5
            </Link>
            <Link
              href="/game?level=n4"
              className={`rounded-lg px-3 py-1 transition ${
                activeLevel === 'n4' ? 'bg-rose-600 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              JLPT N4
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Đấu trường Ghép câu {levelLabel}</h1>
          <p className="mt-1 text-sm text-stone-600">
            Sắp xếp các thẻ từ vựng và trợ từ vừa học thành câu tiếng Nhật đúng ngữ pháp để tích lũy XP.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/lessons/${firstLesson}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
          >
            <BookOpen className="h-3.5 w-3.5 text-rose-600" />
            Học {rangeLabel}
          </Link>
          <Link
            href={`/flashcards?level=${activeLevel}&mode=weak`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <Layers className="h-3.5 w-3.5" />
            Ôn từ hay sai
          </Link>
        </div>
      </header>

      <SentenceBuilderGame
        challenges={data.sentences}
        title={`Thử thách ghép câu tổng hợp ${levelLabel} (${rangeLabel})`}
      />
    </div>
  );
}

