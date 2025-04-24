import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/generator/',
  plugins: [react()],
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    exclude: ['sass'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/styles/global" as *;\n',
      },
    },
  },
});
