import { useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Check, MessageCircle, Play, ArrowRight, Building2 } from "lucide-react"
import Button from "../components/ui/Button"
import { CONTACT } from "../data/navigation"
import { track } from "../lib/analytics"

const RUBRO_A_SOLUCION = {
  Gastronomía: { to: "/soluciones/gastronomia", label: "Ver solución de Gastronomía" },
  "Servicios y turnos": { to: "/soluciones/servicios-turnos", label: "Ver solución de Turnos" },
  "Gestión de PyMEs": { to: "/soluciones/gestion-pymes", label: "Ver Gestión para PyMEs" },
  "Comercio y retail": { to: "/soluciones/comercio-retail", label: "Ver solución de Comercio" },
  Inmobiliarias: { to: "/soluciones/inmobiliarias", label: "Ver solución Inmobiliaria" },
  Educación: { to: "/soluciones/educacion", label: "Ver solución de Educación" },
  "Talleres y reparaciones": {
    to: "/soluciones/talleres-reparaciones",
    label: "Ver solución de Talleres",
  },
}

function rubroSeleccionado() {
  if (typeof window === "undefined") return null
  const rubro = window.sessionStorage.getItem("fleximy_rubro")
  return RUBRO_A_SOLUCION[rubro] || null
}

const container = {
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function GraciasDiagnostico() {
  const reduce = useReducedMotion()
  const solucion = rubroSeleccionado()

  useEffect(() => {
    track("gracias_visto", { rubro: solucion ? solucion.to : null })
  }, [solucion])

  const animProps = reduce
    ? { initial: false, animate: "show" }
    : { initial: "hidden", animate: "show" }

  return (
    <main className="bg-paper text-text">
      <section className="container-site flex min-h-[70vh] items-center py-24 lg:py-32">
        <div className="mx-auto w-full max-w-2xl text-center">
          <motion.div {...animProps} variants={container}>
            <motion.span
              variants={item}
              className="mx-auto grid size-16 place-items-center rounded-2xl bg-accent text-on-accent"
            >
              <motion.span
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <Check className="size-8" strokeWidth={2.5} />
              </motion.span>
            </motion.span>

            <motion.p variants={item} className="mt-8 kicker justify-center">
              Solicitud recibida
            </motion.p>

            <motion.h1 variants={item} className="mt-4 text-h1">
              Recibimos tu solicitud
            </motion.h1>

            <motion.p variants={item} className="mx-auto mt-5 max-w-[52ch] text-lead text-muted">
              Gracias por contarnos sobre tu negocio. Vamos a revisar la información y contactarte
              dentro de <span className="font-mono text-text">[PLAZO VALIDADO]</span> días hábiles.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-24">
        <div className="container-narrow">
          <motion.p
            {...animProps}
            variants={container}
            className="kicker justify-center lg:justify-start"
          >
            Mientras tanto
          </motion.p>

          <motion.div {...animProps} variants={container} className="mt-10 grid gap-4 lg:grid-cols-3">
            <motion.article
              variants={item}
              className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8"
            >
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-on-accent">
                  <Play className="size-5" />
                </span>
                <h2 className="mt-5 text-h3">Mirá Fleximy en acción</h2>
                <p className="mt-3 text-small text-muted">
                  Explorá las experiencias de clientes y paneles de gestión.
                </p>
              </div>
              <div className="mt-6">
                <Button to="/demos" variant="secondary" data-track="gracias_click_demo">
                  Probar demos
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.article>

            <motion.article
              variants={item}
              className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8"
            >
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-cyan/15 text-cyan-deep">
                  <Building2 className="size-5" />
                </span>
                <h2 className="mt-5 text-h3">Conocé la solución de tu rubro</h2>
                <p className="mt-3 text-small text-muted">
                  {solucion
                    ? "Mientras esperás nuestra respuesta, mirá cómo se aplica a tu rubro."
                    : "Mientras esperás nuestra respuesta, conocé las soluciones por rubro."}
                </p>
              </div>
              <div className="mt-6">
                <Button to={solucion ? solucion.to : "/soluciones"} variant="secondary">
                  {solucion ? solucion.label : "Ver soluciones"}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.article>

            <motion.article
              variants={item}
              className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8"
            >
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-dark-surface text-text-invert">
                  <MessageCircle className="size-5" />
                </span>
                <h2 className="mt-5 text-h3">¿Tu consulta es urgente?</h2>
                <p className="mt-3 text-small text-muted">
                  Escribinos por WhatsApp dentro de{" "}
                  <span className="font-mono text-text">[HORARIO REAL]</span> e indicá que ya
                  completaste el diagnóstico.
                </p>
              </div>
              <div className="mt-6">
                <Button href={CONTACT.whatsapp} variant="dark">
                  Hablar por WhatsApp
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
