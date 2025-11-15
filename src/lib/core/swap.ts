import type { Board, Position, SwapResult } from './types';
import { isAdjacent, isValidPosition, swapGems } from './board';
import { findMatches } from './match';

const isValidSwap = (board: Board, from: Position, to: Position): boolean => {
  if (!isValidPosition(board, from)) {
    return false;
  }

  if (!isValidPosition(board, to)) {
    return false;
  }

  if (from.row === to.row && from.col === to.col) {
    return false;
  }

  if (!isAdjacent(from, to)) {
    return false;
  }

  return true;
};

export const executeSwap = (
  board: Board,
  from: Position,
  to: Position
): SwapResult => {
  if (!isValidSwap(board, from, to)) {
    return {
      board,
      matches: [],
      isValid: false
    };
  }

  const swappedBoard = swapGems(board, from, to);
  const matches = findMatches(swappedBoard);

  if (matches.length === 0) {
    return {
      board,
      matches: [],
      isValid: false
    };
  }

  return {
    board: swappedBoard,
    matches,
    isValid: true
  };
};
