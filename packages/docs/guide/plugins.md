# Plugins

One of the best parts of `themed` is the way you can modify themes. Having static variables is one thing, but you also want, for example, different alpha values for colors, or want to scale paddings/margins evenly.
This is where SCSS and `themed` utility methods come to play.

`Themed` defines a set of functions that make it easy for you to extend/modify your themes. Just pass the plugin to the `configure` function (as a single plugin or a list)

```scss
@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@include configure($themes, $plugins: (plugins.variants(('alpha' 'change' (0.2, 0.5, 0.8)))));
```

This will call the given plugins, in this case the build-in `fill`, for every value variable in the theme.

This will generate alpha values of 20%, 50% and 80% with a prefix of `--a`. So, if your theme has a color `text`, it will generate

```text
--themed-text--a02
--themed-text--a05
--themed-text--a08
```

Of course, you can change both these things to your liking. Just pass it to the plugin.

## Color plugins

A quick word on colors: CSS defines a large set of colorspaces, all with their advantages. There is a trend towards modern colorspaces and tools like tailwind use them by default in their docs (the `oklch` colorspace for example).
As `themed` is quite new, we opted to give you an easy way to use the newest CSS features with the `colorspace` plugin.

### `plugins.colorspace($space)`

Converts all colors in the themes to the given colorspace. Some valid spaces are `srgb`, `display-p3`, `rec2020`, `lab`, `oklab`, `hsl`, `lch` and `oklch`

Refer to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Color_space#named_color_spaces) for an up-to-date list

<iframe src="https://themed-playground.janis.me?header=false&example=plugin-colorspace" frameborder="0" width="100%" height="500px"></iframe>
<p align="right"><a href="https://themed-playground.janis.me?example=plugin-colorspace" target="_blank" rel="noopener noreferrer">View in playground</a></p>

### `plugins.alpha($operation, $steps)`

This is a slim version of `plugins.variants`, where you can give it an operation (`change`, `adjust` or `scale`) and steps like `(0.2, 0.4, 0.6, 0.8)` to generate alpha values.

<iframe src="https://themed-playground.janis.me?header=false&example=plugin-alpha" frameborder="0" width="100%" height="500px"></iframe>
<p align="right"><a href="https://themed-playground.janis.me?example=plugin-alpha" target="_blank" rel="noopener noreferrer">View in playground</a></p>

### `plugins.variants($variants)`

Adds new color variables with changed color values to the theme. Variables will have the format `<original-key><prefix><value>`, for example `text--a02`.

The input must be a list of operations in the form of (`channel` `operation` (`steps`)), for example `('alpha' 'change' (0.2, 0.5, 0.8))`.

- Channel is a color channel like `alpha`, `lightness`, `hue` etc. See https://sass-lang.com/documentation/modules/color/
- Operation is either `change`, `adjust` or `scale`. See https://sass-lang.com/documentation/modules/color/
- The steps are the variants you want. Depending on the channel and operation, these are either numbers between 0 and 100, between 0 and 1, or percentages like 10% and 90%.
  The compiler will tell you if you're passing wrong values.

See `https://themed-playground.janis.me/?example=plugin-variants` for some examples

<iframe src="https://themed-playground.janis.me?header=false&example=plugin-variants" frameborder="0" width="100%" height="500px"></iframe>
<p align="right"><a href="https://themed-playground.janis.me?example=plugin-variants" target="_blank" rel="noopener noreferrer">View in playground</a></p>

### `plugins.p3($themes)`

This will add CSS variables for high-gammut displays that support the p3 colorspace. It will override the default colors.

`$themes` can have some of the keys from the original themes, but with higher gammut. Usually defined in the oklch space.

An example could look like

```scss
@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

// ...
$themes: ();

// Colors that should be overwritten for high-gammut displays
// Browser support is limited, so it's defined behind a media/supports query
$high-contrast: (
  light: (
    'teal-9': oklch(0.75 0.1208 193.52),
  ),
  dark: (
    'teal-9': oklch(0.7 0.1617 192.68),
  ),
);

@include themed.configure($themes, $plugins: plugins.p3($high-contrast));
@include themed.apply();
```

