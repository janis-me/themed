import Hero from './components/Hero/Hero';
import Palette from './components/Palette/Palette';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Hero />
      <div className="app__container">
        <Palette />
      </div>
    </div>
  );
}

export default App;
