import {
  bringFrameToFront,
  FrameState,
  updateFramePosition,
  useStore,
} from "../../store/store";
import { useState, useEffect, useRef } from "react";

interface DraggableProps {
  id: string;
  sector?: number;
  children: ({ frameState }: { frameState: FrameState }) => React.ReactNode;
  absolute?: boolean;
}

/* 
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16|  
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    | 97 | 98 | 99 |100 |101 |102 |103 |104 |105 |106 |107 |108 |109 |110 |111 |112|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |113 |114 |115 |116 |117 |118 |119 |120 |121 |122 |123 |124 |125 |126 |127 |128|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |129 |130 |131 |132 |133 |134 |135 |136 |137 |138 |139 |140 |141 |142 |143 |144|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |145 |146 |147 |148 |149 |150 |151 |152 |153 |154 |155 |156 |157 |158 |159 |160|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |161 |162 |163 |164 |165 |166 |167 |168 |169 |170 |171 |172 |173 |174 |175 |176|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |177 |178 |179 |180 |181 |182 |183 |184 |185 |186 |187 |188 |189 |190 |191 |192|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |193 |194 |195 |196 |197 |198 |199 |200 |201 |202 |203 |204 |205 |206 |207 |208|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |209 |210 |211 |212 |213 |214 |215 |216 |217 |218 |219 |220 |221 |222 |223 |224|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |225 |226 |227 |228 |229 |230 |231 |232 |233 |234 |235 |236 |237 |238 |239 |240|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    |241 |242 |243 |244 |245 |246 |247 |248 |249 |250 |251 |252 |253 |254 |255 |256|
    +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
    
  */

export function Draggable({ id, sector, children, absolute }: DraggableProps) {
  const frameState = useStore()[id];
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  const getRandomPositionForSector = () => {
    if (!frameRef.current) return { x: 0, y: 0 };

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = frameRef.current.offsetWidth;
    const elementHeight = frameRef.current.offsetHeight;

    // Calculate sector dimensions (16 columns x 16 rows = 256 sectors)
    const sectorWidth = windowWidth / 16;
    const sectorHeight = windowHeight / 16;

    if (!sector || sector < 1 || sector > 256) {
      return { x: 0, y: 0 };
    }

    // Convert sector number to grid coordinates (0-based)
    const col = (sector - 1) % 16;
    const row = Math.floor((sector - 1) / 16);

    // Calculate random position within the sector, keeping element fully in window
    const x = Math.max(
      0,
      Math.min(
        windowWidth - elementWidth,
        col * sectorWidth + Math.random() * sectorWidth
      )
    );
    const y = Math.max(
      0,
      Math.min(
        windowHeight - elementHeight,
        row * sectorHeight + Math.random() * sectorHeight
      )
    );

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (!frameState) return;
    setDragStart({
      x: e.clientX - frameState.position.x,
      y: e.clientY - frameState.position.y,
    });
    bringFrameToFront(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && frameRef.current) {
      const elementWidth = frameRef.current.offsetWidth;
      const elementHeight = frameRef.current.offsetHeight;

      // Calculate new position
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;

      // Keep element fully within window bounds
      newX = Math.max(0, Math.min(window.innerWidth - elementWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight - elementHeight, newY));

      const newPosition = { x: newX, y: newY };
      updateFramePosition(id, newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (frameState && frameRef.current) {
      const savedPosition = frameState.position;
      const elementWidth = frameRef.current.offsetWidth;
      const elementHeight = frameRef.current.offsetHeight;

      // Ensure saved position keeps element fully in window
      const x = Math.max(
        0,
        Math.min(window.innerWidth - elementWidth, savedPosition.x)
      );
      const y = Math.max(
        0,
        Math.min(window.innerHeight - elementHeight, savedPosition.y)
      );
      updateFramePosition(id, { x, y });
    } else if (sector) {
      const randomPosition = getRandomPositionForSector();

      updateFramePosition(id, randomPosition);
    }
  }, [id, sector]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={frameRef}
      style={{
        position: absolute ? "absolute" : "fixed",
        left: 0,
        top: 0,
        cursor: isDragging ? "grabbing" : "grab",
        transform: `translate(${frameState?.position?.x}px, ${frameState?.position?.y}px)`,
        transition: isDragging ? "none" : "transform 0.1s",
        zIndex: frameState?.zIndex,
        willChange: "transform, z-index",
        contain: "layout style",
      }}
      onMouseDown={handleMouseDown}
    >
      {children({ frameState })}
    </div>
  );
}
