import { AiImageEditorPlugin } from "@uploadcare/ai-image-editor/plugin";
import type { Config, UploadCtxProvider } from "@uploadcare/file-uploader";
import React, { createRef } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, inject, it, vi } from "vitest";
import { page } from "vitest/browser";
import {
  FileUploaderInline,
  FileUploaderMinimal,
  FileUploaderRegular,
} from "../src/libs";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1699102241946-45c5e1937d69?w=640";

let root: Root | undefined;

function render(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => root?.render(element));
}

beforeAll(async () => {
  // Registers <uc-ai-image-editor>, which the plugin opens.
  await import("@uploadcare/ai-image-editor");
});

afterEach(() => {
  root?.unmount();
  root = undefined;
  document.body.innerHTML = "";
});

it("runs on the React major this project targets", () => {
  expect(Number(React.version.split(".")[0])).toBe(inject("reactMajor"));
});

describe.each([
  ["Regular", FileUploaderRegular, "uc-file-uploader-regular"],
  ["Minimal", FileUploaderMinimal, "uc-file-uploader-minimal"],
  ["Inline", FileUploaderInline, "uc-file-uploader-inline"],
] as const)("FileUploader%s", (_, Uploader, tag) => {
  it("passes config as properties and exposes the elements on refs", async () => {
    const apiRef = createRef<UploadCtxProvider>();
    const configRef = createRef<Config>();
    const metadata = { owner: "test" };
    render(
      <Uploader
        pubkey="demopublickey"
        sourceList="local, url"
        metadata={metadata}
        apiRef={apiRef}
        configRef={configRef}
        classNameUploader="my-uploader"
      />,
    );

    await vi.waitFor(() => expect(configRef.current).toBeTruthy());
    expect(configRef.current).toBe(document.querySelector("uc-config"));
    expect(configRef.current?.pubkey).toBe("demopublickey");
    expect(configRef.current?.metadata).toBe(metadata);
    expect(apiRef.current).toBe(
      document.querySelector("uc-upload-ctx-provider"),
    );
    expect(apiRef.current?.api).toBeTruthy();
    expect(document.querySelector(tag)?.getAttribute("class")).toBe(
      "my-uploader",
    );
  });

  it("hands event handlers the event detail, not the Event", async () => {
    const apiRef = createRef<UploadCtxProvider>();
    const onFileUploadSuccess = vi.fn();
    const onChange = vi.fn();
    render(
      <Uploader
        pubkey="demopublickey"
        apiRef={apiRef}
        onFileUploadSuccess={onFileUploadSuccess}
        onChange={onChange}
      />,
    );

    await vi.waitFor(() => expect(apiRef.current?.api).toBeTruthy());
    apiRef.current?.api.addFileFromUrl(IMAGE_URL);

    await vi.waitFor(() => expect(onFileUploadSuccess).toHaveBeenCalled(), {
      timeout: 10_000,
    });
    const [file] = onFileUploadSuccess.mock.calls[0];
    expect(file).not.toBeInstanceOf(Event);
    expect(file.uuid).toEqual(expect.any(String));
    expect(onChange.mock.lastCall?.[0]).not.toBeInstanceOf(Event);
    expect(onChange.mock.lastCall?.[0].status).toBe("success");
  });
});

describe("AI Image Editor plugin", () => {
  function renderWithPlugin() {
    const apiRef = createRef<UploadCtxProvider>();
    render(
      <FileUploaderRegular
        pubkey="demopublickey"
        sourceList="local, url, ai-image-editor"
        plugins={[AiImageEditorPlugin]}
        apiRef={apiRef}
      />,
    );
    return apiRef;
  }

  it("opens the editor from the Generate image source", async () => {
    renderWithPlugin();
    await page.getByText("Upload files", { exact: true }).click();
    await page.getByText("Generate image").first().click();
    await expect
      .element(
        page.getByRole("region", { name: "Generate image", exact: true }),
      )
      .toBeVisible();
  });

  it("opens the editor from AI Edit on an uploaded image", async () => {
    const apiRef = renderWithPlugin();
    await vi.waitFor(() => expect(apiRef.current?.api).toBeTruthy());
    apiRef.current?.api.addFileFromUrl(IMAGE_URL);
    apiRef.current?.api.initFlow();

    await page
      .getByRole("button", { name: /AI Edit/i })
      .first()
      .click();
    await expect
      .element(page.getByRole("region", { name: "Edit image", exact: true }))
      .toBeVisible();
  });
});
