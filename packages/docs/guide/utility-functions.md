# Utility functions

Themed offers serval functions via `@janis.me/themed/js` that might be of help. Currently, there is no validation being done when setting themes. So you very much can set a theme that wasn't defined. Be careful.

## `getTheme(localstorageThemeKey: string, fallback: string)`

Gets the current theme from different sources, trying to show the user the most-preferred theme.

The order of importance is

1. The theme stored in localstorage (if any).
2. The preferred user colorscheme (prefers-color-scheme)
3. The current theme set on the documentElement (if any).
4. The given `fallback` theme (if any).
5. The default theme, which is 'dark'. Be gentle on eyes.

## `setTheme(theme: string, toLocalStorage: boolean, localStorageKey: string)`

Set the theme to the `document element` and localstorage (if `toLocalStorage` is not set to `false`).

## `setDefaultTheme()`

When your site is first loaded, you might want to set the default theme for the user.
This way, you don't have to set the `data-theme` attribute yourself, and the user will instantly see their preferred theme.

This will not save anything to localstorage, so we don't assume the users preferences

## `toggleTheme()`

Assumes the only themes are `light` and `dark`, and toggles between them, like

```ts
const current = getTheme();
return current === 'dark' ? 'light' : 'dark';
```

As per this logic, when the current theme is something that's neither light nor dark, it will always set the theme to `dark`.

This function does NOT set the theme. It's just used to get the 'inverse'

## `getThemeFromDocument()`

Get the currently active theme from the `data-theme` attribute.

## `setThemeToDocument(theme: string)`

Sets the given theme to the `data-theme` attribute, but not localstorage. use `setTheme` for that.

## `getThemeFromLocalstorage(localStorageKey: string)`

Get the currently active theme from localstorage

## `setThemeInLocalstorage(theme: string)`

Sets the given theme to localStorage, but not the `data-theme` attribute.

## `getPreferredColorScheme()`

Uses `window.matchMedia` to get the users preferred color scheme (That they set, for example, in their OS settings or browser). This also always returns `light` or `dark`.

## `watchPreferredColorScheme(listener: (theme: string) => void)`

Registers the given `listener` to be called whenever the preferred colorScheme changes. Using this, you can automatically set the data-theme attribute to the new theme.

```ts
import { setTheme, watchPreferredColorScheme } from '@janis.me/themed/js';

// Watches the color scheme and calls setTheme with the new preference.
watchPreferredColorScheme(setTheme);
```

The function returns an `unsubscribe` function that can be called when you don't need to listen anymore.

Note, that in react, the `ThemeProvider` does this automatically.

## `watchThemeAttribute(listener: (theme: string | null) => void)`

Observes the `data-theme` attribute on the documentElement, calling the listener with the new value when it changes.
This can be used to perform actions when the user (or the operating system settings) change the theme.

This also returns an `unsubscribe` function to stop listening to changes.

::: info
Internally, this uses a `MutationObserver` that is disconnected when the `unsubscribe` function is called. The `MutationObserver` instance itself will still exist until it's garbage-collected. See [MDN](https://developer.mozilla.org/de/docs/Web/API/MutationObserver) for more info.
:::
