---
outline: deep
---

# Getting started! <sub><sup>([TL;DR](#using-the-themed-function))</sup></sub>

::: tip
You can also just look at some [examples on github](https://github.com/janis-me/themed/tree/main/examples) or the [playground](https://themed-playground.janis.me) if you want to dive in quickly.
:::

## Installation

First, install themed as described in [Installation](/guide/installation)
::: code-group

```sh [npm]
$ npm install -D @janis.me/themed
```

```sh [pnpm]
$ pnpm add -D @janis.me/themed
```

```sh [yarn]
$ yarn add -D @janis.me/themed
```

```sh [bun]
$ bun add -D @janis.me/themed
```

:::

Use it inside SCSS with `@use '@janis.me/themed' as *;`.

```scss [style.scss] {1}
@use '@janis.me/themed' as *;
```

That makes two mixins available for you: `configure` and `apply`. Let's find out how they are used:

## Define your themes

Now, define your first themes! You can either define just a dark and light theme, or define more. We will start with just two, but read [defining Themes](/guide/defining-themes) for advanced usage. A theme must be a map of any kind of value, grouped by your theme names (see below). You can also define themes in a separate file. Again, see [defining themes](/guide/defining-themes).

**If you quickly want to get started, you can [generate themes automatically](/guide/generators)!**

::: code-group

```scss [style.scss] {3-18}
@use '@janis.me/themed' as *;

$themes: (
  'light': (
    'background': #fafafa,
    'text': #212529,
    'grey': #343a40,
  ),
  'dark': (
    'background': #212529,
    'text': #fafafa,
    'grey': #f8f9fa,
  ),
);
```

:::

## Apply themes

We call `configure` to check the themes and register them in the current module scope.
And finally, apply those themes with the `apply` mixin. This creates the CSS variables for you.

::: code-group

```scss [style.scss] {16-18}
@use '@janis.me/themed' as *;

$themes: (
  'light': (
    'background': #fafafa,
    'text': #212529,
    'grey': #343a40,
  ),
  'dark': (
    'background': #212529,
    'text': #fafafa,
    'grey': #f8f9fa,
  ),
);

@include configure($themes);
@include apply();
```

:::

::: info
You have to call both `configure` and `apply`. You probably even want to call `configure` in a `global.scss` file so it can be re-imported across your codebase.
For this simple example, we call both in the index.scss file. See [Global setup](/guide/global-setup) for more info.
:::

Try to change the name of a variable in the dark theme. You get a nice error like

```sh
[sass] Error: "[themed] Theme 'light' is missing the key 'blue'"
```

Now, you can use the `themed` function **anywhere in this file** to retrieve values from your themes.

## Using the `themed` function

::: code-group

```scss [style.scss] {19-23}
@use '@janis.me/themed' as *;

$themes: (
  'light': (
    'background': #fafafa,
    'text': #212529,
    'grey': #343a40,
  ),
  'dark': (
    'background': #212529,
    'text': #fafafa,
    'grey': #f8f9fa,
  ),
);

@include configure($themes);
@include apply($themes);

html,
body {
  color: themed('text');
  background-color: themed('background');
}
```

:::

## Setting the active theme

Lastly, you have to define which theme to use on the `documentElement` of your page, alias the HTML Tag. The `data-theme` attribute must be set in order for this to work.
You can either statically add the Attribute to the html element like

::: code-group

```html [index.html] {1}
<html data-theme="light">
  <!-- ... -->
</html>
```

:::

Or, use one of the [Utility functions](/guide/utility-functions) that `themed` offers out of the box in any js file, or in a script block in the index.html.

::: code-group

```js [index.js] {1-3}
import { setDefaultTheme } from '@janis.me/themed/js';

setDefaultTheme();
```

:::

Later, you can use more [Utility functions](/guide/utility-functions), like `toggleTheme`, `getTheme`, `getPreferredColorScheme` and many more!

::: tip
:tada: Done! You now know how this works. But, it's **very** likely you want to have a look at [Global setup](/guide/global-setup) to learn how to use the `themed` functions in every file.
:::
