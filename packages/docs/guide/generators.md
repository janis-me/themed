# Generators

Generators are a way to create themes without having to pre-define all values (colors, spacings...). Instead, `themed` can generate them for you to your liking!
We use some clever SCSS approaches to generate, for example, colors for you. We change input hue, saturation, chroma, lightness etc. to give you colors that match your color scheme.

You can try out the interactive generator and copy the generated code at [https://themed.janis.me/generator](https://themed.janis.me/generator).

## Usage

Generators are used just like plugins! The naming difference is just for a better overview.
Let's take the `colors` generator as an example. The only thing you have to git it is a primary color.

```scss [global.scss] {5,10}
@use '@janis.me/themed';
@use '@janis.me/themed/generators';

// No themes pre-defined!
$themes: ();

// In production use, you probably want to
// 1) define info/success/warning/error colors yourself
// 2) use the 'oklch' colorspace combined with the 'p3' plugin
@include themed.configure($themes, generators.colors($primary: #3584e4));
@include themed.apply();
```
