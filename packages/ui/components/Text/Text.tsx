import { cva, type VariantProps } from "cva";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

const text = cva("text-color-text-primary ", {
  variants: {
    intent: {
      primary: ["font-primary", "border-transparent", "hover:bg-blue-600"],
      accent: [
        "font-accent",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof text> {
  as: "p" | "span" | "div";
}

export const Text = ({
  className,
  intent,
  size,
  as = "p",
  ...props
}: TextProps) => {
  const As = as;
  return (
    <>
      <As className={text({ intent, size, className })} {...props} />
    </>
  );
};
