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

---

> [!WARNING]  
> This is in early development. Expect things to break and change before it hits 1.0.0

`@komplett/themed` is a customizable SCSS utility to add theming to your website as easily and safely as possible. It also offers utility methods for javascript/typescript and react via `@komplett/react-themed`.

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
Plugin: vite:css
File: /code/my-app/src/styles/main.scss:22:21
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

Alternatively, install `@komplett/themed` and follow the example above, or look at one of the examples in the `examples` folder.

### React

For react, just place a <ThemeProvider> at the app level. You can then use the `useTheme` hook to retrieve/update it.

---
## Questions

**Q: Why not just use CSS variables?**

1. Using SCSS builtins like `color.adjust` and `color.change` will not work with CSS variables. If you need transparency, or want to generate shades of a color with SCSS, it's tough

2. Ugly theme definitions. Defining all those variables in plain CSS is weird. You would probably use SCSS to define maps of themes anyways, and then convert them to SCSS variables.

**Q: Can I use this with tailwind?**

A: Probably not? Tailwind probably has it's own thing going on. This is as raw as SCSS gets.

**Q: What dependencies does this have?**

A: None, except for SCSS. We do suggest to use tools like Vite though, just to make your life a bit easier.