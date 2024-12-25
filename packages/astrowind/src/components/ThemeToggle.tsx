import { THEME, useSwitchTheme } from '@evan/ui/index';
import { useSpring, useSpringRef, animated } from '@react-spring/web';

const offset = 8;
const half = offset / 2;
const oneAndHalf = offset * 1.5;
const DURATION = 200;

export function ThemeToggle() {
  const { theme, switchTheme } = useSwitchTheme();
  const isDarkTheme = theme === THEME.dark;
  const lightRef = useSpringRef();
  const lightProps = useSpring({
    ref: lightRef,
    from: { x: isDarkTheme ? offset : 0 },
    to: [
      {
        x: isDarkTheme ? -half : oneAndHalf,
        config: {
          duration: DURATION,
        },
      },
      {
        zIndex: isDarkTheme ? 0 : 1,
        config: {
          duration: 0,
        },
      },
      {
        x: isDarkTheme ? 0 : offset,
        config: {
          duration: DURATION,
        },
      },
    ],
  });

  const darkRef = useSpringRef();
  const darkProps = useSpring({
    ref: darkRef,
    from: {
      x: isDarkTheme ? 0 : offset,
    },
    to: [
      {
        x: isDarkTheme ? oneAndHalf : -half,
        config: {
          duration: DURATION,
        },
      },
      {
        zIndex: isDarkTheme ? 1 : 0,
        config: {
          duration: 0,
        },
      },
      {
        x: isDarkTheme ? offset : 0,
        config: {
          duration: DURATION,
        },
      },
    ],
  });

  async function onClick() {
    switchTheme();
    darkRef.start();
    lightRef.start();
  }

  return (
    <button className="w-6 h-4 relative" onClick={onClick}>
      <animated.div
        style={lightProps}
        className="absolute top-0 left-0 rounded-full w-4 h-4 border border-clr-text-primary border-dashed bg-[#E2DEDA]"
      />
      <animated.div
        style={darkProps}
        className="absolute top-0 left-0 rounded-full w-4 h-4 border border-clr-text-primary border-dashed bg-[#292929]"
      />
    </button>
  );
}
