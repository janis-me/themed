import { useTheme } from "@komplett/react-themed/utils";

function App() {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handlePromptTheme = () => {
    window.alert(`The current theme is: ${theme}`);
  };

  return (
    <>
      <button onClick={handleToggleTheme}>toggle theme</button>
      <h1>
        Welcome to <b>@komplett/themed</b>
      </h1>
      <p>
        This example shows you you can style things like
        <button onClick={handlePromptTheme}>Buttons</button> with{" "}
        <b>@komplett/themed</b> in pure SCSS
        <b>The current theme is: {theme}</b>
      </p>
    </>
  );
}

export default App;
