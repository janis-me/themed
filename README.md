<p align="center">
  <a href="https://github.com/komplettio/themed" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/komplettio/themed/refs/heads/main/assets/themed-logo.png" alt="Themed logo">
  </a>
</p>
<br/>
<p align="center">
  Themed: native SCSS themes for your app! 
</p>
<br/>

`@komplett/themed` is a customizable SCSS utility to add theming to your website as easily and safely as possible. It also offers utility methods for javascript/typescript (and react via `@komplett/react-themed`).

> [!WARNING]  
> This is in early development. Expect things to break and change before it hits 1.0.0

---

## Features:

- Type-checking themes for validity, checking all values exist etc.
- Prints human-readable errors when using variables wrong
- Produces nice SCSS **AND** CSS variables, so you can use all SCSS features with theming
- Multi-theme: You can either use classic dark/light themes, or define as many as you want!
- Customizable: It's easy to change things about if you need to.

---

## Usage:

It's as easy as:

```scss
@use "@komplett/themed" as *;

// Define themes in a map
$themes: (
  "dark": (
    "text": #212529,
    "background": #fafafa,
    // ...
  ),
  "light": (
    "text": #fafafa,
    "background": #212529,
    // ...
  ),
);

// Register the themes. They will be checked for validity, uniformity etc.
@include themes($theme-map);

// Use the themed function to get type-checked theming!
body {
  color: themed("text");
  background-color: themed("background");
}
```

Using SCSS' meta package and error/type checking. you get nice error hints!

```bash
[sass] "'grey-29' is not defined in your themes."
    ╷
22  │  background-color: themed("grey-29");
    │                     ^^^^^^^^^^^^^^^^^
    ╵
  src/styles/main.scss 22:21  root stylesheet
```

---

## Installation:

One way is to just copy the stuff in `./packages/themed/src/index.scss` and put them into your app.

Alternatively, use `npm install -D @komplett/themed` and follow the example above, or look at one of the examples in the `examples` folder.

### React

For react, install `@komplett/react-themed` and place a <ThemeProvider> at the app level of your app. You can then use the `useTheme` hook to retrieve/update it, or import imperative

---

## Questions

**Q: Why not just use CSS variables?**

1. Using SCSS builtins like `color.adjust` and `color.change` will not work with CSS variables. If you need transparency, or want to generate shades of a color with SCSS, it's tough

2. Ugly theme definitions. Defining all those variables in plain CSS is weird. You would probably use SCSS to define maps of themes anyways, and then convert them to SCSS variables.

**Q: Can I use this with tailwind?**

A: Probably not? Tailwind probably has it's own thing going on. This is as raw as SCSS gets.

**Q: What dependencies does this have?**

A: None, except for SCSS. We do suggest to use tools like Vite though, just to make your life a bit easier.

**Q: And what about build tools, bundling and CSS output. Anything to be aware of?**

A: Yes, good that you ask. We use global SCSS variables to keep track of the registered themes. Those SCSS variables are lexically scoped to modules, so you will only be able to use the "themed" function in the same scope.
Meaning, if you want to use themed functions in multiple files, make sure that they all `@use` a file that defines the themes. See the `vite-vanilla-extended` or `vite-react` examples for this, they define a `global.scss` file.
This is, of course, only needed on compile time. The CSS output will always be the same.

## Developing

We use `pnpm` and `pnpm workspaces` to maintain themed. You must have PNPM installed. Clone the repo, install all packages with `pnpm install` and build them, for example using `pnpm run build:watch` in the root folder.
You can also run the examples with, for example `pnpm run example:vanilla`. Any code change you now make should instantly be reflected (after a quick rebuild). Initially, you might see errors in the console, because the react and the vanilla
package try to build in parallel.
