"use client";
import { Icon, IconTypes, Link, useSwitchTheme } from "@evan/ui";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimate } from "framer-motion";
import { useRef, useState } from "react";
import { THEME } from "@evan/ui";
import {
  useSpring,
  animated,
  Controller,
  useSpringRef,
} from "@react-spring/web";

function NavIcon({ type, href }: { type: IconTypes; href: string }) {
  const pathname = usePathname();
  const active =
    (href === "/" && pathname === "/") ||
    (pathname !== "/" && href.includes(pathname))
      ? "text-clr-text-primary  dark:bg-clr-gray-15 border-clr-ui-accent"
      : "border-transparent text-clr-gray-60";

  return (
    <Link
      anchor={({ children }) => <NextLink href={href}>{children}</NextLink>}
    >
      <div
        className={`
        p-2
        ${active}
        border
        hover:border-clr-text-primary
        hover:border-dashed
        rounded
        `}
      >
        <Icon type={type} />
      </div>
    </Link>
  );
}

export const NavigationBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex border-b border-clr-ui-accent w-full no-script h-14 items-center justify-between px-4">
      <ThemeToggle />
      <div className="flex">
        <NavIcon type={IconTypes.home} href="/" />
        <NavIcon type={IconTypes.paper} href="/writing" />
        <NavIcon type={IconTypes.stack} href="/project" />
      </div>
    </div>
  );
};

const offset = 5;

function ThemeToggle() {
  const { theme, switchTheme } = useSwitchTheme();
  const isDarkTheme = theme === THEME.dark;
  const lightRef = useSpringRef();
  const lightProps = useSpring({
    ref: lightRef,
    from: { x: offset },
    to: [
      {
        x: 0,
        config: {
          duration: 100,
        },
      },
      {
        zIndex: isDarkTheme ? 0 : 1,
        config: {
          duration: 0,
        },
      },
      {
        x: offset,
        config: {
          duration: 100,
        },
      },
    ],
  });

  const darkRef = useSpringRef();
  const darkProps = useSpring({
    ref: darkRef,
    from: {
      x: 0,
    },
    to: [
      {
        x: offset,
        config: {
          duration: 100,
        },
      },
      {
        zIndex: isDarkTheme ? 1 : 0,
        config: {
          duration: 0,
        },
      },
      {
        x: 0,
        config: {
          duration: 100,
        },
      },
    ],
  });

  async function onClick() {
    switchTheme();
    darkRef.start();
    lightRef.start();
  }

  return (
    <button
      className="flex items-center justify-center  hover:bg-opacity-80 translate-x-[-10px]"
      onClick={onClick}
    >
      <animated.div
        style={lightProps}
        className="rounded-full w-4 h-4 border border-clr-ui-accent-30 bg-transparent dark:bg-clr-gray-55 dark:border-clr-gray-55"
      />
      <animated.div
        style={darkProps}
        className="rounded-full w-4 h-4 border border-clr-ui-accent-30 bg-clr-ui-accent-30 dark:bg-transparent dark:border-clr-ui-accent-55"
      />
    </button>
  );
}
