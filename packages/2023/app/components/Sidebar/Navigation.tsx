"use client";
import { Icon, IconTypes, Link } from "@evan/ui";
import NextLink from "next/link";
import { FadeInUp } from "../FadeInUp";

function NavIcon({ type }: { type: IconTypes }) {
  return (
    <Link anchor={({ children }) => <NextLink href="/">{children}</NextLink>}>
      <div
        className={`flex
      justify-center 
      items-center 
      h-9 
      w-9
      border-dashed
      rounded
      hover:border-clr-text-primary
      hover:border
      text-clr-gray-70
      hover:text-clr-text-primary
    `}
      >
        <Icon type={type} />
      </div>
    </Link>
  );
}

export const NavigationBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <FadeInUp
      className="flex border-b border-clr-ui-accent w-full no-script h-14 items-center justify-between px-4"
      delay={400}
    >
      <div></div>
      <div className="flex">
        <NavIcon type={IconTypes.home} />
        <NavIcon type={IconTypes.home} />
        <NavIcon type={IconTypes.home} />
      </div>
    </FadeInUp>
  );
};
