import type React from "react";
import type { FC } from "react";

export type TProps = {
  fallback?: React.ReactNode | React.ReactPortal | null;
  condition?: boolean;
  children: React.ReactNode;
};

export const ConditionalSuspense: FC<TProps> = ({ children }) => {
  return children;
};
