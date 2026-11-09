const DIGITS = '0123456789ABCDEF';

export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  return (char: string): boolean => {
    return char.length === 1 && DIGITS.slice(0, base).includes(char.toUpperCase());
  };
};
