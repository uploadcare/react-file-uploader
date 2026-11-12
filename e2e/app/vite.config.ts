import { msw } from "msw/vite";
import { defineConfig } from "vite";

/** Vite config for an e2e app: its own React, the shared app source. */
export default defineConfig({
  esbuild: { jsx: "automatic" },
  // The app source lives in e2e/app and the uploader is a workspace symlink:
  // resolve these from the app's own node_modules so it gets its own React.
  resolve: {
    dedupe: ["react", "react-dom", "@uploadcare/file-uploader"],
  },
  // Serves /mockServiceWorker.js, which the in-page API emulator registers.
  plugins: [msw({ mode: "worker-only" })],
});
