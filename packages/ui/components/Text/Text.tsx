import { cva, type VariantProps } from "cva";
import { HTMLAttributes } from "react";

const textDecorationCommon = `underline-offset-4 decoration-clr-gray-50 decoration-1 decoration-dashed
underline-offset-4 decoration-clr-gray-50 decoration-1 decoration-dashed hover:text-clr-brand-primary`;

const text = cva("", {
  variants: {
    size: {
      xxs: [],
      sm: [],
      xs: [],
      def: [],
      lg: [],
      // body text
      body: ["font-primary-sm md:font-primary"],
    },
    accent: {
      true: [],
    },
    strong: {
      true: [],
    },
    leading: {
      none: ["!leading-none"],
    },
    intent: {
      link: [`hover:underline ${textDecorationCommon}`],
      inlineLink: [
        `underline ${textDecorationCommon} text-clr-brand-primary hover:text-clr-text-primary`,
      ],
    },
  },
  compoundVariants: [
    {
      accent: undefined,
      size: "xs",
      strong: undefined,
      className: "font-primary-xs",
    },
    {
      size: "sm",
      accent: undefined,
      strong: undefined,
      className: "font-primary-sm",
    },
    {
      accent: undefined,
      size: "sm",
      strong: true,
      class: "font-primary-sm-strong",
    },
    {
      accent: undefined,
      strong: undefined,
      size: "def",
      class: "font-primary",
    },
    {
      accent: undefined,
      strong: true,
      size: "def",
      class: "font-primary-strong",
    },
    {
      accent: undefined,
      strong: undefined,
      size: "lg",
      class: "font-primary-lg",
    },
    {
      accent: undefined,
      strong: true,
      size: "lg",
      class: "font-primary-lg-strong",
    },
    // accent
    {
      accent: true,
      size: "xxs",
      strong: undefined,
      className: "font-accent-xxs",
    },
    {
      accent: true,
      size: "xs",
      strong: undefined,
      className: "font-accent-xs",
    },
    {
      accent: true,
      size: "sm",
      strong: undefined,
      className: "font-accent-sm",
    },
    {
      accent: true,
      size: "def",
      strong: undefined,
      className: "font-accent",
    },
    {
      accent: true,
      size: "lg",
      strong: undefined,
      className: "font-accent-lg",
    },
  ],
  defaultVariants: {
    accent: undefined,
    size: "body",
  },
});

export interface TextProps
  extends Omit<
      HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>,
      "color"
    >,
    VariantProps<typeof text> {
  as?: "p" | "span" | "div";
}

export const Text = ({
  className,
  // type,
  accent,
  size,
  strong,
  leading,
  as = "p",
  intent,
  ...props
}: TextProps) => {
  const As = as;

  return (
    <>
      <As
        className={text({
          size,
          accent,
          strong,
          className,
          leading,
          intent,
        })}
        {...props}
      />
    </>
  );
};
