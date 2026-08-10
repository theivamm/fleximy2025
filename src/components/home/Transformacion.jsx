import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const ANTES = [
  "El WhatsApp se llena de consultas a cualquier hora",
  "Planillas que se actualizan de memoria",
  "Tareas que no quedan registradas",
  "Datos de clientes repartidos entre celulares",
]

const DESPUES = [
  "Una web que recibe consultas y las ordena sola",
  "Estados claros: nueva, asignada, en seguimiento",
  "Historial por cliente para atender en contexto",
  "Web, agenda y operación en un solo lugar",
]

export default function Transformacion() {
  return (
    <section className="bg-bg-primary py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="kicker">La diferencia</p>
            <h2 className="mt-5 text-h1">
              Del caos operativo <span className="text-primary">a un sistema vivo</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-lead text-ink-secondary">
              El problema no es tener clientes. Es que cada consulta exige memoria, atención y
              tiempo. Fleximy convierte ese caos en un flujo visible.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-outline bg-surface p-7 md:p-8"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-full bg-error-container text-error">
                  <X className="size-4" />
                </span>
                <p className="font-mono text-micro uppercase tracking-[0.14em] text-ink-muted">
                  antes
                </p>
              </div>
              <h3 className="mt-4 text-h3 text-ink-muted">Herramientas sueltas</h3>
              <ul className="mt-6 grid gap-4">
                {ANTES.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body text-ink-secondary"
                    style={{ transform: i % 2 ? "rotate(0.3deg)" : "rotate(-0.3deg)" }}
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-outline-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-outline-night bg-night p-7 text-on-night shadow-[var(--shadow-night)] md:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40"
              />
              <div className="relative flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-full bg-secondary-soft text-secondary-deep">
                  <Check className="size-4" />
                </span>
                <p className="font-mono text-micro uppercase tracking-[0.14em] text-on-night/50">
                  con fleximy
                </p>
              </div>
              <h3 className="relative mt-4 text-h3">Operación conectada</h3>
              <ul className="relative mt-6 grid gap-4">
                {DESPUES.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-on-night/90">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
