// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      build: {
        rollupOptions: {
          input: resolve(__dirname, "src/demo/index.html"),
        },
      },
    };
  }

  return {
    build: {
      cssCodeSplit: false,
      lib: {
        entry: {
          nextjs: resolve(__dirname, "src/nextjs.ts"),
          "react-uploader": resolve(__dirname, "src/libs.ts"),
        },

        name: "@uploadcare/react-uploader",

        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "next",
          "next/dynamic",
          "@uploadcare/file-uploader",
        ],
        output: {
          globals: {
            react: "React",
            next: "next",
          },
        },
      },
    },
    plugins: [dts({ rollupTypes: true, insertTypesEntry: true })],
  };
});
