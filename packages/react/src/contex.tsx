import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  setTheme,
  ThemeOption,
  watchPreferredColorScheme as _watchPreferredColorScheme,
  watchThemeAttribute as _watchThemeAttribute,
} from '@komplett/themed/utils';

type Action = {
  type: 'setActiveTheme';
  data: { theme: ThemeOption };
};

type Dispatch = (action: Action) => void;
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeOption;
  // If false, will not watch updates to window.matchMedia, so listening to the preferred color scheme changing
  watchPreferredColorScheme?: boolean;
  // If false, will not listen to the documentElement 'data-theme' attribute changing.
  watchThemeAttribute?: boolean;
};

interface State {
  activeTheme: ThemeOption | undefined;
}

const DEFAULT_STATE = {
  activeTheme: undefined,
} satisfies State;

const ThemeStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

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

function ThemeProvider({
  children,
  defaultTheme,
  watchPreferredColorScheme = true,
  watchThemeAttribute = true,
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, DEFAULT_STATE);

  // Sets the initial theme to defaultTheme, if given, otherwise to 'light'
  useEffect(() => {
    dispatch({
      type: 'setActiveTheme',
      data: { theme: defaultTheme ?? 'light' },
    });
  }, [defaultTheme]);

  // Watches the preferred colorScheme, updating the theme when changed,
  useEffect(() => {
    if (watchPreferredColorScheme) {
      const unregisterMediaObserver = _watchPreferredColorScheme(setTheme);

      return () => {
        unregisterMediaObserver();
      };
    }
  }, []);

  // Watches the documentElement for changes in the theme attribute
  // and updates the state on changes.
  useEffect(() => {
    if (watchThemeAttribute) {
      const unregisterDOMObserver = _watchThemeAttribute(theme => {
        console.log('attr changed', theme);
        if (theme) {
          dispatch({ type: 'setActiveTheme', data: { theme } });
        }
      });

      return () => {
        unregisterDOMObserver();
      };
    }
  }, [dispatch]);

  // Populates state changes to the DOM to actually change the theme.
  useEffect(() => {
    if (state.activeTheme) {
      setTheme(state.activeTheme);
    }
  }, [state.activeTheme]);

  const value = { state, dispatch };
  return <ThemeStateContext.Provider value={value}>{children}</ThemeStateContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return useMemo(
    () => ({
      theme: context.state.activeTheme,
      setTheme: (theme: ThemeOption) => {
        context.dispatch({ type: 'setActiveTheme', data: { theme } });
      },
      toggleTheme: () => {
        context.dispatch({
          type: 'setActiveTheme',
          data: {
            theme: context.state.activeTheme === 'light' ? 'dark' : 'light',
          },
        });
      },
      getTheme: (): ThemeOption | undefined => {
        return context.state.activeTheme;
      },
    }),
    [context]
  );
}

export { ThemeProvider, useTheme };
