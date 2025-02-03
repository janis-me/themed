# Utility functions

Themed offers serval functions via `@komplett/themed/utils` that might be of help. Currently, there is no validation being done when setting themes. So you very much can set a theme that wasn't defined. Be careful.

## `getTheme()`

Just get's the current theme from the `data-theme` attribute as string.

## `setTheme(theme: string)`

Set's the theme.

## `toggleTheme()`

Assumes the only themes are `light` and `dark`, and toggles between them, like

```ts
const current = getTheme();
const next = current === "light" ? "dark" : "light";

setTheme(next);

return next;
```

As per this logic, when the current theme is something that's neither light nor dark, it will always set the theme to `light`.

## `getPreferredColorScheme()`

Uses `window.matchMedia` to get the users preferred color scheme (That they set, for example, in their OS settings or browser). This also always returns `light` or `dark`.

## `watchPreferredColorScheme(listener: (theme: string) => void)`

Registers the given `listener` to be called whenever the preferred colorScheme changes. Using this, you can automatically set the data-theme attribute to the new theme.

```ts
import { watchPreferredColorScheme, setTheme } from "@komplett/themed/utils";

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