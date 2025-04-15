import { toggleTheme as toggleThemeImperatively, useTheme } from '@janis.me/react-themed/js';

import Button from './components/Button';

function App() {
  const { theme, toggleTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  const handlePromptTheme = () => {
    window.alert(`The current theme is: ${theme}`);
  };

  const handleClickToggleImteratively = () => {
    setTheme(toggleThemeImperatively());
  };

  return (
    <>
      <Button id="toggle-theme-button" onClick={handleToggleTheme}>
        toggle theme
      </Button>
      <img id="logo" src="/themed-logo.png" alt="themed logo" />

      <h1>
        Welcome to <b>@janis.me/themed</b>
      </h1>
      <p>
        This example shows you you can style things like
        <Button onClick={handlePromptTheme}>Buttons</Button> with <b>@janis.me/themed</b> in pure SCSS
        <b>The current theme is: {theme}</b>
      </p>
      <p>
        You can also toggle the theme <Button onClick={handleClickToggleImteratively}>Imperatively</Button>
      </p>
    </>
  );
}

export default App;
