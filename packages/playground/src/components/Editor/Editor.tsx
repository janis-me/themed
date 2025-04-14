import { useTheme } from '@janis.me/react-themed/js';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';

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
  const handleMount: OnMount = (editor, monaco) => {
    onMount?.(editor, monaco);
  };

  return (
    <MonacoEditor
      className="editor"
      theme="vs-dark"
      path={path}
      value={value}
      onMount={handleMount}
      onChange={onChange}
      options={{
        readOnly: readonly,
        minimap: { enabled: false },
        formatOnPaste: true,
        theme: theme === 'dark' ? 'vs-dark' : 'vs-light',
      }}
    />
  );
}
