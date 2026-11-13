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
          <ruby key={idx} className="ruby-align-center">
            {text}
            <rt className="select-none text-[0.64em] font-medium leading-none tracking-tight text-stone-600">
              {reading}
            </rt>
          </ruby>
        ) : (
          <span key={idx}>{text}</span>
        ),
      )}
    </span>
  );
}

