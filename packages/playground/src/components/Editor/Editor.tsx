import MonacoEditor, { Monaco, OnChange, OnMount } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';

import { useTheme } from '@janis.me/react-themed/js';

import './Editor.scss';

export interface EditorProps {
  value: string;
  path: string;
  onChange?: OnChange;
  onMount?: OnMount;
  readonly?: boolean;
}

export default function Editor({ value, path, readonly = false, onChange, onMount }: EditorProps) {
  const { theme } = useTheme();

  const monacoRef = useRef<Monaco>(null);

  const handleMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
    monacoRef.current.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
    onMount?.(editor, monaco);
  };

  useEffect(() => {
    monacoRef.current?.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
  }, [theme]);

  return (
    <MonacoEditor
      className="editor"
      theme="vs-dark"
      path={path}
      value={value}
      onMount={handleMount}
      onChange={(val, ev) => onChange?.(val, ev)}
      options={{
        readOnly: readonly,
        minimap: { enabled: false },
        formatOnPaste: true,
        theme: theme === 'dark' ? 'vs-dark' : 'vs',
      }}
    />
  );
}
