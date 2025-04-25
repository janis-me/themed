import { useAtom } from 'jotai';

import { exampleAtom } from '../../atoms';
import { EXAMPLES } from '../../constants';

import './ExampleSelect.scss';

export default function ExampleSelect() {
  const [example, setExample] = useAtom(exampleAtom);

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const selectedExample = event.target.value;
    if (Object.keys(EXAMPLES).includes(selectedExample)) {
      const example = selectedExample as keyof typeof EXAMPLES;
      setExample(example);
    } else {
      setExample(null);
    }
  };

  return (
    <select name="example" className="example-select" value={example ?? ''} onChange={handleSelectChange}>
      <option value="" disabled>
        Select an example
      </option>
      {Object.keys(EXAMPLES).map(example => (
        <option key={example} value={example}>
          {example}
        </option>
      ))}
    </select>
  );
}
