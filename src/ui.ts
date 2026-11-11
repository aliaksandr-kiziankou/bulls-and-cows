import type { GameState } from './logic/gameState';
import { createDigitValidator } from './logic/validation';

let timerInterval: number | undefined;

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export interface GameSettings {
  base: number;
  length: number;
}

export const renderSettings = (onStart: (settings: GameSettings) => void): void => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App container not found');
  }

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Number system: ';

  const baseSelect = document.createElement('select');
  baseSelect.id = 'base';

  const bases = [
    { value: '2', label: 'Binary' },
    { value: '8', label: 'Octal' },
    { value: '10', label: 'Decimal' },
    { value: '16', label: 'Hexadecimal' },
  ];

  bases.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    baseSelect.append(option);
  });

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = 'Secret length: ';

  const lengthSelect = document.createElement('select');
  lengthSelect.id = 'length';

  const updateLengths = (): void => {
    const base = Number(baseSelect.value);
    const lengths = base === 2 ? [2] : [2, 3, 4, 5, 6];

    lengthSelect.replaceChildren();

    lengths.forEach((length) => {
      const option = document.createElement('option');
      option.value = String(length);
      option.textContent = String(length);
      lengthSelect.append(option);
    });
  };

  baseSelect.addEventListener('change', updateLengths);
  updateLengths();

  const startButton = document.createElement('button');
  startButton.textContent = 'Start game';

  startButton.addEventListener('click', () => {
    onStart({
      base: Number(baseSelect.value),
      length: Number(lengthSelect.value),
    });
  });

  const settings = document.createElement('div');
  settings.append(baseLabel, baseSelect, lengthLabel, lengthSelect, startButton);

  app.replaceChildren(title, settings);
};

export const renderGame = (
  state: GameState,
  onGuess: (guess: string) => void,
  onNewGame: () => void,
): void => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App container not found');
  }

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const info = document.createElement('p');
  info.textContent = `Base: ${state.base} | Secret length: ${state.length}`;

  if (timerInterval !== undefined) {
    clearInterval(timerInterval);
    timerInterval = undefined;
  }

  const timer = document.createElement('p');

  const updateTimer = (): void => {
    const endTime = state.finishedAt ?? Date.now();
    timer.textContent = `Time: ${formatTime(endTime - state.startedAt)}`;
  };

  updateTimer();

  if (state.status === 'playing') {
    timerInterval = window.setInterval(updateTimer, 1000);
  }

  const input = document.createElement('input');
  input.id = 'guess';
  input.type = 'text';
  input.maxLength = state.length;
  input.autocomplete = 'off';

  const isValidDigit = createDigitValidator(state.base);

  input.addEventListener('input', () => {
    const filtered = input.value.toUpperCase().split('').filter(isValidDigit);

    input.value = [...new Set(filtered)].slice(0, state.length).join('');
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit guess';

  submitButton.addEventListener('click', () => {
    onGuess(input.value);
  });

  const historyTitle = document.createElement('h2');
  historyTitle.textContent = 'Attempt history';

  const history = document.createElement('ul');

  state.history.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = `${entry.guess} — Bulls: ${entry.bulls}, Cows: ${entry.cows}`;
    history.append(item);
  });

  const game = document.createElement('div');
  game.append(info, timer, input, submitButton, historyTitle, history);

  if (state.status === 'won') {
    const message = document.createElement('h2');
    message.textContent = `You won! Attempts: ${state.history.length}`;

    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New game';
    newGameButton.addEventListener('click', onNewGame);

    game.append(message, newGameButton);
  }

  app.replaceChildren(title, game);
};
