import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@komplett/themed" as *;\n',
        api: "modern-compiler",
      },
    },
  },
});
