import { getTheme, toggleTheme } from '@komplett/themed/utils';

import './styles/main.scss';

const toggleThemeButton = document.getElementById('toggle-theme-button');
const getThemeButton = document.getElementById('get-theme-button');

toggleThemeButton.addEventListener('click', () => {
  toggleTheme();
});

getThemeButton.addEventListener('click', () => {
  alert(`The current theme is: ${getTheme()}`);
});
