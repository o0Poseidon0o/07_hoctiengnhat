import React from 'react';
import { segmentJapaneseFurigana } from '@/lib/ruby';
import { RubyText } from './RubyText';

const HAS_KANJI_RE = /[\u4e00-\u9faf々ヶ]/;

const PATTERN_GRAMMAR_TOKENS = [
  'ではありませんでした',
  'じゃありませんでした',
  'じゃなかったです',
  'なければなりません',
  'ないといけません',
  'なくてもいいです',
  'じゃありません',
  'ではありません',
  'じゃないです',
  'てくださいませんか',
  'てくれませんか',
  'てもいいですか',
  'てもいいです',
  'てはいけません',
  'ないでください',
  'てくれますか',
  'ていました',
  'ています',
  'てください',
  'てあげる',
  'てくれる',
  'てもらう',
  'さしあげる',
  'くださる',
  'ことがあります',
  'ことができます',
  'ほうがいいです',
  'つもりです',
  'と思います',
  'と言います',
  'たばかりだ',
  'ませんでした',
  'ましょうか',
  'じゃなかった',
  'いません',
  'ありません',
  'いないです',
  'ないです',
  'ましょう',
  'ませんか',
  'ました',
  'ません',
  'でした',
  'だった',
  'じゃない',
  'だよね',
  'います',
  'あります',
  'のほうが',
  '一番',
  'くらい',
  'ぐらい',
  'ながら',
  '前に',
  '後で',
  'よね',
  'だよ',
  'だね',
  'です',
  'ます',
  'たら',
  'なら',
  'しか',
  'だけ',
  'より',
  'まで',
  'から',
  'とか',
  'など',
  'けど',
  'ば',
  'は',
  'が',
  'を',
  'に',
  'で',
  'へ',
  'と',
  'も',
  'の',
  'や',
  'か',
  'よ',
  'ね',
];

const SLOT_TOKENS = [
  'Thể Thường',
  'Vますたい',
  'Vます',
  'Vて',
  'Vた',
  'Vない',
  'Vる',
  'Vば',
  'Vよう',
  'V1',
  'V2',
  'N1',
  'N2',
  'N3',
  'Aい',
  'Aな',
];

const PATTERN_RE = new RegExp(
  `(${[...PATTERN_GRAMMAR_TOKENS, ...SLOT_TOKENS]
    .sort((a, b) => b.length - a.length)
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')}|(?<![A-Za-zÀ-ỹ0-9])[NVA](?![A-Za-zÀ-ỹ0-9]))`,
  'g',
);

const GRAMMAR_SET = new Set(PATTERN_GRAMMAR_TOKENS);
const SLOT_SET = new Set([...SLOT_TOKENS, 'N', 'V', 'A']);

const PROSE_KEYWORDS = [
  'Chú ý',
  'Lưu ý',
  'Ngoại lệ',
  'Phân biệt',
  'Mẹo nhớ',
  'Công thức',
  'Cách chia',
  'Không dùng',
  'Bắt buộc',
  'Thể thường',
  'Thể lịch sự',
  'Thể từ điển',
  'Thể khả năng',
  'Thể ý chí',
  'Thể て',
  'Thể た',
  'Thể ない',
  'Thể ば',
  'Nhóm I',
  'Nhóm II',
  'Nhóm III',
];

const PROSE_RE = new RegExp(
  `(「[^」]+」|${PROSE_KEYWORDS.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|→)`,
  'g',
);

export function GrammarHighlight({
  text,
  variant = 'prose',
  showFurigana = true,
}: {
  text: string;
  variant?: 'pattern' | 'prose';
  showFurigana?: boolean;
}) {
  const renderJp = (str: string) =>
    HAS_KANJI_RE.test(str) ? (
      <RubyText segments={segmentJapaneseFurigana(str)} showFurigana={showFurigana} />
    ) : (
      str
    );

  if (variant === 'pattern') {
    const parts = text.split(PATTERN_RE);
    return (
      <>
        {parts.map((part, idx) => {
          if (!part) return null;
          if (GRAMMAR_SET.has(part)) {
            return (
              <span key={idx} className="font-extrabold text-[#c83e2b]">
                {renderJp(part)}
              </span>
            );
          }
          if (SLOT_SET.has(part)) {
            return (
              <span
                key={idx}
                className="mx-0.5 rounded bg-[#2d6a4f]/10 px-1.5 py-0.5 font-bold text-[#2d6a4f]"
              >
                {renderJp(part)}
              </span>
            );
          }
          return <React.Fragment key={idx}>{renderJp(part)}</React.Fragment>;
        })}
      </>
    );
  }

  const parts = text.split(PROSE_RE);
  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        if (part.startsWith('「') && part.endsWith('」')) {
          return (
            <span
              key={idx}
              className="mx-0.5 inline-block rounded-md bg-red-50 px-1.5 py-0.5 font-bold leading-loose text-[#c83e2b]"
            >
              {renderJp(part)}
            </span>
          );
        }
        if (part === '→') {
          return (
            <span key={idx} className="mx-1 font-bold text-[#c83e2b]">
              →
            </span>
          );
        }
        if (PROSE_KEYWORDS.includes(part)) {
          return (
            <strong key={idx} className="font-bold text-[#2d6a4f]">
              {renderJp(part)}
            </strong>
          );
        }
        return <React.Fragment key={idx}>{renderJp(part)}</React.Fragment>;
      })}
    </>
  );
}

