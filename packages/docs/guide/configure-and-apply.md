# About `configure` and `apply`

The two most important mixins in themed. Simply put:

- `configure` is used to
  - register your themes
  - check for errors
  - add additional configuration (like a custom prefix)
  - apply [generators](/guide/generators) and [plugins](/guide/plugins).
- `apply` is used to
  - Apply the generated themes to CSS.

While `configure` should be called in a file like `global.scss` so it can be imported multiple times. `apply` should only be called once.

# The `configure` function in depth

The first argument to the `configure` mixin is the themes map (see the previous section).
Next, you can pass any number of `config objects`, `plugins` and `generators`. You will learn about them in the next chapters, but simply put, all three of those change your themes or the output CSS.

So, a call to `configure` can look like

```scss
@include configure($themes);
```

or

```scss
@include themed.configure(themes.$themes, plugins.p3(themes.$high-contrast), plugins.fill());
```

or even

```scss
@include themed.configure(
  $themes,
  (
    'prefix': $theme-prefix,
  ),
  generators.colors($primary: #16b6b3, $gray: #252c2c, $target-space: oklch),
  plugins.fill(),
  plugins.variants(('alpha', 'change', (0.1, 0.9)), ('saturation', 'adjust', (20%, 40%, 60%, 80%, 90%))),
  plugins.p3($high-contrast),
  plugins.colorspace(hsl)
);
```
