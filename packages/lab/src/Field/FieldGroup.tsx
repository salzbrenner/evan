import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FieldCircle } from "./FieldCircle";
import {
  circleDegrees,
  distance,
  kClosest,
  pointOnCircumference,
  radians,
} from "./utils";
import { useFrame } from "@react-three/fiber";
import { HEIGHT } from "./constants";
import { Lookup, SpringRef } from "@react-spring/three";
import useCoordinateGraph, { useOnPointerUpDown } from "./hooks";

const OFFSET = HEIGHT / 1400;
const COLUMNS = 24;
const xPositions: number[] = Array(COLUMNS)
  .fill([])
  .map((el, index) => {
    const x = index * OFFSET - 2.45;
    return x;
  });

export const positions: [number, number, number][] = Array(COLUMNS)
  .fill([])
  .map((el, index) => {
    const y = index * OFFSET - 2.45;
    return [y, 0];
  })
  .sort((a, b) => b[0] - a[0])
  .map(([y, z]): [number, number, number][] => {
    return xPositions.map((x) => [x, y, z]);
  })
  .reduce((a, b) => {
    return a.concat(b);
  });

const getZone = (value: number, threshold: number) => {
  return value < threshold;
};

function useOnMouseMove() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  });
}

export const FieldGroup = ({ debug = false, useIntersects = false }) => {
  const planeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState<boolean | null>(null);
  const [down, setDown] = useState<boolean | null>(null);
  const ogRefArray = useRef<SpringRef[]>([]);
  const { x: windowX, y: windowY } = useCoordinateGraph();

  useFrame(({ raycaster, mouse, camera }) => {
    if (useIntersects && !hovered) return;
    if (!planeRef.current) return;
    let _x = windowX;
    let _y = windowY;
    let intersects = null;

    if (useIntersects) {
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects([planeRef.current]);
      if (intersects && intersects.length !== 1) {
        return;
      }
      _x = intersects[0].point.x;
      _y = intersects[0].point.y;
    }

    const RADIUS = down ? HEIGHT / 800 : HEIGHT / 400;
    const allPointsInCircumference = circleDegrees.map((deg) =>
      pointOnCircumference(_x, _y, RADIUS, radians(deg))
    );
    if (!groupRef.current) return;
    groupRef.current.children.forEach(
      (mesh: THREE.Object3D<THREE.Event>, index) => {
        if (useIntersects && !hovered) return;
        if (!positions[index]) return;
        if (!groupRef.current) return;

        const ogXPos = positions[index][0];
        const ogYPos = positions[index][1];
        const ref = ogRefArray.current[index];

        // distance from current postiion of mesh
        const mouseDistance = distance(
          _x,
          _y,
          mesh.position.x + groupRef.current.position.x,
          mesh.position.y + groupRef.current.position.y
        );

        // from original position of mesh
        const originalMouseDistance = distance(
          _x,
          _y,
          ogXPos + groupRef.current.position.x,
          ogYPos + groupRef.current.position.y
        );

        const inZone = getZone(originalMouseDistance, RADIUS);

        if (inZone) {
          const closestPoint = kClosest(
            allPointsInCircumference,
            1,
            ogXPos,
            ogYPos
          );
          ref?.start({
            to: { position: [closestPoint[0].x, closestPoint[0].y, 0] },
            config: { mass: 2, friction: 15, tension: 300 },
          });
        } else {
          ref?.start({
            to: { position: [ogXPos, ogYPos, 0] },
            delay: mouseDistance,
            config: {
              mass: 2,
              friction: 50 / mouseDistance,
              tension: 250,
            },
          });
        }
      }
    );
  });

  function onPointerDown() {
    setDown(true);
  }

  function onPointerUp() {
    setDown(false);
  }

  function onPointerOver() {
    setHover(true);
  }

  function onPointerOut() {
    setHover(false);
    setTimeout(() => {
      if (!groupRef.current) return;
      groupRef.current.children.forEach((mesh, index) => {
        if (!positions[index]) return;

        const ogXPos = positions[index][0];
        const ogYPos = positions[index][1];
        ogRefArray.current[index].start({
          to: { position: [ogXPos, ogYPos, 0] },
          config: { mass: 1.5, friction: 26, tension: 250 },
        });
      });
    });
  }

  useOnPointerUpDown({
    onPointerDown: useCallback(() => {
      !useIntersects && onPointerDown();
    }, [useIntersects]),
    onPointerUp: useCallback(() => {
      !useIntersects && onPointerUp();
    }, [useIntersects]),
  });

  return (
    <>
      <mesh
        ref={planeRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[5.3, 5.3]} />
        <meshPhongMaterial opacity={debug ? 1 : 0} transparent />
      </mesh>
      <group ref={groupRef}>
        <CircleMap2 refArray={ogRefArray.current} />

        {/* {positions.map((pos, index) => {
          return (
            <FieldCircle
              pos={pos}
              index={index}
              refArray={refArray}
              key={index}
              debug={false}
            />
          );
        })} */}
        {debug && (
          <FieldCircle
            pos={positions[120]}
            index={120}
            refArray={ogRefArray.current}
            debug={debug}
          />
        )}
      </group>
    </>
  );
};

const CircleMap = ({ refArray }: { refArray: SpringRef<Lookup<any>>[] }) => {
  const f = useRef(refArray);
  return useMemo(() => {
    return positions.map((pos, index) => {
      return (
        <FieldCircle
          pos={pos}
          index={index}
          refArray={f.current}
          key={index}
          debug={false}
        />
      );
    });
  }, []);
};

const CircleMap2 = memo(({ refArray }: { refArray: SpringRef[] }) => {
  return positions.map((pos, index) => {
    return (
      <FieldCircle
        pos={pos}
        index={index}
        refArray={refArray}
        key={index}
        debug={false}
      />
    );
  });
});

CircleMap2.displayName = "CircleMap2";
