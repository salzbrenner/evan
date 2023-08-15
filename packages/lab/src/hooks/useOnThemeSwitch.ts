import { useEffect, useMemo, RefObject, useCallback, useState } from "react";
import { THEME } from "./useSwitchTheme";

export const isSSR: boolean = !(
  typeof window !== "undefined" && window.document?.createElement
);

interface Props {
  onChange?: (theme: typeof THEME) => void;
}

export const useOnThemeChanged = ({ onChange: callback }: Props) => {
  const [theme, setTheme] = useState("");
  const handleMutations = useCallback(
    (mutations: MutationRecord[]) => {
      mutations.forEach(({ type, target }) => {
        if (type === "attributes") {
          const theme = (target as Element)
            .getAttribute("class")
            ?.includes(THEME.dark)
            ? THEME.dark
            : THEME.light;
          callback?.(theme as unknown as typeof THEME);
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
      const theme = document
        .querySelector("html")
        ?.className?.includes(THEME.dark)
        ? THEME.dark
        : THEME.light;
      callback?.(theme as unknown as typeof THEME);
      setTheme(theme);

      observer.observe(element, {
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, [observer, callback]);

  return theme;
};
