import type { Match } from './types';
import { POINTS_PER_GEM, COMBO_MULTIPLIER } from './constants';

export const calculateMatchScore = (match: Match): number => {
  const baseScore = match.length * POINTS_PER_GEM;
  const lengthBonus = match.length > 3 ? (match.length - 3) * 20 : 0;
  return baseScore + lengthBonus;
};

export const calculateTotalScore = (matches: Match[], comboCount: number = 0): number => {
  if (matches.length === 0) {
    return 0;
  }

  const baseScore = matches.reduce(
    (sum, match) => sum + calculateMatchScore(match),
    0
  );

  const comboBonus = comboCount > 0 ? Math.pow(COMBO_MULTIPLIER, comboCount) : 1;

  return Math.floor(baseScore * comboBonus);
};
