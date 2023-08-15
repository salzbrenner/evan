import { useEffect, useState } from "react";

interface GraphCoordinates {
  x: number;
  y: number;
}

export const useCoordinateGraph = (): GraphCoordinates => {
  const maxX = 2.5;
  const maxY = 2.5;
  const { width: wWidth, height: wHeight } = useWindowSize();
  const [coordinates, setCoordinates] = useState<GraphCoordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const offsetX = ((event.clientX - wWidth / 2) / (wWidth / 2)) * maxX;
      const offsetY = -((event.clientY - wHeight / 2) / (wHeight / 2)) * maxY;

      if (isNaN(offsetX) || isNaN(offsetY)) return;
      setCoordinates({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [wWidth, wHeight]);

  return coordinates;
};

export default useCoordinateGraph;

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return windowSize;
}

export function useOnPointerUpDown({
  onPointerDown,
  onPointerUp,
}: {
  onPointerDown: () => void;
  onPointerUp: () => void;
}) {
  useEffect(() => {
    const handlePointerDown = () => {
      onPointerDown();
    };

    const handlePointerUp = () => {
      onPointerUp();
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [onPointerDown, onPointerUp]);
}
