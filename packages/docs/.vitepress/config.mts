import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Themed",
  description: "SCSS themes made easy",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/guide/getting-started" },
      { text: "Guide", link: "/guide/defining-themes" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Installation", link: "/guide/installation" },
          { text: "Getting started", link: "/guide/getting-started" },
        ],
      },
      {
        text: "Guide",
        items: [
          { text: "Global setup", link: "/guide/global-setup" },
          { text: "Defining themes", link: "/guide/defining-themes" },
          { text: "How validation works", link: "/guide/how-validation-works" },
          { text: "Customization", link: "/guide/customization" },
          { text: "Utility functions", link: "/guide/utility-functions" },
          { text: "Use with React", link: "/guide/usage-with-react" },
          { text: "Setup with vite", link: "/guide/setup-with-vite" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/komplettio/themed" },
    ],
  },
});
