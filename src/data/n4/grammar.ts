import type { Grammar } from '../types.ts';
import rawGrammar from './grammar-data.json' with { type: 'json' };

export const grammar: Grammar[] = rawGrammar as unknown as Grammar[];

