'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, Puzzle, ScrollText } from 'lucide-react';
import type { Grammar, Kanji, SentenceChallenge, Vocab } from '@/data/types';
import { splitVocabChunks } from '@/lib/vocab-chunks';
import { buildWordRuby } from '@/lib/ruby';
import { GrammarHighlight } from './GrammarHighlight';
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
  const [showKanjiFurigana, setShowKanjiFurigana] = useState(true);
  const [vocabPart, setVocabPart] = useState<string>('ALL');

  const vocabChunks = useMemo(() => splitVocabChunks(lessonId, vocab), [lessonId, vocab]);
  const visibleVocab = useMemo(() => {
    if (vocabPart === 'ALL' || vocabChunks.length <= 1) return vocab;
    return vocabChunks.find((c) => c.key === vocabPart)?.items ?? vocab;
  }, [vocab, vocabChunks, vocabPart]);

  const flashcardHref =
    vocabPart !== 'ALL' && vocabChunks.length > 1
      ? `/flashcards?lesson=${lessonId}&part=${vocabPart}`
      : `/flashcards?lesson=${lessonId}`;

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

        <div className="flex flex-wrap items-center gap-2">
          {(tab === 'vocab' || tab === 'grammar') && (
            <button
              type="button"
              onClick={() => setShowKana((s) => !s)}
              className="min-h-[40px] rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              {showKana ? 'Ẩn Hiragana nhỏ' : 'Hiện Hiragana nhỏ'}
            </button>
          )}
          {tab === 'kanji' && (
            <button
              type="button"
              onClick={() => setShowKanjiFurigana((s) => !s)}
              className="min-h-[40px] rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              {showKanjiFurigana ? 'Ẩn Hiragana nhỏ' : 'Hiện Hiragana nhỏ'}
            </button>
          )}
          <Link
            href={flashcardHref}
            className="inline-flex min-h-[40px] items-center rounded-xl bg-[#2d6a4f] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#24553f]"
          >
            Ôn Flashcard{' '}
            {vocabPart !== 'ALL' && vocabChunks.length > 1 ? vocabPart : `bài ${lessonId}`}
          </Link>
        </div>
      </div>

      {/* Tab 1: Vocab */}
      {tab === 'vocab' && (
        <div className="space-y-3">
          {vocabChunks.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-xs">
              <span className="text-xs font-semibold text-stone-500">Chia nhỏ để dễ nhớ:</span>
              <button
                type="button"
                onClick={() => setVocabPart('ALL')}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  vocabPart === 'ALL'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Tất cả ({vocab.length})
              </button>
              {vocabChunks.map((chunk) => (
                <button
                  key={chunk.key}
                  type="button"
                  onClick={() => setVocabPart(chunk.key)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    vocabPart === chunk.key
                      ? 'bg-[#c83e2b] text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {chunk.label} ({chunk.items.length})
                </button>
              ))}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
            <div className="divide-y divide-stone-100">
              {visibleVocab.map((v) => (
              <div
                key={v.id}
                className="flex flex-col justify-between gap-2.5 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <SpeakButton text={v.reading || v.word} />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <RubyText
                        segments={buildWordRuby(v.word, v.reading)}
                        showFurigana={showKana}
                        className="text-xl sm:text-2xl font-bold leading-loose text-stone-900"
                      />
                      {v.pos && (
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                          {v.pos}
                        </span>
                      )}
                      {v.kind === 'expression' && (
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                          Biểu hiện
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pl-11 sm:pl-0 sm:text-right">
                  <div className="text-base sm:text-lg font-semibold text-stone-800">{v.meaning}</div>
                  {v.note && <div className="mt-0.5 text-sm text-stone-600">{v.note}</div>}
                </div>
              </div>
            ))}
          </div>
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
                    <span className="font-jp flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-[#faf8f5] text-4xl font-bold text-stone-900">
                      {k.char}
                    </span>
                    <div>
                      <div className="text-base font-bold uppercase tracking-wide text-[#c83e2b]">
                        {k.hanViet || '—'}
                      </div>
                      <div className="font-jp mt-1 text-sm text-stone-600">
                        <span className="font-semibold text-stone-500">訓:</span>{' '}
                        {k.kun.length ? k.kun.join('、') : '—'}
                      </div>
                      <div className="font-jp text-sm text-stone-600">
                        <span className="font-semibold text-stone-500">音:</span>{' '}
                        {k.on.length ? k.on.join('、') : '—'}
                      </div>
                    </div>
                  </div>
                  <SpeakButton text={k.examples[0]?.reading || k.char} />
                </div>

                <div className="mt-4 space-y-2.5 border-t border-stone-100 pt-3">
                  {k.examples.map((ex, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-2 text-base leading-loose">
                      <RubyText
                        segments={ex.ruby}
                        showFurigana={showKanjiFurigana}
                        className="font-medium text-stone-900"
                      />
                      <span className="text-right text-sm text-stone-600">{ex.meaning}</span>
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
                className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-jp text-lg sm:text-xl font-bold leading-loose text-stone-900">
                    <span className="mr-2 rounded-lg bg-[#c83e2b]/10 px-2.5 py-0.5 text-xs sm:text-sm font-bold text-[#c83e2b]">
                      Mẫu {g.no}
                    </span>
                    <GrammarHighlight text={g.pattern} variant="pattern" showFurigana={showKana} />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#2d6a4f]">{g.meaning}</div>
                </div>

                <p className="mt-3 text-base sm:text-[17px] leading-loose text-stone-800">
                  <GrammarHighlight text={g.explanation} variant="prose" showFurigana={showKana} />
                </p>

                {g.analysis && (
                  <div className="mt-4 space-y-3 rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-sm sm:text-base">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#2d6a4f] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                        Công thức
                      </span>
                      <span className="font-jp text-base sm:text-lg font-semibold leading-loose text-stone-900">
                        <GrammarHighlight
                          text={g.analysis.formula}
                          variant="pattern"
                          showFurigana={showKana}
                        />
                      </span>
                    </div>

                    <div className="space-y-2">
                      {g.analysis.parts.map((part, idx) => (
                        <div
                          key={idx}
                          className="flex flex-wrap items-baseline gap-2 leading-loose text-stone-800"
                        >
                          <span className="font-jp rounded-md bg-white px-2 py-0.5 font-bold leading-loose text-[#c83e2b] ring-1 ring-red-200">
                            <GrammarHighlight
                              text={part.token}
                              variant="pattern"
                              showFurigana={showKana}
                            />
                          </span>
                          <span>:</span>
                          <span>
                            <GrammarHighlight
                              text={part.role}
                              variant="prose"
                              showFurigana={showKana}
                            />
                          </span>
                        </div>
                      ))}
                    </div>

                    {g.analysis.tip && (
                      <div className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-3.5 py-2.5 leading-loose text-amber-950">
                        <span className="mr-1.5 font-bold text-[#c83e2b]">★ Điểm cần chú ý:</span>
                        <GrammarHighlight
                          text={g.analysis.tip}
                          variant="prose"
                          showFurigana={showKana}
                        />
                      </div>
                    )}
                  </div>
                )}

                {g.notes.length > 0 && (
                  <ul className="mt-3.5 space-y-1.5 rounded-xl bg-amber-50/70 px-4 py-3 text-sm sm:text-base leading-loose text-amber-950">
                    {g.notes.map((n, i) => (
                      <li key={i}>
                        ★ <GrammarHighlight text={n} variant="prose" showFurigana={showKana} />
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 space-y-3 border-t border-stone-100 pt-3.5">
                  {g.examples.map((ex, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div>
                        {ex.ruby ? (
                          <RubyText
                            segments={ex.ruby}
                            showFurigana={showKana}
                            className="text-base sm:text-lg font-semibold leading-loose text-stone-900"
                          />
                        ) : (
                          <div className="font-jp text-base sm:text-lg font-semibold leading-loose text-stone-900">
                            {ex.ja}
                          </div>
                        )}
                        <div className="text-sm sm:text-base text-stone-600">{ex.vi}</div>
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

