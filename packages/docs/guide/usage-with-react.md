# Usage with react

::: tip
This setup is demonstrated in the [react example on github](https://github.com/komplettio/themed/tree/main/examples/vite-react). Check that out for a quick overview.
:::

For react, the SCSS part (defining themes, using the themed function...) is exactly the same. (It uses the same code under the hood). However, to achieve 'reactiveness', two things are added.

Firstly, you should add the `ThemeProvider` to the top level of your app. This is used as a boundary for where you want your theme data to be available to react.
This does not mean that you cannot use the CSS variables in components outside of the Provider. Those are still defined globally (on an HTML level).

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@komplett/react-themed/utils';

import App from './App.tsx';

import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

The `ThemeProvider` does a couple of things for you:

1. Set the active theme to the documentElement as soon as it mounts. Use the `defaultTheme` attribute to change the default.
2. Listens to the preferred user color scheme and the `data-theme` attribute to automatically update the active theme for you.
3. Keeps track of theme-related data using a [react context](https://react.dev/learn/passing-data-deeply-with-context).
   Don't use the context directly though, instead use the `useTheme` hook.

## The `useTheme` hook...

...let's you react to theme changes, but also set/get the theme in react.

```tsx
import { useTheme } from '@komplett/react-themed/utils';

function App() {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <>
      <button onClick={handleToggleTheme}>toggle theme. currently: {theme}</button>
    </>
  );
}

export default App;
```

It also has the methods `setTheme` and `getTheme`.

## Outside of react

Outside of react, you can import the same functions as exported in the `@janis.me/themed` package, for example:

```ts
import { setTheme as setThemeImperatively } from '@komplett/react-themed/utils';

function someAction() {
  setThemeImperatively('light');
}
```

This is not recommended though, because it will only be reflected in react if you didn't disable `watchThemeAttribute` on the provider.
In general, you probably **always** want to use the `useTheme` hook
