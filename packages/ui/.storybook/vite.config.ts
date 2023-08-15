import react from "@vitejs/plugin-react";
import { UserConfigExport, defineConfig } from "vite";
import glslify from "rollup-plugin-glslify";
const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [react(), glslify()],
  });
};
export default app;
