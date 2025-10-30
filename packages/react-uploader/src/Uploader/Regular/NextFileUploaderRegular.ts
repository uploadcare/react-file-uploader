import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { TProps } from "../types";

export const FileUploaderRegular: ComponentType<TProps<"Regular">> = dynamic(
  () => import("./FileUploaderRegular").then((mod) => mod.FileUploaderRegular),
  { ssr: false },
);
