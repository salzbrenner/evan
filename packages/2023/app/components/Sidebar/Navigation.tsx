"use client";
import { Icon, IconTypes, Link, useSwitchTheme } from "@evan/ui";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimate } from "framer-motion";
import { useRef, useState } from "react";
import { THEME } from "@evan/ui";

function NavIcon({ type, href }: { type: IconTypes; href: string }) {
  const pathname = usePathname();
  const active =
    (href === "/" && pathname === "/") ||
    (pathname !== "/" && href.includes(pathname))
      ? "border-clr-ui-accent text-clr-text-primary"
      : "border-transparent text-clr-gray-60";

  return (
    <Link
      anchor={({ children }) => <NextLink href={href}>{children}</NextLink>}
    >
      <div
        className={`
        p-2
        border
        border-dashed 
        ${active}
        hover:border-clr-text-primary
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

function ThemeToggle() {
  const [lightCircle, animate] = useAnimate();
  const darkCircle = useRef(null);
  const { theme, switchTheme } = useSwitchTheme();
  const isDarkTheme = theme === THEME.dark;

  async function onClick() {
    switchTheme();
    const offset = 5;
    animate(lightCircle.current, { x: offset }).then(async () => {
      await animate(lightCircle.current, { x: 0 });
      await animate(lightCircle.current, {
        x: offset,
        zIndex: isDarkTheme ? 0 : 1,
      });
    });

    await animate(darkCircle.current, { x: 0 });
    await animate(darkCircle.current, { x: offset });
    await animate(darkCircle.current, { x: 0, zIndex: isDarkTheme ? 1 : 0 });
  }

  return (
    <button
      className="flex items-center justify-center  hover:bg-opacity-80 translate-x-[-10px]"
      onClick={onClick}
    >
      <motion.div
        // variants={variants}
        // animate={isDark ? "rotate" : "stop"}
        animate={{
          x: 5,
          zIndex: isDarkTheme ? 1 : 0,
        }}
        // initial={{ x: 0 }}
        // exit={{ x: 0 }}
        ref={lightCircle}
        className="rounded-full w-4 h-4 border border-clr-gray-25 bg-transparent dark:bg-clr-gray-70 dark:border-clr-gray-70"
      />
      <motion.div
        animate={{
          x: 0,
          zIndex: isDarkTheme ? 0 : 1,
        }}
        ref={darkCircle}
        className="rounded-full w-4 h-4 border border-clr-gray-25 bg-clr-gray-25 dark:bg-transparent dark:border-clr-gray-50"
      />
    </button>
  );
}
