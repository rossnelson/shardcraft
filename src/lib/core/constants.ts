import type { GemType, GameConfig } from './types';

export const GEM_TYPES: GemType[] = [
  'diamond',
  'heart',
  'orb',
  'square',
  'circular',
  'oval'
];

export const DEFAULT_CONFIG: GameConfig = {
  rows: 8,
  cols: 8,
  gemTypes: GEM_TYPES,
  minMatchLength: 3
};

export const POINTS_PER_GEM = 10;
export const COMBO_MULTIPLIER = 1.5;
