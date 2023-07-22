"use client";
import { Blob, Field } from "@evan/ui";
import { FadeInUp } from "../FadeInUp";

export function Lab() {
  return (
    <FadeInUp
      className="flex border-t border-b border-clr-ui-accent"
      delay={800}
    >
      <div className="relative" style={{ height: "218px", width: "218px" }}>
        <div className="flex justify-center absolute left-0 right-0 top-0 bottom-0 border-r border-clr-ui-accent">
          <div className="border-r border-clr-gray-16"></div>
          <div className="border-r rotate-90 border-clr-gray-16"></div>
        </div>
        <Field />
      </div>
      <div style={{ height: "218px", width: "218px" }}>
        <Blob fov={30} />
      </div>
    </FadeInUp>
  );
}
