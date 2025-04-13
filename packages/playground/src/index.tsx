import { getPreferredColorScheme, ThemeProvider } from '@janis.me/react-themed/js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme={getPreferredColorScheme()}>
    <App />
  </ThemeProvider>,
);
