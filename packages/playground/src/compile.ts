import { Terminal as XTerm } from '@xterm/xterm';
import * as sass from 'sass';

import { COLOR } from './constants';

const themed = {
  index: await import('@janis.me/themed?raw'),
  utils: await import('@janis.me/themed/utils?raw'),
  plugins: await import('@janis.me/themed/plugins?raw'),
  'plugins/alpha': await import('@janis.me/themed/plugins/alpha?raw'),
  'plugins/colorspace': await import('@janis.me/themed/plugins/colorspace?raw'),
  'plugins/fill': await import('@janis.me/themed/plugins/fill?raw'),
  'plugins/lightness': await import('@janis.me/themed/plugins/lightness?raw'),
  'plugins/saturation': await import('@janis.me/themed/plugins/saturation?raw'),
  'plugins/p3': await import('@janis.me/themed/plugins/p3?raw'),
};

type Logger = (log: string) => void;

const createUnpkgImporter = (successLogger: Logger, warningLogger: Logger): sass.Importer => ({
  /**
   * Turn an import string into an absolute unpkg URL (or file/http URL).
   * Returns null to let other importers/loadPaths try.
   */
  async canonicalize(specifier: string, { containingUrl }: sass.CanonicalizeContext): Promise<URL | null> {
    // 1. Relative or absolute-file imports ⇒ delegate to default resolver
    if (specifier.startsWith('.') || specifier.startsWith('/')) {
      if (!containingUrl) return null;
      return new URL(specifier, containingUrl);
    }
    // 2. Already an HTTP(S) URL?
    try {
      const url = new URL(specifier);
      if (url.protocol === 'http:' || url.protocol === 'https:') return url;
    } catch {
      /* not a URL */
    }

    // 3. Bare npm import: split out @scope/name or name
    const parts = specifier.split('/');
    let pkgName: string, pkgPath: string;
    if (parts[0]?.startsWith('@')) {
      pkgName = parts.slice(0, 2).join('/');
      pkgPath = parts.slice(2).join('/');
    } else {
      pkgName = parts[0] as unknown as string;
      pkgPath = parts.slice(1).join('/');
    }

    // 4a. If no subpath, fetch package.json to find its sass/style entry
    if (!pkgPath) {
      const pkgJsonUrl = `https://unpkg.com/${pkgName}/package.json`;
      const pkgRes = await fetch(pkgJsonUrl);
      if (!pkgRes.ok) throw new Error(`Cannot fetch ${pkgJsonUrl}`);
      const pkgJson = (await pkgRes.json()) as {
        exports?: Record<string, string>;
        sass?: string;
        scss?: string;
        style?: string;
        main?: string;
      };
      // prefer sass → style → main → index.scss
      let entry =
        pkgJson.sass ??
        pkgJson.scss ??
        pkgJson.style ??
        pkgJson.main ??
        pkgJson.exports?.[''] ??
        pkgJson.exports?.['./'] ??
        pkgJson.exports?.['.'] ??
        'index.scss';
      if (!entry.endsWith('.scss') && !entry.endsWith('.sass')) entry += '.scss';
      return new URL(`https://unpkg.com/${pkgName}/${entry}`);
    }

    // 4b. If subpath given, point at that .scss (add extension if missing)
    let file = pkgPath;
    if (!file.endsWith('.scss') && !file.endsWith('.sass')) file += '.scss';
    return new URL(file, `https://unpkg.com/${pkgName}`);
  },

  /**
   * Given a canonical unpkg URL, try fetching it (and Sass‐style fallbacks)
   * until one returns 200.
   */
  async load(canonicalUrl: URL): Promise<sass.ImporterResult> {
    warningLogger(
      `Attempting to load ${canonicalUrl.href}. Loading node packages is an experimental feature. It may not work!`,
    );

    const basePath = canonicalUrl.pathname; // e.g. "/pkg@ver/foo"
    const origin = canonicalUrl.origin; // "https://unpkg.com"
    const dir = basePath.replace(/\/[^/]*$/, ''); // strip filename
    const name = basePath.replace(/^.*\//, ''); // filename or dir name

    // build same candidates Sass would on disk
    const candidates = /\.(scss|sass)$/.exec(name)
      ? [basePath]
      : [
          `${basePath}.scss`,
          `${basePath}.sass`,
          `${dir}/_${name}.scss`,
          `${dir}/_${name}.sass`,
          `${basePath}/index.scss`,
          `${basePath}/index.sass`,
          `${basePath}/_index.scss`,
          `${basePath}/_index.sass`,
        ];

    for (const p of candidates) {
      const url = `${origin}${p}`;
      const res = await fetch(url);
      if (res.ok) {
        const contents = await res.text();
        successLogger(`Successfully loaded ${url}`);
        return {
          contents,
          syntax: p.endsWith('.sass') ? 'indented' : 'scss',
        };
      }
    }

    throw new Error(`unpkg importer: could not load ${canonicalUrl.href}`);
  },
});

const createThemedImporter = (_: (log: string) => void): sass.Importer => ({
  canonicalize(specifier: string, _: sass.CanonicalizeContext) {
    let sanitizedUrl = specifier.replace('pkg:', '');

    if (sanitizedUrl.startsWith('@janis.me/themed')) {
      sanitizedUrl = sanitizedUrl.replace('.scss', '');
      if (sanitizedUrl === '@janis.me/themed') {
        return new URL(`pkg:${sanitizedUrl}/index.scss`);
      } else {
        return new URL(`pkg:${sanitizedUrl}.scss`);
      }
    }

    return null;
  },
  load(canonicalUrl: URL): sass.ImporterResult {
    if (canonicalUrl.href.startsWith('pkg:@janis.me/themed')) {
      let name = canonicalUrl.href.replace('pkg:@janis.me/themed/', '');
      name = name.replace('.scss', '');

      if (name in themed) {
        return {
          contents: themed[name as keyof typeof themed].default,
          syntax: 'scss',
        };
      }
    }

    throw new Error(`themed importer: could not load ${canonicalUrl.href}`);
  },
});

export async function compile(value: string, terminal: XTerm): Promise<string> {
  terminal.clear();
  terminal.writeln('Compiling...');
  const startTime = performance.now();

  const successLogger = (log: string) => {
    terminal.writeln(`${COLOR.green}${log}`);
  };

  const warningLogger = (log: string) => {
    terminal.writeln(`${COLOR.yellow}Warning: ${log}`);
  };

  const debugLogger = (log: string) => {
    terminal.writeln(log);
  };

  try {
    const res = await sass.compileStringAsync(value, {
      alertAscii: true,
      alertColor: true,
      logger: {
        debug: debugLogger,
        warn: warningLogger,
      },
      importers: [createThemedImporter(warningLogger), createUnpkgImporter(successLogger, warningLogger)],
    });
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(2);

    terminal.writeln(`${COLOR.default}Compiled successfully in ${time}ms`);
    return res.css;
  } catch (error) {
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(2);

    terminal.writeln(`${COLOR.red}Error (after ${time}ms):`);
    terminal.writeln((error as Error).message);
  }

  return '';
}
