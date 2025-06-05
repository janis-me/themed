import { describe, expect, it } from 'vitest';

import { compile } from './utils';

describe('compile', () => {
  describe('fails on invalid usage', () => {
    const baseInput = `@use '@janis.me/themed';@use 'sass:map';`;

    it('fails on missing configure argument', async () => {
      const input = `${baseInput}@include themed.configure();`;

      await expect(() => compile(input)).rejects.toThrowError(`Error: Missing argument $themes`);
    });

    it('fails on invalid configure argument', async () => {
      const input = `${baseInput}@include themed.configure('test');`;

      await expect(() => compile(input)).rejects.toThrowError(`Error: $map: "test" is not a map.`);
    });

    it('fails on invalid configure argument', async () => {
      const input = `${baseInput}@include themed.configure(());`;

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
      const input = `${baseInput}\n${themes}\n@include themed.configure($themes);`;

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
      const input = `${baseInput}\n${themes}\n@include themed.configure($themes);`;

      await expect(() => compile(input)).rejects.toThrowError(`Theme 'dark' has an extra key 'color' not present in other themes`);
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
      const input = `${baseInput}\n${themes}\n@include themed.configure($themes);\n@include themed.apply()`;

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
      const input = `${baseInput}\n${themes}\n@include themed.configure($themes);\n@include themed.apply()`;

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
      const input = `${baseInput}\n${themes}\n@include themed.configure($themes, ('prefix': 'test'));\n@include themed.apply()`;

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
