import { Terminal as XTerm } from '@xterm/xterm';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';

import Editor from './components/Editor/Editor';
import Header from './components/Header/Header';
import Terminal from './components/Terminal/Terminal';
import { useDebounce } from './hooks/useDebounce';

import './App.scss';

const sass = await import('https://jspm.dev/sass');

function App() {
  const xTermRef = useRef<XTerm>(null);

  const [editorValue, setEditorValue] = useState<string>('');
  const [resultValue, setResultValue] = useState<string>('');
  const debouncedEditorValue = useDebounce(editorValue, 1_000);

  const compile = async (val: string) => {
    try {
      const res = await sass.compileStringAsync(val);
      setResultValue(res.css);
    } catch (error) {
      if (xTermRef.current) {
        xTermRef.current.clear();
        xTermRef.current.writeln('Error:');
        xTermRef.current.writeln((error as Error).message);
      }

      return;
    }

    if (xTermRef.current) {
      xTermRef.current.clear();
      xTermRef.current.writeln('Compiled successfully!');
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
  };

  const handleTerminalResize = (terminalMeta: { rows: number; cols: number }) => {
    console.log('Terminal resized:', terminalMeta);
  };

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
          <Editor value={resultValue} path="result.css" readonly />
          <Terminal onMount={handleTerminalMount} onResize={handleTerminalResize} />
        </div>
      </div>
    </div>
  );
}

export default App;
