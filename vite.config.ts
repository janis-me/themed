import { defineConfig } from "vite";
import { resolve } from "node:path";

import { viteStaticCopy } from "vite-plugin-static-copy";
import dts from "vite-plugin-dts";

export default defineConfig({
  base: "",
  plugins: [
    dts({
      exclude: ["node_modules", "vite.config.ts"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/index.scss",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@komplett/themed",
      formats: ["es"],
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      preserveEntrySignatures: "strict",
    },
  },
});
