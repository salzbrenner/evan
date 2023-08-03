import { getMDXComponent } from "next-contentlayer/hooks";
import { useMemo } from "react";

export const useMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {}
) => {
  return useMemo(() => getMDXComponent(code, globals), [code, globals]);
};
