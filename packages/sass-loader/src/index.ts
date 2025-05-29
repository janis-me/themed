import * as sass from 'sass';

const themed = {
  index: await import('@janis.me/themed?raw'),
  utils: await import('@janis.me/themed/utils?raw'),
  plugins: await import('@janis.me/themed/plugins?raw'),
  generators: await import('@janis.me/themed/generators?raw'),
  'generators/colors': await import('@janis.me/themed/generators/colors?raw'),
  'generators/size': await import('@janis.me/themed/generators/size?raw'),
  'plugins/alpha': await import('@janis.me/themed/plugins/alpha?raw'),
  'plugins/colorspace': await import('@janis.me/themed/plugins/colorspace?raw'),
  'plugins/fill': await import('@janis.me/themed/plugins/fill?raw'),
  'plugins/p3': await import('@janis.me/themed/plugins/p3?raw'),
  'plugins/variants': await import('@janis.me/themed/plugins/variants?raw'),
};

export function createThemedImporter(_: (log: string) => void): sass.Importer {
  return {
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
  };
}
