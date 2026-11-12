import { readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";

/**
 * Each app pins @uploadcare/file-uploader to react-uploader's own pin. Vite
 * resolves the uploader from the app (`dedupe`), so the app and the AI Image
 * Editor plugin share one copy wherever npm puts it, and it is the version
 * react-uploader ships with. Fail fast if the pins drift apart.
 */
const pin = (path: string) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8")).dependencies[
    "@uploadcare/file-uploader"
  ];
const expected = pin("../packages/react-uploader/package.json");
for (const app of ["react-18", "react-19"]) {
  const actual = pin(`./${app}/package.json`);
  if (actual !== expected) {
    throw new Error(
      `e2e/${app} pins @uploadcare/file-uploader ${actual}, react-uploader pins ${expected}: keep them equal`,
    );
  }
}

/** One project per test app; each runs its own Vite dev server. */
const apps = [
  { react: 18, port: 5180 },
  { react: 19, port: 5181 },
];

export default defineConfig({
  testDir: ".",
  forbidOnly: !!process.env.CI,
  projects: apps.map(({ react, port }) => ({
    name: `react-${react}`,
    metadata: { reactMajor: react },
    use: { baseURL: `http://localhost:${port}` },
  })),
  webServer: apps.map(({ react, port }) => ({
    command: `npm run dev -w e2e-react-${react} -- --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  })),
});
