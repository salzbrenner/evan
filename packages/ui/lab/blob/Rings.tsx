import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Select, Selection } from "@react-three/postprocessing";
import { useCallback, useRef } from "react";
import { getColorsForBlob, hslToRgb } from "./utils";
import { useOnThemeChanged } from "../../hooks/useOnThemeSwitch";
import { useDevControls } from "../../hooks/useDevControls";

export const Rings = ({
  cutterScale,
  cutterPos,
}: {
  cutterScale: number;
  cutterPos: readonly [number, number, number];
}) => {
  const outerRingMesh = useRef<THREE.Mesh<THREE.RingGeometry>>(null!);
  const innerRingMesh = useRef<THREE.Mesh<THREE.RingGeometry>>(null!);
  const [{ color }, set] = useDevControls("Rings", () => ({
    color: {
      label: "rings color",
      value: hslToRgb(getColorsForBlob().brand),
    },
  }));
  const { r, g, b } = color;

  useOnThemeChanged({
    onChange: useCallback(() => {
      set({
        color: hslToRgb(getColorsForBlob().brand),
      });
    }, [set]),
  });

  useFrame((state, delta) => {
    const half = delta / 8;

    outerRingMesh.current.rotation.x += delta;
    innerRingMesh.current.rotation.y -= half;
  });

  return (
    <Selection>
      <Select enabled>
        <mesh
          ref={outerRingMesh}
          scale={cutterScale * 0.95}
          position={cutterPos}
        >
          <ringGeometry args={[0, 1, 128]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges scale={2}>
            <lineDashedMaterial color={[r, g, b]} toneMapped={false} />
          </Edges>
        </mesh>
        <mesh
          castShadow
          ref={innerRingMesh}
          scale={cutterScale * 0.95}
          position={cutterPos}
        >
          <ringGeometry args={[0, 1, 128]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges scale={1.75}>
            <lineDashedMaterial color={[r, g, b]} toneMapped={false} />
          </Edges>
        </mesh>
      </Select>
    </Selection>
  );
};
