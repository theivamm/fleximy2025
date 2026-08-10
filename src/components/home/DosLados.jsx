import { useState } from "react"
import { motion } from "framer-motion"
import Button from "../ui/Button"
import { Send, Check } from "lucide-react"
import { track } from "../../lib/analytics"

const LADOS = [
  {
    id: "cliente",
    etiqueta: "01 · web pública",
    titulo: "El lado cliente: tu web",
    desc: "Lo que ve quien te encuentra por primera vez: información clara y una vía para consultar o reservar sin fricción.",
    items: [
      "Información clara de tu negocio",
      "Pedidos, reservas y consultas desde la web",
      "Confirmación automática al instante",
    ],
  },
  {
    id: "equipo",
    etiqueta: "02 · panel de gestión",
    titulo: "El lado equipo: tu panel",
    desc: "Lo que ves vos: cada consulta llega ordenada, se asigna y queda en el historial del cliente.",
    items: [
      "Consultas que se ordenan solas",
      "Estados: nueva, asignada, en seguimiento",
      "Historial por cliente y agenda",
    ],
  },
]

export default function DosLados() {
  const [activo, setActivo] = useState("cliente")
  const lado = LADOS.find((l) => l.id === activo)

  return (
    <section className="container-site py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="kicker">Qué es Fleximy</p>
          <h2 className="mt-4 max-w-[14ch] text-h1">
            Una plataforma, <span className="text-cyan-deep">dos lados</span>
          </h2>
          <p className="mt-5 max-w-[42ch] text-lead text-muted">
            Un mismo sistema conecta tu web con tu operación: lo que entra por un lado, se ordena
            del otro.
          </p>

          <div className="mt-8 flex w-fit rounded-full border border-line bg-paper-bright p-1">
            {LADOS.map((l) => (
              <button
                key={l.id}
                aria-pressed={activo === l.id}
                onClick={() => {
                  setActivo(l.id)
                  track("vista_sitio_panel", { lado: l.id })
                }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activo === l.id ? "bg-dark-surface text-text-invert" : "text-muted hover:text-text"
                }`}
              >
                {l.titulo.replace("El lado ", "Lado ").replace(": tu web", "").replace(": tu panel", "")}
              </button>
            ))}
          </div>

          <motion.div
            key={lado.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <p className="font-mono text-micro text-muted">{lado.etiqueta}</p>
            <h3 className="mt-2 text-h3">{lado.titulo}</h3>
            <p className="mt-3 max-w-[42ch] text-body text-muted">{lado.desc}</p>
            <ul className="mt-5 grid gap-2.5">
              {lado.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-body">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-accent">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <Button to="/como-funciona" variant="secondary" className="mt-8">
            Conocer cómo funciona
          </Button>
        </div>

        <div className="lg:pl-8">
          <MiniVisual lado={activo} />
        </div>
      </div>
    </section>
  )
}

function MiniVisual({ lado }) {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-3xl bg-accent/30 blur-2xl" aria-hidden="true" />
      <motion.div
        key={lado}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift"
      >
        {lado === "cliente" ? <WebMini /> : <PanelMini />}
      </motion.div>
    </div>
  )
}

function WebMini() {
  return (
    <div>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#e8a33d]" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="size-2.5 rounded-full bg-cyan" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper px-2 py-1 font-mono text-micro text-muted">
          fleximy.app/tu-negocio
        </span>
      </div>
      <div className="p-6">
        <p className="text-h3">Tu negocio, con una web que trabaja</p>
        <p className="mt-2 text-small text-muted">
          Información clara y un botón para consultar, reservar o pedir.
        </p>
        <div className="mt-5 inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 text-sm font-semibold text-on-accent">
          Consultar
          <Send className="size-3.5" />
        </div>
        <div className="mt-6 grid gap-2">
          {["Confirmación automática", "Consulta ordenada en el panel"].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-2.5 text-small">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-accent">
                ✓
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PanelMini() {
  return (
    <div className="bg-dark-surface text-text-invert">
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5">
        <p className="font-mono text-micro text-text-invert/70">panel interno · Fleximy</p>
        <span className="rounded-full bg-ink-soft px-2 py-0.5 font-mono text-micro text-cyan">
          3
        </span>
      </div>
      <div className="p-6">
        <p className="text-h3">Cada consulta, ordenada</p>
        <p className="mt-2 text-small text-text-invert/65">
          Asignación, estados e historial por cliente en un solo lugar.
        </p>
        <div className="mt-5 grid gap-2">
          {[
            { nombre: "Camila S.", estado: "Nueva", cls: "bg-accent text-on-accent" },
            { nombre: "Josefina M.", estado: "Asignada", cls: "bg-cyan/15 text-cyan" },
            { nombre: "Lucas R.", estado: "En seguimiento", cls: "bg-cyan/15 text-cyan" },
          ].map((row) => (
            <div
              key={row.nombre}
              className="flex items-center justify-between rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5"
            >
              <p className="text-sm font-medium">{row.nombre}</p>
              <span className={`rounded-full px-2.5 py-1 font-mono text-micro ${row.cls}`}>
                {row.estado}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 font-mono text-micro text-text-invert/50">
          <Check className="size-3.5 text-accent-on-dark" />
          historial completo por cliente
        </div>
      </div>
    </div>
  )
}
