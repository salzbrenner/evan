export const getRandomInt = (min: number, max: number) => {
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * max) + min;
};

export const colorSelector = () => {
  const clrs = ["var(--theme-success)", "var(--theme-error)"];
  return clrs[Math.floor(Math.random() * clrs.length)];
};

export const waveColorSelector = () => {
  const clrs = [
    [0, 0.361, 0.937],
    [1.0, 0.121, 0.145],
  ];

  return clrs[Math.floor(Math.random() * clrs.length)];
};

export const radians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

export const angleInRadians = (
  mouseX: number,
  mouseY: number,
  x2: number,
  y2: number
) => {
  return Math.atan2(mouseY - y2, mouseX - x2);
};

// parabolic equation
// https://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference
export const pointOnCircumference = (
  cx: number,
  cy: number,
  r: number,
  radians: number
) => {
  return { x: cx + r * Math.cos(radians), y: cy + r * Math.sin(radians) };
};

// Calculate and return the squared Euclidean distance
export const squaredDistance = (
  {
    x,
    y,
  }: {
    x: number;
    y: number;
  },
  cx: number,
  cy: number
) => (x - cx) ** 2 + (y - cy) ** 2;

export const kClosest = function (
  points: {
    x: number;
    y: number;
  }[],
  k: number,
  cx: number,
  cy: number
) {
  // Sort the array with a custom lambda comparator function
  points.sort(
    (a, b) => squaredDistance(a, cx, cy) - squaredDistance(b, cx, cy)
  );

  // Return the first k elements of the sorted array
  return points.slice(0, k);
};

export const circleDegrees = Array(361)
  .fill(0)
  .map((el, idx) => idx);
