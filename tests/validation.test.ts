import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/logic/validation';

describe('createDigitValidator', () => {
  it('should accept binary digits', () => {
    const isValid = createDigitValidator(2);

    expect(isValid('0')).toBe(true);
    expect(isValid('1')).toBe(true);
  });

  it('should reject invalid binary digits', () => {
    const isValid = createDigitValidator(2);

    expect(isValid('2')).toBe(false);
    expect(isValid('a')).toBe(false);
  });

  it('should accept hexadecimal digits', () => {
    const isValid = createDigitValidator(16);

    expect(isValid('A')).toBe(true);
    expect(isValid('f')).toBe(true);
    expect(isValid('9')).toBe(true);
  });

  it('should reject invalid hexadecimal digits', () => {
    const isValid = createDigitValidator(16);

    expect(isValid('G')).toBe(false);
    expect(isValid('Z')).toBe(false);
  });

  it('should accept decimal digits', () => {
    const isValid = createDigitValidator(10);

    expect(isValid('0')).toBe(true);
    expect(isValid('9')).toBe(true);
  });

  it('should reject digits outside the decimal system', () => {
    const isValid = createDigitValidator(10);

    expect(isValid('A')).toBe(false);
    expect(isValid('10')).toBe(false);
  });
});
