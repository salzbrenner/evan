import { memo } from "react";

export enum IconTypes {
  arrowDownRight = "arrow-down-right",
  bars = "bars",
  x = "x",
  home = "home",
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

    case IconTypes.bars:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm7 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            clipRule="evenodd"
          />
        </svg>
      );

    case IconTypes.x:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      );
    case IconTypes.home:
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              id="Vector"
              d="M1.6875 8.99999L8.40338 2.28412C8.73288 1.95461 9.26712 1.95461 9.59662 2.28412L16.3125 8.99999M3.375 7.31249V14.9062C3.375 15.3722 3.75276 15.75 4.21875 15.75H7.3125V12.0937C7.3125 11.6278 7.69026 11.25 8.15625 11.25H9.84375C10.3097 11.25 10.6875 11.6278 10.6875 12.0937V15.75H13.7812C14.2472 15.75 14.625 15.3722 14.625 14.9062V7.31249M6.1875 15.75H12.375"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

export const Icon = memo(({ type }: IconProps) => {
  return <span className="">{getIcon(type)}</span>;
});

Icon.displayName = "Icon";
