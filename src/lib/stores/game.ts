import { writable, derived } from 'svelte/store';
import type { Board, Position, GameState } from '$lib/core/types';
import { createBoard } from '$lib/core/board';
import { executeSwap } from '$lib/core/swap';
import { findMatches, removeMatches } from '$lib/core/match';
import { refillBoard } from '$lib/core/gravity';
import { calculateTotalScore } from '$lib/core/score';
import { DEFAULT_CONFIG } from '$lib/core/constants';

type GameStoreState = {
  board: Board;
  score: number;
  moves: number;
  state: GameState;
  selectedPosition: Position | null;
  comboCount: number;
};

const initialState = (): GameStoreState => ({
  board: createBoard(),
  score: 0,
  moves: 0,
  state: 'idle',
  selectedPosition: null,
  comboCount: 0
});

const createGameStore = () => {
  const { subscribe, set, update } = writable<GameStoreState>(initialState());

  const processMatches = (currentState: GameStoreState): GameStoreState => {
    const matches = findMatches(currentState.board);

    if (matches.length === 0) {
      return { ...currentState, comboCount: 0 };
    }

    const scoreGained = calculateTotalScore(matches, currentState.comboCount);
    const boardWithoutMatches = removeMatches(currentState.board, matches);
    const refilledBoard = refillBoard(
      boardWithoutMatches,
      DEFAULT_CONFIG.gemTypes
    );

    return {
      ...currentState,
      board: refilledBoard,
      score: currentState.score + scoreGained,
      comboCount: currentState.comboCount + 1
    };
  };

  const handleSwap = (from: Position, to: Position): void => {
    update((state) => {
      if (state.state !== 'playing') {
        return state;
      }

      const swapResult = executeSwap(state.board, from, to);

      if (!swapResult.isValid) {
        return state;
      }

      let newState: GameStoreState = {
        ...state,
        board: swapResult.board,
        moves: state.moves + 1,
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
    start: () =>
      update((state) => ({
        ...state,
        state: 'playing'
      })),
    selectGem: (position: Position) =>
      update((state) => {
        if (state.state !== 'playing') {
          return state;
        }

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
