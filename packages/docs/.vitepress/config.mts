import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Themed',
  description: 'SCSS themes made easy',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Guide', link: '/guide/global-setup' },
      { text: 'Why themed?', link: '/guide/why-themed' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why themed?', link: '/guide/why-themed' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Getting started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Guide',
        items: [
          { text: 'Global setup', link: '/guide/global-setup' },
          { text: 'Defining themes', link: '/guide/defining-themes' },
          { text: 'Modifiers', link: '/guide/modifiers' },
          { text: 'Customization', link: '/guide/customization' },
          { text: 'Utility functions', link: '/guide/utility-functions' },
          { text: 'Use with React', link: '/guide/usage-with-react' },
        ],
      },
      {
        text: 'FAQ',
        link: '/guide/faq',
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/janis-me/themed' }],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
});
