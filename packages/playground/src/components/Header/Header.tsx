import './Header.scss'

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <nav className="header">
      <h1>Header</h1>
    </nav>
  );
}
