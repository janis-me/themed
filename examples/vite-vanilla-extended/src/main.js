import {
  getThemeFromDocument,
  setDefaultTheme,
  setTheme,
  toggleTheme,
  watchPreferredColorScheme,
} from '@janis.me/themed/js';

import './styles/main.scss';

function setupThemed() {
  // When first loaded, you might want to set the default theme for the user.
  // This way, you don't have to set the data-theme attribute yourself, and the user will instantly see their preferred theme.
  // This will not save anything to localstorage, so we don't assume the users preferences
  setDefaultTheme();
  // Watch the OS preferred color scheme and set it to the active theme on change.
  watchPreferredColorScheme(setTheme);

  const toggleThemeButton = document.getElementById('toggle-theme-button');
  const getThemeButton = document.getElementById('get-theme-button');

  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      const newTheme = toggleTheme();
      setTheme(newTheme);
    });
  }

  if (getThemeButton) {
    getThemeButton.addEventListener('click', () => {
      alert(`The current theme is: ${getThemeFromDocument()}`);
    });
  }
}

setupThemed();
