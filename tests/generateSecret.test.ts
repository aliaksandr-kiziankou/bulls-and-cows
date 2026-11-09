import { describe, expect, it } from 'vitest';
import { generateSecret } from '../src/logic/generateSecret';

describe('generateSecret', () => {
  it('should generate a secret with the requested length', () => {
    const secret = generateSecret(4, 10, () => 0.5);

    expect(secret).toHaveLength(4);
  });

  it('should generate only unique digits', () => {
    const secret = generateSecret(6, 10, () => 0.5);

    expect(new Set(secret).size).toBe(6);
  });

  it('should generate digits within the specified base', () => {
    const secret = generateSecret(4, 2, () => 0.5);

    expect([...secret].every((digit) => ['0', '1'].includes(digit))).toBe(true);
  });

  it('should allow zero as the first digit', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(secret[0]).toBe('0');
  });

  it('should produce predictable results with a deterministic random function', () => {
    const random = () => 0;
    const secret = generateSecret(4, 10, random);

    expect(secret).toBe('0123');
  });
});
