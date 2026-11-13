import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Layers, Tag } from 'lucide-react';
import { getLessonBundle, getLevelContent } from '@/data';
import { LessonTabs } from '@/components/LessonTabs';

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const bundle = getLessonBundle(lessonId);

  if (!bundle.lesson) {
    notFound();
  }

  const allLessons = getLevelContent('n5').lessons;
  const currentIndex = allLessons.findIndex((item) => item.id === bundle.lesson!.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Danh sách bài học N5
        </Link>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <Link
              href={`/lessons/${prevLesson.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Bài {prevLesson.id}
            </Link>
          )}
          {nextLesson && (
            <Link
              href={`/lessons/${nextLesson.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Bài {nextLesson.id}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      <header className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                JLPT N5 · Bài {bundle.lesson.id}
              </span>
              {bundle.topic && (
                <Link
                  href={`/topics/${bundle.topic.slug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  <Tag className="h-3 w-3" />
                  {bundle.topic.title}
                </Link>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-stone-900">{bundle.lesson.title}</h1>
            <p className="mt-1 text-sm text-stone-600">
              {bundle.vocab.length} từ vựng · {bundle.kanji.length} chữ Hán ·{' '}
              {bundle.grammar.length} mẫu ngữ pháp · {bundle.sentences.length} câu ghép
            </p>
          </div>

          <Link
            href={`/flashcards?lesson=${bundle.lesson.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            <Layers className="h-4 w-4" />
            Ôn Flashcard bài này
          </Link>
        </div>
      </header>

      <LessonTabs
        lessonId={bundle.lesson.id}
        vocab={bundle.vocab}
        kanji={bundle.kanji}
        grammar={bundle.grammar}
        sentences={bundle.sentences}
      />
    </div>
  );
}
