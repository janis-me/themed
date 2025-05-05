import clsx from 'clsx';
import { useMemo, useState } from 'react';
import * as sass from 'sass';

import { useTheme } from '@janis.me/react-themed/js';
import { createThemedImporter } from '@janis.me/sass-loader';
import { Button } from '@janis.me/ui';

import { useDebounce } from '../../hooks/useDebounce';
import ColorInput from '../ColorInput/ColorInput';
import ColorspaceSelect from '../ColorspaceSelect/ColorspaceSelect';

import './Hero.scss';

const COLOR_DEBOUNCE_TIME = 100;

const getSassTemplate = (primary: string, gray: string, info: string, success: string, warning: string, error: string, colorspace: string) => {
  const includeIfDefined = (name: string, value: string) => {
    if (value === '') {
      return '';
    }

    return `  $${name}: ${value},\n`;
  };

  return `@use '@janis.me/themed';
@use '@janis.me/themed/generators';
@use '@janis.me/themed/plugins';

$themes: ();

// The plugins are optional,
// but that's what's used for this website. 
@include themed.configure(
  $themes,
  generators.size(),
  generators.colors(
    $primary: ${primary},
  ${includeIfDefined('gray', gray)}${includeIfDefined('info', info)}${includeIfDefined('success', success)}${includeIfDefined('warning', warning)}${includeIfDefined('error', error)}  $target-space: ${colorspace},
  ),
  plugins.alpha(
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

export default function Hero() {
  const { setTheme, toggleTheme } = useTheme();

  const [primary, setPrimary] = useState('#16b6b3');
  const [gray, setGrey] = useState('');
  const [info, setInfo] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [colorspace, setColorspace] = useState('oklch');

  const [preview, setPreview] = useState<'scss' | 'css'>('scss');

  const dbPrimary = useDebounce(primary, COLOR_DEBOUNCE_TIME);
  const dbGray = useDebounce(gray, COLOR_DEBOUNCE_TIME);
  const dbInfo = useDebounce(info, COLOR_DEBOUNCE_TIME);
  const dbSuccess = useDebounce(success, COLOR_DEBOUNCE_TIME);
  const dbWarning = useDebounce(warning, COLOR_DEBOUNCE_TIME);
  const dbError = useDebounce(error, COLOR_DEBOUNCE_TIME);

  const sassTemplate = useMemo(() => {
    return getSassTemplate(dbPrimary, dbGray, dbInfo, dbSuccess, dbWarning, dbError, colorspace);
  }, [dbPrimary, dbGray, dbInfo, dbSuccess, dbWarning, dbError, colorspace]);

  const stylesheet = useMemo(() => {
    const res = sass.compileString(sassTemplate, {
      importers: [createThemedImporter(console.log)],
    });

    return res.css;
  }, [sassTemplate]);

  const handleReset = () => {
    setPrimary('#16b6b3');
    setGrey('');
    setInfo('');
    setSuccess('');
    setWarning('');
    setError('');
    setColorspace('oklch');
  };

  return (
    <div className="hero">
      <div className="hero__center">
        <a href="https://themed.janis.me" rel="noopener noreferrer" target="_blank" className="hero__tag">
          <code>@janis.me/themed</code>
        </a>
        <h1>Generator</h1>
        <div className="hero__colors">
          <ColorInput label="primary" color={primary} setColor={setPrimary} />
          <ColorInput label="gray" color={gray} setColor={setGrey} />
          <ColorInput label="info" color={info} setColor={setInfo} />
          <ColorInput label="success" color={success} setColor={setSuccess} />
          <ColorInput label="warning" color={warning} setColor={setWarning} />
          <ColorInput label="error" color={error} setColor={setError} />

          <ColorspaceSelect label="colorspace" space={colorspace} setSpace={setColorspace} />
        </div>

        <div className="hero__buttons">
          <Button.Root
            className="hero__button"
            onClick={() => {
              setTheme(toggleTheme());
            }}
          >
            {toggleTheme()} theme
          </Button.Root>
          <Button.Root className="hero__button" onClick={handleReset}>
            reset
          </Button.Root>
        </div>

        <p>
          All colors you see are generated on the fly. When you change a color, the sass compiler runs and uses @janis.me/themed to generate colors.
          <br />
          Because colors are defined in hex format, you might not see any difference in the pallet below - because chroma doesn&apos;t change.
          <br />
          Colors left at &apos;auto&apos; will be generated based on the chroma/lightness of the primary color.
        </p>
      </div>

      <div className="hero__right">
        <div className="hero__toggles">
          <Button.Root
            className={clsx('hero__toggle', { 'hero__toggle--active': preview === 'scss' })}
            onClick={() => {
              setPreview('scss');
            }}
          >
            themed (SCSS)
          </Button.Root>
          <Button.Root
            className={clsx('hero__toggle', { 'hero__toggle--active': preview === 'css' })}
            onClick={() => {
              setPreview('css');
            }}
          >
            Output (CSS)
          </Button.Root>
        </div>
        <pre>{preview === 'scss' ? sassTemplate : stylesheet}</pre>
      </div>

      <style
        id="injected-styles"
        dangerouslySetInnerHTML={{
          __html: stylesheet,
        }}
      />
    </div>
  );
}
