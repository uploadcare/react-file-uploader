import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { TProps } from "../types";

export const FileUploaderMinimal: ComponentType<TProps<"Minimal">> = dynamic(
  () => import("./FileUploaderMinimal").then((mod) => mod.FileUploaderMinimal),
  { ssr: false },
);
