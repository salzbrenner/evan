"use client";
import { ToggleSidebar } from "./ToggleSidebar";
import { useState } from "react";
import { NavigationBar } from "./Navigation";
import { ArticlesBlock } from "./Articles";
import { motion } from "framer-motion";
import { FadeInUp } from "../FadeInUp";
import { Text } from "@evan/ui";
import { Details } from "./Details";

export const MobileSidebar = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <div
        className={`
          fixed
          top-0
          h-full
          w-full
          ${isSidebarOpen ? "left-0" : "left-[-100%]"}
          transition-all
          flex
          flex-col
          justify-between
          bg-clr-ui-bg
      `}
      >
        <div className="mt-12 border-t border-clr-ui-accent">
          <NavigationBar />
          <ArticlesBlock />
        </div>

        <div className="border-t  border-clr-ui-accent">
          <Details />
        </div>

        {children}
      </div>
      <div className="rotate-180 h-[100vh]">
        <motion.div
          className="border-r border-clr-ui-accent"
          animate={{
            height: "100vh",
          }}
          initial={{ height: "0vh" }}
          transition={{ delay: 0.2 }}
        />
      </div>
      <div className="lg:hidden">
        <ToggleSidebar onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};
