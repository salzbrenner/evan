import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { SphereGeometry } from "three";
import { GlassBlob } from "./GlassBlob";
import { Rings } from "./Rings";

export function Container(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh<SphereGeometry>>(null!);

  useFrame((state, delta) => {
    const half = delta / 8;
    mesh.current.rotation.x += half;
    mesh.current.rotation.z += half;
  });
  const cutterScale = 0.85;
  const cutterPos = [0, 0, 0] as const;

  return (
    <>
      <Rings cutterScale={cutterScale} cutterPos={cutterPos} />
      <mesh ref={mesh} scale={cutterScale * 0.95} position={cutterPos}>
        <GlassBlob />
      </mesh>
    </>
  );
}
