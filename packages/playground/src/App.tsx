import { Terminal as XTerm } from '@xterm/xterm';
import { useAtom } from 'jotai';
import { Resizable } from 're-resizable';
import { useCallback, useEffect, useRef, useState } from 'react';

import { editorAtom, exampleAtom, headerAtom } from './atoms';
import { compile } from './compile';
import Editor from './components/Editor/Editor';
import Header from './components/Header/Header';
import Terminal from './components/Terminal/Terminal';
import { EXAMPLES } from './constants';

import './App.scss';

function App() {
  const xTermRef = useRef<XTerm>(null);

  const [editorValue, setEditorValue] = useAtom(editorAtom);
  const [example, setExample] = useAtom(exampleAtom);
  const [header] = useAtom(headerAtom);
  const [resultValue, setResultValue] = useState<string>('');

  useEffect(() => {
    if (editorValue && xTermRef.current) {
      compile(editorValue, xTermRef.current)
        .then(setResultValue)
        .catch((error: unknown) => {
          if (xTermRef.current) {
            xTermRef.current.writeln((error as Error).message);
          }
        });
    } else {
      setResultValue('');
    }
  }, [editorValue]);

  useEffect(() => {
    if (example) {
      const url = new URL(window.location.href);
      url.searchParams.set('example', example);
      history.pushState({}, '', url);

      setEditorValue(EXAMPLES[example]);
    }
  }, [example, setEditorValue]);

  const handleEditorChange = (value: string | undefined) => {
    setExample(null);

    if (value) {
      setEditorValue(value);
    }
  };

  const handleTerminalMount = useCallback((xterm: XTerm) => {
    xTermRef.current = xterm;
  }, []);

  return (
    <div className="app">
      {header && <Header />}
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
          <Terminal onMount={handleTerminalMount} />
        </div>
      </div>
    </div>
  );
}

export default App;
