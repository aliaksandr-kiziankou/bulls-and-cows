import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluateGuess.ts';

describe('evaluateGuess', () => {
  it('should count bulls correctly', () => {
    expect(evaluateGuess('4271', '4231')).toEqual({
      bulls: 3,
      cows: 0,
    });
  });

  it('should count cows correctly', () => {
    expect(evaluateGuess('4271', '1724')).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it('should count both bulls and cows', () => {
    expect(evaluateGuess('4271', '1234')).toEqual({
      bulls: 1,
      cows: 2,
    });
  });

  it('should return zero when there are no matching digits', () => {
    expect(evaluateGuess('4271', '5839')).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it('should be case-insensitive for hexadecimal digits', () => {
    expect(evaluateGuess('aB12', 'Ab12')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('should handle a completely correct guess', () => {
    expect(evaluateGuess('4271', '4271')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });
});
