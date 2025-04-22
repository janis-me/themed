# Defining themes

In [the previous section](/guide/global-setup), we showed a code snippet like this:

::: code-group

```scss [global.scss]
@forward '@janis.me/themed';

@use 'sass:meta';
@use '@janis.me/themed';

@use './themes.scss';

// This get's all themes defined in ./themes.scss as a map.
// You can also just define a map here, like described in `getting started`.
$themes: meta.module-variables('themes');

@include themed.configure($themes);
```

:::

You might wonder what `meta.module-variables` is doing. It's simply importing themes as a map from the `themes.scss` file that looks something like this:

::: code-group

```scss [themes.scss]
$light: (
  'text': #212529,
  'background': #fafafa,
  'grey-1': #343a40,
  'grey-2': #495057,
  'grey-3': #6c757d,
);

$dark: (
  'text': #fafafa,
  'background': #212529,
  'grey-1': #f8f9fa,
  'grey-2': #e9ecef,
  'grey-3': #dee2e6,
);
```

:::

Of course, you could also just define themes in a map and import it in the `global.scss` file. It's up to you

::: code-group

```scss [themes.scss]
$themes-map: (
  'light': (
    'text': #212529,
    'background': #fafafa,
    'grey-1': #343a40,
    'grey-2': #495057,
    'grey-3': #6c757d,
  ),
  'dark': (
    'text': #fafafa,
    'background': #212529,
    'grey-1': #f8f9fa,
    'grey-2': #e9ecef,
    'grey-3': #dee2e6,
  ),
);
```

```scss [global.scss]
@forward '@janis.me/themed';

@use '@janis.me/themed';
@use 'sass:meta';
@use './themes.scss';

@include themed.configure(themes.$themes-map);
```

:::

::: info
This is the simplest form of themes. Just a map with two themes, each with a set of values.
:::

## The primary theme

`Themed` will sometimes refer to a theme as the `primary theme`. All this is, is the first theme defined in the themes map (or the first variable in a `themes.scss` file).
This is used for validation, and for handling `default values` (see bottom of this page). Even though you should always just make sure that all themes look the same and have the same values,
take special care of the `primary theme`, as it has a somewhat special rule in validation.

## More than two themes

You can define as many themes as you want! We use the `data-theme` attribute on the `documentElement` to select the theme, so as long as the names match, you're good to go.
You can also still use all [utility functions](/guide/utility-functions) we provide, apart from the `toggleTheme` function, as this always assumes the `light` and `dark` names.

## How about shared/default values?

You will often have values that don't change across themes, for example paddings/margins, font sizes etc. You have a couple of options:

1. Use the built-in `fill` modifier. With this, you can automatically fill in values from the [primary theme](/guide/defining-themes#the-primary-theme) to all other themes.

::: code-group

```scss [themes.scss]
$light: (
  'text': #212529,
  'background': #fafafa,
  'padding': 8px,
  'font-size': 1rem,
);

$dark: (
  'text': #fafafa,
  'background': #212529,
);
```

```scss [global.scss]
@use '@janis.me/themed/modifiers';

$raw-theme-map: meta.module-variables('themes');

// modify-themes is used to apply any number of modifiers onto the themes.
$theme-map: themed.modify-themes($raw-theme-map, modifiers.fill());
```

:::

2. Define them outside of `themed`, for example with plain SCSS variables
3. re-define them in all themes, either by manually repeating them, or with a "default" set of variables in a map, for example:

```scss
$defaults: (
  "padding": 8px,
  "font-size": 1rem,
)

$light: map.merge($defaults, (
  "my-color": #fefefe
))

$dark: map.merge($defaults, (
  "my-color": #212121
))

```

## Modifying themes

One of the most important aspects of `themed` is the way you can easily build themes with plugins. In the next section, [plugins](/guide/plugins), we will have a look at them.
