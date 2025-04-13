import { getPreferredColorScheme, getTheme, setTheme, toggleTheme, watchPreferredColorScheme } from '@janis.me/themed';

import './styles/main.scss';

// Watch the OS preferred color scheme and set it to the active theme on change.
watchPreferredColorScheme(setTheme);

const initialColorScheme = getPreferredColorScheme();
setTheme(initialColorScheme);

const toggleThemeButton = document.getElementById('toggle-theme-button');
const getThemeButton = document.getElementById('get-theme-button');

toggleThemeButton.addEventListener('click', () => {
  toggleTheme();
});

getThemeButton.addEventListener('click', () => {
  alert(`The current theme is: ${getTheme()}. Your preferred color-scheme is ${initialColorScheme}`);
});
