'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Flame, RotateCcw, Sparkles } from 'lucide-react';
import type { Kanji, Lesson, Vocab } from '@/data/types';
import { previewIntervals, type ReviewRating, type StoredCardState } from '@/lib/srs';
import { splitVocabChunks } from '@/lib/vocab-chunks';
import { SpeakButton, speakJapanese } from './SpeakButton';

interface FlashcardDeckProps {
  vocab: Vocab[];
  kanji: Kanji[];
  lessons: Lesson[];
  initialLessonId?: string;
  initialPart?: string;
  initialMode?: 'all' | 'due' | 'weak';
}

const RATING_BUTTONS: {
  rating: ReviewRating;
  label: string;
  keyHint: string;
  cls: string;
}[] = [
  { rating: 'again', label: 'Quên', keyHint: '1', cls: 'border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100' },
  { rating: 'hard', label: 'Khó', keyHint: '2', cls: 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100' },
  { rating: 'good', label: 'Nhớ', keyHint: '3', cls: 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100' },
  { rating: 'easy', label: 'Dễ', keyHint: '4', cls: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100' },
];

export function FlashcardDeck({
  vocab,
  kanji,
  lessons,
  initialLessonId = '1A',
  initialPart = 'ALL',
  initialMode = 'all',
}: FlashcardDeckProps) {
  const [lessonFilter, setLessonFilter] = useState(initialLessonId);
  const [partFilter, setPartFilter] = useState(initialPart);
  const [mode, setMode] = useState<'all' | 'due' | 'weak'>(initialMode);
  const [showFurigana, setShowFurigana] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const [cardStates, setCardStates] = useState<Record<string, StoredCardState>>({});
  const [weakIds, setWeakIds] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [reviewedInSession, setReviewedInSession] = useState(0);
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setCardStates(data.flashcards ?? {});
        setWeakIds(data.stats?.weakVocabIds ?? []);
        setXp(data.stats?.xp ?? 0);
        setDbLoaded(true);
      })
      .catch(() => {
        if (active) setDbLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const kanjiMap = useMemo(() => {
    const map = new Map<string, Kanji>();
    for (const k of kanji) map.set(k.char, k);
    return map;
  }, [kanji]);

  const lessonChunks = useMemo(() => {
    if (lessonFilter === 'ALL') return [];
    const lessonVocab = vocab.filter((v) => v.lessonId === lessonFilter);
    return splitVocabChunks(lessonFilter, lessonVocab);
  }, [vocab, lessonFilter]);

  const deck = useMemo(() => {
    const nowMs = Date.now();
    const weakSet = new Set(weakIds);
    const activePartItems =
      lessonFilter !== 'ALL' && partFilter !== 'ALL' && lessonChunks.length > 1
        ? new Set(lessonChunks.find((c) => c.key === partFilter)?.items.map((v) => v.id) ?? [])
        : null;

    return vocab.filter((v) => {
      if (lessonFilter !== 'ALL' && v.lessonId !== lessonFilter) return false;
      if (activePartItems && !activePartItems.has(v.id)) return false;
      if (mode === 'weak') return weakSet.has(v.id);
      if (mode === 'due') {
        const st = cardStates[v.id];
        return !st || new Date(st.due).getTime() <= nowMs;
      }
      return true;
    });
  }, [vocab, lessonFilter, partFilter, lessonChunks, mode, weakIds, cardStates]);

  const current = deck[index] ?? null;

  const currentKanji = useMemo(() => {
    if (!current) return [];
    const seen = new Set<string>();
    const list: Kanji[] = [];
    for (const ch of current.word) {
      if (seen.has(ch)) continue;
      seen.add(ch);
      const found = kanjiMap.get(ch);
      if (found) list.push(found);
    }
    return list;
  }, [current, kanjiMap]);

  const intervals = useMemo(
    () => (current ? previewIntervals(cardStates[current.id]) : null),
    [current, cardStates],
  );

  const handleRate = useCallback(
    async (rating: ReviewRating) => {
      if (!current || saving) return;
      setSaving(true);
      try {
        const res = await fetch('/api/flashcards/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vocabId: current.id, rating }),
        });
        if (res.ok) {
          const data = await res.json();
          setCardStates((prev) => ({ ...prev, [current.id]: data.card }));
          setXp((prev) => prev + (data.xpGain ?? 0));
          if (rating === 'again') {
            setWeakIds((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
          } else {
            setWeakIds((prev) => prev.filter((id) => id !== current.id));
          }
        }
      } finally {
        setSaving(false);
        setReviewedInSession((n) => n + 1);
        setFlipped(false);
        setIndex((i) => (deck.length <= 1 ? 0 : (i + 1) % deck.length));
      }
    },
    [current, saving, deck.length],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLSelectElement || e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && ['1', '2', '3', '4'].includes(e.key)) {
        const btn = RATING_BUTTONS[Number(e.key) - 1];
        if (btn) handleRate(btn.rating);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [flipped, handleRate]);

  return (
    <div className="space-y-5">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={lessonFilter}
            onChange={(e) => {
              setLessonFilter(e.target.value);
              setPartFilter('ALL');
              setIndex(0);
              setFlipped(false);
            }}
            aria-label="Chọn bài học"
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-800 outline-none focus:border-stone-400"
          >
            <option value="ALL">Tất cả N5 ({vocab.length} từ)</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>

          {lessonChunks.length > 1 && (
            <div className="flex flex-wrap items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 p-1">
              <button
                type="button"
                onClick={() => {
                  setPartFilter('ALL');
                  setIndex(0);
                  setFlipped(false);
                }}
                className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                  partFilter === 'ALL'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-200/70'
                }`}
              >
                Cả bài
              </button>
              {lessonChunks.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    setPartFilter(c.key);
                    setIndex(0);
                    setFlipped(false);
                  }}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                    partFilter === c.key
                      ? 'bg-[#c83e2b] text-white'
                      : 'text-stone-600 hover:bg-stone-200/70'
                  }`}
                >
                  {c.label} ({c.items.length})
                </button>
              ))}
            </div>
          )}

          <div className="inline-flex rounded-xl border border-stone-200 bg-stone-50 p-1">
            {(
              [
                ['all', 'Tất cả'],
                ['due', 'Cần ôn'],
                ['weak', `Hay sai (${weakIds.length})`],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setMode(k);
                  setIndex(0);
                  setFlipped(false);
                }}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  mode === k ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFurigana((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          >
            {showFurigana ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>Furigana</span>
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{xp} XP</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Flame className="h-3.5 w-3.5" />
            <span>Đã ôn: {reviewedInSession}</span>
          </div>
        </div>
      </div>

      {/* Card Stage */}
      {!current ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-stone-800">
            {mode === 'due'
              ? 'Bạn đã ôn hết thẻ đến hạn trong mục này!'
              : mode === 'weak'
                ? 'Chưa có từ nào bị đánh dấu hay sai.'
                : 'Không có thẻ từ vựng nào phù hợp bộ lọc.'}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            {dbLoaded ? 'Tiến độ SRS của bạn đã được lưu vào MongoDB Atlas.' : 'Đang đồng bộ...'}
          </p>
          {mode !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setMode('all');
                setIndex(0);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Xem tất cả thẻ</span>
            </button>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500">
            <span>
              Thẻ {index + 1} / {deck.length} · Bài {current.lessonId}
            </span>
            <span>Nhấn Space để lật · Phím 1–4 để đánh giá</span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setFlipped((f) => !f);
            }}
            className="group relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition hover:border-stone-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                  {current.kind === 'expression' ? 'Giao tiếp' : current.pos || 'Từ vựng'}
                </span>
                {cardStates[current.id] && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    Đã ôn {cardStates[current.id]!.reps} lần
                  </span>
                )}
              </div>
              <SpeakButton text={current.reading || current.word} size="md" />
            </div>

            <div className="my-6 text-center">
              {showFurigana && current.reading !== current.word && (
                <div className="font-jp mb-2 text-lg font-medium text-stone-500">{current.reading}</div>
              )}
              <div
                className="font-jp text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl"
                onClick={(e) => {
                  e.stopPropagation();
                  speakJapanese(current.reading || current.word);
                  setFlipped((f) => !f);
                }}
              >
                {current.word}
              </div>

              {flipped ? (
                <div className="mt-6 space-y-3 border-t border-stone-100 pt-5">
                  <div className="text-xl font-bold text-[#c83e2b]">{current.meaning}</div>
                  {current.note && (
                    <p className="mx-auto max-w-lg text-sm text-stone-600">{current.note}</p>
                  )}
                  {currentKanji.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {currentKanji.map((k) => (
                        <span
                          key={k.id}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs"
                        >
                          <span className="font-jp text-base font-bold text-stone-900">{k.char}</span>
                          <span className="font-semibold text-stone-600">{k.hanViet || '—'}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-8 text-xs font-medium text-stone-400">
                  Bấm vào thẻ để xem nghĩa tiếng Việt
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>{current.id}</span>
              <span>{flipped ? 'Chọn mức độ ghi nhớ bên dưới' : 'Mặt trước'}</span>
            </div>
          </div>

          {flipped ? (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {RATING_BUTTONS.map((btn) => (
                <button
                  key={btn.rating}
                  type="button"
                  disabled={saving}
                  onClick={() => handleRate(btn.rating)}
                  className={`flex flex-col items-center rounded-2xl border px-3 py-3 text-center transition disabled:opacity-50 ${btn.cls}`}
                >
                  <span className="text-sm font-bold">
                    {btn.label} <span className="opacity-60">({btn.keyHint})</span>
                  </span>
                  <span className="mt-0.5 text-xs opacity-80">
                    {intervals ? intervals[btn.rating] : ''}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="w-full rounded-2xl bg-stone-900 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Lật thẻ xem đáp án
            </button>
          )}
        </div>
      )}
    </div>
  );
}

