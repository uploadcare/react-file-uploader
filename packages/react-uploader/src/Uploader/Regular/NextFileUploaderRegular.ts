import dynamic from "next/dynamic";
import { TProps } from "../types";
import { ComponentType } from "react";

export const FileUploaderRegular: ComponentType<TProps<"Regular">> = dynamic(
  () => import("./FileUploaderRegular").then((mod) => mod.FileUploaderRegular),
  { ssr: false }
);
