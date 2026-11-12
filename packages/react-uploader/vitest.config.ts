import { resolve } from "node:path";
import { playwright } from "@vitest/browser-playwright";
import { msw } from "msw/vite";
import {
  defineConfig,
  type TestProjectInlineConfiguration,
} from "vitest/config";

/**
 * One browser project per supported React major. This package's own React is 19; the
 * repo root's devDependencies pin React 18, which the react-18 project resolves instead.
 */
const reactProject = (major: 18 | 19): TestProjectInlineConfiguration => ({
  extends: true,
  resolve: {
    alias:
      major === 18
        ? [
            {
              find: /^react(-dom)?(\/.*)?$/,
              replacement: resolve(__dirname, "../../node_modules/react$1$2"),
            },
          ]
        : [],
  },
  test: { name: `react-${major}`, provide: { reactMajor: major } },
});

export default defineConfig({
  // Serves msw's /mockServiceWorker.js, which the in-page API emulator registers.
  plugins: [msw({ mode: "worker-only" })],
  test: {
    include: ["tests/**/*.test.tsx"],
    setupFiles: ["tests/setup.ts"],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    projects: [reactProject(19), reactProject(18)],
  },
});

declare module "vitest" {
  export interface ProvidedContext {
    reactMajor: 18 | 19;
  }
}
