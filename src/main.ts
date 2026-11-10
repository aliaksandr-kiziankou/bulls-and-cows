import { generateSecret } from './logic/generateSecret';
import { createGameState, submitGuess } from './logic/gameState';
import { isValidGuess } from './logic/validation';
import { renderGame, renderSettings, type GameSettings } from './ui';

const startGame = (settings: GameSettings): void => {
  const secret = generateSecret(settings.length, settings.base);
  let state = createGameState(secret, settings.length, settings.base, Date.now());

  const handleGuess = (guess: string): void => {
    if (!isValidGuess(guess, settings.length, settings.base)) {
      alert('Invalid guess. Check the length, digits and repeated characters.');
      return;
    }

    const updatedState = submitGuess(state, guess, Date.now());

    if (updatedState === state) {
      alert('You have already tried this combination.');
      return;
    }

    state = updatedState;
    renderGame(state, handleGuess);
  };

  renderGame(state, handleGuess);
};

renderSettings(startGame);
