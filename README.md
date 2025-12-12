# Supernova Custom Codebase Integration Guide

Welcome to the Supernova integration template! This guide provides a clear, step-by-step process for setting up and customizing a headless container for your micro-frontends. It's designed as a blank canvas where you can integrate your company's code components, design systems, and configurations. Supernova uses this template to generate prototypes and features that feel native to your production environment, enabling seamless ideation, iteration, and delivery.

## What is This?

This template is a minimal, production-ready React application built with Vite. It serves as a container for your specific code, ensuring that all generated micro-frontends (for features, prototypes, or explorations) align with your codebase. Key features include:

- React 18 with TypeScript.
- Vite-based build pipeline.
- Basic CSS variables for theming.
- A simple project structure.

The goal is to create isolated, secure microVMs for individual features - not to replicate your entire production stack (though we're working on ways to support large-scale integrations). Supernova's AI will generate code based on this template, using your components to produce authentic, production-grade outputs that adhere to your coding and design guidelines.

By customizing this template, you'll enable:

- **Real code backing**: Features built with your company's libraries, digestible by tools like VS Code or Cursor through Supernova's remote MCP connector.
- **Native feel**: Prototypes that blend seamlessly with your platform.
- **Guideline alignment**: Outputs optimized for your internal standards.
- **Universal access**: Hosted prototypes accessible via unique URLs.

If you have any questions, please use the dedicated Slack channel we've created for you.

## Getting Started

### Prerequisites

- Node.js (version `20.19.0` || `>=22.12.0`).
- `npm` for dependency management.
- Docker installed and running
- Access to your company's component library and design system.
- A Supernova API token (provided by your integration engineer).

### Setup

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Base Dependencies**:

   ```bash
   npm install
   ```

3. **Add Your Dependencies**: Install your company's packages (e.g., components, design systems). If the design system package is not available through npm, you can also copy it into the `src/components/ds` folder.

4. **Declare private dependencies**: Each NPM dependency that is coming from a private registry needs to be declared in the `package.json` file under `supernova.privateDependencies`:

  ```json
  {
    "supernova": {
      "privateDependencies": ["@example/package"]
    }
  }
  ```

5. Make sure docker daemon is running: Supernova will use docker to create a push a Docker image containing a snapshot of the project, including the dependencies.

### Package validation

In order for Supernova to be able to use your container properly, two modes need to be supported - dev mode and deployment mode.

### Dev mode

To test the dev mode, simply:

```bash
npm run dev
```

Dev mode runs on `http://localhost:3000`, and no other port is allowed. Add some example components into the `src/app.tsx` and verify that your components render correctly by navigating to the localhost URL. Additionally, verify that there are no console log issues both in the terminal and in the browser console, so these errors don't propagate into the features your consumers will build.

### Production mode

When your consumers share links to the apps they built, they are sharing apps built in production mode. This package comes with this routine configured, simply run:

```bash
npm run build
```

Verify that the build command is successful once you have finalized building the template. By default, all outputs go to `dist/` and you should be able to see the built static app inside the `dist` folder with the example components you've put into `src/app.tsx`.

### Post-validation

Once you have verified that everything is set up and you can run both dev and build commands, make sure to remove any test code in `src/app.tsx`. `src/app.tsx` is generated automatically through our system, fully managed by our AI agent, and any code included there will be ignored.

## Required Configuration - Overview

To ensure compatibility with Supernova agentic system:

- **Use Vite Exclusively**. Vite is the only supported bundler. Do not replace it with Webpack, Rollup, or others. The template is pre-configured - extend it as needed, but keep core settings intact.
- **Package.json** must contain these exact scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build"
  }
}
```

- For **Port and Build Output**, dev server must run on **port 3000** (set in `vite.config.ts` - do not change). Builds must output to `dist/` using `npm run build`.
- **Static Assets** should go to `public/`. Vite handles serving and inclusion automatically. If you want to use them in prototypes, serve them from this location, and reference relative to the root of the domain.
- **Vite Configuration** can be extended by changing `vite.config.ts`, but do not remove required plugins or change the base project path.

### Project Structure

Following is the project structure to maintain:

```
.
├── src/
│   ├── app.tsx          # Reserved for AI-generated code (keep empty; `return null;`)
│   ├── main.tsx         # Add top-level config (providers, wrappers) that each microVM will have. Lot of crazy stuff can be done this way (analytics etc.)
│   ├── index.css        # Global styles (import design system CSS)
│   ├── components/      # Your custom component code, if you are not using library bundle
│   ├── hooks/           # Custom hooks - recommended place for hooks but not required
│   └── lib/             # Utilities - recommended place for utilities but not required
├── public/              # Static assets
├── supernova/           # Supernova config (see below)
└── docs/                # Documentation
```

## Customization

### Adding Components

Create `src/components/` and export your components for AI use. The AI will detect and use these in generated prototypes.

### Configuring main.tsx

Add providers, wrappers, and global setup here to ensure consistency across prototypes. Examples:

- **Basic Providers**:

  ```tsx
  // main.tsx
  import React from "react";
  import ReactDOM from "react-dom/client";
  import { ThemeProvider } from "@your-company/design-system";
  import App from "./app.tsx";
  import "./index.css";

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
  ```

- **With State Management and Analytics**:

  ```tsx
  // main.tsx
  import React from "react";
  import ReactDOM from "react-dom/client";
  import { Provider as ReduxProvider } from "react-redux";
  import { store } from "./store"; // Your Redux store
  import { AnalyticsProvider } from "@your-company/analytics";
  import { ErrorBoundary } from "@your-company/utils";
  import App from "./app.tsx";
  import "./index.css";

  // Initialize analytics
  import { initAnalytics } from "@your-company/analytics";
  initAnalytics({ env: "development" });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <AnalyticsProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AnalyticsProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
  ```

### AI-Specific Configuration

To optimize AI-generated outputs:

- **Agent Rules**: Place AI behavior guidelines in `/supernova/supernova-agent.md`. This Markdown file can include coding preferences, best practices, or rules (e.g., "Always use hooks for state; prefer functional components"). Supernova analyzes this to guide AI. It should also, ideally, contain information about how to work with the design system and some examples of what to do and what not.

If you are already using `.cursorrules` or similar, you can just copy and paste that into the rule file.

- **Storybook Examples**: Add usage examples in `/supernova/storybook/`. Include just the story code files (e.g., `Button.stories.tsx`) - no need to build or run Storybook. The AI uses these as references for component implementation.

## Authentication & Security

Supernova handles authentication automatically in sandboxes and production on the system level and you should not attempt to build any kind of authentication to them yourself - it is not necessary. Sandboxes and production microVMs automatically adhere to the access rules team can set on workspace or project level.

## Uploading the template to Supernova

1. Generate a Supernova API token and add it to your GitHub repo secrets.
2. Use Supernova CLI command to upload the template to our system (will be provided by Supernova separately once you create the package).
3. Commit all changes to the repo, trigger the action to upload or upload manually from the command line.

Once uploaded, Supernova uses the template and other enhancements on the Supernova side to turn all of it into a reusable container forming a base of each microVM that will host the prototypes/front-ends. Prototypes compile into static apps, hosted at unique URLs with only essential code. To use your container, select the new option you'll see post-upload in the Project Context setting.

Note that **once you have selected the container in Project Context, other options like styling etc. will no longer be available** - since your package is fully responsible for distributing everything needed to render the design system.

## Getting Help

If you encounter any issues setting this up, please reach out through your dedicated Slack channel. There, our team can provide real-time support. Alternatively, you can email us at support@supernova.io and also contact your dedicated customer success manager.
