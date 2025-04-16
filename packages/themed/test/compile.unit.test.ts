import * as sass from 'sass-embedded';
import { describe, expect, it } from 'vitest';

const themed = {
  '': await import('../src/scss/index.scss?raw'),
  '/modifiers': await import('../src/scss/modifiers.scss?raw'),
  '/modifiers/alpha': await import('../src/scss/modifiers/alpha.scss?raw'),
  '/modifiers/colorspace': await import('../src/scss/modifiers/colorspace.scss?raw'),
  '/modifiers/fill': await import('../src/scss/modifiers/fill.scss?raw'),
  '/modifiers/lightness': await import('../src/scss/modifiers/lightness.scss?raw'),
  '/modifiers/saturation': await import('../src/scss/modifiers/saturation.scss?raw'),
};

const compile = async (input: string) => {
  const res = await sass.compileStringAsync(input, {
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
