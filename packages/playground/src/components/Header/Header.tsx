import { useTheme } from '@janis.me/react-themed/js';
import { Moon, Sun } from 'lucide-react';

import ExampleSelect from '../ExampleSelect/ExampleSelect';

import './Header.scss';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="header">
      <div className="header__left">
        <h1>
          <code>@janis.me/themed</code>
        </h1>
        Example:
        <ExampleSelect />
      </div>

      <button className="header__theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
