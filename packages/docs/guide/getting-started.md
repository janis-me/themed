---
outline: deep
---

# Getting started!

::: tip
You can also just look at some [examples on github](https://github.com/komplettio/themed/tree/main/examples) if you want to dive in quickly.
:::

First, install themed or copy it's source, as described in [Installation](/guide/installation)
::: code-group

```sh [npm]
$ npm add -D @komplett/themed
```

```sh [pnpm]
$ pnpm add -D @komplett/themed
```

```sh [yarn]
$ yarn add -D @komplett/themed
```

```sh [bun]
$ bun add -D @komplett/themed
```

:::

Use it inside SCSS with the `@use .. as *` rule. This way, you can use all mixins and functions without any headache.

::: code-group

```scss [style.scss] {1}
@use "@komplett/themed" as *;
```

:::

Now, define your first themes! You can either define just a dark and light theme, or define more. We will start with just two, but read [Defining Themes](/guide/defining-themes) for advanced usage.

::: code-group

```scss [style.scss] {3-18}
@use "@komplett/themed" as *;

$themes: (
  "light": (
    "text": #212529,
    "background": #fafafa,
    "grey-1": #343a40,
    "grey-2": #495057,
    "grey-3": #6c757d,
  ),
  "dark": (
    "text": #fafafa,
    "background": #212529,
    "grey-1": #f8f9fa,
    "grey-2": #e9ecef,
    "grey-3": #dee2e6,
  ),
);
```

:::

And finally, register those themes with the `themes` mixin. In it's simplest form, this mixin just verifies your themes and creates the SCSS variables for you.

::: code-group

```scss [style.scss] {20}
@use "@komplett/themed" as *;

$themes: (
  "light": (
    "text": #212529,
    "background": #fafafa,
    "grey-1": #343a40,
    "grey-2": #495057,
    "grey-3": #6c757d,
  ),
  "dark": (
    "text": #fafafa,
    "background": #212529,
    "grey-1": #f8f9fa,
    "grey-2": #e9ecef,
    "grey-3": #dee2e6,
  ),
);

@include themes($themes);
```

:::

Try to change the name of a variable in one of the themes. You should get an error that your themes don't match.

Now, you can use the `themed` function **anywhere in this file** to retrieve values from your themes.

::: warning
Be aware, that using the themed function in different files might require some more setup. See [How validation works](/guide/how-validation-works) for more info.
:::


::: code-group

```scss [style.scss] {23-27}
@use "@komplett/themed" as *;

$themes: (
  "light": (
    "text": #212529,
    "background": #fafafa,
    "grey-1": #343a40,
    "grey-2": #495057,
    "grey-3": #6c757d,
  ),
  "dark": (
    "text": #fafafa,
    "background": #212529,
    "grey-1": #f8f9fa,
    "grey-2": #e9ecef,
    "grey-3": #dee2e6,
  ),
);

@include themes($themes);


html,
body {
  color: themed("text");
  background-color: themed("background");
}

```

:::


Lastly, you have to define which theme to use on the `documentElement` of your page, alias the HTML Tag. The `data-theme` attribute must be set in order for this to work.
You can either statically add the Attribute to the html element like

::: code-group

```html [index.html] {1}
<html lang="en" data-theme="light">
  <!-- ... -->
</html>
```

:::

Or, use one of the utility functions that `themed` offers out of the box in any js file, or in a script block in the index.html.

::: code-group

```js [index.js] {1-3}
import { setTheme } from "@komplett/themed/utils";

setTheme("light");
```

:::

Later, you can use more utility functions, like `toggleTheme`, `getTheme`, `getPreferredColorScheme` and more. See [Utility functions](/guide/utility-functions) for more.

::: tip
:tada: Done! You now know how this works. But, it's **very** likely you want to have a look at [Global setup](/guide/global-setup) to learn how to use the `themed` functions in every file.
:::