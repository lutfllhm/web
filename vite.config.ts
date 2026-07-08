import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { brandLogosPlugin } from "./vite-brand-logos";
import { customerLogosPlugin } from "./vite-customer-logos";
import { productStaticPlugin } from "./vite-product-static";

export default defineConfig({
  plugins: [react(), tailwindcss(), productStaticPlugin(), brandLogosPlugin(), customerLogosPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
