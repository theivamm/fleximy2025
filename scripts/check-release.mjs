// Chequeo previo al release. Falla el build si quedan datos pendientes que no
// deben publicarse: teléfonos ficticios, placeholders legales o de contacto.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, resolve } from "node:path"

const src = resolve(process.cwd(), "src")
const markers = ["[RAZÓN SOCIAL]", "[CUIT]", "[DOMICILIO]", "[EMAIL", "541111111111"]

function walk(dir) {
  const found = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) found.push(...walk(full))
    else if (/\.(js|jsx|ts|tsx)$/.test(entry)) found.push(full)
  }
  return found
}

const hits = []
for (const file of walk(src)) {
  const content = readFileSync(file, "utf8")
  for (const marker of markers) {
    const idx = content.indexOf(marker)
    if (idx !== -1) {
      hits.push(`${file}: línea que contiene "${marker}"`)
      break
    }
  }
}

if (hits.length > 0) {
  console.error("✖ RELEASE BLOQUEADO: faltan datos reales de contacto/empresa.\n")
  console.error("No publiques el sitio mientras existan estos valores pendientes.\n")
  for (const h of hits) console.error(`  - ${h}`)
  console.error(
    "\nCompletá src/data/config.js con el teléfono y datos legales reales antes de publicar."
  )
  process.exit(1)
}

console.log("✓ Release check: sin datos pendientes. Se puede publicar.")
