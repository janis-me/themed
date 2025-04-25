import { useMemo, useState } from 'react';
import * as sass from 'sass';

import { useTheme } from '@janis.me/react-themed/js';
import { createThemedImporter } from '@janis.me/sass-loader';

import { useDebounce } from '../../hooks/useDebounce';
import ColorInput from '../ColorInput/ColorInput';
import ColorspaceSelect from '../ColorspaceSelect/ColorspaceSelect';

import './Hero.scss';

import clsx from 'clsx';

const COLOR_DEBOUNCE_TIME = 100;

const getSassTemplate = (
  primary: string,
  gray: string,
  info: string,
  success: string,
  warning: string,
  error: string,
  colorspace: string,
) => {
  if (gray === '') gray = 'null';
  if (info === '') info = 'null';
  if (success === '') success = 'null';
  if (warning === '') warning = 'null';
  if (error === '') error = 'null';

  return `@use '@janis.me/themed' as themed;
@use '@janis.me/themed/generators';
@use '@janis.me/themed/plugins';

$themes: generators.theme(
  $primary: ${primary},
  $gray: ${gray},
  $info: ${info},
  $success: ${success},
  $warning: ${warning},
  $error: ${error},
  $target-space: ${colorspace},
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

export default function Header() {
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
        <pre>@janis.me/themed</pre>
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
          <button
            className="hero__button"
            onClick={() => {
              setTheme(toggleTheme());
            }}
          >
            {toggleTheme()} theme
          </button>
          <button className="hero__button" onClick={handleReset}>
            reset
          </button>
        </div>

        <p>
          All colors you see are generated on the fly. When you change a color, the sass compiler runs and uses
          @janis.me/themed to generate colors.
          <br />
          Because colors are defined in hex format, you might not see any difference below in the oklch format - because
          chroma doesn&apos;t change.
          <br />
          Colors left at &apos;auto&apos; will be generated based on the chroma/lightness of the primary color.
        </p>
      </div>

      <div className="hero__right">
        <div className="hero__toggles">
          <button
            className={clsx('hero__toggle', { 'hero__toggle--active': preview === 'scss' })}
            onClick={() => {
              setPreview('scss');
            }}
          >
            themed (SCSS)
          </button>
          <button
            className={clsx('hero__toggle', { 'hero__toggle--active': preview === 'css' })}
            onClick={() => {
              setPreview('css');
            }}
          >
            Output (CSS)
          </button>
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
