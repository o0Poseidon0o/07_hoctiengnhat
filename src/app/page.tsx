import Link from 'next/link';
import {
  BookOpen,
  Flame,
  Gamepad2,
  Layers,
  Sparkles,
  Tag,
  Trophy,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { LEVELS, getLevelContent, n5Topics } from '@/data';
import { readLearnerId } from '@/lib/learner';
import { getLearnerProgress } from '@/lib/progress-repo';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const learnerId = await readLearnerId();
  const [progress, n5] = await Promise.all([
    getLearnerProgress(learnerId),
    Promise.resolve(getLevelContent('n5')),
  ]);

  const dueCount = Object.values(progress.flashcards ?? {}).filter(
    (card) => new Date(card.due).getTime() <= Date.now(),
  ).length;
  const reviewedCount = Object.keys(progress.flashcards ?? {}).length;

  // Group 41 lessons into units 1..14 by numeric prefix
  const unitGroups = Array.from(
    n5.lessons.reduce((map, lesson) => {
      const unitNum = lesson.id.replace(/[A-Z]+$/i, '');
      const list = map.get(unitNum) ?? [];
      list.push(lesson);
      map.set(unitNum, list);
      return map;
    }, new Map<string, typeof n5.lessons>()),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      {/* Hero + Stats */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            <Sparkles className="h-3.5 w-3.5" />
            Lộ trình JLPT N5 · Sẵn sàng mở rộng N4
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Học tiếng Nhật N5 theo bài, chủ đề, Flashcard &amp; Ghép câu
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Tổng hợp {n5.vocab.length} từ vựng, {n5.kanji.length} chữ Hán, ngữ pháp trọng tâm và trò chơi ghép câu
            trực tiếp với từ vựng vừa học. Tiến độ ôn tập FSRS và điểm XP được lưu trên MongoDB Atlas.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/lessons/1A"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              <BookOpen className="h-4 w-4" />
              Bắt đầu Bài 1A
            </Link>
            <Link
              href="/flashcards"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              <Layers className="h-4 w-4 text-rose-600" />
              Ôn Flashcard {dueCount > 0 ? `(${dueCount} đến hạn)` : ''}
            </Link>
            <Link
              href="/game"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              <Gamepad2 className="h-4 w-4 text-amber-600" />
              Chơi Ghép câu
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              <Tag className="h-4 w-4 text-emerald-600" />
              Học theo Chủ đề ({n5Topics.length})
            </Link>
          </div>
        </div>

        {/* MongoDB Progress Snapshot */}
        <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Tiến độ của bạn
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-amber-50 p-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700">
                  <Trophy className="h-3.5 w-3.5" />
                  Điểm XP
                </div>
                <p className="mt-1 text-2xl font-bold text-amber-900">{progress.stats.xp}</p>
              </div>
              <div className="rounded-xl bg-rose-50 p-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700">
                  <Flame className="h-3.5 w-3.5" />
                  Combo cao nhất
                </div>
                <p className="mt-1 text-2xl font-bold text-rose-900">
                  {progress.stats.bestStreak}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <p className="text-xs font-medium text-emerald-700">Thẻ đã ôn</p>
                <p className="mt-1 text-xl font-bold text-emerald-900">{reviewedCount}</p>
              </div>
              <div className="rounded-xl bg-sky-50 p-3">
                <p className="text-xs font-medium text-sky-700">Câu đã ghép</p>
                <p className="mt-1 text-xl font-bold text-sky-900">
                  {progress.stats.completedSentenceIds.length}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-stone-500">
            {progress.stats.weakVocabIds.length > 0
              ? `Đang ưu tiên ${progress.stats.weakVocabIds.length} từ cần ôn kỹ trong Flashcard.`
              : 'Chưa có từ yếu nào. Hãy thử ghép câu hoặc ôn Flashcard để lưu tiến độ.'}
          </p>
        </div>
      </section>

      {/* Level Selector (N5 active, N4 roadmap) */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900">Cấp độ JLPT</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map((lv) => (
            <div
              key={lv.id}
              className={`rounded-2xl border p-5 ${
                lv.available
                  ? 'border-rose-200 bg-white shadow-sm'
                  : 'border-dashed border-stone-300 bg-stone-50/80 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-stone-900">JLPT {lv.name}</span>
                {lv.available ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    Đang học
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium text-stone-600">
                    <Lock className="h-3 w-3" />
                    Sắp mở
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-stone-600">{lv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 Units / 41 Lessons */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Danh sách {n5.lessons.length} bài học N5 (1A – 14C)
            </h2>
            <p className="text-sm text-stone-500">
              Chọn từng bài để học Từ vựng, Chữ Hán, Ngữ pháp và chơi Ghép câu.
            </p>
          </div>
          <Link
            href="/topics"
            className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            Xem theo chủ đề
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {unitGroups.map(([unitNum, lessons]) => (
            <div
              key={unitNum}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900">Bài {unitNum}</span>
                <span className="text-xs text-stone-500">{lessons.length} phần</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="group rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 transition hover:border-rose-300 hover:bg-rose-50/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-rose-700">
                        {lesson.id}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-rose-600" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-stone-600">{lesson.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
