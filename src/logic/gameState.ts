import { evaluateGuess } from './evaluateGuess';

export interface GuessEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  secret: string;
  length: number;
  base: number;
  history: GuessEntry[];
  status: 'playing' | 'won';
  startedAt: number;
  finishedAt: number | null;
}

export const createGameState = (
  secret: string,
  length: number,
  base: number,
  startedAt: number,
): GameState => ({
  secret,
  length,
  base,
  history: [],
  status: 'playing',
  startedAt,
  finishedAt: null,
});

export const submitGuess = (state: GameState, guess: string, submittedAt: number): GameState => {
  if (state.status === 'won') {
    return state;
  }

  const normalizedGuess = guess.toUpperCase();

  const alreadySubmitted = state.history.some(
    (entry) => entry.guess.toUpperCase() === normalizedGuess,
  );

  if (alreadySubmitted) {
    return state;
  }

  const result = evaluateGuess(state.secret, guess);

  const newEntry: GuessEntry = {
    guess: normalizedGuess,
    bulls: result.bulls,
    cows: result.cows,
  };

  const history = [...state.history, newEntry];
  const hasWon = result.bulls === state.length;

  return {
    ...state,
    history,
    status: hasWon ? 'won' : 'playing',
    finishedAt: hasWon ? submittedAt : null,
  };
};
