import { defineConfig } from 'vite';
import { resolve } from 'node:path';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';

import * as pkg from './package.json';

export default defineConfig({
  base: '',
  plugins: [
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
