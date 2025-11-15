import { writable } from 'svelte/store';
import type { Board, Position } from '$lib/core/types';
import { createBoard } from '$lib/core/board';
import { executeSwap } from '$lib/core/swap';
import { findMatches, removeMatches } from '$lib/core/match';
import { refillBoard } from '$lib/core/gravity';
import { DEFAULT_CONFIG } from '$lib/core/constants';

type GameStoreState = {
  board: Board;
  selectedPosition: Position | null;
};

const initialState = (): GameStoreState => ({
  board: createBoard(),
  selectedPosition: null
});

const createGameStore = () => {
  const { subscribe, set, update } = writable<GameStoreState>(initialState());

  const processMatchesAsync = async (): Promise<void> => {
    let currentState = { ...initialState() };
    update((state) => {
      currentState = state;
      return state;
    });

    const matches = findMatches(currentState.board);

    if (matches.length === 0) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    const boardWithoutMatches = removeMatches(currentState.board, matches);
    update((state) => ({
      ...state,
      board: boardWithoutMatches
    }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    const refilledBoard = refillBoard(
      boardWithoutMatches,
      DEFAULT_CONFIG.gemTypes
    );
    update((state) => ({
      ...state,
      board: refilledBoard
    }));

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (findMatches(refilledBoard).length > 0) {
      await processMatchesAsync();
    }
  };

  const handleSwap = async (
    from: Position,
    to: Position
  ): Promise<void> => {
    let currentState = { ...initialState() };
    update((state) => {
      currentState = state;
      return state;
    });

    console.log('Attempting swap from', from, 'to', to);
    console.log(
      'Board before swap:',
      currentState.board.gems[from.row][from.col],
      currentState.board.gems[to.row][to.col]
    );
    const swapResult = executeSwap(currentState.board, from, to);
    console.log('Swap result:', swapResult.isValid);

    if (!swapResult.isValid) {
      console.log('Swap not valid');
      return;
    }

    console.log(
      'Board after swap:',
      swapResult.board.gems[from.row][from.col],
      swapResult.board.gems[to.row][to.col]
    );
    console.log('Matches found:', swapResult.matches);

    await new Promise((resolve) => setTimeout(resolve, 200));

    update((state) => ({
      ...state,
      board: swapResult.board,
      selectedPosition: null
    }));

    await processMatchesAsync();
  };

  return {
    subscribe,
    selectGem: (position: Position) => {
      let shouldSwap = false;
      let swapFrom: Position | null = null;

      update((state) => {
        if (!state.selectedPosition) {
          return { ...state, selectedPosition: position };
        }

        shouldSwap = true;
        swapFrom = state.selectedPosition;
        return { ...state, selectedPosition: null };
      });

      if (shouldSwap && swapFrom) {
        handleSwap(swapFrom, position);
      }
    },
    reset: () => set(initialState())
  };
};

export const game = createGameStore();
