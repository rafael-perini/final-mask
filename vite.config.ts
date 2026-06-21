import path from "path";

import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  run: {
    tasks: {
      docs: {
        command: "vp exec vitepress dev docs --host",
        dependsOn: ["build"],
        cache: false,
      },
      "docs:preview": {
        command: "vp exec vitepress preview docs --host",
        dependsOn: ["build"],
        cache: false,
      },
      "pack:docs": {
        command: "vp exec vitepress build docs",
        dependsOn: ["build"],
      },
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: "jsdom",
    coverage: { reporter: ["text"] },
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
