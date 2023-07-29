"use client";
import { ToggleSidebar } from "./ToggleSidebar";
import { useState } from "react";
import { NavigationBar } from "./Navigation";
import { ArticlesBlock } from "./Articles";
import { motion } from "framer-motion";
import { FadeInUp } from "../FadeInUp";
import dynamic from "next/dynamic";
import { Text } from "@evan/ui/components/Text/Text";
import { Details } from "./Details";

const LazyLab = dynamic(() => import("./Lab"), {
  ssr: false,
});

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

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
      flex
      flex-col
      justify-between
      lg:w-auto
      lg:min-w-[436px]
      lg:w-[436px]
      lg:left-0
      lg:relative
      lg:h-auto
      `}
      >
        <div>
          <FadeInUp delay={300}>
            <NavigationBar />
          </FadeInUp>
          <FadeInUp delay={600}>
            <ArticlesBlock />
          </FadeInUp>
        </div>

        <div>
          <FadeInUp
            delay={800}
            className="flex relative border-t border-b border-clr-ui-accent mt-24 h-[242px]"
          >
            <motion.div
              className="absolute bottom-2 left-2 flex gap-2 items-center"
              animate={{
                opacity: 0,
              }}
              transition={{
                delay: 3.5,
                duration: 0.5,
              }}
            >
              <Text accent size={"xs"}>
                {`> waking up`}
              </Text>
              <motion.div
                className="bg-clr-text-primary w-1.5 h-3"
                animate={{
                  opacity: [0, 1],
                }}
                transition={{
                  delay: 0.5,
                  repeat: Infinity,
                  duration: 0.5,
                }}
              />
            </motion.div>
            <LazyLab />
          </FadeInUp>
          <FadeInUp delay={1000} className="flex flex-col gap-2">
            <Details />
          </FadeInUp>
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
