# FAQ:

::: details Q: Why not just use CSS variables? {open}

1. Using SCSS builtins like `color.adjust` and `color.change` will not work with CSS variables. But you will need transparency, or slightly altered colors.
2. Ugly theme definitions. Defining all those variables in plain CSS is weird. You would probably use SCSS to define maps of themes anyways, and then convert them to SCSS variables.

:::

::: details Q: Can I use this with tailwind? {open}
Probably not? Tailwind probably has it's own thing going on. This is as raw as SCSS gets.
:::

::: details Q: What dependencies does this have? {open}
None, except for SCSS. We do suggest to use tools like Vite though, just to make your life a bit easier.
:::

::: details Q: And what about build tools, bundling and CSS output. Anything to be aware of? {open}
Good question. TL;DR: Read [Global setup](/guide/global-setup).

We use global SCSS variables to keep track of the registered themes. Those SCSS variables are lexically scoped to modules, so you will only be able to use the "themed" function in the same scope.
Meaning, if you want to use themed functions in multiple files, make sure that they all @use a file that defines the themes.
See the vite-vanilla-extended or vite-react examples for this, they define a global.scss file.

This is, of course, only needed on compile time. The CSS output will always be the same.
:::
