# Global setup

::: tip
This setup is demonstrated in the [extended example on github](https://github.com/komplettio/themed/tree/main/examples/vite-vanilla-extended). Check that out for a quick overview.
:::

::: warning
`@komplett/themed` is still under active development. The need for a global setup like described below is [still being discussed](https://github.com/komplettio/themed/issues/15). Please let us know your opinion.
:::

Realistically, you would want to use the `themed` functions in every file of your project. for example in components, layout files etc.
Two things are stopping you from doing so:

1. The validation logic relying on global SCSS variables.
2. Having to add `@use "@komplett/themed" as *;` in every file

Here's how to fix that:

## Defining a global.scss file

As shown in the [extended example on github](https://github.com/komplettio/themed/tree/main/examples/vite-vanilla-extended), the easiest way to use `@komplett/themed` effectively, is to add a `global.scss` file.
This file would define the theme and `@forward` all functions that `@komplett/themed` defines.

::: code-group

```scss [global.scss]
@forward '@komplett/themed';

@use '@komplett/themed' as *;
@use 'sass:meta';
@use './themes.scss';

// This gets all themes defined in ./themes.scss as a map.
// You can also just define a map here, like described in `getting started`.
$theme-map: meta.module-variables('themes');

@include themes($theme-map);
```

:::

Now, you can `@use` the global.scss file and use all the `@komplett/themed` functions without issues.

While the initial setup with this is a bit more complex, this has many advantages. If you don't want to deal with this,
the `themed` function has a second parameter, `$verify`. Set this to false and it will not check the themes. This takes away one main advantage of the library though.

::: details But why is it so complicated?
Because the `themed` function uses global SCSS variables to validate it's input, and those variables are lexically scoped to a module.
This means that if you would just call the `themed` variable outside of the scope, it would tell you the variable wasn't part of your themes.
:::

## Dynamically import themed

Secondly, if you use tools like `vite` or a framework like `next.js`, you can automatically import `@komplett/themed` or the `global.scss` file into every scss file of your app.
For vite, it would look like

::: code-group

```ts [vite.config.ts] {9}
import { defineConfig } from 'vite';

export default defineConfig({
  // .. The usual config ..
  css: {
    preprocessorOptions: {
      scss: {
        // Import global.scss or `@komplett/themed` here
        additionalData: '@use "/src/styles/global" as *;\n',
      },
    },
  },
});
```

:::

::: warning

Due to how vite adds this additional code to SCSS files, you might need to `@import` your additional stylesheets, instead of `@use`ing them.
This is because if you @use `stylesheet A` in `stylesheet B`, `stylesheet A` will not receive the additional data at it's top. If you use @import, it will.

@import rules are however considered outdated in SCSS. As an alternative, have a look at [SCSS importers](https://sass-lang.com/documentation/js-api/interfaces/importer/)
:::
