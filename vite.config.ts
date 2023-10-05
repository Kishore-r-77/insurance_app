import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Your Vite configuration
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
});
