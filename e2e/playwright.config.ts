import { defineConfig } from "@playwright/test";

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
