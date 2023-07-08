import { cva, type VariantProps } from "cva";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

const text = cva("text-clr-text-primary ", {
  variants: {
    type: {
      primary: [],
      accent: [],
    },
    size: {
      sm: [],
      xs: [],
      def: [],
      lg: [],
    },
    strong: {
      true: [],
    },
    lh: {
      none: ["!leading-none"],
    },
  },
  compoundVariants: [
    {
      type: "primary",
      size: "xs",
      strong: undefined,
      className: "font-primary-xs",
    },
    {
      type: "primary",
      size: "sm",
      strong: undefined,
      className: "font-primary-sm",
    },
    {
      type: "primary",
      size: "sm",
      strong: true,
      class: "font-primary-sm-strong",
    },
    {
      type: "primary",
      strong: undefined,
      size: "def",
      class: "font-primary",
    },
    {
      type: "primary",
      strong: true,
      size: "def",
      class: "font-primary-strong",
    },
    {
      type: "primary",
      strong: undefined,
      size: "lg",
      class: "font-primary-lg",
    },
    {
      type: "primary",
      strong: true,
      size: "lg",
      class: "font-primary-lg-strong",
    },
    // accent
    {
      type: "accent",
      size: "xs",
      strong: undefined,
      className: "font-accent-xs",
    },
    {
      type: "accent",
      size: "sm",
      strong: undefined,
      className: "font-accent-sm",
    },
    {
      type: "accent",
      size: "def",
      strong: undefined,
      className: "font-accent",
    },
    {
      type: "accent",
      size: "lg",
      strong: undefined,
      className: "font-accent-lg",
    },
  ],
  defaultVariants: {
    type: "primary",
    size: "def",
  },
});

export interface TextProps
  extends HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLDivElement
    >,
    VariantProps<typeof text> {
  as?: "p" | "span" | "div";
}

export const Text = ({
  className,
  type,
  size,
  strong,
  lh,
  as = "p",
  ...props
}: TextProps) => {
  const As = as;
  return (
    <>
      <As className={text({ type, size, strong, className, lh })} {...props} />
    </>
  );
};
