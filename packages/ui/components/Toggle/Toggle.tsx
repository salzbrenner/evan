import * as RadixSwitch from "@radix-ui/react-switch";
import { cva, type VariantProps } from "cva";
import { Text } from "../Text/Text";

const layoutVariants = cva("", {
  variants: {
    horizontal: {
      true: ["flex items-center gap-2"],
      false: ["flex flex-col gap-2"],
    },
    size: {
      def: ["w-4 h-4"],
      sm: ["w-2 h-2"],
    },
    srOnly: {
      true: ["sr-only"],
    },
  },
  defaultVariants: {
    horizontal: false,
    size: "def",
  },
});

type Props = {
  label: string;
  id: string;
  className: string;
  checked?: boolean;
  onCheckedChange?: () => void;
} & VariantProps<typeof layoutVariants>;

export function Toggle({
  horizontal,
  id,
  label,
  size,
  srOnly,
  className,
  checked,
  onCheckedChange,
}: Props) {
  const outerSize = size === "sm" ? "min-w-[26px]" : "min-w-[38px]";
  const translate =
    size === "sm"
      ? "data-[state=checked]:translate-x-3"
      : "data-[state=checked]:translate-x-4";
  return (
    <div
      className={layoutVariants({
        horizontal,
        className: `h-auto ${className}`,
      })}
    >
      <label
        className={`flex items-center ${srOnly ? "sr-only" : ""}`}
        htmlFor={id}
      >
        <Text as="span" accent size={"xxs"} leading={"none"}>
          {label}
        </Text>
      </label>
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`border border-dashed border-clr-text-secondary rounded-full ${outerSize} p-[2px] data-[state=checked]:bg-clr-ui-accent data-[state=checked]:border-solid bg-size-0`}
        id={id}
      >
        <RadixSwitch.Thumb
          className={layoutVariants({
            size,
            className: `rounded-full bg-clr-text-secondary block ${translate} transition-transform`,
          })}
        />
      </RadixSwitch.Root>
    </div>
  );
}
