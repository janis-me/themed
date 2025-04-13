import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import * as pkg from './package.json';

export default defineConfig({
  base: '',
  plugins: [
    viteStaticCopy({
      structured: false,
      targets: [
        {
          src: 'src/scss/*',
          dest: '',
        },
      ],
    }),
    dts({
      exclude: ['node_modules', 'vite.config.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: pkg.name,
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
    },
  },
});
