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
import { LEVELS, getLevelContent, getTopicsForLevel } from '@/data';
import type { LevelId } from '@/data/types';
import { readLearnerId } from '@/lib/learner';
import { getLearnerProgress } from '@/lib/progress-repo';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const activeLevel: LevelId = level === 'n4' ? 'n4' : 'n5';
  const levelLabel = activeLevel.toUpperCase();
  const firstLessonId = activeLevel === 'n4' ? '15A' : '1A';
  const lessonRange = activeLevel === 'n4' ? '15A – 33B' : '1A – 14C';

  const learnerId = await readLearnerId();
  const [progress, content, topics] = await Promise.all([
    getLearnerProgress(learnerId),
    Promise.resolve(getLevelContent(activeLevel)),
    Promise.resolve(getTopicsForLevel(activeLevel)),
  ]);

  const dueCount = Object.values(progress.flashcards ?? {}).filter(
    (card) => new Date(card.due).getTime() <= Date.now(),
  ).length;
  const reviewedCount = Object.keys(progress.flashcards ?? {}).length;

  const unitGroups = Array.from(
    content.lessons.reduce((map, lesson) => {
      const unitNum = lesson.id.replace(/[A-Z]+$/i, '');
      const list = map.get(unitNum) ?? [];
      list.push(lesson);
      map.set(unitNum, list);
      return map;
    }, new Map<string, typeof content.lessons>()),
  );

  return (
    <div className="space-y-10 py-2">
      {/* Hero + Stats */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              <Sparkles className="h-3.5 w-3.5" />
              Lộ trình JLPT N5 &amp; N4 · Dung Mori
            </div>
            <div className="inline-flex rounded-xl border border-stone-200 bg-stone-100 p-1 text-xs font-semibold">
              <Link
                href="/?level=n5"
                className={`rounded-lg px-3 py-1 transition ${
                  activeLevel === 'n5'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                JLPT N5
              </Link>
              <Link
                href="/?level=n4"
                className={`rounded-lg px-3 py-1 transition ${
                  activeLevel === 'n4'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                JLPT N4
              </Link>
            </div>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Học tiếng Nhật {levelLabel} theo bài, chủ đề, Flashcard &amp; Ghép câu
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Tổng hợp {content.vocab.length} từ vựng, {content.kanji.length} chữ Hán, {content.grammar.length} mẫu ngữ pháp trọng tâm và trò chơi ghép câu
            trực tiếp với từ vựng vừa học. Tiến độ ôn tập FSRS và điểm XP được lưu trên MongoDB Atlas.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/lessons/${firstLessonId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              <BookOpen className="h-4 w-4" />
              Bắt đầu Bài {firstLessonId}
            </Link>
            <Link
              href={`/flashcards?level=${activeLevel}`}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              <Layers className="h-4 w-4 text-rose-600" />
              Ôn Flashcard {dueCount > 0 ? `(${dueCount} đến hạn)` : ''}
            </Link>
            <Link
              href={`/game?level=${activeLevel}`}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              <Gamepad2 className="h-4 w-4 text-amber-600" />
              Chơi Ghép câu
            </Link>
            <Link
              href={`/topics?level=${activeLevel}`}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              <Tag className="h-4 w-4 text-emerald-600" />
              Học theo Chủ đề ({topics.length})
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

      {/* Level Selector (N5 & N4) */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900">Cấp độ JLPT</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map((lv) => {
            const isCurrent = lv.id === activeLevel;
            return (
              <Link
                key={lv.id}
                href={`/?level=${lv.id}`}
                className={`block rounded-2xl border p-5 transition ${
                  isCurrent
                    ? 'border-rose-300 bg-rose-50/30 shadow-sm ring-1 ring-rose-200'
                    : 'border-stone-200 bg-white shadow-xs hover:border-rose-200 hover:bg-stone-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-stone-900">{lv.name}</span>
                  {isCurrent ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      Đang chọn
                    </span>
                  ) : (
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                      Chuyển sang {lv.name}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-stone-600">{lv.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Units & Lessons */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Danh sách {content.lessons.length} bài học {levelLabel} ({lessonRange})
            </h2>
            <p className="text-sm text-stone-500">
              Chọn từng bài để học Từ vựng, Chữ Hán, Ngữ pháp và chơi Ghép câu.
            </p>
          </div>
          <Link
            href={`/topics?level=${activeLevel}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            Xem theo chủ đề
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
