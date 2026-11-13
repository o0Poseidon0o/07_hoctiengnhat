import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nihongo Studio — Học tiếng Nhật N5 theo chủ đề',
  description:
    'Học Từ vựng, Kanji, Ngữ pháp tiếng Nhật N5 theo chủ đề với Flashcard FSRS và trò chơi ghép câu.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased selection:bg-amber-200/70">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">{children}</main>
      </body>
    </html>
  );
}

