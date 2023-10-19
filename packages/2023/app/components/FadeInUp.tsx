"use client";
import { useFadeInUp } from "@/app/hooks/useFadeInUp";
import { animated } from "@react-spring/web";
import { useEffect } from "react";

export function FadeInUp({
  children,
  className,
  delay,
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  // const style = useFadeInUp({
  //   delay,
  // });

  return (
    <div
      className={`${className} animate-[fade-in-up_200ms_ease-out_1]`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
