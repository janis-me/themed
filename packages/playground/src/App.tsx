import { useEffect, useState } from 'react';

import Editor from './components/Editor/Editor';
import Header from './components/Header/Header';
import { useDebounce } from './hooks/useDebounce';

import './App.scss';

const sass = await import('https://jspm.dev/sass');

function App() {
  const [editorValue, setEditorValue] = useState<string>('');
  const [resultValue, setResultValue] = useState<string>('');
  const debouncedEditorValue = useDebounce(editorValue, 1_000);

  const compile = async (val: string) => {
    try {
      const res = await sass.compileStringAsync(val);
      console.log(res);
      setResultValue(res.css);
    } catch (error) {
      console.log(error);
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

  return (
    <div className="app">
      <Header />
      <div className="app__editor-1">
        <Editor value={editorValue} path="index.scss" onChange={handleEditorChange} />
      </div>
      <div className="app__editor-2">
        <Editor value={resultValue} path="result.css" readonly />
      </div>
    </div>
  );
}

export default App;
