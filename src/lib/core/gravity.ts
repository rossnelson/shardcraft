import type { Board, Gem, GemType } from './types';
import { fillEmptySpaces } from './board';

export const applyGravity = (board: Board): Board => {
  const newGems: (Gem | null)[][] = Array.from({ length: board.rows }, () =>
    Array(board.cols).fill(null)
  );

  for (let col = 0; col < board.cols; col++) {
    let writeRow = board.rows - 1;

    for (let row = board.rows - 1; row >= 0; row--) {
      const gem = board.gems[row][col];

      if (gem) {
        newGems[writeRow][col] = gem;
        writeRow--;
      }
    }
  }

  return { ...board, gems: newGems as Gem[][] };
};

export const refillBoard = (board: Board, gemTypes: GemType[]): Board => {
  const boardWithGravity = applyGravity(board);
  return fillEmptySpaces(boardWithGravity, gemTypes);
};
