import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../src/logic/validation';

describe('isValidGuess', () => {
  it('should accept a valid decimal guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('should reject a guess with incorrect length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('should reject repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  it('should reject invalid digits for the selected base', () => {
    expect(isValidGuess('1284', 4, 8)).toBe(false);
    expect(isValidGuess('102', 3, 2)).toBe(false);
  });

  it('should accept a valid binary guess', () => {
    expect(isValidGuess('10', 2, 2)).toBe(true);
  });

  it('should accept uppercase and lowercase hexadecimal digits', () => {
    expect(isValidGuess('aB12', 4, 16)).toBe(true);
    expect(isValidGuess('Ab12', 4, 16)).toBe(true);
  });

  it('should reject repeated hexadecimal digits regardless of case', () => {
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
  });

  it('should allow zero as the first digit', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });
});
