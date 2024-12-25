import { THEME, useSwitchTheme } from '@evan/ui/index';
import { useSpring, useSpringRef, animated } from '@react-spring/web';

const offset = 5;

export function ThemeToggle() {
  const { theme, switchTheme } = useSwitchTheme();
  const isDarkTheme = theme === THEME.dark;
  const lightRef = useSpringRef();
  const lightProps = useSpring({
    ref: lightRef,
    from: { x: offset },
    to: [
      {
        x: 0,
        config: {
          duration: 100,
        },
      },
      {
        zIndex: isDarkTheme ? 0 : 1,
        config: {
          duration: 0,
        },
      },
      {
        x: offset,
        config: {
          duration: 100,
        },
      },
    ],
  });

  const darkRef = useSpringRef();
  const darkProps = useSpring({
    ref: darkRef,
    from: {
      x: 0,
    },
    to: [
      {
        x: offset,
        config: {
          duration: 100,
        },
      },
      {
        zIndex: isDarkTheme ? 1 : 0,
        config: {
          duration: 0,
        },
      },
      {
        x: 0,
        config: {
          duration: 100,
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
    <button className="flex items-center justify-center  hover:bg-opacity-80 translate-x-[-10px]" onClick={onClick}>
      <animated.div
        style={lightProps}
        className="rounded-full w-4 h-4 border border-clr-ui-accent-30 bg-transparent dark:bg-clr-gray-55 dark:border-clr-gray-55"
      />
      <animated.div
        style={darkProps}
        className="rounded-full w-4 h-4 border border-clr-ui-accent-30 bg-clr-ui-accent-30 dark:bg-transparent dark:border-clr-ui-accent-55"
      />
    </button>
  );
}
