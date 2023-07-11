import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Container } from "./Container";
import { useOnThemeChanged } from "../../hooks/useOnThemeSwitch";
import { useCallback, useState } from "react";
import { ColorRepresentation } from "three";

function getColorsForBlob() {
  return {
    bg: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-ui-bg"
    ),
  };
}

export function Blob() {
  const [{ bg }, set] = useControls(() => ({
    bg: {
      text: "background",
      value: getColorsForBlob().bg,
    },
  }));

  useOnThemeChanged({
    callback: useCallback(() => {
      set({
        bg: getColorsForBlob().bg,
      });
    }, []),
  });

  const config = useControls("bloom", {
    luminanceThreshold: { value: 2, min: 0, max: 10, step: 0.01 },
    intensity: { value: 1, min: 0, max: 10, step: 0.01 },
    levels: { value: 10, min: 0, max: 10, step: 0.01 },
    mipmapBlur: true,
    opacity: { value: 0.05, min: 0, max: 10, step: 0.01 },
  });

  return (
    <Canvas shadows camera={{ position: [-4.5, 0, 12], fov: 35 }}>
      <color attach="background" args={[bg as ColorRepresentation]} />

      <Container position={[1.2, 0, 0]} />
      <EffectComposer>
        <Bloom {...config} />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
}
