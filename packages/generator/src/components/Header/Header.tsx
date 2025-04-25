import { Book, Github } from 'lucide-react';

import './Header.scss';

export default function Header() {
  return (
    <nav className="header">
      <a href="https://themed.janis.me" rel="noopener noreferrer" target="_blank">
        <Book />
        Docs
      </a>
      <a href="https://github.com/janis-me/themed" rel="noopener noreferrer" target="_blank">
        <Github />
        GitHub
      </a>
    </nav>
  );
}
