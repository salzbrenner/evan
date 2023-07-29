import {
  useSpring,
  animated,
  useSpringRef,
  SpringRef,
} from "@react-spring/three";
import React, { useCallback, useEffect, useState } from "react";
import { HEIGHT } from "./constants";
import { useOnThemeChanged } from "../../hooks/useOnThemeSwitch";
import { getColorsForBlob } from "../blob/utils";

type Props = {
  pos: [number, number, number];
  index: number;
  refArray: SpringRef[];
  debug?: boolean;
};
const inConfig = { friction: 10, tension: 320 };

export function FieldCircle({ pos, index, refArray, debug = false }: Props) {
  const ref = useSpringRef<THREE.Mesh>();
  const inDelay = 5 * index;

  const { scale } = useSpring<any>({
    delay: inDelay,
    config: inConfig,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
  });

  const { position } = useSpring<any>({
    ref: ref,
    delay: 4000 * index,
    position: pos,
  });

  useEffect(() => {
    if (debug) return;
    if (refArray.includes(ref as unknown as SpringRef)) return;
    refArray.push(ref as unknown as SpringRef);
  }, []);

  const [color, setColor] = useState(getColorsForBlob().gray40);

  useOnThemeChanged({
    onChange: useCallback((theme: "light" | "dark") => {
      const isDark = theme === "dark";
      setColor(isDark ? getColorsForBlob().gray40 : getColorsForBlob().gray30);
    }, []),
  });

  return (
    <animated.mesh
      // @ts-ignore
      ref={ref}
      key={index}
      scale={scale}
      position={position}
      renderOrder={debug ? 1 : index === 120 ? 400 : undefined}
    >
      {debug ? (
        <>
          <circleGeometry args={[0.8, 68]} />
          {/* @ts-ignore */}
          <animated.meshBasicMaterial wireframe={true} />
        </>
      ) : (
        <>
          <circleGeometry args={[HEIGHT / 20000, 68]} />
          <animated.meshBasicMaterial color={color} />
        </>
      )}
    </animated.mesh>
  );
}
