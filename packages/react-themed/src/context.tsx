import { createContext, JSX, useContext, useEffect, useMemo, useReducer } from 'react';

import {
  getPreferredColorScheme as _getPreferredColorScheme,
  getTheme as _getTheme,
  setTheme as _setTheme,
  toggleTheme as _toggleTheme,
  watchPreferredColorScheme as _watchPreferredColorScheme,
  watchThemeAttribute as _watchThemeAttribute,
  THEME_LOCALSTORAGE_KEY,
  ThemeOption,
} from '@janis.me/themed/js';

type Action = {
  type: 'setActiveTheme';
  data: { theme: ThemeOption | string };
};

type Dispatch = (action: Action) => void;
type ThemeProviderProps = {
  children: React.ReactNode;
  /** Can be set to override the default theme. Usually you would want themed to figure out the theme to show to a user */
  defaultTheme?: ThemeOption | string;
  /** If false, will not watch updates to window.matchMedia, so listening to the preferred color scheme changing */
  watchPreferredColorScheme?: boolean;
  /** If false, will not listen to the documentElement 'data-theme' attribute changing. */
  watchThemeAttribute?: boolean;
  /** Whether or not to save the theme to localstorage on changes. */
  saveToLocalstorage?: boolean;
  /** The key to use for localstorage. If not given, will default to THEME_LOCALSTORAGE_KEY */
  localstorageThemeKey?: string;
};

interface State {
  activeTheme: ThemeOption | string | null;
}

const ThemeStateContext = createContext<{ state: State; dispatch: Dispatch } | null>(null);

function themeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setActiveTheme': {
      return { ...state, activeTheme: action.data.theme };
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as { type: unknown }).type}`);
    }
  }
}

/**
 * ThemeProvider is a React Context Provider that allows you to set and get the current theme.
 * It stores the currently active theme, watches for changes in the preferred color scheme and the documentElement's theme attribute,
 * and updates the theme in localstorage if needed.
 *
 * You can disable automatic updates via the `watchPreferredColorScheme` and `watchThemeAttribute` props.
 *
 * When `defaultTheme` is not set, the order of importance is:
 * 1. The theme stored in localstorage (if any).
 * 2. The preferred user colorscheme (prefers-color-scheme)
 * 3. The current theme set on the documentElement (if any).
 * 4. The default theme, which is 'dark'. Be gentle on eyes.
 *
 * @param children The children to render inside the provider
 * @param defaultTheme The default theme to use. This has the highest priority.
 * @param watchPreferredColorScheme If true, will watch for changes in the preferred color scheme and update the theme accordingly
 * @param watchThemeAttribute If true, will watch for changes in the documentElement's theme attribute and update the theme accordingly
 * @param localstorageThemeKey The key to use for localstorage. If not given, will default to THEME_LOCALSTORAGE_KEY
 *
 * @returns JSX.Element
 */
function ThemeProvider({
  children,
  defaultTheme,
  watchPreferredColorScheme = true,
  watchThemeAttribute = true,
  saveToLocalstorage = true,
  localstorageThemeKey = THEME_LOCALSTORAGE_KEY,
}: ThemeProviderProps): JSX.Element {
  const initialTheme = defaultTheme ?? _getTheme(localstorageThemeKey);

  const [state, dispatch] = useReducer(themeReducer, {
    activeTheme: initialTheme,
  });

  // Watches the preferred colorScheme, updating the theme when changed,
  useEffect(() => {
    let unregisterMediaObserver: (() => void) | undefined;
    if (watchPreferredColorScheme) {
      unregisterMediaObserver = _watchPreferredColorScheme(newTheme =>
        _setTheme(newTheme, saveToLocalstorage, localstorageThemeKey),
      );
    }

    return () => {
      unregisterMediaObserver?.();
    };
  }, [watchPreferredColorScheme]);

  // Watches the documentElement for changes in the theme attribute
  // and updates the state on changes.
  useEffect(() => {
    let unregisterDOMObserver: (() => void) | undefined;
    if (watchThemeAttribute) {
      unregisterDOMObserver = _watchThemeAttribute(theme => {
        if (theme) {
          dispatch({ type: 'setActiveTheme', data: { theme } });
        }
      });
    }

    return () => {
      unregisterDOMObserver?.();
    };
  }, [dispatch, watchThemeAttribute]);

  // Populates state changes to the DOM and localstorage.
  useEffect(() => {
    if (state.activeTheme) {
      _setTheme(state.activeTheme, saveToLocalstorage, localstorageThemeKey);
    }
  }, [state.activeTheme]);

  const value = { state, dispatch };
  return <ThemeStateContext.Provider value={value}>{children}</ThemeStateContext.Provider>;
}

export interface UseThemeResult {
  /**
   * The currently active theme
   */
  theme: ThemeOption | string | null;
  /**
   * Sets the theme to the given value. Will set the theme on the documentElement and localstorage.
   *
   * @param theme The theme to set
   */
  setTheme: (theme: ThemeOption | string) => void;
  /**
   * Return the inverse of the current theme. If the current theme is 'dark', it will return 'light' and vice versa.
   * If the current theme is not 'dark' or 'light', it will default to 'dark'.
   * This will not set the theme on the documentElement or localstorage. You must do that yourself, if you want to.
   */
  toggleTheme: () => string;
  /**
   * Returns the preferred color scheme of the user. This will be 'dark' or 'light'.
   * If the user has no preferred color scheme, it will return undefined.
   *
   * @returns The preferred color scheme of the user
   */
  getPreferredColorScheme: () => ThemeOption | undefined;
}

function useTheme(): UseThemeResult {
  const context = useContext(ThemeStateContext);

  if (context === null) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return useMemo(
    () => ({
      theme: context.state.activeTheme,
      setTheme: (theme: ThemeOption | string) => {
        context.dispatch({ type: 'setActiveTheme', data: { theme } });
      },
      toggleTheme: _toggleTheme,
      getPreferredColorScheme: _getPreferredColorScheme,
    }),
    [context],
  );
}

export { ThemeProvider, useTheme };
