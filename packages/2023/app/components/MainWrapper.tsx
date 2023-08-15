"use client";
import { FadeInUp } from "./FadeInUp";

export function MainWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="flex-grow">
      <FadeInUp delay={800}>{children}</FadeInUp>
    </div>
  );
}
