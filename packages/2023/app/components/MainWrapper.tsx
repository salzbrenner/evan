"use client";
import { HideLeva } from "@evan/lab";

export function MainWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <>
      <HideLeva />

      <div className="flex-grow opacity-0 animate-[fade-in-up_300ms_ease-out_1_700ms_forwards]">
        <div>{children}</div>
      </div>
    </>
  );
}
