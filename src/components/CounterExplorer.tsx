'use client';

import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Filter,
  HelpCircle,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { COUNTER_CATEGORIES, COUNTER_QUIZZES } from '@/data/counters';
import { SpeakButton } from './SpeakButton';

export function CounterExplorer() {
  const [onlySpecial, setOnlySpecial] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = COUNTER_QUIZZES.filter((q) => answers[q.id] === q.answerIndex).length;

  const chooseOption = (quizId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [quizId]: optionIdx }));
  };

  const resetQuiz = () => setAnswers({});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              <Sparkles className="h-3.5 w-3.5" />
              Bảng công thức &amp; Mẹo nhớ Biến âm
            </div>
            <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
              Số đếm, Thời gian, Ngày tháng &amp; Lượng từ tiếng Nhật
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Các trường hợp <span className="font-bold text-[#c83e2b]">đặc biệt / biến âm</span>{' '}
              được <strong className="text-[#c83e2b]">in đậm &amp; tô màu nổi bật</strong> để bạn
              nhớ ngay từ lần đầu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlySpecial((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                onlySpecial
                  ? 'border-[#c83e2b] bg-rose-50 text-[#c83e2b]'
                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              {onlySpecial ? 'Đang lọc: Chỉ số đặc biệt' : 'Chỉ xem chỗ đặc biệt'}
            </button>
            <a
              href="#counter-quiz"
              className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-stone-800"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Làm {COUNTER_QUIZZES.length} câu trắc nghiệm
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Minimap Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {COUNTER_CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-rose-300 hover:text-rose-700"
          >
            <span className="font-jp font-bold text-[#c83e2b]">{cat.kanjiBadge}</span>
            <span>{cat.title.split('(')[0]?.trim()}</span>
          </a>
        ))}
      </div>

      {/* Main 2-column Layout */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sticky Minimap */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-500">
              Mục lục số đếm
            </div>
            <nav className="space-y-1">
              {COUNTER_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-rose-50 hover:text-rose-700"
                >
                  <span className="line-clamp-1">{cat.title}</span>
                  <span className="font-jp shrink-0 rounded bg-stone-100 px-1.5 py-0.5 text-[11px] font-bold text-[#c83e2b]">
                    {cat.kanjiBadge}
                  </span>
                </a>
              ))}
              <a
                href="#counter-quiz"
                className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100"
              >
                <span>Trắc nghiệm ôn tập</span>
                <span>{COUNTER_QUIZZES.length} câu</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Categories */}
        <div className="space-y-6">
          {COUNTER_CATEGORIES.map((cat) => {
            const visibleEntries = onlySpecial
              ? cat.entries.filter((e) => e.special)
              : cat.entries;
            if (visibleEntries.length === 0) return null;

            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-jp flex h-12 min-w-12 items-center justify-center rounded-xl bg-rose-50 px-2.5 text-xl font-bold text-[#c83e2b] ring-1 ring-rose-200">
                      {cat.kanjiBadge}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-stone-900 sm:text-xl">{cat.title}</h2>
                      <p className="text-xs sm:text-sm text-stone-600">{cat.ruleSummary}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-right">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-[#2d6a4f]">
                      Từ để hỏi
                    </div>
                    <div className="font-jp text-sm font-bold text-stone-900">
                      {cat.questionWord}{' '}
                      <span className="font-normal text-stone-600">({cat.questionReading})</span>
                    </div>
                    <div className="text-xs text-stone-600">{cat.questionMeaning}</div>
                  </div>
                </div>

                {/* Teacher Memory Tip */}
                <div className="mt-3 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-2.5 text-xs sm:text-sm leading-relaxed text-amber-950">
                  <strong className="mr-1 text-[#c83e2b]">★ Mẹo nhớ nhanh:</strong>
                  {cat.memoryTip}
                </div>

                {/* Entries Grid */}
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleEntries.map((entry, idx) => (
                    <div
                      key={`${cat.id}-${idx}`}
                      className={`flex items-start justify-between gap-2 rounded-xl border p-3 transition ${
                        entry.special
                          ? 'border-rose-300 bg-rose-50/80 ring-1 ring-rose-200/70'
                          : 'border-stone-200 bg-stone-50/60'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-semibold text-stone-500">
                            {entry.value}
                          </span>
                          {entry.special && (
                            <span className="rounded bg-[#c83e2b] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                              Đặc biệt
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                          <span
                            className={`font-jp text-lg font-bold ${
                              entry.special ? 'text-[#c83e2b]' : 'text-stone-900'
                            }`}
                          >
                            {entry.kanji}
                          </span>
                          <span
                            className={`font-jp text-base ${
                              entry.special
                                ? 'font-extrabold text-[#c83e2b]'
                                : 'font-semibold text-[#2d6a4f]'
                            }`}
                          >
                            {entry.reading}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500">{entry.romaji}</div>
                        {entry.note && (
                          <div className="mt-1 text-xs font-medium text-amber-900">
                            → {entry.note}
                          </div>
                        )}
                      </div>
                      <SpeakButton text={entry.reading.split('/')[0]!.trim()} size="sm" />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Interactive Quiz Section */}
          <section
            id="counter-quiz"
            className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Câu hỏi luyện tập Số đếm &amp; Lượng từ ({COUNTER_QUIZZES.length} câu)
                </h2>
                <p className="mt-0.5 text-sm text-stone-600">
                  Chọn đáp án đúng để kiểm tra phản xạ với các trường hợp dễ nhầm nhất.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
                  <Award className="h-4 w-4" />
                  {correctCount} / {answeredCount} đúng
                </div>
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1 rounded-xl border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Làm lại
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {COUNTER_QUIZZES.map((q, qIdx) => {
                const chosen = answers[q.id];
                const hasAnswered = chosen !== undefined;
                const isCorrect = chosen === q.answerIndex;

                return (
                  <div
                    key={q.id}
                    className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-stone-50/60 p-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-stone-600 ring-1 ring-stone-200">
                          Câu {qIdx + 1} · {q.category}
                        </span>
                        {q.highlight && (
                          <span className="font-jp rounded-md bg-rose-50 px-2 py-0.5 text-sm font-extrabold text-[#c83e2b]">
                            {q.highlight}
                          </span>
                        )}
                      </div>
                      <p className="mt-2.5 text-sm font-semibold text-stone-900 sm:text-base">
                        {q.prompt}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const selected = chosen === optIdx;
                          const rightOpt = q.answerIndex === optIdx;
                          let style =
                            'border-stone-200 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50/40';
                          if (hasAnswered) {
                            if (rightOpt) {
                              style =
                                'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (selected) {
                              style = 'border-rose-500 bg-rose-50 text-rose-900';
                            } else {
                              style = 'border-stone-200 bg-white/60 text-stone-400';
                            }
                          }
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => chooseOption(q.id, optIdx)}
                              className={`font-jp rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {hasAnswered && (
                      <div
                        className={`mt-3 rounded-xl border px-3 py-2 text-xs leading-relaxed ${
                          isCorrect
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                            : 'border-rose-200 bg-rose-50 text-rose-950'
                        }`}
                      >
                        <div className="mb-0.5 flex items-center gap-1 font-bold">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              Chính xác!
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5 text-rose-600" />
                              Chưa đúng — Đáp án là「{q.options[q.answerIndex]}」
                            </>
                          )}
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

