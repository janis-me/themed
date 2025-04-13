import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, getPreferredColorScheme } from '@janis.me/react-themed/utils';

import App from './App.tsx';

import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={getPreferredColorScheme()}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
