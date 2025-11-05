import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: true,
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
