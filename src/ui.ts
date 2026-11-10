import type { GameState } from './logic/gameState';

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

export const renderGame = (state: GameState, onGuess: (guess: string) => void): void => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App container not found');
  }

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const info = document.createElement('p');
  info.textContent = `Base: ${state.base} | Secret length: ${state.length}`;

  const input = document.createElement('input');
  input.id = 'guess';
  input.type = 'text';
  input.maxLength = state.length;
  input.autocomplete = 'off';

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
  game.append(info, input, submitButton, historyTitle, history);

  if (state.status === 'won') {
    const message = document.createElement('h2');
    message.textContent = `You won! Attempts: ${state.history.length}`;
    game.append(message);
  }

  app.replaceChildren(title, game);
};
