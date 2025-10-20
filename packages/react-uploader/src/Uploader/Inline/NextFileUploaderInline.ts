import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { TProps } from "../types";

export const FileUploaderInline: ComponentType<TProps<"Inline">> = dynamic(
  () => import("./FileUploaderInline").then((mod) => mod.FileUploaderInline),
  { ssr: false },
);
