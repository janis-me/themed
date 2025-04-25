import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Palette from './components/Palette/Palette';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <div className="app__container">
        <Palette />
      </div>
    </div>
  );
}

export default App;
