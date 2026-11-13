'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, Puzzle, ScrollText } from 'lucide-react';
import type { Grammar, Kanji, SentenceChallenge, Vocab } from '@/data/types';
import { RubyText } from './RubyText';
import { SentenceBuilderGame } from './SentenceBuilderGame';
import { SpeakButton } from './SpeakButton';

type TabKey = 'vocab' | 'kanji' | 'grammar' | 'game';

export function LessonTabs({
  lessonId,
  vocab,
  kanji,
  grammar,
  sentences,
}: {
  lessonId: string;
  vocab: Vocab[];
  kanji: Kanji[];
  grammar: Grammar[];
  sentences: SentenceChallenge[];
}) {
  const [tab, setTab] = useState<TabKey>('vocab');
  const [showKana, setShowKana] = useState(true);

  const tabs: { key: TabKey; label: string; count: number; icon: typeof BookOpen }[] = [
    { key: 'vocab', label: 'Từ vựng', count: vocab.length, icon: BookOpen },
    { key: 'kanji', label: 'Chữ Hán', count: kanji.length, icon: ScrollText },
    { key: 'grammar', label: 'Ngữ pháp', count: grammar.length, icon: Layers },
    { key: 'game', label: 'Ghép câu', count: sentences.length, icon: Puzzle },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xs">
          {tabs.map(({ key, label, count, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                tab === key
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                  tab === key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {tab === 'vocab' && (
            <button
              type="button"
              onClick={() => setShowKana((s) => !s)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              {showKana ? 'Ẩn cách đọc' : 'Hiện cách đọc'}
            </button>
          )}
          <Link
            href={`/flashcards?lesson=${lessonId}`}
            className="rounded-xl bg-[#2d6a4f] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#24553f]"
          >
            Ôn Flashcard bài {lessonId}
          </Link>
        </div>
      </div>

      {/* Tab 1: Vocab */}
      {tab === 'vocab' && (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="divide-y divide-stone-100">
            {vocab.map((v) => (
              <div
                key={v.id}
                className="flex flex-col justify-between gap-2 px-5 py-3.5 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <SpeakButton text={v.reading || v.word} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-jp text-lg font-bold text-stone-900">{v.word}</span>
                      {v.pos && (
                        <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] font-semibold text-stone-600">
                          {v.pos}
                        </span>
                      )}
                      {v.kind === 'expression' && (
                        <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
                          Biểu hiện
                        </span>
                      )}
                    </div>
                    {showKana && v.reading !== v.word && (
                      <div className="font-jp text-sm text-stone-500">{v.reading}</div>
                    )}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-sm font-semibold text-stone-800">{v.meaning}</div>
                  {v.note && <div className="text-xs text-stone-500">{v.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Kanji */}
      {tab === 'kanji' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kanji.map((k) => (
            <div
              key={k.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-jp flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-[#faf8f5] text-3xl font-bold text-stone-900">
                      {k.char}
                    </span>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wide text-[#c83e2b]">
                        {k.hanViet || '—'}
                      </div>
                      <div className="font-jp mt-1 text-xs text-stone-600">
                        <span className="font-semibold text-stone-500">訓:</span>{' '}
                        {k.kun.length ? k.kun.join('、') : '—'}
                      </div>
                      <div className="font-jp text-xs text-stone-600">
                        <span className="font-semibold text-stone-500">音:</span>{' '}
                        {k.on.length ? k.on.join('、') : '—'}
                      </div>
                    </div>
                  </div>
                  <SpeakButton text={k.examples[0]?.reading || k.char} />
                </div>

                <div className="mt-4 space-y-2 border-t border-stone-100 pt-3">
                  {k.examples.map((ex, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-2 text-sm">
                      <RubyText segments={ex.ruby} className="font-medium text-stone-900" />
                      <span className="text-right text-xs text-stone-600">{ex.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Grammar */}
      {tab === 'grammar' &&
        (grammar.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-600">
            Ngữ pháp chi tiết bài {lessonId} đang được cập nhật tiếp (hiện đã có đầy đủ cho Bài 1A–1C).
          </div>
        ) : (
          <div className="space-y-4">
            {grammar.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-jp text-lg font-bold text-stone-900">
                    <span className="mr-2 rounded-lg bg-[#c83e2b]/10 px-2 py-0.5 text-xs font-bold text-[#c83e2b]">
                      Mẫu {g.no}
                    </span>
                    {g.pattern}
                  </div>
                  <div className="text-sm font-bold text-[#2d6a4f]">{g.meaning}</div>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-stone-700">{g.explanation}</p>

                {g.notes.length > 0 && (
                  <ul className="mt-3 space-y-1 rounded-xl bg-amber-50/70 px-4 py-2.5 text-xs text-amber-900">
                    {g.notes.map((n, i) => (
                      <li key={i}>★ {n}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 space-y-2 border-t border-stone-100 pt-3">
                  {g.examples.map((ex, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-jp text-sm font-semibold text-stone-900">{ex.ja}</div>
                        <div className="text-xs text-stone-600">{ex.vi}</div>
                      </div>
                      <SpeakButton text={ex.ja} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Tab 4: Sentence Builder */}
      {tab === 'game' && (
        <SentenceBuilderGame challenges={sentences} title={`Ghép câu — Bài ${lessonId}`} />
      )}
    </div>
  );
}

