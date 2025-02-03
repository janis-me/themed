# Writing custom modifiers

All modifiers have the same simple signature and simply return a map with new values:

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

  @if meta.type-of($value) == "color" {
    @each $alpha in $alpha-steps {
      $new-value: color.change($value, $alpha: calc($alpha / 100));
      $results: map.merge(
        $results,
        (
          "#{$key}#{$alpha-prefix}#{$alpha}": $new-value,
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
$theme-map: themed.modify-themes($themes, meta.get-function(my-custom-modifier));
```
