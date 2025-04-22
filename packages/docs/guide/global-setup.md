# Global setup

::: tip
This setup is demonstrated in the [extended example on github](https://github.com/janis-me/themed/tree/main/examples/vite-vanilla-extended). Check that out for a quick overview.
:::

::: warning
`@janis.me/themed` is still under active development. The need for a global setup like described below is [still being discussed](https://github.com/janis-me/themed/issues/15). Please let us know your opinion.
:::

In real-world scenarios, you will use the `themed` functions in many file of your project. for example in components, layout files etc.
Two things are stopping you from doing so:

1. You would have to add `@use "@janis.me/themed";` to every file
2. You would have to 'register' the themes in every file with `@include configure($themes);`.

Here's how to fix that:

## Defining a global.scss file

As shown in the [extended example on github](https://github.com/janis-me/themed/tree/main/examples/vite-vanilla-extended), the easiest way to use `@janis.me/themed` effectively, is to add a `global.scss` file.
This file defines the themes and `@forward`s all functions that `@janis.me/themed` defines.

::: code-group

```scss [global.scss]
@forward '@janis.me/themed';

@use 'sass:meta';
@use '@janis.me/themed';

@use './themes.scss';

// This gets all themes defined in ./themes.scss as a map.
// You can also just define a map here, like described in `getting started`.
$themes: meta.module-variables('themes');

@include themed.configure($themes);
```

:::

::: warning
Note, that here we are only calling `configure` here, not `apply`. Make sure to call `apply` only once in the main style file, where the variables should be defined.
:::

Now, you can `@use` the global.scss file and use all the `@janis.me/themed` functions without issues.

While this is a bit more complex, it has many advantages. If you don't want to deal with this,
the `themed` function has a second parameter, `$verify`. Set this to false and it will not check the themes. This takes away one main advantage of the library though.

::: details But why is it so complicated?
Because the `themed` function uses global SCSS variables to validate it's input, and those variables are lexically scoped to a module.
This means that if you would just call the `themed` variable outside of the scope, it would tell you that there are no themes defined.
:::

## Dynamically import themed

Secondly, if you use tools like `vite` or a framework like `next.js`, you can automatically import `@janis.me/themed` or `global.scss` into every scss file of your app.
For vite, it would look like

::: code-group

```ts [vite.config.ts] {9}
import { defineConfig } from 'vite';

export default defineConfig({
  // .. The usual config ..
  css: {
    preprocessorOptions: {
      scss: {
        // Import global.scss or `@janis.me/themed` here
        additionalData: '@use "/src/styles/global" as *;\n',
      },
    },
  },
});
```

```ts [next.config.ts] {5}
import { NextConfig } from 'next';

const nextConfig = {
  // .. The usual config ..
  sassOptions: {
    // Import global.scss or `@janis.me/themed` here
    additionalData: `@use "/src/styles/global" as *;\n`,
  },
} satisfies NextConfig;

module.exports = nextConfig;
```

:::

::: warning
For vite, if you @use `stylesheet A` in `stylesheet B`, `stylesheet A` will not receive the additional data at it's top.
This means, that if you have import chains, you might need to add `@use 'janis.me/themed' as *;` manually to some files, or fall back to `@import` (not recommended).

@import rules are deprecated in SCSS. As an alternative, have a look at [SCSS importers](https://sass-lang.com/documentation/js-api/interfaces/importer/)
:::
