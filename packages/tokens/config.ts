// config.js
import * as StyleDictionaryPackage from "style-dictionary";

function generateTokens({
  tokenJsonPaths,
  destination,
  selector,
}: {
  tokenJsonPaths: string[];
  destination: string;
  selector?: string;
}) {
  const StyleDictionary = StyleDictionaryPackage.extend({
    source: tokenJsonPaths,
    format: {
      cssVariablesWithDefault: function ({ dictionary, options }) {
        return `${options.selector || ":root"} {\n${dictionary.allTokens
          .map((token) => {
            let value = token.value;
            // new option added to decide whether or not to output references
            if (options.outputReferences) {
              // the `dictionary` object now has `usesReference()` and
              // `getReferences()` methods. `usesReference()` will return true if
              // the value has a reference in it. `getReferences()` will return
              // an array of references to the whole tokens so that you can access
              // their names or any other attributes.
              if (dictionary.usesReference(token.original.value)) {
                const refs = dictionary.getReferences(token.original.value);
                refs.forEach((ref) => {
                  value = value.replace(ref.value, function () {
                    return `var(--${ref.name})`;
                  });
                });
              }
            }
            const name = token.name.replace("-xxx-remove-xxx", "");
            return `  --${name}: ${value};`;
          })
          .join(`\n`)}\n}\n`;
      },
    },
    platforms: {
      css: {
        transformGroup: "css",
        files: [
          {
            destination,
            format: "cssVariablesWithDefault",
            options: {
              outputReferences: true,
              selector,
            },
          },
        ],
      },
    },
  });

  StyleDictionary.buildPlatform("css");
}

generateTokens({
  tokenJsonPaths: [`./json/textTokens.json`],
  destination: "./css/text.css",
});

generateTokens({
  tokenJsonPaths: [`./json/grayTokens.json`, `./json/darkTokens.json`],
  destination: "./css/theme.css",
});

generateTokens({
  tokenJsonPaths: [`./json/lightTokens.json`],
  destination: "./css/lightTheme.css",
  selector: ":root.light",
});
