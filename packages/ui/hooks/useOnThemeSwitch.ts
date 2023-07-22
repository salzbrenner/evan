"use client";
import { useEffect, useMemo, RefObject, useCallback, useState } from "react";

export const isSSR: boolean = !(
  typeof window !== "undefined" && window.document?.createElement
);

interface Props {
  onChange?: (theme: "light" | "dark") => void;
}

export const useOnThemeChanged = ({ onChange: callback }: Props) => {
  const [theme, setTheme] = useState("");
  const handleMutations = useCallback(
    (mutations: MutationRecord[]) => {
      mutations.forEach(({ type, target }) => {
        if (type === "attributes") {
          const theme = (target as Element)
            .getAttribute("class")
            ?.includes("dark")
            ? "dark"
            : "light";
          callback?.(theme);
          setTheme(theme);
        }
      });
    },
    [callback]
  );

  const observer = useMemo(
    () =>
      !isSSR
        ? new MutationObserver((mutationRecord) => {
            handleMutations?.(mutationRecord);
          })
        : null,
    [handleMutations]
  );

  useEffect(() => {
    const element = document.querySelector("html");

    if (observer && element) {
      // call once for load
      const theme = document.querySelector("html")?.className?.includes("dark")
        ? "dark"
        : "light";
      callback?.(theme);
      setTheme(theme);

      observer.observe(element, {
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, [observer, callback]);

  return theme;
};
