// take the color css vars and transform into tailwind dictionary
import * as fs from "fs";
import * as path from "path";

// Get the absolute path of the CSS file
const cssFilePath = path.join(__dirname, "../css/theme.css");
// Read the CSS file
const colors = {};
fs.readFile(cssFilePath, "utf8", (err, fileContents) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = fileContents.split("\n");
  const result = lines
    .map((line) => line.split(";")[0].trim())
    .filter((line) => line.startsWith("--color"))
    .map((line) => line.split(":"))
    .map(([key, value]) => {
      const transformedKey = key.replace(/--(\w)/g, (_, letter) => letter);

      const transformedValue = value;
      // remove front
      // .replace("hsl(", "")
      // remove commas
      // .replace(/\,/g, "");
      // remove end
      // .replace("%)", "%")
      // remove alternate end
      // .replace("))", ")");
      return [transformedKey, transformedValue];
    });

  for (const iterator of result) {
    colors[iterator[0]] = iterator[1].trim();
  }

  const outPath = path.join(__dirname, "../tw/colors.js");

  fs.writeFile(
    outPath,
    `export const colors= ` + JSON.stringify(colors, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    }
  );
});
