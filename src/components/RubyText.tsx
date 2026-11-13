import type { RubySegment } from '@/data/types';

export function RubyText({
  segments,
  showFurigana = true,
  className = '',
}: {
  segments: RubySegment[];
  showFurigana?: boolean;
  className?: string;
}) {
  return (
    <span className={`font-jp ${className}`}>
      {segments.map(([text, reading], idx) =>
        reading && showFurigana ? (
          <ruby key={idx}>
            {text}
            <rt className="text-[0.58em] font-normal text-stone-500">{reading}</rt>
          </ruby>
        ) : (
          <span key={idx}>{text}</span>
        ),
      )}
    </span>
  );
}

