import * as sass from 'sass-embedded';
import { describe, expect, it } from 'vitest';

const themed = {
  index: await import('../src/scss/index.scss?raw'),
  utils: await import('../src/scss//utils.scss?raw'),
  plugins: await import('../src/scss//plugins.scss?raw'),
  'plugins/colorspace': await import('../src/scss//plugins/colorspace.scss?raw'),
  'plugins/fill': await import('../src/scss//plugins/fill.scss?raw'),
  'plugins/p3': await import('../src/scss//plugins/p3.scss?raw'),
  'plugins/variants': await import('../src/scss//plugins/variants.scss?raw'),
};

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

const compile = async (input: string) => {
  const res = await sass.compileStringAsync(input, {
    importers: [
      createThemedImporter(str => {
        console.log(str);
      }),
    ],
  });

  return res;
};

describe('compile', () => {
  describe('fails on invalid usage', () => {
    const baseInput = `@use '@janis.me/themed';@use 'sass:map';`;

    it('fails on missing apply argument', async () => {
      const input = `${baseInput}@include themed.apply();`;

      await expect(() => compile(input)).rejects.toThrowError(`Error: Missing argument $themes`);
    });

    it('fails on invalid apply argument', async () => {
      const input = `${baseInput}@include themed.apply('test');`;

      await expect(() => compile(input)).rejects.toThrowError(`Error: $map: "test" is not a map.`);
    });

    it('fails on invalid apply argument', async () => {
      const input = `${baseInput}@include themed.apply(());`;

      await expect(() => compile(input)).rejects.toThrowError(`The map of themes is empty.`);
    });
  });

  describe('fails on invalid themes', () => {
    const baseInput = `@use '@janis.me/themed';@use 'sass:map';`;

    it('fails on missing theme key', async () => {
      const themes = `
        $themes: (
          light: (
            color: #000,
            background: #fff
          ),
          dark: (
            color: #fff,
          )
        );
      `;
      const input = `${baseInput}\n${themes}\n@include themed.apply($themes);`;

      await expect(() => compile(input)).rejects.toThrowError(`Theme 'dark' is missing the key 'background'`);
    });

    it('fails on extra keys', async () => {
      const themes = `
        $themes: (
          light: (),
          dark: (
            color: #fff,
          )
        );
      `;
      const input = `${baseInput}\n${themes}\n@include themed.apply($themes);`;

      await expect(() => compile(input)).rejects.toThrowError(
        `Theme 'dark' has an extra key 'color' not present in other themes`,
      );
    });
  });

  describe('passes on valid themes', () => {
    const baseInput = `@use '@janis.me/themed';@use 'sass:map';`;

    it('passes on valid themes', async () => {
      const themes = `
        $themes: (
          light: (
            color: #000,
            background: #fff
          ),
          dark: (
            color: #fff,
            background: #000
          )
        );
      `;
      const input = `${baseInput}\n${themes}\n@include themed.apply($themes);`;

      const res = await compile(input);

      expect(res).toHaveProperty('css');

      expect(res.css).toContain('html[data-theme=light] {');
      expect(res.css).toContain('-color: #000;');
      expect(res.css).toContain('-background: #fff;');

      expect(res.css).toContain('html[data-theme=dark] {');
      expect(res.css).toContain('-color: #fff;');
      expect(res.css).toContain('-background: #000;');
    });

    it('passes on different theme names', async () => {
      const themes = `
        $themes: (
          first: (
            color: #000,
            background: #fff
          ),
          second: (
            color: #fff,
            background: #000
          )
        );
      `;
      const input = `${baseInput}\n${themes}\n@include themed.apply($themes);`;

      const res = await compile(input);

      expect(res).toHaveProperty('css');

      expect(res.css).toContain('html[data-theme=first] {');
      expect(res.css).toContain('-color: #000;');
      expect(res.css).toContain('-background: #fff;');

      expect(res.css).toContain('html[data-theme=second] {');
      expect(res.css).toContain('-color: #fff;');
      expect(res.css).toContain('-background: #000;');
    });

    it('uses the given theme prefix', async () => {
      const themes = `
        $themes: (
          light: (
            color: #000,
            background: #fff
          ),
          dark: (
            color: #fff,
            background: #000
          )
        );
      `;
      const input = `${baseInput}\n${themes}\n@include themed.apply($themes, 'test');`;

      const res = await compile(input);

      expect(res).toHaveProperty('css');

      expect(res.css).toContain('html[data-theme=light] {');
      expect(res.css).toContain('--test-color: #000;');
      expect(res.css).toContain('--test-background: #fff;');

      expect(res.css).toContain('html[data-theme=dark] {');
      expect(res.css).toContain('--test-color: #fff;');
      expect(res.css).toContain('--test-background: #000;');
    });
  });
});
