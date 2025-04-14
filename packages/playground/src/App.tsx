import { Terminal as XTerm } from '@xterm/xterm';
import c from 'ansi-colors';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';
import * as sass from 'sass';

import Editor from './components/Editor/Editor';
import Header from './components/Header/Header';
import Terminal from './components/Terminal/Terminal';
import { useDebounce } from './hooks/useDebounce';

import './App.scss';

import { useAtom } from 'jotai';

import { editorAtom } from './atoms';

const themed = {
  '': await import('@janis.me/themed?raw'),
  '/modifiers': await import('@janis.me/themed/modifiers?raw'),
  '/modifiers/alpha': await import('@janis.me/themed/modifiers/alpha?raw'),
  '/modifiers/colorspace': await import('@janis.me/themed/modifiers/colorspace?raw'),
  '/modifiers/fill': await import('@janis.me/themed/modifiers/fill?raw'),
  '/modifiers/lightness': await import('@janis.me/themed/modifiers/lightness?raw'),
  '/modifiers/saturation': await import('@janis.me/themed/modifiers/saturation?raw'),
};

function App() {
  const xTermRef = useRef<XTerm>(null);

  const [editorValue, setEditorValue] = useAtom(editorAtom);
  const [resultValue, setResultValue] = useState<string>('');
  const debouncedEditorValue = useDebounce(editorValue, 200);

  const compile = async (val: string) => {
    if (val == '' || !xTermRef.current) return;
    xTermRef.current.writeln('Compiling...');

    try {
      const res = sass.compileString(val, {
        alertAscii: true,
        alertColor: true,
        importers: [
          {
            canonicalize(url) {
              const sanitized = url.replace('pkg:', '');
              if (!sanitized.startsWith('@janis.me/themed'))
                throw new Error('@use statements only work with @janis.me/themed');

              return new URL(`pkg:${sanitized}`);
            },
            load(canonicalUrl) {
              const sanitized = canonicalUrl.href.replace('pkg:', '').replace('.scss', '');
              const path = sanitized.split('@janis.me/themed')[1] as keyof typeof themed;
              const contents = themed[path]?.default;

              if (!contents) throw new Error(`Could not resolve module ${canonicalUrl}`);

              return {
                contents,
                syntax: 'scss',
              };
            },
          },
        ],
      });
      setResultValue(res.css);
      xTermRef.current.clear();
      xTermRef.current.writeln('Compiled successfully!');
    } catch (error) {
      xTermRef.current.clear();
      xTermRef.current.writeln('Error:');
      xTermRef.current.writeln((error as Error).message);
      setResultValue('');
    }
  };

  useEffect(() => {
    if (debouncedEditorValue) {
      compile(debouncedEditorValue);
    } else {
      setResultValue('');
    }
  }, [debouncedEditorValue]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setEditorValue(value);
    }
  };

  const handleTerminalMount = (xterm: XTerm) => {
    xTermRef.current = xterm;
    // re-compile after editor is done
    compile(debouncedEditorValue);
  };

  const handleTerminalResize = (_: { rows: number; cols: number }) => {};

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <Resizable
          className="app__editor-input"
          enable={{
            right: true,
          }}
          defaultSize={{
            width: '50%',
          }}
          maxWidth="80%"
          minWidth="20%"
        >
          <Editor value={editorValue} path="index.scss" onChange={handleEditorChange} />
        </Resizable>
        <div className="app__editor-output">
          <Editor value={resultValue} path="result.css" />
          <Terminal onMount={handleTerminalMount} onResize={handleTerminalResize} />
        </div>
      </div>
    </div>
  );
}

export default App;
