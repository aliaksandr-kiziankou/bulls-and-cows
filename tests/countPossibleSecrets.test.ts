import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/logic/countPossibleSecrets.ts';

describe('countPossibleSecrets', () => {
  it('should calculate permutations for decimal system', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('should calculate permutations for binary system', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('should calculate permutations for hexadecimal system', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('should allow zero as the first digit', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it('should return base when length is one', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  it('should return one when length equals base', () => {
    expect(countPossibleSecrets(4, 4)).toBe(24);
  });
});
