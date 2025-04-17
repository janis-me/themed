import { Terminal as XTerm } from '@xterm/xterm';
import * as sass from 'sass';

import { COLOR } from './constants';

const themed = {
  '/index': await import('@janis.me/themed?raw'),
  '/utils': await import('@janis.me/themed/utils?raw'),
  '/plugins': await import('@janis.me/themed/plugins?raw'),
  '/plugins/alpha': await import('@janis.me/themed/plugins/alpha?raw'),
  '/plugins/colorspace': await import('@janis.me/themed/plugins/colorspace?raw'),
  '/plugins/fill': await import('@janis.me/themed/plugins/fill?raw'),
  '/plugins/lightness': await import('@janis.me/themed/plugins/lightness?raw'),
  '/plugins/saturation': await import('@janis.me/themed/plugins/saturation?raw'),
  '/plugins/p3': await import('@janis.me/themed/plugins/p3?raw'),
};

function canonicalize(url: string, _: sass.CanonicalizeContext): URL {
  const sanitizedUrl = url.replace('pkg:', '');

  if (sanitizedUrl.startsWith('@janis.me/themed') && import.meta.env.MODE === 'development') {
    if (sanitizedUrl === '@janis.me/themed') {
      return new URL(`pkg:${sanitizedUrl}/index.scss`);
    } else {
      return new URL(`pkg:${sanitizedUrl}.scss`);
    }
  }

  return new URL(`https://unpkg.com/${sanitizedUrl}`);
}

async function load(url: URL): Promise<sass.ImporterResult> {
  if (url.href.startsWith('pkg:')) {
    console.log(`Loading ${url} from local @janis.me/themed installation`);
    let fileUrl = url.href.replace('pkg:@janis.me/themed', '');
    fileUrl = fileUrl.replace('.scss', '');

    return {
      contents: themed[fileUrl as keyof typeof themed].default,
      syntax: 'scss',
    };
  }

  if (url.href.startsWith('./utils')) {
    return {
      contents: themed['/utils'].default,
      syntax: 'scss',
    };
  }

  const unpkgRes = await fetch(url.href);
  if (!unpkgRes.ok) {
    throw new Error(`Failed to fetch ${url.href}: ${unpkgRes.statusText}`);
  }
  const content = await unpkgRes.text();

  return {
    contents: content,
    syntax: 'scss',
  };
}

export async function compile(value: string, terminal: XTerm): Promise<string> {
  terminal.clear();
  terminal.writeln('Compiling...');
  const startTime = performance.now();

  try {
    const res = await sass.compileStringAsync(value, {
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
          canonicalize,
          load,
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
