// A plain React app using @uploadcare/react-uploader the way a user would,
// against the in-page Uploadcare API emulator. Shared by e2e/react-18 and
// e2e/react-19, which differ only in the React they install.
import { AiImageEditorPlugin } from "@uploadcare/ai-image-editor/plugin";
import { setupEmulator } from "@uploadcare/api-emulator/browser";
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import React, { useRef } from "react";
import { createRoot } from "react-dom/client";

declare global {
  interface Window {
    uploadedUuids: string[];
    api: () => UploadCtxProvider["api"] | undefined;
  }
}

await setupEmulator({ unhandled: "error" }).reset();

const plugins = [AiImageEditorPlugin];
const presets = { generate: [{ label: "Logo", prompt: "A logo of " }] };
window.uploadedUuids = [];

function App() {
  const apiRef = useRef<UploadCtxProvider>(null);
  window.api = () => apiRef.current?.api;

  return (
    <>
      <p data-testid="react-version">{React.version}</p>
      <FileUploaderRegular
        pubkey="demopublickey"
        sourceList="local, url, ai-image-editor"
        plugins={plugins}
        aiEditorPresets={presets}
        apiRef={apiRef}
        onFileUploadSuccess={(file) => window.uploadedUuids.push(file.uuid)}
      />
    </>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
