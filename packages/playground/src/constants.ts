export const EXAMPLE_SIMPLE = `@use '@janis.me/themed' as *;

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

const EXAMPLE_MODIFIERS = `@use '@janis.me/themed';
@use '@janis.me/themed/modifiers';

@use 'sass:meta';

$raw-theme-map: (
  light: (
    'text': #1e1f24,
    'background': #f1f1f1,
    'grey-1': #fcfcfd,
    'grey-2': #f9f9fb,
    'grey-3': #eff0f3,
  ),
  dark: (
    'text': #eeeef0,
    'background': #1e1e20,
    'grey-1': #202123,
    'grey-2': #27282a,
    'grey-3': #303033,
  )
);

// modify-themes is used to apply any number of modifiers onto the themes.
$theme-map: themed.modify-themes(
  $raw-theme-map,
  modifiers.fill(),
  modifiers.colorspace(),
  modifiers.alpha(),
  modifiers.lightness()
);

$theme-prefix: 'my-var';

@include themed.apply($theme-map, $theme-prefix);
`;

export const EXAMPLES = {
  simple: EXAMPLE_SIMPLE,
  modifiers: EXAMPLE_MODIFIERS,
};
