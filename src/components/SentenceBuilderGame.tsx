'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Flame, HelpCircle, RotateCcw, Sparkles, Trophy, XCircle } from 'lucide-react';
import type { SentenceChallenge } from '@/data/types';
import { SpeakButton, speakJapanese } from './SpeakButton';

interface Tile {
  uid: string;
  text: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function SentenceBuilderGame({
  challenges,
  title = 'Trò chơi ghép câu',
}: {
  challenges: SentenceChallenge[];
  title?: string;
}) {
  const [lessonFilter, setLessonFilter] = useState<string>('ALL');

  const filtered = useMemo(
    () =>
      lessonFilter === 'ALL'
        ? challenges
        : challenges.filter((c) => c.lessonId === lessonFilter),
    [challenges, lessonFilter],
  );

  const availableLessons = useMemo(
    () => [...new Set(challenges.map((c) => c.lessonId))],
    [challenges],
  );

  const [idx, setIdx] = useState(0);
  const [pool, setPool] = useState<Tile[]>([]);
  const [selected, setSelected] = useState<Tile[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.stats) return;
        setXp(data.stats.xp ?? 0);
        setStreak(data.stats.streak ?? 0);
        setCompletedIds(data.stats.completedSentenceIds ?? []);
      })
      .catch(() => {});
  }, []);

  const current = filtered[idx] ?? null;

  useEffect(() => {
    if (!current) return;
    const raw: Tile[] = [...current.answer, ...current.distractors].map((text, i) => ({
      uid: `${current.id}-${i}-${text}`,
      text,
    }));
    setPool(shuffle(raw));
    setSelected([]);
    setStatus('idle');
    setShowHint(false);
  }, [current]);

  if (!current) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-600">
        Chưa có bài tập ghép câu cho mục này.
      </div>
    );
  }

  const pickTile = (tile: Tile) => {
    if (status === 'correct') return;
    setStatus('idle');
    setPool((p) => p.filter((t) => t.uid !== tile.uid));
    setSelected((s) => [...s, tile]);
  };

  const removeTile = (tile: Tile) => {
    if (status === 'correct') return;
    setStatus('idle');
    setSelected((s) => s.filter((t) => t.uid !== tile.uid));
    setPool((p) => [...p, tile]);
  };

  const resetBoard = () => {
    setPool((p) => shuffle([...p, ...selected]));
    setSelected([]);
    setStatus('idle');
  };

  const checkAnswer = async () => {
    const userSentence = selected.map((t) => t.text).join('');
    const targetSentence = current.answer.join('');
    const isCorrect = userSentence === targetSentence;
    setStatus(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      speakJapanese(targetSentence);
    }

    try {
      const res = await fetch('/api/game/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: current.id,
          correct: isCorrect,
          usedHint: showHint,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setXp(data.stats.xp);
        setStreak(data.stats.streak);
        setCompletedIds(data.stats.completedSentenceIds ?? []);
      }
    } catch {
      // keep playing locally if offline
    }
  };

  const nextChallenge = () => {
    setIdx((i) => (i + 1) % filtered.length);
  };

  const isSolvedBefore = completedIds.includes(current.id);

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div>
          <div className="text-sm font-bold text-stone-900">{title}</div>
          <div className="text-xs text-stone-500">
            Câu {idx + 1} / {filtered.length} · Bài {current.lessonId}
            {isSolvedBefore ? ' · Đã hoàn thành' : ''}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableLessons.length > 1 && (
            <select
              value={lessonFilter}
              onChange={(e) => {
                setLessonFilter(e.target.value);
                setIdx(0);
              }}
              aria-label="Lọc theo bài"
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700"
            >
              <option value="ALL">Tất cả ({challenges.length} câu)</option>
              {availableLessons.map((lid) => (
                <option key={lid} value={lid}>
                  Bài {lid}
                </option>
              ))}
            </select>
          )}
          <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5" />
            {xp} XP
          </span>
          <span className="inline-flex items-center gap-1 rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-800">
            <Flame className="h-3.5 w-3.5" />
            Combo {streak}
          </span>
          <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Trophy className="h-3.5 w-3.5" />
            {completedIds.length}/{challenges.length}
          </span>
        </div>
      </div>

      {/* Prompt & Assembly Board */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Ghép câu tiếng Nhật tương ứng
        </div>
        <div className="mt-1.5 text-xl font-bold text-stone-900 sm:text-2xl">{current.vi}</div>

        {/* Selected answer area */}
        <div
          className={`mt-5 flex min-h-[76px] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3.5 transition ${
            status === 'correct'
              ? 'border-emerald-400 bg-emerald-50/60'
              : status === 'wrong'
                ? 'border-rose-300 bg-rose-50/50'
                : 'border-stone-200 bg-stone-50/60'
          }`}
        >
          {selected.length === 0 ? (
            <span className="text-sm text-stone-400">
              Bấm vào các thẻ từ bên dưới theo đúng thứ tự câu...
            </span>
          ) : (
            selected.map((tile) => (
              <button
                key={tile.uid}
                type="button"
                onClick={() => removeTile(tile)}
                className="font-jp rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-base font-semibold text-stone-900 shadow-xs transition hover:border-rose-300 hover:bg-rose-50"
              >
                {tile.text}
              </button>
            ))
          )}
        </div>

        {/* Pool tiles */}
        <div className="mt-5 flex flex-wrap gap-2">
          {pool.map((tile) => (
            <button
              key={tile.uid}
              type="button"
              onClick={() => pickTile(tile)}
              className="font-jp rounded-xl border border-stone-200 bg-stone-100/80 px-3.5 py-2 text-base font-medium text-stone-800 transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white"
            >
              {tile.text}
            </button>
          ))}
        </div>

        {/* Hint */}
        {showHint && current.hint && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
            <strong>Gợi ý:</strong> {current.hint}
          </div>
        )}

        {/* Feedback */}
        {status === 'correct' && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold">
                Chính xác!{' '}
                <span className="font-jp ml-1 text-base">{current.answer.join(' ')}。</span>
              </span>
            </div>
            <SpeakButton text={current.answer.join('')} label="Nghe lại câu" size="md" />
          </div>
        )}

        {status === 'wrong' && (
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            <div>
              <div className="font-semibold">Chưa đúng thứ tự hoặc trợ từ.</div>
              {current.hint && <div className="mt-0.5 text-rose-800">{current.hint}</div>}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetBoard}
              disabled={selected.length === 0 || status === 'correct'}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Làm lại
            </button>
            {current.hint && (
              <button
                type="button"
                onClick={() => setShowHint((h) => !h)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Gợi ý
              </button>
            )}
          </div>

          {status === 'correct' ? (
            <button
              type="button"
              onClick={nextChallenge}
              className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Câu tiếp theo →
            </button>
          ) : (
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={checkAnswer}
              className="rounded-xl bg-[#c83e2b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b03524] disabled:opacity-40"
            >
              Kiểm tra
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

