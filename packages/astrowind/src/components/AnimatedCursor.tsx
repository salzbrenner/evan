import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
// import { useAtom } from 'jotai';
// import { themeAtom } from '../header/toggle/atom';
import { useEventListener, useSwitchTheme } from '@evan/ui/index';

const SIZE = 30;

const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const getParents = (elem: HTMLElement | Document | ParentNode) => {
  const parents = [];
  for (; elem && elem !== document; elem = elem.parentNode) {
    parents.push(elem);
  }
  return parents;
};

const targets = ['A', 'BUTTON', 'PRE', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'SPAN'];

const getSelector = (element: HTMLElement) => {
  const parents = getParents(element);
  return targets.includes(element.tagName) || parents.some((parent) => targets.includes(parent.tagName));
};

export const AnimatedCursor = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>();
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { theme } = useSwitchTheme();

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    if (!cursorRef.current) return;

    clearTimeout(timerRef.current);
    const { x, y } = cursorRef.current.getBoundingClientRect();
    // distane from center of animated cursor to mouse
    if (distance(clientX, clientY, x + SIZE, y + SIZE) > 5) {
      setIsMoving(true);
      setCoords({ x: clientX, y: clientY });
    }

    const element = document.elementFromPoint(clientX, clientY);

    if (getSelector(element as HTMLElement)) {
      console.log('$$$$$$ evan.log:: $$$$$$', element);
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
    timerRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 1000 / 60);
  }, []);

  useEventListener('mousemove', onMouseMove);

  const followData = useMemo(() => {
    if (!cursorRef.current) return;
    const { x, y, width, height } = cursorRef.current.getBoundingClientRect();
    return {
      degrees: Math.floor((Math.atan2(coords?.y - y - height / 2, coords?.x - x - width / 2) * 180) / Math.PI),
      distance: distance(coords?.x, coords?.y, x, y),
    };
  }, [coords]);

  const scale = useMemo(() => {
    if (!cursorRef.current) return;
    return {
      x: isMoving ? 1 + followData?.distance / 300 : 1,
      y: isMoving ? 1 - followData?.distance / 300 : 1,
    };
  }, [followData?.distance, isMoving]);

  const outerSpring = useSpring({
    from: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    to: { x: coords?.x, y: coords?.y },
    delay: 0,
    config: { tension: 400, friction: 26, clamp: true, mass: 0.5 },
  });

  const outerSpingOpacity = useSpring({
    opacity: coords?.x ? 1 : 0,
    delay: 200,
  });

  const outerSpringHover = useSpring({
    scale: !isHovering ? 1 : 0,
    delay: 0,
  });

  const rotateSpring = useSpring({
    rotate: followData?.degrees,
    config: { tension: 0, friction: 0 },
  });

  const scaleSpring = useSpring({
    scaleX: scale?.x,
    scaleY: scale?.y,
    config: { tension: 600, friction: 20 },
  });

  const borderColor = useMemo(() => {
    return 'var(--color-text-primary)';
  }, [theme]);

  return (
    <animated.div
      ref={cursorRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: (-SIZE / 2) * 2,
        left: (-SIZE / 2) * 2,
        pointerEvents: 'none',
        height: SIZE * 2,
        zIndex: 99999,
        width: SIZE * 2,
        opacity: theme === 'dark' ? 0.9 : 0.8,
        transformOrigin: 'center',
        ...outerSpring,
      }}
    >
      <animated.div
        style={{
          ...outerSpingOpacity,
          ...outerSpringHover,
        }}
      >
        <animated.div
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: '50%',
            border: `solid 1px ${borderColor}`,
            ...rotateSpring,
            ...scaleSpring,
          }}
        />
      </animated.div>
    </animated.div>
  );
};
