import { ComponentType } from "react";
import dynamic from "next/dynamic";
import { TProps } from "../types";

export const FileUploaderMinimal: ComponentType<TProps<"Minimal">> = dynamic(
  () => import("./FileUploaderMinimal").then((mod) => mod.FileUploaderMinimal),
  { ssr: false }
);
