import { motion } from "framer-motion"

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
    <section className="container-site py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="kicker">La diferencia</p>
        <h2 className="mt-4 text-h1">De herramientas sueltas a una operación conectada</h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-8"
        >
          <p className="font-mono text-micro text-muted">antes</p>
          <h3 className="mt-2 text-h3 text-muted">Herramientas sueltas</h3>
          <ul className="mt-6 grid gap-4">
            {ANTES.map((item, i) => (
              <li
                key={item}
                className="flex gap-3 text-body text-muted"
                style={{ transform: i % 2 ? "rotate(0.4deg)" : "rotate(-0.4deg)" }}
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-dark-surface/15" />
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
          className="rounded-[var(--radius-card)] border border-ink/30 bg-dark-surface p-8 text-text-invert"
        >
          <p className="font-mono text-micro text-cyan">con fleximy</p>
          <h3 className="mt-2 text-h3">Operación conectada</h3>
          <ul className="mt-6 grid gap-4">
            {DESPUES.map((item) => (
              <li key={item} className="flex gap-3 text-body text-text-invert/90">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-accent">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
