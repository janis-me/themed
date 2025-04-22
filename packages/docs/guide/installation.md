# Installation

Two main ways to install `@janis.me/themed`: Via a package manager, or by copying the source.
In both cases, you must have `sass` installed as a dependency. We tested this packages mainly with the [sass](https://www.npmjs.com/package/sass) package, but [sass-embedded](https://www.npmjs.com/package/sass-embedded) should also work well.

## With a package manager

For the first option, just add it as a dev-dependency. If you use react, install `@janis.me/react-themed` instead. See [Use with React](/guide/usage-with-react) for more information.

::: code-group

```sh [npm]
$ npm install -D @janis.me/themed
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

## Via the source

If you want this to be as minimal and customizable as possible, you can also just **copy it's source**. You can find that [on github](https://github.com/janis-me/themed/blob/main/packages/themed/).

Now, you can add or validation as you please, customize how variables are defined, how the functions are called etc. But most of these things, you can also do when installed via npm, so:

::: warning
We recommend to install it with a package manager, as this is the only way you will get bugfixes, new features etc. It's fully without dependencies and very tiny in size.
:::

## Advanced setup

Depending on your toolchain, you might want to do some more steps to make this work as nicely as possible. For example with `vite`, you can make all `themed` functions available in every file. See [Global setup](/guide/global-setup) for more information.
