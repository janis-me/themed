import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@janis.me/react-themed/js';

import App from './App';

import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/700.css';
import './styles/main.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
