import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
    watch: { ignored: ["**/src-tauri/**"] },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@presenters": path.resolve(__dirname, "./src/presenters"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@ui": path.resolve(__dirname, "./src/presenters/components/ui"),
      "@composed": path.resolve(__dirname, "./src/presenters/components/composed"),
      "@contexts": path.resolve(__dirname, "./src/presenters/contexts"),
      "@hooks": path.resolve(__dirname, "./src/presenters/hooks"),
      "@layouts": path.resolve(__dirname, "./src/presenters/layouts"),
      "@middlewares": path.resolve(__dirname, "./src/presenters/middlewares"),
      "@pages": path.resolve(__dirname, "./src/presenters/pages"),
    },
  },
}))
