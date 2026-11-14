import { getLevelContent } from '@/data';
import type { LevelId } from '@/data/types';
import { GrammarExplorer } from '@/components/GrammarExplorer';

export default async function GrammarPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const initialLevel: LevelId = level === 'n4' ? 'n4' : 'n5';
  const n5 = getLevelContent('n5');
  const n4 = getLevelContent('n4');

  return (
    <div className="py-2">
      <GrammarExplorer
        n5Grammar={n5.grammar}
        n4Grammar={n4.grammar}
        initialLevel={initialLevel}
      />
    </div>
  );
}

