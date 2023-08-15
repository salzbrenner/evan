"use client";
import { ToggleSidebar } from "./ToggleSidebar";
import { useState } from "react";
import { NavigationBar } from "./Navigation";
import { ArticlesBlock } from "./Articles";
import { FadeInUp } from "../FadeInUp";
import { Text } from "@evan/ui";
import { Details } from "./Details";
import dynamic from "next/dynamic";
import { useSpring } from "@react-spring/web";
import { animated } from "@react-spring/web";
import { useWindowSize } from "@/app/hooks/useWindowSize";

const LazyLab = dynamic(() => import("./Lab"), {
  ssr: false,
});

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const windowSize = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const [borderHeight, api] = useSpring(
    () => ({
      from: { height: "0vh" },
      to: { height: "100vh" },
      config: {
        duration: 500,
      },
    }),
    []
  );

  const [flash] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      loop: true,
      config: {
        duration: 500,
      },
    }),
    []
  );

  const [flashWrapper] = useSpring(
    () => ({
      from: { opacity: 1 },
      to: { opacity: 0 },
      delay: 1500,

      config: {
        duration: 500,
      },
    }),
    []
  );

  if (windowSize.width < 1024) {
    return null;
  }

  return (
    <>
      <div
        className={`lg:min-w-[436px]
          lg:w-[436px]`}
      ></div>
      <FadeInUp
        delay={500}
        className={`
          fixed
          top-0
          bottom-0
          h-screen
          flex
          flex-col
          justify-between
          bg-clr-ui-bg
          lg:w-auto
          lg:min-w-[436px]
          lg:w-[436px]
          lg:left-0
      `}
      >
        <div>
          <NavigationBar />
          <ArticlesBlock />
        </div>

        <div>
          <div className="flex relative border-t border-b border-clr-ui-accent mt-24 h-[244px]">
            <animated.div
              className="absolute bottom-2 left-2 flex gap-2 items-center"
              style={flashWrapper}
            >
              <Text accent size={"xs"}>
                {`> waking up`}
              </Text>
              <animated.div
                className="bg-clr-text-primary w-1.5 h-3"
                style={flash}
              />
            </animated.div>
            <LazyLab />
          </div>
          <div className="flex flex-col gap-2">
            <Details />
          </div>
        </div>

        {children}
      </FadeInUp>
      <div className={`fixed rotate-180 h-screen left-[436px]`}>
        <animated.div
          className=" border-r border-clr-ui-accent"
          style={borderHeight}
        />
      </div>
      <div className="lg:hidden">
        <ToggleSidebar onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};
