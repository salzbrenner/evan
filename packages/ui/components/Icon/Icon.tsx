import { memo } from "react";

export enum IconTypes {
  arrowDownRight = "arrow-down-right",
  bars = "bars",
  x = "x",
  home = "home",
  logo = "logo",
  paper = "paper",
  stack = "stack",
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
    case IconTypes.logo:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="49"
          viewBox="0 0 24 49"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.1652 0L24 2.85683V8.58195L9.76757 17.0415V18.8727L19.1656 13.2866L24 16.1527L24 21.878L9.76757 30.3018V34.6038L19.1656 29.0177L24 31.8839V37.6085L4.83483 49L0 46.1431V11.3829L19.1652 0ZM4.27969 39.1743L4.27971 39.1817L9.76757 35.9144V35.9124L18.6116 30.6556V34.4217L1.10865 44.8332V12.0328L19.1667 1.30746L22.3414 3.1834L18.8874 5.23119L4.27971 13.9138L4.27969 39.1743ZM8.65892 35.2628L5.38836 37.2068L5.38836 14.5634L19.4446 6.20855L22.8913 4.16509V7.93235L8.65892 16.392V25.9099L22.8913 17.4611L22.8913 21.227L8.65892 29.6508V35.2628ZM22.3428 16.4779L19.1663 14.5947L9.76757 20.1812V23.9436L18.8887 18.529L18.8873 18.5266L22.3428 16.4779ZM1.6572 45.8157L4.83319 47.6924L22.3438 37.2843L19.1664 35.4005L1.6572 45.8157ZM19.7203 34.4212L22.8913 36.3012V32.5343L19.7203 30.6543V34.4212Z"
            fill="currentColor"
          />
        </svg>
      );

    case IconTypes.paper:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M14.625 10.6875V8.71875C14.625 7.32078 13.4917 6.1875 12.0938 6.1875H10.9688C10.5028 6.1875 10.125 5.80974 10.125 5.34375V4.21875C10.125 2.82078 8.99172 1.6875 7.59375 1.6875H6.1875M6.1875 11.25H11.8125M6.1875 13.5H9M7.875 1.6875H4.21875C3.75276 1.6875 3.375 2.06526 3.375 2.53125V15.4688C3.375 15.9347 3.75276 16.3125 4.21875 16.3125H13.7812C14.2472 16.3125 14.625 15.9347 14.625 15.4688V8.4375C14.625 4.70958 11.6029 1.6875 7.875 1.6875Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case IconTypes.stack:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M4.82143 7.3125L1.6875 9L4.82143 10.6875M4.82143 7.3125L9 9.5625L13.1786 7.3125M4.82143 7.3125L1.6875 5.625L9 1.6875L16.3125 5.625L13.1786 7.3125M13.1786 7.3125L16.3125 9L13.1786 10.6875M13.1786 10.6875L16.3125 12.375L9 16.3125L1.6875 12.375L4.82143 10.6875M13.1786 10.6875L9 12.9375L4.82143 10.6875"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
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

Icon.displayName = "Icon";
