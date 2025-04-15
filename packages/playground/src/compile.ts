import { Terminal as XTerm } from '@xterm/xterm';
import * as sass from 'sass';

import { COLOR } from './constants';

const themed = {
  '': await import('@janis.me/themed?raw'),
  '/modifiers': await import('@janis.me/themed/modifiers?raw'),
  '/modifiers/alpha': await import('@janis.me/themed/modifiers/alpha?raw'),
  '/modifiers/colorspace': await import('@janis.me/themed/modifiers/colorspace?raw'),
  '/modifiers/fill': await import('@janis.me/themed/modifiers/fill?raw'),
  '/modifiers/lightness': await import('@janis.me/themed/modifiers/lightness?raw'),
  '/modifiers/saturation': await import('@janis.me/themed/modifiers/saturation?raw'),
};

export function compile(value: string, terminal: XTerm): string {
  terminal.writeln('Compiling...');
  const startTime = performance.now();

  try {
    const res = sass.compileString(value, {
      alertAscii: true,
      alertColor: true,
      logger: {
        debug: message => {
          terminal.writeln(message);
        },
        warn: message => {
          terminal.writeln(`${COLOR.yellow}Warning: ${message}`);
        },
      },
      importers: [
        {
          canonicalize(url) {
            const sanitized = url.replace('pkg:', '');
            if (!sanitized.startsWith('@janis.me/themed'))
              throw new Error(`@use and @import statements only work with '@janis.me/themed'`);

            return new URL(`pkg:${sanitized}`);
          },
          load(canonicalUrl) {
            const sanitized = canonicalUrl.href.replace('pkg:', '').replace('.scss', '');
            const path = sanitized.split('@janis.me/themed')[1] as keyof typeof themed;
            const contents = themed[path].default;

            if (!contents) throw new Error(`Could not resolve module ${canonicalUrl}`);

            return {
              contents,
              syntax: 'scss',
            };
          },
        },
      ],
    });
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(2);

    terminal.clear();
    terminal.writeln(`Compiled successfully in ${time}ms`);
    return res.css;
  } catch (error) {
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(2);

    terminal.clear();
    terminal.writeln(`${COLOR.red}Error (after ${time}ms):`);
    terminal.writeln((error as Error).message);
  }

  return '';
}
