import { useMemo, useState } from 'react';
import * as sass from 'sass';

import { toggleTheme, useTheme } from '@janis.me/react-themed/js';
import { createThemedImporter } from '@janis.me/sass-loader';

import { useDebounce } from '../../hooks/useDebounce';
import ColorInput from '../ColorInput/ColorInput';

import './Hero.scss';

const getSassTemplate = (primary: string, gray: string) => {
  if (gray === '') gray = 'null';

  return `@use '@janis.me/themed' as themed;
@use '@janis.me/themed/generators';
@use '@janis.me/themed/plugins';

$themes: generators.generate(
  $primary: ${primary},
  $gray: ${gray},
  $target-space: oklch,
);

@include themed.configure(
  $themes,
  $plugins: plugins.alpha(
      $operation: 'change',
      $steps: (
        0.2,
        0.4,
        0.9,
      )
    )
);

@include themed.apply();
`;
};

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const { theme, setTheme, toggleTheme } = useTheme();

  const [primary, setPrimary] = useState('#16b6b3');
  const [gray, setGrey] = useState('');

  const debouncedPrimary = useDebounce(primary, 10);
  const debouncedGray = useDebounce(gray, 10);

  const stylesheet = useMemo(() => {
    const template = getSassTemplate(debouncedPrimary, debouncedGray);

    const res = sass.compileString(template, {
      importers: [createThemedImporter(console.log)],
    });

    return res.css;
  }, [debouncedPrimary, debouncedGray]);

  return (
    <div className="hero">
      <pre>@janis.me/themed</pre>
      <h1>Generator</h1>
      <div className="hero__colors">
        <ColorInput label="primary" color={primary} setColor={setPrimary} />
        <ColorInput label="gray" color={gray} setColor={setGrey} />
      </div>

      <button
        className="hero__theme-toggle"
        onClick={() => {
          setTheme(toggleTheme());
        }}
      >
        {toggleTheme()} theme
      </button>

      <p>
        All colors you see are auto-generated based on the colors above at runtime. When you change a color, the sass
        compiler runs and uses @janis.me/themed to generate colors.
      </p>

      <style
        id="injected-styles"
        dangerouslySetInnerHTML={{
          __html: stylesheet,
        }}
      />
    </div>
  );
}
