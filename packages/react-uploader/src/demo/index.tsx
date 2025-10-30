import React from "react";
import { createRoot } from "react-dom/client";
import {
  FileUploaderInline,
  FileUploaderMinimal,
  FileUploaderRegular,
} from "../libs";

const App = () => {
  return (
    <>
      <FileUploaderRegular pubkey="demopublickey" />
      <br />
      <br />
      <FileUploaderInline pubkey="demopublickey" />
      <br />
      <br />
      <FileUploaderMinimal pubkey="demopublickey" />
    </>
  );
};

// biome-ignore lint/style/noNonNullAssertion: This is demo
createRoot(document.getElementById("root")!).render(<App />);
