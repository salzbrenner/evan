"use client";
import { useEffect, useMemo, RefObject, useCallback } from "react";

export const isSSR: boolean = !(
  typeof window !== "undefined" && window.document?.createElement
);

interface Props {
  callback?: () => void;
}

export const useOnThemeChanged = ({ callback }: Props): void => {
  const handleMutations = useCallback((mutations: MutationRecord[]) => {
    mutations.forEach(({ type, target }) => {
      if (type === "attributes") {
        callback?.();
      }
    });
  }, []);

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
      callback?.();

      observer.observe(element, {
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, [observer, callback]);
};
