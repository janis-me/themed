import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@janis.me/react-themed/js';

import ExampleSelect from '../ExampleSelect/ExampleSelect';

import './Header.scss';

export default function Header() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <nav className="header">
      <div className="header__left">
        <h1>
          <code>@janis.me/themed</code>
        </h1>
        Example:
        <ExampleSelect />
      </div>

      <button
        className="header__theme-toggle"
        onClick={() => {
          setTheme(toggleTheme());
        }}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
