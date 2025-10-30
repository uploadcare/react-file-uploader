// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, "src/main.ts")],
      name: "@uploadcare/react-adapter",

      formats: ["es", "cjs"],

      fileName: "react-adapter",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: true, insertTypesEntry: true })],
});
