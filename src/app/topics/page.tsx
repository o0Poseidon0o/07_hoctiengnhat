import Link from 'next/link';
import { ArrowRight, BookOpen, Tag } from 'lucide-react';
import { getTopicBundle, n5Topics } from '@/data';

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <Tag className="h-3.5 w-3.5" />
          Học theo Chủ đề JLPT N5
        </div>
        <h1 className="mt-2 text-2xl font-bold text-stone-900">
          {n5Topics.length} chủ đề giao tiếp &amp; đời sống N5
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Gom từ vựng, chữ Hán và ngữ pháp theo tình huống thực tế để bạn nhớ sâu theo ngữ cảnh.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {n5Topics.map((topic) => {
          const bundle = getTopicBundle(topic.slug);
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                    {topic.lessonIds.length} bài ({topic.lessonIds[0]} –{' '}
                    {topic.lessonIds[topic.lessonIds.length - 1]})
                  </span>
                  <ArrowRight className="h-4 w-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-rose-600" />
                </div>
                <h2 className="mt-3 text-lg font-bold text-stone-900 group-hover:text-rose-700">
                  {topic.title}
                </h2>
                <p className="mt-1 text-sm text-stone-600">{topic.description}</p>
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-stone-100 pt-3 text-xs font-medium text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-rose-500" />
                  {bundle.vocab.length} từ vựng
                </span>
                <span>{bundle.kanji.length} Kanji</span>
                <span>{bundle.grammar.length} ngữ pháp</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

