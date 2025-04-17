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

@include apply($themes);

html,
body {
  color: themed('text');
  background-color: themed('background');
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

@include themed.apply($themes, $theme-prefix, $plugins: plugins.fill() plugins.p3($high-contrast));
`;

const EXAMPLE_CUSTOMIZATION = `@use '@janis.me/themed' as *;

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
@include apply($themes, $theme-prefix) using ($prefix, $key, $value, $theme) {
  @if $theme == 'dark' and meta.type-of($value) == 'color' {
    @include make-css-variable($prefix, '#{$key}--light', color.change($value, $lightness: 30%));
  }
}
`;

export const EXAMPLES = {
  simple: EXAMPLE_SIMPLE,
  plugins: EXAMPLE_PLUGINS,
  customization: EXAMPLE_CUSTOMIZATION,
};

export const COLOR = {
  yellow: '\x1b[0;33m',
  red: '\x1b[0;31m',
};
