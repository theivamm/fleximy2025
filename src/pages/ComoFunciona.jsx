import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
import {
  ETAPAS,
  FACTORES_PLAZO,
  RESPONSABILIDADES,
} from "../data/comercial"

function CapaDiagnostico() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <p className="font-mono text-micro text-text-3">Mapa de proceso</p>
      <div className="mt-3 flex items-center gap-2">
        {["Entrada", "Proceso", "Salida"].map((nodo, i) => (
          <div key={nodo} className="flex flex-1 items-center gap-2">
            <span className="flex-1 rounded-lg border border-outline bg-surface-2/50 px-2 py-2 text-center text-small text-text-1">
              {nodo}
            </span>
            {i < 2 && <span className="text-text-3">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-micro text-text-3">+ tareas manuales detectadas · 4</p>
    </div>
  )
}

function CapaDefinicion() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <p className="font-mono text-micro text-text-3">Módulos acordados</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Sitio web", "Reservas", "Panel", "Clientes"].map((m) => (
          <span key={m} className="rounded-full border border-outline bg-surface-2/50 px-3 py-1 text-small text-text-1">
            {m}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-micro text-cyan">alcance validado por escrito</p>
    </div>
  )
}

function CapaConfiguracion() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <div className="flex items-center gap-3">
        <span className="size-6 rounded-md" style={{ backgroundColor: "var(--color-accent)" }} />
        <div>
          <p className="text-small font-semibold text-text-1">Identidad aplicada</p>
          <p className="font-mono text-micro text-text-3">mi-negocio.fleximy.app</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-outline bg-surface-2/50 px-3 py-2">
        <span className="font-mono text-micro text-text-3">Entorno de trabajo</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-micro text-cyan">
          <span className="size-1.5 rounded-full bg-cyan" /> listo
        </span>
      </div>
    </div>
  )
}

