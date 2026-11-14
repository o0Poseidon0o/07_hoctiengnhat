'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Compass, Layers, Map, Puzzle, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Tổng quan', icon: Sparkles },
  { href: '/topics', label: 'Chủ đề', icon: Compass },
  { href: '/grammar', label: 'Ngữ pháp', icon: Map },
  { href: '/lessons/1A', label: 'Bài học', icon: BookOpen, matchPrefix: '/lessons' },
  { href: '/flashcards', label: 'Flashcard', icon: Layers },
  { href: '/game', label: 'Ghép câu', icon: Puzzle },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#faf8f5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c83e2b] font-jp text-base font-bold text-white shadow-sm">
            日
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-stone-900">Nihongo Studio</div>
            <div className="text-[11px] font-medium text-stone-500">Lộ trình JLPT N5 · N4</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon, matchPrefix }) => {
            const active = matchPrefix
              ? pathname.startsWith(matchPrefix)
              : href === '/'
                ? pathname === '/'
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

