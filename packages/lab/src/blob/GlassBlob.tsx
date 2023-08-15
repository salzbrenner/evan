import React, { useCallback } from "react";
import { BlobTransmissionMaterial } from "./BlobTransmissionMaterial";
import { getColorsForBlob } from "./utils";
import { useOnThemeChanged } from "../hooks/useOnThemeSwitch";
import { useDevControls } from "../hooks/useDevControls";
import { THEME } from "../hooks/useSwitchTheme";

export const GlassBlob = ({}) => {
  const [config, set] = useDevControls("Blob", () => ({
    backside: false,
    samples: { value: 35, min: 1, max: 100, step: 1 },
    resolution: { value: 512, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 2, min: 0, max: 200, step: 0.01 },
    backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    ior: { value: 1.35, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.5, min: 0, max: 1 },
    anisotropy: { value: 1, min: 0, max: 10, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 1.5, min: 0, max: 20, step: 0.01 },
    attenuationColor: getColorsForBlob().brand30,
    color: getColorsForBlob().bg,
  }));

  useOnThemeChanged({
    onChange: useCallback(
      (theme: keyof typeof THEME) => {
        const isDark = theme === THEME.dark;
        // @ts-ignore
        set({
          roughness: isDark ? 0.3 : 0.3,
          ior: isDark ? 4 : 1.35,
          attenuationDistance: isDark ? 20 : 20,
          attenuationColor: isDark ? "#2e2e2e" : getColorsForBlob().brand,
          color: isDark ? getColorsForBlob().bg : getColorsForBlob().bg,
        });
      },
      [set]
    ),
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        {/* @ts-ignore */}
        <BlobTransmissionMaterial speed={2} vertexDistort={0.8} {...config} />
      </mesh>
    </>
  );
};
