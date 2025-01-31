import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@komplett/react-themed/utils";

import App from "./App.tsx";

import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
