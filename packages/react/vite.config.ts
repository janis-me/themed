import { defineConfig } from 'vite';
import { resolve } from 'node:path';

import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

import * as pkg from './package.json';

export default defineConfig({
  base: '',
  plugins: [
    dts({
      exclude: ['node_modules', 'vite.config.ts'],
    }),
    react(),
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
      external: [...(Object.keys(pkg.peerDependencies) || {}), 'react/jsx-runtime'],
      preserveEntrySignatures: 'strict',
    },
  },
});
