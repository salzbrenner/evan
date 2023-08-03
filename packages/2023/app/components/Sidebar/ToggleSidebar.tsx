"use client";
import { useState } from "react";
import { Icon, IconTypes } from "@evan/ui-vite";
export const ToggleSidebar = ({
  onClick,
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <button className="absolute top-4 right-4" onClick={onClick}>
        <Icon type={isSidebarOpen ? IconTypes.x : IconTypes.bars} />
      </button>
    </>
  );
};
