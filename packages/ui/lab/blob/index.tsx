import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Container } from "./Container";
import { useOnThemeChanged } from "../../hooks/useOnThemeSwitch";
import { useCallback, useMemo, useState } from "react";
import { ColorRepresentation } from "three";
import { getColorsForBlob } from "./utils";
import { Schema } from "leva/dist/declarations/src/types";

export function Blob({ fov = 60 }: { fov?: number }) {
  const [{ bg }, set] = useControls(
    "Background",
    () =>
      ({
        bg: {
          label: "background",
          value: getColorsForBlob().bg,
        },
      } as Schema)
  );

  const [config, setBloomConfig] = useControls("Bloom", () => ({
    luminanceThreshold: { value: 2, min: 0, max: 10, step: 0.01 },
    intensity: { value: 0.5, min: 0, max: 10, step: 0.01 },
    levels: { value: 10, min: 0, max: 10, step: 0.01 },
    mipmapBlur: true,
    opacity: { value: 0.05, min: 0, max: 10, step: 0.01 },
  }));

  const theme = useOnThemeChanged({
    onChange: useCallback(
      (theme: "dark" | "light") => {
        const isDark = theme === "dark";
        set({
          bg: getColorsForBlob().bg as string,
        });
        setBloomConfig({
          luminanceThreshold: isDark ? 1 : 2,
          opacity: isDark ? 0.05 : 0.05,
        });
      },
      [set, setBloomConfig]
    ),
  });

  return (
    <Canvas shadows camera={{ position: [-4.5, 0, 12], fov }}>
      <color attach="background" args={[bg as ColorRepresentation]} />

      <Container position={[1.2, 0, 0]} />
      <EffectComposer>
        <Bloom {...config} />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
}
