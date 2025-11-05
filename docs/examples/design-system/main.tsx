// This example shows how to integrate a design system provider.
// Design system providers should be set up in main.tsx so they're available
// to all AI-generated code in app.tsx.

import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";

// Design System Provider Setup
// Replace this with your actual design system provider.
//
// import { DesignSystemProvider } from '@your-company/design-system';

// Export component to fix Fast Refresh warning
export const DesignSystemProvider = ({ children, theme = "light" }: { 
  children: React.ReactNode;
  theme?: string;
}) => {
  // Apply theme variables to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DesignSystemProvider theme="light">
      <App />
    </DesignSystemProvider>
  </StrictMode>
);


// Main.tsx file will not be touched by the AI. It is the place to enforce any configuration you need.