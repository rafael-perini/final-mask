import { defineConfig } from "vitepress";

const pkg = require("../../package.json");

export default defineConfig({
  lang: "en-US",
  title: "FinalMask",
  description: "Browser Friendly Masked Input",
  base: "/final-mask/",
  head: [["link", { rel: "icon", href: "/final-mask/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.png",
    search: { provider: "local" },
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples/" },
      { text: "API", link: "/api/" },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/rafael-perini/final-mask/blob/main/CHANGELOG.md",
          },
          {
            text: "Contributing",
            link: "https://github.com/rafael-perini/final-mask/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],
    sidebar: {
      "/examples/": [
        {
          text: "Examples",
          items: [{ text: "Running Examples", link: "/examples/" }],
        },
      ],
      "/api/": [
        {
          text: "API",
          items: [{ text: "Callbacks", link: "/api/" }],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/rafael-perini/final-mask" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026-present Rafael Perini",
    },
  },
});
