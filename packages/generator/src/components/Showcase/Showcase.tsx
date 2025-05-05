import { CheckIcon } from '@radix-ui/react-icons';

import { Checkbox, DropdownMenu, Label } from '@janis.me/ui';

export default function Showcase() {
  return (
    <div className="showcase">
      <Label.Root htmlFor="checkbox1">Checkbox</Label.Root>
      <Checkbox.Root id="checkbox1">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}
