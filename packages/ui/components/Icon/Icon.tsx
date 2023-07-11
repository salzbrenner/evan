import { memo, useMemo } from "react";

export enum IconTypes {
  arrowDownRight = "arrow-down-right",
}

export interface IconProps {
  type: IconTypes;
}

function getIcon(type: IconProps["type"]) {
  switch (type) {
    case IconTypes.arrowDownRight:
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8 8.8H3.19995V4M12.8 8.8L8.79995 4.8M12.8 8.8L8.79995 12.8"
            stroke="currentColor"
            strokeLinecap="square"
          />
        </svg>
      );

    default:
      return null;
  }
}

export const Icon = memo(({ type }: IconProps) => {
  return <span className="">{getIcon(type)}</span>;
});
