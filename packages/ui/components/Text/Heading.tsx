import { cva, type VariantProps } from "cva";
import { HTMLAttributes } from "react";

const variants = cva("", {
  variants: {
    size: {
      1: ["font-heading-alt-1"],
      2: ["font-heading-alt-2"],
      3: ["font-heading-alt-3"],
    },
    defaultVariants: {},
  },
});

interface TextProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof variants> {
  as?: "h1" | "h2" | "h3";
}

export function Heading({
  size = 1,
  as = "h1",
  children,
  className,
}: TextProps) {
  const As = as || size === 1 ? "h1" : size === 2 ? "h2" : "h3";

  return (
    <As
      className={variants({
        size,
        className,
      })}
    >
      {children}
    </As>
  );
}
