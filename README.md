<p align="center">
  <a href="https://github.com/janis-me/themed" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/komplettio/themed/refs/heads/main/assets/themed-logo.png" alt="Themed logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://themed.janis.me">
    <img src="https://img.shields.io/badge/Documentation-online-blue" alt="build status">
  </a>
  <a href="https://themed-playground.janis.me">
    <img src="https://img.shields.io/badge/Playground-online-green" alt="build status">
  </a>
  <a href="https://npmjs.com/package/@janis.me/themed">
    <img alt="@janis.me/themed on npm" src="https://img.shields.io/npm/v/%40janis.me%2Fthemed?label=npm%20(themed)&labelColor=orange&color=grey">
  </a>
  <a href="https://npmjs.com/package/@janis.me/react-themed">
    <img alt="@janis.me/react-themed on npm" src="https://img.shields.io/npm/v/%40janis.me%2Freact-themed?label=npm%20(react-themed)&labelColor=%2361dafb&color=grey">
  </a>
  <a href="https://app.netlify.com/sites/themed-docs/deploys">
    <img alt="docs deployment" src="https://img.shields.io/netlify/028ea096-26a7-4c1d-a3cb-5fa1b4b7aa58?style=flat&logo=netlify&label=docs">
  </a>
  <a href="https://app.netlify.com/sites/themed-playground/deploys">
    <img alt="Playground deployment" src="https://img.shields.io/netlify/366b1572-c264-4390-abe5-132bf3a9b6a4?style=flat&logo=netlify&label=playground">
  </a>
</p>
<p align="center" style="font-size: 1.5rem;">
  @janis.me/<b>themed</b>: SCSS-native themes made simple
</p>
<br/>

`@janis.me/themed` is a customizable SCSS utility to add theming to your website as easily and safely as possible. It also offers utility methods for javascript/typescript (and react via `@janis.me/react-themed`).

> [!WARNING]  
> This is in early development. Expect things to break and change before it hits 1.0.0

**Visit our [Documentation](https://themed.janis.me)**

---

## Features:

- 🔒 **Type-checking** themes for validity, checking all values exist etc.
- 🌐 Produces nice **SCSS AND CSS** variables, so you can use all SCSS features with theming.
- 🖌 **Multi-theme**: You can either use classic dark/light themes, or define as many as you want!
- 🚀 **Extra features** like JS/TS methods for interactivity built in.
- 🔌 **Built-in plugins** like wide-gammut colors, auto-generated color variants and more.
- 🎭 **Customizable**: Adjust nearly every aspect of how you use themes.
- 🌈 Prints **human-readable** errors when doing something wrong.
- First class **React support** with `@janis.me/react-themed`.

---

## Usage:

It's as easy as:

```scss
@use '@janis.me/themed' as *;

// Define themes in a map
$themes: (
  'dark': (
    'text': #212529,
    'background': #fafafa,
    // ...
  ),
  'light': (
    'text': #fafafa,
    'background': #212529,
    // ...
  ),
);

// Configure the themes. They will be checked for validity, uniformity etc.
@include configure($theme-map);
@include apply();

// Use the themed function to get type-checked theming!
body {
  color: themed('text');
  background-color: themed('background');
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

```bash
npm install @janis.me/themed
# or
pnpm add @janis.me/themed
```

you can also just copy the stuff in `packages/themed` if you prefer.

### React

For react, install `@janis.me/react-themed` and place a <ThemeProvider> at the app level of your app. You can then use the `useTheme` hook to retrieve/update it. All utility methods are also exported from `@janis.me/react-themed/js`.

---

## Questions

**Q: Why not just use CSS variables?**

1. Using SCSS builtins like `color.adjust` and `color.change` will not work with CSS variables. If you need transparency, or want to generate shades of a color with SCSS, it's tough

2. Ugly theme definitions. Defining all those variables in plain CSS is weird. You would probably use SCSS to define maps of themes anyways, and then convert them to SCSS variables.

**Q: Can I use this with tailwind?**

A: Yes! We even want to add native support for it via a plugin. You can just define CSS variables as you normally would and then pass them to tailwind.

**Q: What dependencies does this have?**

A: None, except for SCSS. We do suggest to use tools like Vite though, just to make your life a bit easier.

**Q: And what about build tools, bundling and CSS output. Anything to be aware of?**

A: TL:DR: Just call `themed.configure()` in a `global.scss` file and `@use` that. Then you're good.
Long answer: Yes, good that you ask. We use global SCSS variables to keep track of the registered themes. Those SCSS variables are lexically scoped to modules, so you will only be able to use the "themed" function in the same scope.
Meaning, if you want to use themed functions in multiple files, make sure that they all `@use` a file that defines the themes. See the `vite-vanilla-extended` or `vite-react` examples for this, they define a `global.scss` file.
This is, of course, only needed on compile time. The CSS output will always be the same.

## Developing

We use `pnpm` and `pnpm workspaces` to maintain themed. You must have PNPM installed. Clone the repo, install all packages with `pnpm install` and build them, for example using `pnpm run build:watch` in the root folder.
You can also run the examples with, for example `pnpm run example:vanilla`. Any code change you now make should instantly be reflected (after a quick rebuild). Initially, you might see errors in the console, because the react and the vanilla
package try to build in parallel.
