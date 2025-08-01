import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': 'http://127.0.0.1:5001'
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ✅ Add this
  build: {
    outDir: "dist"
  },
  // ✅ Add this
  preview: {
    port: 4173,
    host: true
  },
  // ✅ Add this
  optimizeDeps: {
    include: []
  },
  // ✅ MOST IMPORTANT FOR VERCEL
  // This will enable fallback to index.html for any unknown route like /admin
  // Works for both dev and production
  appType: "spa"
}));
