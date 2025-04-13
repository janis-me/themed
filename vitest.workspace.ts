import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
      },
    },
  },
]);
