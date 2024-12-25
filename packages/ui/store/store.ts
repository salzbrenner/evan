import { useStore as useNanoStore } from "@nanostores/react";
import { persistentAtom, persistentMap } from "@nanostores/persistent";

export type FramePosition = {
  x: number;
  y: number;
};

export type FrameState = {
  position: FramePosition;
  isOpen: boolean;
  zIndex: number;
};

export type Frames = {
  [id: string]: FrameState;
};

const STORE_KEY = "frames";

// Pre-hydrate from localStorage
const initialState = (() => {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(STORE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
})();

export const frameStore = persistentAtom<Frames>(STORE_KEY, initialState, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const bringFrameToFront = (frameId: string) => {
  const frames = frameStore.get();
  const currentFrame = getFrameState(frameId) || {
    position: { x: 0, y: 0 },
    isOpen: true,
    zIndex: 0,
  };

  // Find the highest z-index in the store
  const highestZIndex = Object.values(frames).reduce(
    (max, frame) => Math.max(max, frame.zIndex || 0),
    1000
  );

  // Only update if this frame isn't already on top
  if (!currentFrame || currentFrame.zIndex === highestZIndex) return;

  // Update just this frame's z-index
  frameStore.set({
    ...frameStore.get(),
    [frameId]: {
      ...currentFrame,
      zIndex: highestZIndex + 1,
    },
  });
};

// Helper functions to manage frame states
export const updateFramePosition = (
  frameId: string,
  position: FramePosition
) => {
  const currentFrame = getFrameState(frameId) || {
    position: { x: 0, y: 0 },
    isOpen: true,
    zIndex: 0,
  };

  frameStore.set({
    ...frameStore.get(),
    [frameId]: {
      ...currentFrame,
      position,
    },
  });
};

export const toggleFrameOpen = (frameId: string, isOpen: boolean) => {
  const currentFrame = getFrameState(frameId) || {
    position: { x: 0, y: 0 },
    isOpen: true,
    zIndex: 0,
  };
  frameStore.set({
    ...frameStore.get(),
    [frameId]: {
      ...currentFrame,
      isOpen,
    },
  });
};

export const getFrameState = (frameId: string) => {
  return frameStore.get()[frameId];
};

export const useStore = () => {
  return useNanoStore(frameStore);
};
