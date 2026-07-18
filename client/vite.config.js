import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../public/build",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/donate": "http://localhost:5000",
      "/donations": "http://localhost:5000",
      "/admin": "http://localhost:5000",
    },
  },
});
