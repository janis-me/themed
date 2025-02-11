// .vitepress/config.mts
import { defineConfig } from "file:///home/janis/Documents/code/themed/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.20.0_@types+node@22.12.0_postcss@8.5.1_sass@1._badf891b4d210340cdca485d72051df5/node_modules/vitepress/dist/node/index.js";
import { groupIconMdPlugin, groupIconVitePlugin } from "file:///home/janis/Documents/code/themed/node_modules/.pnpm/vitepress-plugin-group-icons@1.3.5/node_modules/vitepress-plugin-group-icons/dist/index.mjs";
var config_default = defineConfig({
  title: "Themed",
  description: "SCSS themes made easy",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/guide/getting-started" },
      { text: "Guide", link: "/guide/global-setup" },
      { text: "Why themed?", link: "/guide/why-themed" }
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Why themed?", link: "/guide/why-themed" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Getting started", link: "/guide/getting-started" }
        ]
      },
      {
        text: "Guide",
        items: [
          { text: "Global setup", link: "/guide/global-setup" },
          { text: "Defining themes", link: "/guide/defining-themes" },
          { text: "Modifiers", link: "/guide/modifiers" },
          { text: "Customization", link: "/guide/customization" },
          { text: "Utility functions", link: "/guide/utility-functions" },
          { text: "Use with React", link: "/guide/usage-with-react" }
        ]
      },
      {
        text: "FAQ",
        link: "/guide/faq"
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/komplettio/themed" }]
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    }
  },
  vite: {
    plugins: [groupIconVitePlugin()]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamFuaXMvRG9jdW1lbnRzL2NvZGUvdGhlbWVkL3BhY2thZ2VzL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamFuaXMvRG9jdW1lbnRzL2NvZGUvdGhlbWVkL3BhY2thZ2VzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2phbmlzL0RvY3VtZW50cy9jb2RlL3RoZW1lZC9wYWNrYWdlcy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBncm91cEljb25NZFBsdWdpbiwgZ3JvdXBJY29uVml0ZVBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnMnO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogJ1RoZW1lZCcsXG4gIGRlc2NyaXB0aW9uOiAnU0NTUyB0aGVtZXMgbWFkZSBlYXN5JyxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdIb21lJywgbGluazogJy8nIH0sXG4gICAgICB7IHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnLCBsaW5rOiAnL2d1aWRlL2dldHRpbmctc3RhcnRlZCcgfSxcbiAgICAgIHsgdGV4dDogJ0d1aWRlJywgbGluazogJy9ndWlkZS9nbG9iYWwtc2V0dXAnIH0sXG4gICAgICB7IHRleHQ6ICdXaHkgdGhlbWVkPycsIGxpbms6ICcvZ3VpZGUvd2h5LXRoZW1lZCcgfSxcbiAgICBdLFxuXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdXaHkgdGhlbWVkPycsIGxpbms6ICcvZ3VpZGUvd2h5LXRoZW1lZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJbnN0YWxsYXRpb24nLCBsaW5rOiAnL2d1aWRlL2luc3RhbGxhdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdHZXR0aW5nIHN0YXJ0ZWQnLCBsaW5rOiAnL2d1aWRlL2dldHRpbmctc3RhcnRlZCcgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnR2xvYmFsIHNldHVwJywgbGluazogJy9ndWlkZS9nbG9iYWwtc2V0dXAnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVmaW5pbmcgdGhlbWVzJywgbGluazogJy9ndWlkZS9kZWZpbmluZy10aGVtZXMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTW9kaWZpZXJzJywgbGluazogJy9ndWlkZS9tb2RpZmllcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ3VzdG9taXphdGlvbicsIGxpbms6ICcvZ3VpZGUvY3VzdG9taXphdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdVdGlsaXR5IGZ1bmN0aW9ucycsIGxpbms6ICcvZ3VpZGUvdXRpbGl0eS1mdW5jdGlvbnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVXNlIHdpdGggUmVhY3QnLCBsaW5rOiAnL2d1aWRlL3VzYWdlLXdpdGgtcmVhY3QnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRkFRJyxcbiAgICAgICAgbGluazogJy9ndWlkZS9mYXEnLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgc29jaWFsTGlua3M6IFt7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2tvbXBsZXR0aW8vdGhlbWVkJyB9XSxcbiAgfSxcbiAgbWFya2Rvd246IHtcbiAgICBjb25maWcobWQpIHtcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbik7XG4gICAgfSxcbiAgfSxcbiAgdml0ZToge1xuICAgIHBsdWdpbnM6IFtncm91cEljb25WaXRlUGx1Z2luKCldLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdWLFNBQVMsb0JBQW9CO0FBQ3JYLFNBQVMsbUJBQW1CLDJCQUEyQjtBQUd2RCxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUE7QUFBQSxJQUVYLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQzFCLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSx5QkFBeUI7QUFBQSxNQUMxRCxFQUFFLE1BQU0sU0FBUyxNQUFNLHNCQUFzQjtBQUFBLE1BQzdDLEVBQUUsTUFBTSxlQUFlLE1BQU0sb0JBQW9CO0FBQUEsSUFDbkQ7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sZUFBZSxNQUFNLG9CQUFvQjtBQUFBLFVBQ2pELEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxzQkFBc0I7QUFBQSxVQUNwRCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0seUJBQXlCO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLGdCQUFnQixNQUFNLHNCQUFzQjtBQUFBLFVBQ3BELEVBQUUsTUFBTSxtQkFBbUIsTUFBTSx5QkFBeUI7QUFBQSxVQUMxRCxFQUFFLE1BQU0sYUFBYSxNQUFNLG1CQUFtQjtBQUFBLFVBQzlDLEVBQUUsTUFBTSxpQkFBaUIsTUFBTSx1QkFBdUI7QUFBQSxVQUN0RCxFQUFFLE1BQU0scUJBQXFCLE1BQU0sMkJBQTJCO0FBQUEsVUFDOUQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLDBCQUEwQjtBQUFBLFFBQzVEO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBRUEsYUFBYSxDQUFDLEVBQUUsTUFBTSxVQUFVLE1BQU0sdUNBQXVDLENBQUM7QUFBQSxFQUNoRjtBQUFBLEVBQ0EsVUFBVTtBQUFBLElBQ1IsT0FBTyxJQUFJO0FBQ1QsU0FBRyxJQUFJLGlCQUFpQjtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsRUFDakM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
