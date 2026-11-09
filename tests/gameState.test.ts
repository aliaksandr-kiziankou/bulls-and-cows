import { describe, expect, it } from 'vitest';
import { createGameState, submitGuess } from '../src/logic/gameState';

describe('createGameState', () => {
  it('should create a new game with empty history', () => {
    const state = createGameState('1234', 4, 10, 1000);

    expect(state).toEqual({
      secret: '1234',
      length: 4,
      base: 10,
      history: [],
      status: 'playing',
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe('submitGuess', () => {
  it('should add a guess to history', () => {
    const state = createGameState('1234', 4, 10, 1000);

    const updatedState = submitGuess(state, '5678', 2000);

    expect(updatedState.history).toHaveLength(1);
    expect(updatedState.history[0]).toEqual({
      guess: '5678',
      bulls: 0,
      cows: 0,
    });
  });

  it('should not mutate the original state', () => {
    const state = createGameState('1234', 4, 10, 1000);

    submitGuess(state, '5678', 2000);

    expect(state.history).toHaveLength(0);
  });

  it('should mark the game as won when the secret is guessed', () => {
    const state = createGameState('1234', 4, 10, 1000);

    const updatedState = submitGuess(state, '1234', 2000);

    expect(updatedState.status).toBe('won');
    expect(updatedState.finishedAt).toBe(2000);
  });

  it('should not add the same guess twice', () => {
    const state = createGameState('1234', 4, 10, 1000);
    const firstState = submitGuess(state, '5678', 2000);

    const secondState = submitGuess(firstState, '5678', 3000);

    expect(secondState.history).toHaveLength(1);
  });
});
