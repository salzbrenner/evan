"use client";
import { ToggleSidebar } from "./ToggleSidebar";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { NavigationBar } from "./Navigation";
import { ArticlesBlock } from "./Articles";
import { Lab } from "./Lab";

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const [props, api] = useSpring(
    () => ({
      from: { height: "0vh" },
      delay: 300,
      to: { height: "100vh" },
    }),
    []
  );

  return (
    <>
      <div
        className={`
      absolute
      top-0
      h-full
      w-full
      ${isSidebarOpen ? "left-0" : "left-[-100%]"}
      transition-all
      lg:w-auto
      lg:min-w-[436px]
      lg:w-[436px]
      lg:left-0
      lg:relative
      lg:h-auto
      `}
      >
        <NavigationBar />

        <ArticlesBlock />
        <div className="pt-24">
          <Lab />
        </div>

        {children}
      </div>
      <div className="rotate-180 h-[100vh]">
        <animated.div className="border-r border-clr-ui-accent" style={props} />
      </div>
      <div className="lg:hidden">
        <ToggleSidebar onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};