which would give you CSS variable overrides behind a media query:

```CSS
@media (color-gamut: p3) {
  @supports (color: color(display-p3 0 0 0)) {
    html[data-theme=light] {
      --themed-teal-9: oklch(75% 0.1208 193.52deg);
    }
    html[data-theme=dark] {
      --themed-teal-9: oklch(70% 0.1617 192.68deg);
    }
  }
}
```

<iframe src="https://themed-playground.janis.me?header=false&example=plugin-p3" frameborder="0" width="100%" height="500px"></iframe>
<p align="right"><a href="https://themed-playground.janis.me?example=plugin-p3" target="_blank" rel="noopener noreferrer">View in playground</a></p>

## Misc plugins

### `plugins.fill()`

Simply looks at all themes and adds values that exist in the [primary theme](/guide/defining-themes#the-primary-theme), but not in others. Can be used to define default values in the primary theme and then auto-fill them into all others.

::: warning
This plugin loops over all values of all themes for every module it is used in. It's therefore a heavy operation. Check out [How about shared/default values?](/guide/defining-themes#how-about-shared-default-values) for more info.
:::

<iframe src="https://themed-playground.janis.me?header=false&example=plugin-fill" frameborder="0" width="100%" height="500px"></iframe>
<p align="right"><a href="https://themed-playground.janis.me?example=plugin-fill" target="_blank" rel="noopener noreferrer">View in playground</a></p>

## Writing custom plugins

All plugins have the same simple call and return signature. They need to return a map with a `name` and them some pre-defined actions. These actions are
`extend-all`, `pre-apply` and `post-apply`. The plugin must return this key and a function with a signature that matches the action.

- `extend-all` adds new values to the theme
- `pre-apply` adds content to the output CSS **before** the main variables
- `post-apply` adds content to the output CSS **after** the main variables

The most common one, `extend-all` could look like

```scss
@function my-cool-plugin-impl($themes, $prefix) {
  // ...

  @return $updated-themes;
}

@function my-plugin() {
  @return ('name': 'my-cool-plugin', 'extend-all': meta.get-function(my-cool-plugin-impl));
}
```

When you pass `my-plugin` to `themed.configure()`, it get's the `my-cool-plugin-impl` function and calls that with all `themes` and the given `prefix`. You can then loop over the themes and return an extended map.
(Use the [SASS map capabilities](https://sass-lang.com/documentation/modules/map/) for that)

### An example plugin

You can browse all [plugins on github](https://github.com/janis-me/themed/tree/main/packages/themed/src/scss/plugins). As an example, the `fill` plugin is defined like this:

```scss
@use 'sass:list';
@use 'sass:map';
@use 'sass:meta';

$__themed__plugin-fill__name: 'themed-plugin-fill';

@function __themed__plugin-fill__extend-all($themes, $prefix) {
  $result-map: ();

  // Get the primary theme name
  $primary-theme-name: list.nth(map.keys($themes), 1);
  $primary-theme: map.get($themes, $primary-theme-name);

  // Loop through all themes
  @each $theme-name, $theme-map in $themes {
    $theme-result: $theme-map;

    // Skip the primary theme
    @if $theme-name != $primary-theme-name {
      // Loop through all keys in the primary theme
      @each $key, $value in $primary-theme {
        // Check if the key exists in the current theme
        @if not map.has-key($theme-map, $key) {
          // Add the missing key to the result map with the value from the primary theme
          $theme-result: map.merge(
            $theme-result,
            (
              '#{$key}': $value,
            )
          );
        }
      }
    }

    $result-map: map.deep-merge(
      $result-map,
      (
        '#{$theme-name}': $theme-result,
      )
    );
  }

  @return $result-map;
}

// The fill modifier ensures that all 'secondary' themes have the values of the 'primary' theme by copying missing values
@function fill() {
  @return ('name': $__themed__plugin-fill__name, 'extend-all': meta.get-function(__themed__plugin-fill__extend-all));
}
```
