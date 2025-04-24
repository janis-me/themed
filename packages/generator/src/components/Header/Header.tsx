import './Header.scss';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <div className="header">
      <pre>@janis.me/themed</pre>
      <h1>Generator</h1>
    </div>
  );
}
