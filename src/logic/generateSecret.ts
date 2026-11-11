const DIGITS = '0123456789ABCDEF';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  const digits = DIGITS.slice(0, base).split('');

  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [digits[i], digits[j]] = [digits[j], digits[i]];
  }

  return digits.slice(0, length).join('');
};
