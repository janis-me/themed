# Customization

You can customize `themed` in a couple of ways:

## Defining a custom prefix for CSS variables

By default, the generated CSS variables will use the `themed` prefix, for example `--themed-text`. You can set a custom prefix using the `configure` function:

```scss
@use '@janis.me/themed';

@include themed.configure($themes, $prefix: 'my-custom-var');
```

This would generate `--my-custom-var-text`. The `themed` function will automatically use the selected prefix, [provided it's in the same lexical scope! ](/guide/global-setup)

## Adding custom CSS variables

The `apply` function uses [SCSS content-blocks](https://sass-lang.com/documentation/at-rules/mixin/#content-blocks) to let you add custom content. For example, you might want to generate different versions of the colors you set in the themes.

To do this, add a `using` keyword after the mixin. The content block gets the defined prefix, the variable key and it's value for each variable defined in the theme.
Using these variables, you can 'derive' new ones!

```scss
$alpha-modifiers: 90, 80, 70, 60, 50, 40, 30, 20, 10;

@include apply() using ($prefix, $key, $value) {
  @each $alpha in $alpha-modifiers {
    // make-css-variable is a utility mixin exported from `@janis.me/themed/utils`. It generates a CSS variable in the same format
    // as all other variables.
    @include utils.make-css-variable(
      $prefix,
      '#{$key}--#{$alpha}',
      #{color.change($value, $alpha: calc($alpha / 100))}
    );
  }
}
```
