import {
  useSpring,
  animated,
  useSpringRef,
  SpringRef,
} from "@react-spring/three";
import React, { useCallback, useEffect } from "react";
import { HEIGHT } from "./constants";
import { useOnThemeChanged } from "../../hooks/useOnThemeSwitch";
import { useControls } from "leva";
import { getColorsForBlob } from "../blob/utils";
import { Schema } from "leva/dist/declarations/src/types";

type Props = {
  pos: [number, number, number];
  index: number;
  refArray: SpringRef[];
  debug?: boolean;
};

export function FieldCircle({ pos, index, refArray, debug = false }: Props) {
  const ref = useSpringRef<THREE.Mesh>();
  const inDelay = 5 * index;
  const inConfig = { friction: 10, tension: 320 };

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
    refArray.push(ref as unknown as SpringRef);
  }, [refArray, ref, debug]);

  const [{ color }, set] = useControls(
    "circle color",
    () =>
      ({
        color: getColorsForBlob().gray30,
      } as Schema)
  );

  useOnThemeChanged({
    onChange: useCallback(
      (theme: "light" | "dark") => {
        const isDark = theme === "dark";
        set({
          color: isDark
            ? (getColorsForBlob().gray40 as string)
            : (getColorsForBlob().gray30 as string),
        });
      },
      [set]
    ),
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
          <animated.meshBasicMaterial color={color as string} />
        </>
      )}
    </animated.mesh>
  );
}
