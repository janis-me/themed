import { toggleTheme as toggleThemeImperatively, useTheme } from '@janis.me/react-themed/utils';

import Button from './components/Button';

function App() {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handlePromptTheme = () => {
    window.alert(`The current theme is: ${theme}`);
  };

  const handleClickToggleImteratively = () => {
    toggleThemeImperatively();
  };

  return (
    <>
      <Button onClick={handleToggleTheme}>toggle theme</Button>
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
