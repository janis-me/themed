# Defining themes

In [the previous section](/guide/global-setup), we showed a code snippet like this:

::: code-group

```scss [global.scss]
@forward "@komplett/themed";

@use "@komplett/themed" as *;
@use "sass:meta";
@use "./themes.scss";

// This get's all themes defined in ./themes.scss as a map.
// You can also just define a map here, like described in `getting started`.
$theme-map: meta.module-variables("themes");

@include themes($theme-map);
```

:::

You might wonder what `meta.module-variables` is doing. It's simply importing themes as a map from the `themes.scss` file that looks something like this:

::: code-group

```scss [themes.scss]
$light: (
  "text": #212529,
  "background": #fafafa,
  "grey-1": #343a40,
  "grey-2": #495057,
  "grey-3": #6c757d,
);

$dark: (
  "text": #fafafa,
  "background": #212529,
  "grey-1": #f8f9fa,
  "grey-2": #e9ecef,
  "grey-3": #dee2e6,
);
```

:::

Of course, you could also just define themes in a map and import it in the `global.scss` file. It's up to you

::: code-group

```scss [themes.scss]
$themes-map: (
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

```scss [global.scss]
@forward "@komplett/themed";

@use "@komplett/themed" as *;
@use "sass:meta";
@use "./themes.scss";

@include themes(themes.$themes-map);
```

:::

::: info
This is the simplest form of themes. Just a map with two themes, each with a set of values.
:::

## More than two themes

You can define as many themes as you want! We use the `data-theme` attribute on the `documentElement` to select the theme, so as long as the names match, you're good to go.
You can also still use all [utility functions](/guide/utility-functions) we provide, apart from the `toggleTheme` function, as this always assumes the `light` and `dark` names.

## Modifying themes:

One of the best parts of `themed` is the way you can modify themes. Having static variables is one thing, but you also want, for example, different alpha values for colors, or want to scale paddings/margins evenly.
This is where SCSS and `themed` utility methods come to play.

`Themed` defines a set of functions that make it easy for you to extend/modify your themes. If you have a theme map ready, let's call it `$themes`, you can add modifiers like this:

```scss
@use "@komplett/themed";

$theme-map: themed.modify-themes($themes, themed.alpha());
```

This will call the given modifier, in this case the build-in function `alpha-modifier`, for every color variable in the theme.

By default, this will generate alpha values of 80%, 60%, 40% and 20% with a `modifier prefix` of `--a`. So, if your theme has a color `text`, it will generate

```text
--themed-text--a80
--themed-text--a60
--themed-text--a40
--themed-text--a20
```

Of course, you can change both these things to your liking. Just pass it to the modifier. In the next section, [modifiers](/guide/modifiers), we will have a look at them..