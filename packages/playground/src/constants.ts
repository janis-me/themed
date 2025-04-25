import {
  EXAMPLE_CUSTOMIZATION,
  EXAMPLE_GENERATORS,
  EXAMPLE_PLUGIN_ALPHA,
  EXAMPLE_PLUGIN_COLORSPACE,
  EXAMPLE_PLUGIN_FILL,
  EXAMPLE_PLUGIN_P3,
  EXAMPLE_PLUGIN_VARIANTS,
  EXAMPLE_PLUGINS,
  EXAMPLE_SIMPLE,
} from './examples';

export const EXAMPLES = {
  simple: EXAMPLE_SIMPLE,
  customization: EXAMPLE_CUSTOMIZATION,
  generators: EXAMPLE_GENERATORS,
  'multiple-plugins': EXAMPLE_PLUGINS,
  'plugin-alpha': EXAMPLE_PLUGIN_ALPHA,
  'plugin-colorspace': EXAMPLE_PLUGIN_COLORSPACE,
  'plugin-fill': EXAMPLE_PLUGIN_FILL,
  'plugin-p3': EXAMPLE_PLUGIN_P3,
  'plugin-variants': EXAMPLE_PLUGIN_VARIANTS,
};

export const COLOR = {
  default: '\x1b[0;0m',
  yellow: '\x1b[0;33m',
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
};
