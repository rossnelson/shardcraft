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

export type Position = {
  row: number;
  col: number;
};

export type Gem = {
  type: GemType;
  id: string;
};

export type Board = {
  gems: Gem[][];
  rows: number;
  cols: number;
};

export type Match = {
  positions: Position[];
  type: GemType;
  length: number;
};

export type SwapResult = {
  board: Board;
  matches: Match[];
  isValid: boolean;
};

export type GameState = 'idle' | 'playing' | 'paused' | 'gameover';

export type GameConfig = {
  rows: number;
  cols: number;
  gemTypes: GemType[];
  minMatchLength: number;
};
