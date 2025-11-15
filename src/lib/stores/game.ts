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

  const processMatches = (currentState: GameStoreState): GameStoreState => {
    const matches = findMatches(currentState.board);

    if (matches.length === 0) {
      return currentState;
    }

    const boardWithoutMatches = removeMatches(currentState.board, matches);
    const refilledBoard = refillBoard(
      boardWithoutMatches,
      DEFAULT_CONFIG.gemTypes
    );

    return {
      ...currentState,
      board: refilledBoard
    };
  };

  const handleSwap = (from: Position, to: Position): void => {
    update((state) => {
      const swapResult = executeSwap(state.board, from, to);

      if (!swapResult.isValid) {
        return state;
      }

      let newState: GameStoreState = {
        ...state,
        board: swapResult.board,
        selectedPosition: null
      };

      newState = processMatches(newState);

      while (findMatches(newState.board).length > 0) {
        newState = processMatches(newState);
      }

      return newState;
    });
  };

  return {
    subscribe,
    selectGem: (position: Position) =>
      update((state) => {
        if (!state.selectedPosition) {
          return { ...state, selectedPosition: position };
        }

        handleSwap(state.selectedPosition, position);
        return { ...state, selectedPosition: null };
      }),
    reset: () => set(initialState())
  };
};

export const game = createGameStore();
