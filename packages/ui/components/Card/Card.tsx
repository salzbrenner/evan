import { cva, type VariantProps } from "cva";

const variants = cva("border border-clr-ui-accent", {
  variants: {
    omitBorder: {
      left: ["border-l-0"],
      right: ["border-r-0"],
      top: ["border-t-0"],
      bottom: ["border-b-0"],
    },
    defaultVariants: {},
  },
});

export function Card() {
  return (
    <div
      className={variants({
        className: `border border-dashed  w-100% h-100%`,
      })}
    ></div>
  );
}
