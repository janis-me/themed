import { Fragment, useEffect, useState } from 'react';

import './Palette.scss';

const colors = ['primary', 'gray', 'info', 'success', 'warning', 'error'];
const colorSteps = 12;

export interface PaletteProps {}

export default function Palette({}: PaletteProps) {
  const [_, setReRenderSignal] = useState<number>(0);

  useEffect(() => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log('mutation', mutation);
        setReRenderSignal(prev => prev + 1);
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });
    const injectedStylesElement = document.getElementById('injected-styles');
    console.log('injectedStylesElement', injectedStylesElement);
    if (injectedStylesElement) {
      observer.observe(injectedStylesElement, {
        attributes: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className="palette">
      <h2>Palette</h2>
      <div className="palette__colors">
        {colors.map(color => (
          <Fragment key={color}>
            <span>{color}</span>
            {Array.from({ length: colorSteps }, (_, i) => {
              const backgroundColorString = `${color}-${String(i + 1)}`;
              const colorString = i > 7 ? 'var(--themed-gray-1' : 'var(--themed-color-12';
              return (
                <div
                  key={`${color}-${String(i)}`}
                  style={{
                    backgroundColor: `var(--themed-${backgroundColorString})`,
                    color: colorString,
                  }}
                  className="palette__color"
                >
                  <b>{backgroundColorString}</b>
                  <span>
                    {window
                      .getComputedStyle(document.documentElement)
                      .getPropertyValue(`--themed-${backgroundColorString}`)}
                  </span>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
