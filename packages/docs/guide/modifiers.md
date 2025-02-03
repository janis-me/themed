# Modifiers

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

Of course, you can change both these things to your liking. Just pass it to the modifier.


## TODO: This page should list all available modifiers, once we decided on which ones to add.