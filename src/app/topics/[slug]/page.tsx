import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Gamepad2, Layers } from 'lucide-react';
import { getTopicBundle } from '@/data';
import { SpeakButton } from '@/components/SpeakButton';
import { RubyText } from '@/components/RubyText';

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getTopicBundle(slug);

  if (!bundle.topic) {
    notFound();
  }

  const firstLesson = bundle.topic.lessonIds[0] ?? '1A';

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/topics"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Tất cả chủ đề N5
        </Link>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/flashcards?lesson=${firstLesson}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <Layers className="h-3.5 w-3.5" />
            Ôn Flashcard bài {firstLesson}
          </Link>
          <Link
            href="/game"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          >
            <Gamepad2 className="h-3.5 w-3.5 text-amber-600" />
            Chơi ghép câu
          </Link>
        </div>
      </div>

      <header className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900">{bundle.topic.title}</h1>
        <p className="mt-1 text-sm text-stone-600">{bundle.topic.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {bundle.topic.lessonIds.map((id) => (
            <Link
              key={id}
              href={`/lessons/${id}`}
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
            >
              Bài {id}
            </Link>
          ))}
        </div>
      </header>

      {/* Vocab Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900">
          Từ vựng trong chủ đề ({bundle.vocab.length})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bundle.vocab.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-jp text-lg font-bold text-stone-900">{item.word}</span>
                  {item.reading && item.reading !== item.word && (
                    <span className="font-jp rounded bg-stone-100 px-1.5 py-0.5 text-xs font-medium text-stone-700">
                      {item.reading}
                    </span>
                  )}
                  {item.pos && (
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-800">
                      {item.pos}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-rose-700">{item.meaning}</p>
                <p className="mt-1 text-xs text-stone-400">Bài {item.lessonId}</p>
              </div>
              <SpeakButton text={item.word} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Kanji Section */}
      {bundle.kanji.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">
            Chữ Hán liên quan ({bundle.kanji.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bundle.kanji.map((k) => (
              <div
                key={k.id}
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-jp flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-2xl font-bold text-rose-700">
                      {k.char}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{k.hanViet}</p>
                      {k.examples[0] && (
                        <p className="text-xs text-stone-600">
                          VD: {k.examples[0].word} ({k.examples[0].meaning})
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">Bài {k.lessonId}</span>
                </div>
                {(k.on.length > 0 || k.kun.length > 0) && (
                  <div className="mt-3 space-y-1 text-xs text-stone-600">
                    {k.on.length > 0 && <p>Âm On: {k.on.join('、')}</p>}
                    {k.kun.length > 0 && <p>Âm Kun: {k.kun.join('、')}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grammar Section */}
      {bundle.grammar.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">
            Ngữ pháp trọng tâm ({bundle.grammar.length})
          </h2>
          <div className="space-y-3">
            {bundle.grammar.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-rose-700">{g.pattern}</h3>
                  <span className="text-xs font-medium text-stone-500">Bài {g.lessonId}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-stone-900">{g.meaning}</p>
                <p className="mt-1 text-sm text-stone-600">{g.explanation}</p>
                {g.examples.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-stone-100 pt-3">
                    {g.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-3 text-sm">
                        <div>
                          {ex.ruby ? (
                            <RubyText segments={ex.ruby} showFurigana />
                          ) : (
                            <span className="font-jp">{ex.ja}</span>
                          )}
                          <p className="text-xs text-stone-500">{ex.vi}</p>
                        </div>
                        <SpeakButton text={ex.ja} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
