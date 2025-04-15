import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    workspace: ['packages/*'],
    reporters: [['verbose', { summary: true }]],
    coverage: {
      provider: 'v8',
    },
  },
});
