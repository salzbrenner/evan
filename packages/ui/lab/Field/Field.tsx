import React from "react";
import { Canvas } from "@react-three/fiber";
import { FieldGroup, positions } from "./FieldGroup";

const firstPosition = positions[0];
const lastPosition = positions[positions.length - 1];
export const Field = ({ debug = false }) => {
  return (
    <Canvas
      suppressHydrationWarning
      dpr={Math.max(window.devicePixelRatio, 2)}
      camera={{ position: [0, 0, 10], fov: 30 }}
    >
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FieldGroup debug={debug} />
      </>
    </Canvas>
  );
};

export default Field;
