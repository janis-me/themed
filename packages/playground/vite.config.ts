import { defineConfig } from 'vite';

export default defineConfig({
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
