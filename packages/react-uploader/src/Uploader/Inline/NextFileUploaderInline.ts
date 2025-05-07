import dynamic from "next/dynamic";
import { TProps } from "../types";
import { ComponentType } from "react";

export const FileUploaderInline: ComponentType<TProps<"Inline">> = dynamic(
  () => import("./FileUploaderInline").then((mod) => mod.FileUploaderInline),
  { ssr: false }
);
