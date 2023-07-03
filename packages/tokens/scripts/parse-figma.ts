/// <reference lib="dom" />

import { setWith, get } from "lodash";
import * as fs from "fs";

const _env = parseEnvLocal();
const FIGMA_TOKEN = _env?.X_FIGMA_TOKEN || process.env.X_FIGMA_TOKEN;
const FIGMA_URL = `https://api.figma.com/v1/files/2OA9JEHwPZl6pqj1Mmyiy8`;
const headers = {
  "X-FIGMA-TOKEN": `${FIGMA_TOKEN}`,
};

(async function () {
  let resp = await fetch(FIGMA_URL, {
    headers,
  });

  const files = await resp.json();
  const styleKeys = Object.keys(files.styles);

  resp = await fetch(`${FIGMA_URL}/nodes?ids=${styleKeys}`, {
    headers,
  });
  const parsed = await resp.json();

  const nodes = parsed.nodes;

  const tokens = generateStyleDictionaryJSON(nodes);

  Object.keys(tokens).forEach((k) => {
    fs.writeFile(
      `./json/${k}.json`,
      JSON.stringify(tokens[k], null, 2),
      (err: Error) => {
        if (err) {
          throw err;
        }
        console.log("File written successfully!");
      }
    );
  });
})();

function remCalc(px: number, base = 16) {
  return (1 / base) * px + "rem";
}

function generateStyleDictionaryJSON(
  nodes: {
    document: {
      name: string;
      type: string;
      fills: any;
      style: any;
    };
  }[]
) {
  const textTokens = {};
  const grayTokens = {};
  const darkTokens = {};
  const lightTokens = {};

  Object.values(nodes).forEach((node) => {
    const doc = node.document;
    const name = doc.name.split("/").join(".");
    if (doc.type === "TEXT") {
      const { style } = doc;
      const fontShortHand = `${style.fontWeight} ${remCalc(style.fontSize)}/${
        style.lineHeightPercentFontSize
      }% '${style.fontFamily}'`;
      setWith(textTokens, `${name}.value`, fontShortHand, Object);
    }
    // TYPE is "RECTANGLE" so if ever doing anything more than colors, may need updating
    else {
      const hsl = getHSL(doc.fills[0].color);

      // dark theme
      if (name.includes("dark")) {
        const _name = name.replace(".dark", "");
        setHSLBase({
          json: darkTokens,
          name: _name,
          hsl,
        });
        setColorWithShades({
          name: _name,
          numberOfShades: 3,
          json: darkTokens,
          _theme: "dark",
          interval: 10,
        });
      }
      // light theme
      else if (name.includes("light")) {
        const _name = name.replace(".light", "");
        setHSLBase({
          json: lightTokens,
          name: _name,
          hsl,
        });
      }
    }
  });

  setHSLBase({
    json: grayTokens,
    name: "color.gray",
    hsl: {
      h: 0,
      s: "0%",
      l: "0%",
    },
  });
  // grays
  setColorWithShades({
    name: "color.gray",
    numberOfShades: 99,
    json: grayTokens,
  });

  return {
    textTokens,
    grayTokens,
    darkTokens,
    lightTokens,
  };
}

function setHSLBase({
  json,
  name,
  hsl,
}: {
  json: any;
  name: string;
  hsl: {
    h: number;
    s: string;
    l: string;
  };
}) {
  setWith(
    json,
    getHslDotNotation(name),
    {
      h: { value: `${hsl.h}` },
      s: { value: hsl.s },
      l: { value: hsl.l },
    },
    Object
  );
}

function getHslDotNotation(name: string) {
  return `hslBase.${name}`;
}

function setColorWithShades({
  name,
  numberOfShades,
  json,
  interval = 1,
}: {
  name: string;
  numberOfShades: number;
  _theme?: string;
  json: {
    [x: string]: any;
  };
  interval?: number;
}) {
  const shades = Array.from(
    { length: numberOfShades },
    (_, i) => (i + 1) * interval
  );

  const HSLCategoryDotNotation = getHslDotNotation(name);

  // set base color (default w/o shade)
  setWith(
    json,
    `${name}.xxx-remove-xxx`,
    {
      value: `hsl({${HSLCategoryDotNotation}.h}, {${HSLCategoryDotNotation}.s}, {${HSLCategoryDotNotation}.l})`,
    },
    Object
  );

  // set shades
  shades.forEach((level) => {
    setWith(
      json,
      `${name}.${level}`,
      {
        value: `hsl({${HSLCategoryDotNotation}.h}, {${HSLCategoryDotNotation}.s}, ${level}%)`,
      },
      Object
    );
  });
}

function getHSL(color: { r: number; g: number; b: number }) {
  const { r, g, b } = color;
  const [h, s, l] = rgbToHsl(to255(r), to255(g), to255(b));
  return {
    h: Math.round(h),
    s: Math.round(s) + "%",
    l: Math.round(l) + "%",
  };
}

function to255(n: number) {
  return Math.round(n * 255);
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}

function parseEnvLocal() {
  try {
    const envFile = ".env";
    const envConfig = fs.readFileSync(envFile);
    const envVars = {} as { [key: string]: string };

    envConfig
      .toString()
      .split("\n")
      .forEach((line: string) => {
        const [key, value] = line.split("=");
        envVars[key] = value;
      });

    return envVars;
  } catch (error) {
    console.log("Not parsing env.local");
  }
}
