"use client";
import { ToggleSidebar } from "./ToggleSidebar";
import { useState } from "react";
import { NavigationBar } from "./Navigation";
import { ArticlesBlock } from "./Articles";
import { useSpring, animated } from "@react-spring/web";
import { Details } from "./Details";

export const MobileSidebar = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const [sidebar] = useSpring(
    () => ({
      from: { height: "0vh" },
      to: { height: "100vh" },
      delay: 200,
    }),
    []
  );

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
        <animated.div
          className="border-r border-clr-ui-accent"
          style={sidebar}
        />
      </div>
      <div className="lg:hidden">
        <ToggleSidebar onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};
