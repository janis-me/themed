const THEME_ATTRIBUTE_NAME = "data-theme" as const;

export type ThemeOption = "light" | "dark";

export function getTheme(): ThemeOption | string | null {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME);
}

export function setTheme(theme: ThemeOption | string) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
}

/**
 * Gets the current theme (light or dark) and reverses it, returning the new theme.
 * Only works with dark/light themes.
 *
 * @returns The new theme
 */
export function toggleTheme(): ThemeOption {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";

  setTheme(next);

  return next;
}

export function getPreferredColorScheme(): ThemeOption | undefined {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    } else {
      return "dark";
    }
  }

  return undefined;
}

/**
 * Uses window.matchMedia to watch for changes in prefers-color-scheme and set's the correct theme on change.
 * This only works with two themes, 'light' and 'dark'.
 */
export function watchPreferredColorScheme() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      setTheme(event.matches ? "dark" : "light");
    });
}
