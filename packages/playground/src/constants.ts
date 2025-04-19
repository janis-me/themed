const EXAMPLE_SIMPLE = `@use '@janis.me/themed' as *;

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

@include configure($themes);
@include apply();

html,
body {
  color: themed('text');
  background-color: themed('background');
}
`;

const EXAMPLE_CUSTOMIZATION = `@use '@janis.me/themed' as *;
@use '@janis.me/themed/utils';

@use 'sass:meta';
@use 'sass:color';

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

$theme-prefix: 'my-var';
@include configure($themes, $theme-prefix);

@include apply() using ($prefix, $key, $value, $theme) {
  @if $theme == 'dark' and meta.type-of($value) == 'color' {
    @include utils.make-css-variable($prefix, '#{$key}--light', color.change($value, $lightness: 30%));
  }
}
`;

const EXAMPLE_PLUGINS = `@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

$themes: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
    'teal-9': #16b6b3,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
    'teal-9': #16b6b3,
  )
);

$high-contrast: (
  light: (
    'teal-9': oklch(0.7 0.1617 192.68),
  ),
  dark: (
    'teal-9': oklch(0.7 0.1617 192.68),
  ),
);


$theme-prefix: 'my-var';

@include themed.configure($themes, $theme-prefix, $plugins: [
  // first, ensure all themes receive the same values
  plugins.fill(),
  // then, create some variants of the colors. Some alpha variations
  plugins.variants($channels: (alpha), $operation: change, $steps: (0.1, 0.9)),
  // and some lightness variations
  plugins.variants($channels: (lightness), $operation: change, $steps: (20%, 40%, 60%, 80%, 90%)),
  // Some extra high contrast colors.
  plugins.p3($high-contrast),
  // the colorspace plugin plays along nicely with the 'variants' plugin
  // to ensure all colors are in the same space.
  // In a real world example, you would probably want to use the 'oklch' colorspace
  // but we chose 'hsl' to visualize them in the output editor.
  plugins.colorspace(hsl),
]);
@include themed.apply();
`;

const EXAMPLE_PLUGIN_FILL = `@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

$themes: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
    // These values is only defined in the 'primary' theme
    'teal-9': #16b6b3,
    'default-padding': 1rem,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
  )
);

// Extra tip: This is how you can define a custom prefix for your variables
$theme-prefix: 'my-var';

// The fill plugin will copy over all values from the 'primary' theme to the 'dark' theme
// (this is valid SCSS, don't let the error fool you.)
@include themed.configure($themes, $theme-prefix, $plugins: [ plugins.fill() ]);
@include themed.apply();
`;

const EXAMPLE_PLUGIN_P3 = `@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

$themes: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
    'teal-9':#29c5c3,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
    'teal-9': #16b6b3,
  )
);

// Colors that should be overwritten for high-gammut displays
// Browser support is limited, so it's defined behind a media/supports query
$high-contrast: (
  light: (
    'teal-9': oklch(0.75 0.1208 193.52),
  ),
  dark: (
    'teal-9': oklch(0.7 0.1617 192.68),
  ),
);

// (this is valid SCSS, don't let the error fool you.)
@include themed.configure($themes, $plugins: [plugins.p3($high-contrast)]);
@include themed.apply();
`;

const EXAMPLE_PLUGIN_VARIANTS = `@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

$themes: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
    'teal-9':#29c5c3,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
    'teal-9': #16b6b3,
  )
);

$variants: plugins.variants($channels: (alpha), $operation: change, $steps: (0.1, 0.9));

// (this is valid SCSS, don't let the error fool you.)
@include themed.configure($themes, $plugins: [$variants]);
@include themed.apply();
`;

const EXAMPLE_PLUGIN_COLORSPACE = `@use '@janis.me/themed';
@use '@janis.me/themed/plugins';

@use 'sass:meta';

$themes: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
    'teal-9':#29c5c3,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
    'teal-9': #16b6b3,
  )
);

// (this is valid SCSS, don't let the error fool you.)
@include themed.configure($themes, $plugins: [plugins.colorspace(oklch)]);
@include themed.apply();
`;

export const EXAMPLES = {
  simple: EXAMPLE_SIMPLE,
  customization: EXAMPLE_CUSTOMIZATION,
  'multiple-plugins': EXAMPLE_PLUGINS,
  'plugin-fill': EXAMPLE_PLUGIN_FILL,
  'plugin-p3': EXAMPLE_PLUGIN_P3,
  'plugin-variants': EXAMPLE_PLUGIN_VARIANTS,
  'plugin-colorspace': EXAMPLE_PLUGIN_COLORSPACE,
};

export const COLOR = {
  default: '\x1b[0;0m',
  yellow: '\x1b[0;33m',
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
};
