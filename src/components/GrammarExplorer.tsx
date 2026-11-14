'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GitCompareArrows,
  Map as MapIcon,
  Search,
} from 'lucide-react';
import type { Grammar, LevelId } from '@/data/types';
import {
  GRAMMAR_COMPARISONS,
  groupGrammarByClusters,
} from '@/data/grammar-clusters';
import { GrammarHighlight } from './GrammarHighlight';
import { RubyText } from './RubyText';
import { SpeakButton } from './SpeakButton';

interface GrammarExplorerProps {
  n5Grammar: Grammar[];
  n4Grammar: Grammar[];
  initialLevel?: LevelId;
}

export function GrammarExplorer({
  n5Grammar,
  n4Grammar,
  initialLevel = 'n5',
}: GrammarExplorerProps) {
  const [level, setLevel] = useState<LevelId>(initialLevel);
  const [query, setQuery] = useState('');
  const [showFurigana, setShowFurigana] = useState(true);
  const [showCompare, setShowCompare] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const activeGrammar = level === 'n4' ? n4Grammar : n5Grammar;

  const filteredGrammar = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeGrammar;
    return activeGrammar.filter(
      (g) =>
        g.pattern.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q) ||
        g.lessonId.toLowerCase().includes(q),
    );
  }, [activeGrammar, query]);

  const clusters = useMemo(
    () => groupGrammarByClusters(level, filteredGrammar),
    [level, filteredGrammar],
  );

  const comparisons = useMemo(
    () => GRAMMAR_COMPARISONS.filter((c) => c.level === level),
    [level],
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              <MapIcon className="h-3.5 w-3.5" />
              Minimap &amp; Tổng hợp Ngữ pháp
            </div>
            <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
              Bản đồ Ngữ pháp {level.toUpperCase()} ({activeGrammar.length} mẫu)
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Gom nhóm theo chức năng, đối chiếu các mẫu dễ nhầm và tra cứu nhanh theo từ khóa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl border border-stone-200 bg-stone-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLevel('n5')}
                className={`rounded-lg px-3.5 py-1.5 transition ${
                  level === 'n5' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                JLPT N5 ({n5Grammar.length})
              </button>
              <button
                type="button"
                onClick={() => setLevel('n4')}
                className={`rounded-lg px-3.5 py-1.5 transition ${
                  level === 'n4' ? 'bg-rose-600 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                JLPT N4 ({n4Grammar.length})
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowFurigana((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              {showFurigana ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showFurigana ? 'Ẩn Hiragana nhỏ' : 'Hiện Hiragana nhỏ'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm nhanh mẫu ngữ pháp (VD: てはいけません, たい, 10A, xin phép, đã từng, phải...)"
            className="w-full rounded-xl border border-stone-200 bg-stone-50/70 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-rose-300 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Comparison Matrix Section */}
      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 shadow-xs sm:p-6">
        <button
          type="button"
          onClick={() => setShowCompare((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <GitCompareArrows className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Đối chiếu các mẫu tương tự &amp; dễ nhầm ({comparisons.length} cụm)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Đặt các mẫu gần nghĩa cạnh nhau để phân biệt nhanh khi ôn tập.
              </p>
            </div>
          </div>
          {showCompare ? (
            <ChevronUp className="h-5 w-5 text-stone-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-stone-500" />
          )}
        </button>

        {showCompare && (
          <div className="mt-5 space-y-5">
            {comparisons.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs sm:p-5"
              >
                <div className="mb-3">
                  <h3 className="text-base font-bold text-stone-900 sm:text-lg">{group.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600">{group.summary}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-xl border border-stone-200 bg-stone-50/60 p-3.5"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-jp text-base font-bold leading-loose text-stone-900">
                            <GrammarHighlight
                              text={item.pattern}
                              variant="pattern"
                              showFurigana={showFurigana}
                            />
                          </div>
                          <Link
                            href={`/lessons/${item.lessonId}`}
                            className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50"
                          >
                            Bài {item.lessonId}
                          </Link>
                        </div>
                        <p className="mt-1 text-sm font-bold text-[#2d6a4f]">{item.meaning}</p>
                        <p className="mt-0.5 text-xs text-stone-600">{item.usage}</p>
                      </div>
                      <div className="mt-2.5 flex items-start justify-between gap-2 border-t border-stone-200/70 pt-2">
                        <div>
                          <div className="font-jp text-sm font-semibold leading-loose text-stone-900">
                            <GrammarHighlight
                              text={item.exampleJa}
                              variant="prose"
                              showFurigana={showFurigana}
                            />
                          </div>
                          <div className="text-xs text-stone-600">{item.exampleVi}</div>
                        </div>
                        <SpeakButton text={item.exampleJa} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mobile/Tablet Quick Minimap Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {clusters.map(({ cluster, items }) => (
          <a
            key={cluster.id}
            href={`#${cluster.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-rose-300 hover:text-rose-700"
          >
            <span>{cluster.title}</span>
            <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600">
              {items.length}
            </span>
          </a>
        ))}
      </div>

      {/* Main 2-column Minimap + Clustered List */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sticky Minimap Sidebar (Desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Minimap ({filteredGrammar.length} mẫu)
              </span>
            </div>
            <nav className="space-y-1.5">
              {clusters.map(({ cluster, items }) => (
                <a
                  key={cluster.id}
                  href={`#${cluster.id}`}
                  className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-stone-700 transition hover:bg-rose-50 hover:text-rose-700"
                >
                  <span className="line-clamp-2">{cluster.title}</span>
                  <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-600">
                    {items.length}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Grammar Clusters */}
        <div className="space-y-8">
          {clusters.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-600">
              Không tìm thấy mẫu ngữ pháp nào khớp với &ldquo;{query}&rdquo;.
            </div>
          ) : (
            clusters.map(({ cluster, items }) => (
              <section key={cluster.id} id={cluster.id} className="scroll-mt-24 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200 pb-2">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 sm:text-xl">
                      {cluster.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">{cluster.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                    {items.length} mẫu
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {items.map((g) => {
                    const isExpanded = !!expandedIds[g.id];
                    return (
                      <div
                        key={g.id}
                        className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-xs"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Link
                                href={`/lessons/${g.lessonId}`}
                                className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-[#c83e2b] hover:bg-rose-100"
                              >
                                <BookOpen className="h-3 w-3" />
                                Bài {g.lessonId}
                              </Link>
                              <span className="text-xs font-medium text-stone-400">
                                Mẫu {g.no}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleExpand(g.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                            >
                              {isExpanded ? 'Thu gọn' : 'Chi tiết'}
                              {isExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>

                          <div className="font-jp mt-2 text-base font-bold leading-loose text-stone-900 sm:text-lg">
                            <GrammarHighlight
                              text={g.pattern}
                              variant="pattern"
                              showFurigana={showFurigana}
                            />
                          </div>
                          <div className="mt-0.5 text-sm font-bold text-[#2d6a4f]">
                            {g.meaning}
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                            {g.explanation}
                          </p>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 space-y-3 border-t border-stone-100 pt-3">
                            {g.analysis && (
                              <div className="space-y-2 rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3 text-xs sm:text-sm">
                                <div className="font-semibold text-stone-900">
                                  <span className="mr-1.5 rounded bg-[#2d6a4f] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                                    Công thức
                                  </span>
                                  <GrammarHighlight
                                    text={g.analysis.formula}
                                    variant="pattern"
                                    showFurigana={showFurigana}
                                  />
                                </div>
                                {g.analysis.tip && (
                                  <div className="text-amber-950">
                                    <span className="font-bold text-[#c83e2b]">★ Lưu ý: </span>
                                    <GrammarHighlight
                                      text={g.analysis.tip}
                                      variant="prose"
                                      showFurigana={showFurigana}
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            {g.examples.slice(0, 2).map((ex, i) => (
                              <div
                                key={i}
                                className="flex items-start justify-between gap-2 rounded-lg bg-stone-50 p-2.5"
                              >
                                <div>
                                  {ex.ruby ? (
                                    <RubyText
                                      segments={ex.ruby}
                                      showFurigana={showFurigana}
                                      className="text-sm font-semibold leading-loose text-stone-900"
                                    />
                                  ) : (
                                    <div className="font-jp text-sm font-semibold text-stone-900">
                                      {ex.ja}
                                    </div>
                                  )}
                                  {ex.vi && (
                                    <div className="text-xs text-stone-600">{ex.vi}</div>
                                  )}
                                </div>
                                <SpeakButton text={ex.ja} size="sm" />
                              </div>
                            ))}

                            <Link
                              href={`/lessons/${g.lessonId}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"
                            >
                              Mở đầy đủ trong Bài {g.lessonId}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

