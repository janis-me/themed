import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import * as pkg from './package.json';

export default defineConfig({
  base: '',
  plugins: [
    dts({
      include: ['src'],
      exclude: ['node_modules', '*.config.ts'],
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
      external: [...Object.keys(pkg.peerDependencies), 'react/jsx-runtime'],
      preserveEntrySignatures: 'strict',
    },
  },
});
