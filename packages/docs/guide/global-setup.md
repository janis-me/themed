# Global setup

Realistically, you would want to use the `themed` functions in every file of your project. for example in components, layout files etc.
Two things are blocking you from doing so:

1. The validation logic relying on global SCSS variables.
2. Having to add `@use "@komplett/themed" as *;` in every file

Here's how to fix that:

## Defining a global.scss file

As shown in the [extended example on github](https://github.com/komplettio/themed/tree/main/examples/vite-vanilla-extended)