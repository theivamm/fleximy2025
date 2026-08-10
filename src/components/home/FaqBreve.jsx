import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Button from "../ui/Button"

const FAQS = [
  {
    q: "¿Necesito conocimientos técnicos para usar Fleximy?",
    a: "No. Nos ocupamos de la parte técnica. Vos aprendés a usar tu panel con la capacitación incluida.",
  },
  {
    q: "¿Cuánto tiempo toma poner la web en marcha?",
    a: "Depende del rubro y del contenido, pero trabajamos con un plan de arranque definido y te acompañamos hasta la activación.",
  },
  {
    q: "¿Puedo dejar de usar Fleximy cuando quiera?",
    a: "Sí. No hay permanencia ni penalidades: mientras te sirva, seguís.",
  },
  {
    q: "¿Qué pasa si mi negocio cambia de rumbo?",
    a: "La base se adapta. Ajustamos secciones, panel y flujos a cómo evoluciona tu operación.",
  },
]

export default function FaqBreve() {
  const [abierta, setAbierta] = useState(0)

  return (
    <section className="container-site py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="kicker justify-center">Preguntas frecuentes</p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            Lo que nos preguntan <span className="text-primary">antes de empezar</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col divide-y divide-outline border-y border-outline">
          {FAQS.map((f, i) => {
            const open = abierta === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setAbierta(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`faq-breve-${i}`}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-bg-secondary/40"
                >
                  <span className="text-h4 text-ink-primary transition-colors duration-[var(--motion-fast)] group-hover:text-primary">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-ink-muted transition-transform duration-[var(--motion-fast)] ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-breve-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[52ch] pb-5 text-body text-ink-secondary">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button to="/preguntas-frecuentes" variant="secondary">
            Ver todas las preguntas frecuentes
          </Button>
        </div>
      </div>
    </section>
  )
}
