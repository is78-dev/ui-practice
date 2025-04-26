// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
  },

  integrations: [react(), vue()],
  site: "https://is78-dev.github.io",
  base: "/ui-practice",
  outDir: "./dist",
  output: "static",
});
