export const THEME_ATTRIBUTE_NAME = "data-theme" as const;

/** All values the theme string can have. Not currently handling theme names/strings. */
export type ThemeOption = string;

export function getTheme(): ThemeOption | null {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME);
}

export function setTheme(theme: ThemeOption) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
}

/**
 * Gets the current theme (light or dark) and reverses it, returning the new theme.
 * Only works with dark/light themes.
 *
 * When no theme is currently set on the documentElement, this will default to setting 'light'
 *
 * @returns The new theme
 */
export function toggleTheme(): ThemeOption {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";

  setTheme(next);

  return next;
}

/**
 * Gives you the users' preferred color scheme, or 'light' if no valid theme was set.
 *
 * @returns the preferred theme.
 */
export function getPreferredColorScheme(): ThemeOption | undefined {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }

  return undefined;
}

/**
 * Uses window.matchMedia to watch for changes in prefers-color-scheme and set's the correct theme on change.
 * This only works with two themes, 'light' and 'dark'.
 */
export function watchPreferredColorScheme(
  listener: (theme: ThemeOption) => void
) {
  const queryString = "(prefers-color-scheme: light)";
  const eventHandler = (event: MediaQueryListEvent) => {
    listener(event.matches ? "light" : "dark");
  };

  window.matchMedia(queryString).addEventListener("change", eventHandler);

  return () => {
    window.matchMedia(queryString).removeEventListener("change", eventHandler);
  };
}

/**
 * Registers a MutationObserver for the documentElement to watch for changes in the data-theme attribute.
 * This way, you can react to changes to the theme reactively (for example when users clicked a button)
 *
 * @param listener Function to be called with the new theme
 * @returns An unregister function that will disconnect the `MutationObserver`
 */
export function watchThemeAttribute(
  listener: (theme: ThemeOption | null) => void
) {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
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
