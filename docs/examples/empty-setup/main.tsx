// This is the main entry point for the application.
// This example shows the minimal setup - no additional configuration.
// Add your top-level configuration here: providers, wrappers, analytics, etc.
// The App component (app.tsx) is where AI-generated code will be placed.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";

// Minimal setup - just StrictMode (React best practice)
// You can add providers, wrappers, and other configuration here as needed
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

