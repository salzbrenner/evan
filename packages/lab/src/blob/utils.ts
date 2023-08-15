export function getColorsForBlob() {
  return {
    bg: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-ui-bg"
    ),
    brand: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-brand-primary"
    ),
    brand30: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-brand-primary-30"
    ),
    gray: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray"
    ),
    gray10: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray-10"
    ),
    gray20: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray-20"
    ),
    gray30: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray-30"
    ),
    gray40: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray-40"
    ),
    gray50: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-gray-50"
    ),
    accent: getComputedStyle(document.documentElement).getPropertyValue(
      "--color-ui-accent"
    ),
  };
}

export function hslToRgb(hsl: string): { r: number; g: number; b: number } {
  // Remove 'hsl(' and ')' from the string
  hsl = hsl.replace("hsl(", "").replace(")", "");

  // Split the HSL values into an array
  const hslValues = hsl.split(",");

  // Extract the individual HSL values
  const hue = parseInt(hslValues[0]);
  const saturation = parseInt(hslValues[1].replace("%", "")) / 100;
  const lightness = parseInt(hslValues[2].replace("%", "")) / 100;

  // Convert HSL to RGB
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = hue / 60;
  let x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let r, g, b;

  if (huePrime >= 0 && huePrime < 1) {
    r = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }

  const lightnessAdjustment = lightness - chroma / 2;
  r += lightnessAdjustment;
  g += lightnessAdjustment;
  b += lightnessAdjustment;

  // Convert RGB values to integers
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  // Return the RGB values as an object
  return { r, g, b };
}
