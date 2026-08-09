import { copyFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const dist = resolve(process.cwd(), "dist")
const index = resolve(dist, "index.html")
const target = resolve(dist, "404.html")

if (!existsSync(index)) {
  console.error("dist/index.html no existe. Ejecutá `vite build` primero.")
  process.exit(1)
}

copyFileSync(index, target)
console.log("Generado dist/404.html desde index.html (HTTP 404 real para rutas inexistentes).")
