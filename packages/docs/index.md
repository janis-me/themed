---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Themed
titleTemplate: SCSS-native themes made simple

hero:
  name: 'Themed'
  text: SCSS-native themes made simple
  tagline: Add dynamic, SCSS-based themes to any website/app without any struggle.
  image:
    src: https://raw.githubusercontent.com/komplettio/themed/refs/heads/main/assets/themed-logo.png
    alt: Themed Logo
  actions:
    - theme: brand
      text: Get started!
      link: /guide/getting-started
    - theme: alt
      text: Documentation
      link: /guide/global-setup
    - theme: alt
      text: Why themed?
      link: /guide/why-themed

features:
  - title: Type-Safe
    icon: 🔒
    details: Adds validation to your SCSS variables, preventing errors, half-defined themes and so on!
  - title: Tiny
    icon: 📦
    details: '0 dependencies and no extra CSS is needed. Only your theme is included in the build!'
  - title: Feature-rich
    icon: 🚀
    details: Supports every utility you might need for integrating themes into your app nicely.
  - title: React support
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -10 30 20">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2" fill="#61dafb"/>
      <g stroke="#61dafb" stroke-width="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
      </svg>
    details: 'With janis.me/react-themed, we offer first-class react support.'
---

<script setup>
  import ReactLogo from '.vitepress/theme/components/ReactLogo.vue'
</script>

<br />

---

<br />

# SCSS theming like it should be done!

- 🔒 **Type-checking** themes for validity, checking all values exist etc.
- 🌐 Produces nice **SCSS AND CSS** variables, so you can use all SCSS features with theming.
- 🖌 **Multi-theme**: You can either use classic dark/light themes, or define as many as you want!
- 🚀 **Extra features** like JS/TS methods for interactivity built in.
- 🎭 **Customizable**: Adjust nearly every aspect of how you use themes.
- 🌈 Prints **human-readable** errors when doing something wrong.
- <ReactLogo /> First class **React** support with `janis.me/react-themed`.

And no, CSS variables are not a solution. Read though our [Guide](/guide/why-themed) so we can convince you.

# As easy as it gets:

### 1. Install

::: code-group

```sh [npm]
$ npm add -D @janis.me/themed
```

```sh [pnpm]
$ pnpm add -D @janis.me/themed
```

```sh [yarn]
$ yarn add -D @janis.me/themed
```

```sh [bun]
$ bun add -D @janis.me/themed
```

:::

### 2. Import

::: code-group

```scss [style.scss] {1}
@use '@janis.me/themed' as *;
```

:::

### 3. Define themes

::: code-group

```scss [style.scss] {3-20}
@use '@janis.me/themed' as *;

$themes: (
  'light': (
    'text': #212529,
    'background': #fafafa,
    'grey-1': #343a40,
    'grey-2': #495057,
    'grey-3': #6c757d,
  ),
  'dark': (
    'text': #fafafa,
    'background': #212529,
    'grey-1': #f8f9fa,
    'grey-2': #e9ecef,
    'grey-3': #dee2e6,
  ),
);

@include apply($themes);
```

:::

### 4. Themed! :tada: :rocket:

::: code-group

```scss [style.scss] {23-27}
html,
body {
  color: themed('text');
  background-color: themed('background');
}
```

:::
