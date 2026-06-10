import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    presets: ["vercel"],
  },
  vite: {
    ssr: {
      noExternal: ["@radix-ui", "cmdk"],
    },
  },
});
