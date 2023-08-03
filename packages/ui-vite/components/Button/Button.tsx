import { cva, type VariantProps } from "cva";
import { ButtonHTMLAttributes } from "react";
import { Text } from "../Text/Text";

const buttonVariants = cva("text-clr-text-primary border-clr-text-primary", {
  variants: {
    size: {
      sm: ["px-3 py-2 rounded-[1.25rem]"],
      def: ["px-4 py-3 rounded-[1.5rem] "],
    },
    defaultVariants: {
      size: "def",
    },
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ size = "def", className, children }: ButtonProps) => {
  const textSize = size === "sm" ? "xs" : "sm";
  return (
    <button
      type="button"
      className={buttonVariants({
        size,
        className: `border 
          border-dashed 
          hover:border-solid 
          hover:bg-dot
         `,
      })}
    >
      <Text accent size={textSize} leading={"none"}>
        {children}
      </Text>
    </button>
  );
};
