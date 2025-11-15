export type GemType =
  | 'shard'
  | 'pentagonal'
  | 'orb'
  | 'heart'
  | 'oval'
  | 'rectangular'
  | 'teardrop'
  | 'diamond'
  | 'square'
  | 'circular';

export interface Position {
  row: number;
  col: number;
}

export interface Gem {
  type: GemType;
  id: string;
}

export interface Board {
  gems: Gem[][];
  rows: number;
  cols: number;
}

export interface Match {
  positions: Position[];
  type: GemType;
  length: number;
}

export interface SwapResult {
  board: Board;
  matches: Match[];
  isValid: boolean;
}

export interface GameConfig {
  rows: number;
  cols: number;
  gemTypes: GemType[];
  minMatchLength: number;
}
