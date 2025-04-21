import { Book, Github, Moon, Sun } from 'lucide-react';

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

      <div className="header__right">
        <a href="https://themed.janis.me" rel="noopener noreferrer" target="_blank">
          <Book />
          Documentation
        </a>
        <a href="https://github.com/janis-me/themed" rel="noopener noreferrer" target="_blank">
          <Github />
          GitHub
        </a>

        <button
          className="header__theme-toggle"
          onClick={() => {
            setTheme(toggleTheme());
          }}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
}
