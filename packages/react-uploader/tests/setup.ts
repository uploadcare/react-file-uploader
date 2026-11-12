import type { EmulatorSession } from "@uploadcare/api-emulator";
import { setupEmulator } from "@uploadcare/api-emulator/browser";
import { beforeEach } from "vitest";

// Stands in for the Upload API and CDN, so no test reaches the real network.
const emulator = setupEmulator({ unhandled: "error" });

export let session: EmulatorSession;

beforeEach(async () => {
  session = await emulator.reset();
});
