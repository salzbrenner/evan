import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import { UserConfigExport, defineConfig } from "vite";
import { name } from "./package.json";
import glslify from "rollup-plugin-glslify";

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      glslify(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      // minify: false,
      lib: {
        entry: path.resolve(__dirname, "index.ts"),
        name,
        fileName: (format) => {
          return `index.${format}.js`;
        },
      },
      rollupOptions: {
        external: ["react", "react-dom", "tailwindcss"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss",
          },
        },
      },
    },
  });
};
// https://vitejs.dev/config/
export default app;
