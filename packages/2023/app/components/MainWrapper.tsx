"use client";
import { HideLeva } from "@evan/lab";
import { FadeInUp } from "./FadeInUp";

export function MainWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <>
      <HideLeva />

      <div className="flex-grow">
        <FadeInUp delay={800}>{children}</FadeInUp>
      </div>
    </>
  );
}
