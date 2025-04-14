import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { editorAtom } from '../../atoms';
import { EXAMPLES } from '../../constants';

import './ExampleSelect.scss';

export interface ExampleSelectProps {}

export default function ExampleSelect({}: ExampleSelectProps) {
  const [_, setEditorValue] = useAtom(editorAtom);
  const [example, setExample] = useState<keyof typeof EXAMPLES>('simple');

  useEffect(() => {
    if (example) {
      setEditorValue(EXAMPLES[example]);
    }
  }, [example, setEditorValue]);

  return (
    <select
      name="example"
      className="example-select"
      onChange={e => setExample(e.target.value as keyof typeof EXAMPLES)}
    >
      <option value="simple">Simple</option>
      <option value="modifiers">Modifiers</option>
    </select>
  );
}
