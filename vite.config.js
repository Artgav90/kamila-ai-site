import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) {
            return;
          }

          if (id.includes("node_modules/recharts")) {
            return "vendor-recharts";
          }

          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          if (
            id.includes("node_modules/react-router/") ||
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/@remix-run/router/")
          ) {
            return "vendor-router";
          }

          if (id.includes("node_modules/zod/")) {
            return "vendor-zod";
          }

          if (id.includes("node_modules/@supabase/supabase-js")) {
            return "vendor-supabase";
          }

          if (id.includes("node_modules/qr-scanner")) {
            return "vendor-qr-scanner";
          }

          if (id.includes("node_modules/qrcode")) {
            return "vendor-qrcode";
          }

          if (id.includes("src/components/crm/CrmDashboardContent")) {
            return "crm-dashboard";
          }

          if (id.includes("src/components/crm/CrmOverlays")) {
            return "crm-overlays";
          }

          if (id.includes("node_modules")) {
            return "vendor-core";
          }
        }
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "icons/apple-touch-icon.svg"],
      manifest: {
        name: "TopDance",
        short_name: "TopDance",
        description:
          "Mobile-first dance school PWA for classes, bookings, profiles, and admin operations.",
        theme_color: "#09090b",
        background_color: "#050816",
        display: "standalone",
        scope: "/",
        start_url: "/home",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/pwa-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icons/pwa-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icons/pwa-maskable.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp,json}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ]
});
