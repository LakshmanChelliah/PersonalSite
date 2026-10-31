import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { copyFileSync } from "node:fs"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

function pagesFallback() {
  return {
    name: "pages-fallback",
    apply: "build" as const,
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html")
    },
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), pagesFallback()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
