import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020", // Avoid legacy JS polyfills
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — shared by every route, rarely changes
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // UI animation and icon libs — shared by auth pages + home
          "ui-vendor": ["framer-motion", "lucide-react"],
        },
      },
    },
  },
});
