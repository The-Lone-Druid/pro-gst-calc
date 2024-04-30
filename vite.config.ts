import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "GST Calculator",
        short_name: "GST Calculator",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
