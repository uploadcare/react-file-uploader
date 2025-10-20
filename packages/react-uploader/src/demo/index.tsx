import React from "react";
import { createRoot } from "react-dom/client";
import { FileUploaderRegular } from "../libs";

const App = () => {
  return <FileUploaderRegular pubkey="demopublickey" />;
};

// biome-ignore lint/style/noNonNullAssertion: This is demo
createRoot(document.getElementById("root")!).render(<App />);
