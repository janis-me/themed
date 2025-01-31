import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/styles/global" as *;\n',
        api: "modern-compiler",
        silenceDeprecations: ["import"],
      },
    },
  },
});
