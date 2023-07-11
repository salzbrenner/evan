import React, { useRef, useState } from "react";
import { useControls } from "leva";
import { BlobTransmissionMaterial } from "./BlobTransmissionMaterial";

export const GlassBlob = ({}) => {
  const config = useControls("blob", {
    // backside: false,
    // // samples: { value: 16, min: 1, max: 32, step: 1 },
    // // resolution: { value: 128, min: 64, max: 2048, step: 64 },
    // // transmission: { value: 0.95, min: 0, max: 1 },
    // // roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    // clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    // anisotropy: { value: 1.5, min: 0, max: 10, step: 0.01 },
    // thickness: { value: 0.2, min: 0, max: 10, step: 0.01 },
    // // chromaticAberration: { value: 0.05, min: 0, max: 1, step: 0.01 },
    // // envMapIntensity: { value: 3, min: 0, max: 10, step: 1 },
    // // backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    // ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    // chromaticAberration: { value: 1, min: 0, max: 1 },
    // // distortion: { value: 10, min: 0, max: 1, step: 0.01 },
    // // distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    // // temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    // // attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    // attenuationColor: "#FCFBF5",
    // color: "#FCFBF5",

    backside: false,
    samples: { value: 35, min: 1, max: 100, step: 1 },
    resolution: { value: 256, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.4, min: 0, max: 1, step: 0.01 },
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
    attenuationDistance: { value: 1.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#9ce6ff",
    color: "#00BBF9",
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <BlobTransmissionMaterial speed={2} vertexDistort={0.8} {...config} />
      </mesh>
    </>
  );
};
