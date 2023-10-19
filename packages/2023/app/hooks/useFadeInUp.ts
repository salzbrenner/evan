"use client";
import { useSpring } from "@react-spring/web";
import { useEffect } from "react";

export function useFadeInUp({ delay = 0 }) {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, y: 10 },
      to: { opacity: 1, y: 0 },
    }),
    []
  );

  return props;
}
