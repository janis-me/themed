export const DEFAULT_THEME = 'dark' as const;

export const THEME_ATTRIBUTE_NAME = 'data-theme' as const;
export const THEME_LOCALSTORAGE_KEY = 'user-preferred-theme' as const;

/**
 * Either light or dark. Some functions only accept/return those. Some functions can also take other strings.
 */
export type ThemeOption = 'light' | 'dark';

/**
 * Gets the current theme from different sources, trying to show the user the most-preferred theme.
 *
 * The order of importance is
 * 1. The theme stored in localstorage (if any).
 * 2. The preferred user colorscheme (prefers-color-scheme)
 * 3. The current theme set on the documentElement (if any).
 * 4. The given `fallback` theme (if any).
 * 5. The default theme, which is 'dark'. Be gentle on eyes.
 *
 * @returns {ThemeOption | string} The theme or the fallback
 */
export function getTheme(
  localstorageThemeKey: string = THEME_LOCALSTORAGE_KEY,
  fallback?: string,
): ThemeOption | string {
  return (
    getThemeFromLocalstorage(localstorageThemeKey) ??
    getPreferredColorScheme() ??
    getTheme() ??
    fallback ??
    DEFAULT_THEME
  );
}

/**
 * Set the theme to the `document element` and localstorage (if `toLocalStorage` is not set to `false`).
 *
 * @returns void
 */
export function setTheme(
  theme: ThemeOption | string,
  toLocalStorage: boolean = true,
  key: string = THEME_LOCALSTORAGE_KEY,
) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);

  if (toLocalStorage) {
    setThemeInLocalstorage(theme, key);
  }
}

/**
 * When first loaded, you might want to set the default theme for the user.
 * This way, you don't have to set the `data-theme` attribute yourself, and the user will instantly see their preferred theme.
 *
 * This will not save anything to localstorage, so we don't assume the users preferences
 */
export function setDefaultTheme() {
  setTheme(getTheme(), false);
}

/**
 * Gets the theme from the `document element`, if it exists.
 *
 * @returns The theme or null
 */
export function getThemeFromDocument(): ThemeOption | string | null {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME);
}

/**
 * Set the theme on the `document element`.
 *
 * @returns void
 */
export function setThemeToDocument(theme: ThemeOption | string) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
}

/**
 * Sets the theme in localstorage.
 *
 * @param key The key to set the theme in localstorage (default: 'user-preferred-theme')
 *
 * @returns void
 */
export function getThemeFromLocalstorage(key: string = THEME_LOCALSTORAGE_KEY): ThemeOption | string | null {
  return localStorage.getItem(key);
}

/**
 * Sets the theme in localstorage.
 *
 * @param theme The theme to set in localstorage
 * @param key The key to set the theme in localstorage (default: 'user-preferred-theme')
 *
 * @returns void
 */
export function setThemeInLocalstorage(theme: ThemeOption | string, key: string = THEME_LOCALSTORAGE_KEY) {
  localStorage.setItem(key, theme);
}

/**
 * Gets the current theme (light or dark) and reverses it, returning the new theme.
 * Only works with dark/light themes. If you pass something else, will default to 'DEFAULT_THEME' (dark)
 *
 * When no theme is currently set on the documentElement, this will default to setting 'light'
 *
 * @returns The new theme
 */
export function toggleTheme(): ThemeOption {
  const current = getTheme();
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Gives you the users' preferred color scheme, so either 'dark' or 'light'.
 *
 * @returns the preferred theme. or `undefined`
 */
export function getPreferredColorScheme(): ThemeOption | undefined {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  return undefined;
}

/**
 * Uses window.matchMedia to watch for changes in prefers-color-scheme and calls the callback with the color schema on change.
 */
export function watchPreferredColorScheme(listener: (theme: ThemeOption) => void) {
  const queryString = '(prefers-color-scheme: light)';
  const eventHandler = (event: MediaQueryListEvent) => {
    listener(event.matches ? 'light' : 'dark');
  };

  window.matchMedia(queryString).addEventListener('change', eventHandler);

  return () => {
    window.matchMedia(queryString).removeEventListener('change', eventHandler);
  };
}

/**
 * Registers a MutationObserver for the documentElement to watch for changes in the data-theme attribute.
 * This way, you can react to changes to the theme reactively (for example when users clicked a button)
 *
 * @param listener Function to be called with the new theme
 * @returns An unregister function that will disconnect the `MutationObserver`
 */
export function watchThemeAttribute(listener: (theme: ThemeOption | string | null) => void) {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === THEME_ATTRIBUTE_NAME) {
        const newTheme = getTheme();
        listener(newTheme);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
  });

  return () => {
    observer.disconnect();
  };
}
