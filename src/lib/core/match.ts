import type { Board, Match, Position } from './types';
import { getGem } from './board';
import { DEFAULT_CONFIG } from './constants';

const findHorizontalMatches = (
  board: Board,
  minLength: number = DEFAULT_CONFIG.minMatchLength
): Match[] => {
  const matches: Match[] = [];

  for (let row = 0; row < board.rows; row++) {
    let matchStart = 0;

    for (let col = 1; col <= board.cols; col++) {
      const currentGem = col < board.cols ? getGem(board, { row, col }) : null;
      const prevGem = getGem(board, { row, col: col - 1 });

      if (!prevGem) {
        matchStart = col;
        continue;
      }

      const isDifferent = !currentGem || currentGem.type !== prevGem.type;

      if (isDifferent) {
        const matchLength = col - matchStart;

        if (matchLength >= minLength) {
          const positions: Position[] = Array.from(
            { length: matchLength },
            (_, i) => ({ row, col: matchStart + i })
          );

          matches.push({
            positions,
            type: prevGem.type,
            length: matchLength
          });
        }

        matchStart = col;
      }
    }
  }

  return matches;
};

const findVerticalMatches = (
  board: Board,
  minLength: number = DEFAULT_CONFIG.minMatchLength
): Match[] => {
  const matches: Match[] = [];

  for (let col = 0; col < board.cols; col++) {
    let matchStart = 0;

    for (let row = 1; row <= board.rows; row++) {
      const currentGem = row < board.rows ? getGem(board, { row, col }) : null;
      const prevGem = getGem(board, { row: row - 1, col });

      if (!prevGem) {
        matchStart = row;
        continue;
      }

      const isDifferent = !currentGem || currentGem.type !== prevGem.type;

      if (isDifferent) {
        const matchLength = row - matchStart;

        if (matchLength >= minLength) {
          const positions: Position[] = Array.from(
            { length: matchLength },
            (_, i) => ({ row: matchStart + i, col })
          );

          matches.push({
            positions,
            type: prevGem.type,
            length: matchLength
          });
        }

        matchStart = row;
      }
    }
  }

  return matches;
};

export const findMatches = (
  board: Board,
  minLength: number = DEFAULT_CONFIG.minMatchLength
): Match[] => {
  const horizontal = findHorizontalMatches(board, minLength);
  const vertical = findVerticalMatches(board, minLength);
  return [...horizontal, ...vertical];
};

export const removeMatches = (board: Board, matches: Match[]): Board => {
  if (matches.length === 0) {
    return board;
  }

  const positionsToRemove = new Set(
    matches.flatMap((match) =>
      match.positions.map((pos) => `${pos.row},${pos.col}`)
    )
  );

  const newGems = board.gems.map((row, r) =>
    row.map((gem, c) => {
      const key = `${r},${c}`;
      return positionsToRemove.has(key) ? (null as any) : gem;
    })
  );

  return { ...board, gems: newGems };
};
