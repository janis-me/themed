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

@include themes($theme-map)
```

:::

You might wonder what this `meta.module-variables` stuff is doing. It's simply importing themes as a map from a `themes.scss` file that looks something like this:

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

@include themes(themes.$themes-map)
```

:::

## More than two themes

You can define as many themes as you want! We use the `data-theme` attribute on the `documentElement` to select the theme, so as long as the names match, you're good to go.
You can also still use all [utility functions](/guide/utility-functions) we provide, apart from the `toggleTheme` function, as this always assumes the `light` and `dark` names.