import { formatCss, parse } from '@terrazzo/use-color';
import { useEffect, useState } from 'react';

import './Palette.scss';

const colors = ['primary', 'gray', 'info', 'success', 'warning', 'error'];
const colorSteps = 12;

export default function Palette() {
  const [_, setReRenderSignal] = useState<number>(0);

  // This re-renders the component when
  // 1) the theme is changed
  // 2) the injected styles are changed
  useEffect(() => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        setReRenderSignal(prev => prev + 1);
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    const injectedStylesElement = document.getElementById('injected-styles');
    if (injectedStylesElement) {
      observer.observe(injectedStylesElement, {
        characterData: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="palette">
      <h2>Palette</h2>
      <div className="palette__colors">
        {colors.map(color => (
          <div key={color} className="palette__color-group">
            <span className="palette__color palette__color--heading">{color}</span>
            {Array.from({ length: colorSteps }, (_, i) => {
              const backgroundColorString = `${color}-${String(i + 1)}`;
              const colorString = i > 7 ? `var(--themed-${color}-1` : `var(--themed-${color}-12`;
              const colorValue = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue(`--themed-${backgroundColorString}`);

              const formattedColorValue = formatCss(parse(colorValue) ?? colorValue, { precision: 2 });

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
                  <span>{formattedColorValue}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
