import { Edges } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Select, Selection } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";
import { SphereGeometry } from "three";
import { GlassBlob } from "./GlassBlob";

export function Container(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh<SphereGeometry>>(null!);
  const outerRingMesh = useRef<THREE.Mesh<THREE.RingGeometry>>(null!);
  const innerRingMesh = useRef<THREE.Mesh<THREE.RingGeometry>>(null!);
  const { r, g, b } = useControls("Lines", { r: 10, g: 20, b: 200 });
  useFrame((state, delta) => {
    const half = delta / 8;
    mesh.current.rotation.x += half;
    mesh.current.rotation.z += half;

    outerRingMesh.current.rotation.x += delta;
    // outerRingMesh.current.rotation.y += half;

    // innerRingMesh.current.rotation.x -= half;
    innerRingMesh.current.rotation.y -= half;
  });
  const edges = useRef<THREE.LineSegments>(null!);
  const cutterScale = 0.85;
  const cutterPos = [0, 0, 0] as const;

  return (
    <>
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

      <mesh ref={mesh} scale={cutterScale * 0.95} position={cutterPos}>
        <GlassBlob />
      </mesh>
    </>
  );
}
