import { Terminal as XTerm } from '@xterm/xterm';
import { useAtom } from 'jotai';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';

import { editorAtom, exampleAtom } from './atoms';
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
  const [resultValue, setResultValue] = useState<string>('');

  useEffect(() => {
    if (editorValue && xTermRef.current) {
      const res = compile(editorValue, xTermRef.current);
      setResultValue(res);
    } else {
      setResultValue('');
    }
  }, [editorValue]);

  useEffect(() => {
    if (example) {
      setEditorValue(EXAMPLES[example]);
    }
  }, [example, setEditorValue]);

  const handleEditorChange = (value: string | undefined) => {
    setExample(null);

    if (value) {
      setEditorValue(value);
    }
  };

  const handleTerminalMount = (xterm: XTerm) => {
    xTermRef.current = xterm;
    // force recompilation after xterm is mounted
    if (editorValue) {
      setResultValue(compile(editorValue, xterm));
    }
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
