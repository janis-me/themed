import { CheckIcon } from '@radix-ui/react-icons';

import { Checkbox } from '@janis.me/ui';

export default function Showcase() {
  return (
    <div className="showcase">
      <Checkbox.Root>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}
