---
outline: deep
---

<script setup>
  import ReactLogo from '../.vitepress/theme/components/ReactLogo.vue'
</script>

# Why `themed`?

Adding themes to a website is easy. **Doing it right is not**. The list of requirements is longer than you'd expect, and if you consider to just define CSS variables globally and call it a day, you will probably get surprised.

**You will encounter some of these things at some point:**

- A tiny spelling error in variable names leads to hours of debugging
- The design requires transparency in a color. CSS Variables don't support this.
- Adjusting CSS colors is not easy. You need to think about colorspaces, scale function, compatibility...
- Existing tools only support light/dark themes, but you need more options.
- Users expect their OS color-scheme preference to be synced with the website
- Suddenly, you need to override a variable with javascript..? :boom:

And there is more. So, better rely on a tiny all-in-one solution. 📦

## What `@janis.me/themed` offers:

- 🔒 **Type-checking** themes for validity, checking all values exist etc.
- 🌐 Produces nice **SCSS AND CSS** variables, so you can use all SCSS features with theming.
- 🖌 **Multi-theme**: You can either use classic dark/light themes, or define as many as you want!
- 🚀 **Extra features** like JS/TS methods for interactivity built in.
- 🎭 **Customizable**: Adjust nearly every aspect of how you use themes.
- 🌈 Prints **human-readable** errors when doing something wrong.
- <ReactLogo /> First class **React** support with `@komplett/react-themed`.

(All free and open-source, of course.)
