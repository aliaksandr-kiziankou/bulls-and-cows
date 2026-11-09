const DIGITS = '0123456789ABCDEF';

export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  return (char: string): boolean => {
    return char.length === 1 && DIGITS.slice(0, base).includes(char.toUpperCase());
  };
};

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const isValidDigit = createDigitValidator(base);

  const digits = guess.toLowerCase().split('');

  return (
    digits.length === length && digits.every(isValidDigit) && new Set(digits).size === digits.length
  );
};
