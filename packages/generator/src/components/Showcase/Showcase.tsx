import { CheckIcon, ChevronRightIcon, DotFilledIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Button, Checkbox, DropdownMenu, Label, NavigationMenu } from '@janis.me/ui';

import './Showcase.scss';

export default function Showcase() {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <div className="showcase">
      <Label.Root htmlFor="checkbox1">Checkbox</Label.Root>
      <Checkbox.Root id="checkbox1">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Item one</NavigationMenu.Trigger>
            <NavigationMenu.Content>Item one content</NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Item two</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Sub defaultValue="sub1">
                <NavigationMenu.List>
                  <NavigationMenu.Item value="sub1">
                    <NavigationMenu.Trigger>Sub item one</NavigationMenu.Trigger>
                    <NavigationMenu.Content>Sub item one content</NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="sub2">
                    <NavigationMenu.Trigger>Sub item two</NavigationMenu.Trigger>
                    <NavigationMenu.Content>Sub item two content</NavigationMenu.Content>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Sub>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button.Root>
            <HamburgerMenuIcon />
          </Button.Root>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="showcase__dropdown">
            <DropdownMenu.Item>
              New Tab <div className="showcase__dropdown__slot--right">⌘+T</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              New Window <div className="showcase__dropdown__slot--right">⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              New Private Window <div className="showcase__dropdown__slot--right">⇧+⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                More Tools
                <div>
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>
                    Save Page As… <div className="showcase__dropdown__slot--right">⌘+S</div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
                  <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />

            <DropdownMenu.CheckboxItem checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
              <DropdownMenu.ItemIndicator>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Bookmarks <div className="showcase__dropdown__slot--right">⌘+B</div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
              <DropdownMenu.ItemIndicator>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Full URLs
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Separator />

            <DropdownMenu.Label>People</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
              <DropdownMenu.RadioItem value="pedro">
                <DropdownMenu.ItemIndicator>
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Pedro Duarte
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="colm">
                <DropdownMenu.ItemIndicator>
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Colm Tuite
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>

            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
