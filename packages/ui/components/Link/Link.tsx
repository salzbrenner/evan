"use client";
import { ReactNode } from "react";

export type LinkProps = {
  children?: ReactNode;
  display?: "block" | "inline";
  anchor?: ({ children }: { children: ReactNode }) => ReactNode;
};

export const Link = ({ anchor, children }: LinkProps) => {
  const Anchor =
    anchor ?? (({ children }: { children: ReactNode }) => <>{children}</>);

  return <Anchor>{children}</Anchor>;
};
