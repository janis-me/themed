import { Terminal as XTerm } from '@xterm/xterm';
import * as sass from 'sass';

import { COLOR } from './constants';

const themed = {
  '': await import('@janis.me/themed?raw'),
  '/plugins': await import('@janis.me/themed/plugins?raw'),
  '/plugins/alpha': await import('@janis.me/themed/plugins/alpha?raw'),
  '/plugins/colorspace': await import('@janis.me/themed/plugins/colorspace?raw'),
  '/plugins/fill': await import('@janis.me/themed/plugins/fill?raw'),
  '/plugins/lightness': await import('@janis.me/themed/plugins/lightness?raw'),
  '/plugins/saturation': await import('@janis.me/themed/plugins/saturation?raw'),
  '/plugins/p3': await import('@janis.me/themed/plugins/p3?raw'),
};

export function compile(value: string, terminal: XTerm): string {
  terminal.clear();
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

    terminal.writeln(`Compiled successfully in ${time}ms`);
    return res.css;
  } catch (error) {
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(2);

    terminal.writeln(`${COLOR.red}Error (after ${time}ms):`);
    terminal.writeln((error as Error).message);
  }

  return '';
}
