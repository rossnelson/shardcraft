import type { Board, Gem, GemType, Position } from './types';
import { DEFAULT_CONFIG } from './constants';

let gemIdCounter = 0;

const createGem = (type: GemType): Gem => ({
  type,
  id: `gem-${++gemIdCounter}`
});

const randomGemType = (types: GemType[]): GemType =>
  types[Math.floor(Math.random() * types.length)];

export const createBoard = (
  rows: number = DEFAULT_CONFIG.rows,
  cols: number = DEFAULT_CONFIG.cols,
  gemTypes: GemType[] = DEFAULT_CONFIG.gemTypes
): Board => {
  const gems: Gem[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createGem(randomGemType(gemTypes)))
  );

  return { gems, rows, cols };
};

export const getGem = (board: Board, pos: Position): Gem | null => {
  if (!isValidPosition(board, pos)) {
    return null;
  }
  return board.gems[pos.row][pos.col];
};

export const setGem = (board: Board, pos: Position, gem: Gem): Board => {
  if (!isValidPosition(board, pos)) {
    return board;
  }

  const newGems = board.gems.map((row, r) =>
    row.map((g, c) => (r === pos.row && c === pos.col ? gem : g))
  );

  return { ...board, gems: newGems };
};

export const isValidPosition = (board: Board, pos: Position): boolean => {
  if (pos.row < 0 || pos.row >= board.rows) {
    return false;
  }

  if (pos.col < 0 || pos.col >= board.cols) {
    return false;
  }

  return true;
};

export const isAdjacent = (pos1: Position, pos2: Position): boolean => {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);

  if (rowDiff === 1 && colDiff === 0) {
    return true;
  }

  if (rowDiff === 0 && colDiff === 1) {
    return true;
  }

  return false;
};

export const swapGems = (board: Board, pos1: Position, pos2: Position): Board => {
  const gem1 = getGem(board, pos1);
  const gem2 = getGem(board, pos2);

  if (!gem1 || !gem2) {
    return board;
  }

  let newBoard = setGem(board, pos1, gem2);
  newBoard = setGem(newBoard, pos2, gem1);

  return newBoard;
};

export const fillEmptySpaces = (
  board: Board,
  gemTypes: GemType[] = DEFAULT_CONFIG.gemTypes
): Board => {
  const newGems = board.gems.map((row) =>
    row.map((gem) => gem ?? createGem(randomGemType(gemTypes)))
  );

  return { ...board, gems: newGems };
};
