// take the color css vars and transform into tailwind dictionary
import * as fs from "fs";
import * as path from "path";

createTwConfigDictionaryForProp("color", "../css/theme.css", "../tw/colors.js");
createTwConfigDictionaryForProp("font", "../css/text.css", "../tw/fonts.js");

function createTwConfigDictionaryForProp(
  prop: string,
  inPath: string,
  outPath: string
) {
  const _outPath = path.join(__dirname, outPath);
  const _inPath = path.join(__dirname, inPath);
  fs.readFile(_inPath, "utf8", (err, fileContents) => {
    const obj = {};
    if (err) {
      console.error(err);
      return;
    }

    const lines = fileContents.split("\n");
    const result = lines
      .map((line) => line.split(";")[0].trim())
      .filter((line) => line.startsWith(`--${prop}`))
      .map((line) => line.split(":"))
      .map(([key]) => {
        if (prop === "font") {
          // for fonts, simply replace the --font-prefix key with the font type, and set the value to the css var
          const transformedKey = key
            .replace(/--font-/g, "")
            .replace(/-default/g, "")
            .replace(/-normal/g, "");

          return [transformedKey, `var(${key})`];
        } else {
          // for colors, replace the --color prefix with clr, and set the value to the css var
          const transformedKey = key.replace(/--color/g, "clr");
          return [transformedKey, `var(${key})`];
        }
      });

    for (const iterator of result) {
      obj[iterator[0]] = iterator[1].trim();
    }

    const outPath = _outPath;

    fs.writeFile(
      outPath,
      `export const ${prop}= ` + JSON.stringify(obj, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been created");
      }
    );
  });
}