function CapaRevision() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <p className="font-mono text-micro text-text-3">Revisión funcional</p>
      <ul className="mt-3 grid gap-1.5">
        {["Desktop y mobile", "Formularios", "Integraciones"].map((t) => (
          <li key={t} className="flex items-center gap-2 text-small text-text-1">
            <span className="grid size-4 place-items-center rounded-full bg-accent text-accent-on">
              <Check className="size-3" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CapaLanzamiento() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-micro text-text-3">Estado</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-micro text-accent-on">
          <span className="size-1.5 rounded-full bg-surface-2" /> Publicado
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {["A", "B", "C"].map((s) => (
            <span key={s} className="grid size-8 place-items-center rounded-full border border-outline bg-surface-2/60 text-micro font-bold text-text-2">
              {s}
            </span>
          ))}
        </div>
        <span className="font-mono text-micro text-text-3">equipo capacitado</span>
      </div>
    </div>
  )
}

function CapaSoporte() {
  return (
    <div className="rounded-xl border border-outline bg-surface-1/60 p-4">
      <p className="font-mono text-micro text-text-3">Actividad reciente</p>
      <ul className="mt-3 grid gap-1.5 font-mono text-micro text-text-3">
        {["respaldo completado", "soporte respondido · 12 min", "revisión mensual agendada"].map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  )
}

const CAPAS = [
  CapaDiagnostico,
  CapaDefinicion,
  CapaConfiguracion,
  CapaRevision,
  CapaLanzamiento,
  CapaSoporte,
]

function Tablero({ activo }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-outline bg-surface-1/80 shadow-[var(--shadow-lg)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-outline px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="ml-2 flex-1 truncate rounded-md bg-surface-2/70 px-2 py-1 font-mono text-micro text-text-3">
          fleximy.app/armado
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-micro text-text-3">Armado del sistema</p>
          <p className="font-mono text-micro text-text-3">
            etapa {String(activo + 1).padStart(2, "0")} / {String(ETAPAS.length).padStart(2, "0")}
          </p>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-3/60">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((activo + 1) / ETAPAS.length) * 100}%`, backgroundImage: "var(--gradient-primary)" }}
          />
        </div>
        {CAPAS.slice(0, activo + 1).map((Capa, i) => (
          <div key={i}>
            <Capa />
          </div>
        ))}
        {activo === ETAPAS.length - 1 && (
          <div className="rounded-xl border border-primary/40 bg-surface-2/60 p-4">
            <p className="text-small font-semibold text-text-1">Fleximy en operación</p>
            <p className="mt-1 font-mono text-micro text-text-3">
              seguimos administrando la infraestructura y acompañando al equipo
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ComoFunciona() {
  const stageRefs = useRef([])
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index)
            setActivo(idx)
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    stageRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main>
      <PageHero
        kicker="Implementación Fleximy"
        title={
          <>
            Un proceso claro para{" "}
            <span className="text-gradient">poner tu negocio en marcha.</span>
          </>
        }
        lead="Primero entendemos cómo trabajás. Después configuramos una solución concreta, capacitamos a tu equipo y acompañamos la adopción."
        actions={
          <PrimaryCTA to="/contacto" large>
            Comenzar diagnóstico
            <ArrowUpRight className="size-4" />
          </PrimaryCTA>
        }
      />

      <section className="border-y border-outline bg-surface-2/40 py-16 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <div>
            <span className="kicker">Principio de trabajo</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">
              No digitalizamos el desorden: primero definimos el proceso
            </h2>
          </div>
          <p className="lead-text text-text-2">
            Antes de configurar pantallas, revisamos cómo ingresa la información, quién actúa,
            qué decisiones se toman y dónde aparecen demoras o errores.
          </p>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start">
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-16">
              {ETAPAS.map((etapa, i) => (
                <article key={etapa.n} ref={(el) => (stageRefs.current[i] = el)} data-index={i} className="scroll-mt-32">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-micro text-text-3">etapa {etapa.n}</span>
                    <span className="h-px flex-1 bg-outline" />
                  </div>
                  <h3 className="font-display text-h2 mt-3 text-text-1">{etapa.titulo}</h3>
                  <p className="lead-text mt-2 text-text-2">{etapa.resumen}</p>

                  <p className="mt-6 font-mono text-micro text-text-3">{etapa.detalle}</p>
                  <ul className="mt-3 grid gap-2">
                    {etapa.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-2">
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {etapa.recibis && (
                    <>
                      <p className="mt-6 font-mono text-micro text-text-3">{etapa.recibisTitulo}</p>
                      <ul className="mt-3 grid gap-2">
                        {etapa.recibis.map((item) => (
                          <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/40 px-4 py-3 text-small text-text-3">
                            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {etapa.nota && (
                    <p className="mt-5 max-w-[52ch] rounded-xl border border-outline bg-surface-2/50 px-4 py-3 text-small text-text-3">
                      {etapa.nota}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="order-1 lg:order-2">
            <Tablero activo={activo} />
            <p className="mt-4 font-mono text-micro text-text-3">
              la escena muestra el sistema armándose etapa por etapa · contenido ilustrativo
            </p>
          </aside>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <span className="kicker">Tiempos</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">¿Cuánto demora?</h2>
            <p className="lead-text mt-5 max-w-[48ch] text-text-2">
              Una implementación base puede estar lista desde{" "}
              <span className="font-mono text-primary">[PLAZO VALIDADO]</span> días hábiles, una vez
              recibido el contenido y aprobado el alcance. Proyectos con migraciones o integraciones
              especiales requieren un cronograma propio.
            </p>
          </div>
          <div>
            <p className="font-mono text-micro text-text-3">factores que afectan el plazo</p>
            <ul className="mt-4 grid gap-2.5">
              {FACTORES_PLAZO.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-2">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-surface-3" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site">
          <span className="kicker">Responsabilidades</span>
          <h2 className="font-display text-h2 mt-4 max-w-[18ch] text-text-1">
            Cada parte sabe qué le toca
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="text-h4 text-primary">Fleximy</p>
              <ul className="mt-5 grid gap-2.5">
                {RESPONSABILIDADES.fleximy.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-small text-text-2">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="text-h4 text-text-1">Cliente</p>
              <ul className="mt-5 grid gap-2.5">
                {RESPONSABILIDADES.cliente.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-small text-text-2">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16" style={{ backgroundImage: "var(--background-image-primary)" }}>
          <span className="kicker justify-center">Empecemos</span>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            Empecemos por entender tu operación
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            No necesitás llegar con una especificación técnica. Contanos qué hacés hoy, qué
            herramientas usás y qué parte del proceso querés mejorar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar diagnóstico gratuito
            </PrimaryCTA>
            <OutlineCTA to="/demos" large>
              Ver demos
            </OutlineCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
