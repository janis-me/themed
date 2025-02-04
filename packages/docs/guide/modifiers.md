# Modifiers

One of the best parts of `themed` is the way you can modify themes. Having static variables is one thing, but you also want, for example, different alpha values for colors, or want to scale paddings/margins evenly.
This is where SCSS and `themed` utility methods come to play.

`Themed` defines a set of functions that make it easy for you to extend/modify your themes. If you have a theme map ready, let's call it `$themes`, you can add modifiers like this:

```scss
@use '@komplett/themed';
@use '@komplett/themed/modifiers';

$theme-map: themed.modify-themes($themes, modifiers.alpha());
```

This will call the given modifier, in this case the build-in function `alpha-modifier`, for every color variable in the theme.

By default, this will generate alpha values of 80%, 60%, 40% and 20% with a `modifier prefix` of `--a`. So, if your theme has a color `text`, it will generate

```text
--themed-text--a80
--themed-text--a60
--themed-text--a40
--themed-text--a20
```

Of course, you can change both these things to your liking. Just pass it to the modifier.

## Color modifiers

A quick word on colors: CSS defines a large set of colorspaces, all with their advantages. There is a trend towards modern colorspaces and tools like tailwind use them by default in their docs (the `oklch` colorspace for example).
As `themed` is quite new, we opted to follow this trend and will use the `oklch` colorspace for all color modifiers by default! This means that operations like `color.scale` and `color.change` will operate in this colorspace, and that results of modifiers will be converted into the `oklch` colorspace as well.

### `modifiers.colorspace($space)`

Converts all colors in the themes to the given colorspace, oklch by default.

::: warning
This will **not** convert colors added by other modifiers. For example, if you use the `alpha` modifier. the resulting color will be in the `oklch` colorspace regardless of the value in the `colorspace` modifier.
:::

### `modifiers.alpha($steps, $prefix, $colorspace)`

Adds new color variables with different alpha values to the theme. Variables will have the format `<original-key><prefix><value>`, for example `text--a20`.

This is a [change](https://sass-lang.com/documentation/modules/color/#change) operation, so it will **set** the values, not **scale** them relative to the original.

::: details Defaults

```scss
$alpha-steps: (80, 60, 40, 20);
$alpha-prefix: '--a';
$alpha-colorspace: oklch;
```

:::

### `modifiers.lightness($steps, $prefix, $colorspace)`

Adds new color variables with different lightness values to the theme. Variables will have the format `<original-key><prefix><value>`, for example `text--l20`

This is a [change](https://sass-lang.com/documentation/modules/color/#change) operation, so it will **set** the values, not **scale** them relative to the original.

::: details Defaults

```scss
$lightness-steps: (80, 60, 40, 20);
$lightness-prefix: '--l';
$lightness-colorspace: oklch;
```

:::

### `modifiers.saturation($steps, $prefix, $colorspace)`

Adds new color variables with different saturation values to the theme. Variables will have the format `<original-key><prefix><value>`, for example `text--s20`

This is a [change](https://sass-lang.com/documentation/modules/color/#change) operation, so it will **set** the values, not **scale** them relative to the original.

::: details Defaults

```scss
$saturation-steps: (80, 60, 40, 20);
$saturation-prefix: '--s';
$saturation-colorspace: oklch;
```

:::

## Misc modifiers

### `modifiers.fill()`

Simply looks at all themes and adds values that exist in the [primary theme](/guide/defining-themes#the-primary-theme), but not in others. Can be used to define default values in the primary theme and then auto-fill them into all others.

::: warning
Because modifiers always loop over all values of all themes, the fill modifier does this comparison quite a lot. It's therefore a heavy operation. Check out [How about shared/default values?](/guide/defining-themes#how-about-shared-default-values) for more info.
:::

## Writing custom modifiers

All modifiers have the same simple signature and simply return a map with new values. This function is then called for **every value of every theme**. So to create new values, you would return whatever new keys you want to define from the modifier. The `$result` map is then merged with the original one. You can also override values by returning the original key in the result map.

```scss
@function modifier($key, $value, $theme-name) {
  $results: ();

  // ... some custom logic

  @return $results;
}
```

For example, the `alpha-modifier` is defined like this:

```scss
@function alpha-modifier($key, $value, $theme-name) {
  $results: ();

  @if meta.type-of($value) == 'color' {
    @each $alpha in $alpha-steps {
      $new-value: color.change($value, $alpha: calc($alpha / 100));
      $results: map.merge(
        $results,
        (
          '#{$key}#{$alpha-prefix}#{$alpha}': $new-value,
        )
      );
    }
  }

  @return $results;
}
```

It is wrapped into a simple 'utility function' though, so you can easily adjust the `steps` and `prefix` variables.

To define your own modifiers, just create a function like this and pass it to `modify-themes` [as a value](https://sass-lang.com/documentation/modules/meta/#get-function)

```scss
// meta.get-function is needed to turn the function into a value. That's how SCSS works.
$theme-map: themed.modify-themes($themes, modifiers.alpha(), meta.get-function(my-custom-modifier));
```
