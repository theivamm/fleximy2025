import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ArrowUpRight, Check } from "lucide-react"
import Button from "../components/ui/Button"
import {
  ETAPAS,
  FACTORES_PLAZO,
  RESPONSABILIDADES,
} from "../data/comercial"

function CapaDiagnostico() {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="font-mono text-micro text-muted">Mapa de proceso</p>
      <div className="mt-3 flex items-center gap-2">
        {["Entrada", "Proceso", "Salida"].map((nodo, i) => (
          <div key={nodo} className="flex flex-1 items-center gap-2">
            <span className="flex-1 rounded-lg border border-line bg-paper-bright px-2 py-2 text-center text-small text-text">
              {nodo}
            </span>
            {i < 2 && <span className="text-muted">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-micro text-muted">+ tareas manuales detectadas · 4</p>
    </div>
  )
}

function CapaDefinicion() {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="font-mono text-micro text-muted">Módulos acordados</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Sitio web", "Reservas", "Panel", "Clientes"].map((m) => (
          <span key={m} className="rounded-full border border-line bg-paper-bright px-3 py-1 text-small text-text">
            {m}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-micro text-cyan-deep">alcance validado por escrito</p>
    </div>
  )
}

function CapaConfiguracion() {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <div className="flex items-center gap-3">
        <span className="size-6 rounded-md" style={{ backgroundColor: "var(--color-accent)" }} />
        <div>
          <p className="text-small font-semibold text-text">Identidad aplicada</p>
          <p className="font-mono text-micro text-muted">mi-negocio.fleximy.app</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-line bg-paper-bright px-3 py-2">
        <span className="font-mono text-micro text-muted">Entorno de trabajo</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-micro text-cyan-deep">
          <span className="size-1.5 rounded-full bg-cyan" /> listo
        </span>
      </div>
    </div>
  )
}

function CapaRevision() {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="font-mono text-micro text-muted">Revisión funcional</p>
      <ul className="mt-3 grid gap-1.5">
        {["Desktop y mobile", "Formularios", "Integraciones"].map((t) => (
          <li key={t} className="flex items-center gap-2 text-small text-text">
            <span className="grid size-4 place-items-center rounded-full bg-accent text-ink">
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
    <div className="rounded-xl border border-line bg-paper p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-micro text-muted">Estado</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-micro text-ink">
          <span className="size-1.5 rounded-full bg-ink" /> Publicado
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {["A", "B", "C"].map((s) => (
            <span key={s} className="grid size-8 place-items-center rounded-full border border-line bg-paper-bright text-micro font-bold text-muted">
              {s}
            </span>
          ))}
        </div>
        <span className="font-mono text-micro text-muted">equipo capacitado</span>
      </div>
    </div>
  )
}

function CapaSoporte() {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="font-mono text-micro text-muted">Actividad reciente</p>
      <ul className="mt-3 grid gap-1.5 font-mono text-micro text-muted">
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
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper px-2 py-1 font-mono text-micro text-muted">
          fleximy.app/armado
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-micro text-muted">Armado del sistema</p>
          <p className="font-mono text-micro text-muted">
            etapa {String(activo + 1).padStart(2, "0")} / {String(ETAPAS.length).padStart(2, "0")}
          </p>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${((activo + 1) / ETAPAS.length) * 100}%` }}
          />
        </div>
        {CAPAS.slice(0, activo + 1).map((Capa, i) => (
          <div key={i} className="fade-suelo">
            <Capa />
          </div>
        ))}
        {activo === ETAPAS.length - 1 && (
          <div className="rounded-xl border border-line bg-ink p-4 text-text-invert">
            <p className="text-small font-semibold">Fleximy en operación</p>
            <p className="mt-1 font-mono text-micro text-text-invert/60">
              seguimos administrando la infraestructura y acompañando al equipo
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ComoFunciona() {
  const root = useRef(null)
  const stageRefs = useRef([])
  const [activo, setActivo] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".cf-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".cf-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

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
    <main ref={root} className="bg-paper text-text">
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="cf-fade kicker">Implementación Fleximy</p>
          <h1 className="mt-6 max-w-[16ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cf-line-inner block">Un proceso claro para</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cf-line-inner block">poner tu negocio en marcha.</span>
            </span>
          </h1>
          <p className="cf-fade mt-6 max-w-[52ch] text-lead text-muted">
            Primero entendemos cómo trabajás. Después configuramos una solución concreta,
            capacitamos a tu equipo y acompañamos la adopción.
          </p>
          <div className="cf-fade mt-8">
            <Button to="/contacto" size="lg">
              Comenzar diagnóstico
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-16 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <div>
            <p className="kicker">Principio de trabajo</p>
            <h2 className="mt-4 text-h1">No digitalizamos el desorden: primero definimos el proceso</h2>
          </div>
          <p className="text-lead text-muted">
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
                    <span className="font-mono text-micro text-muted">etapa {etapa.n}</span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <h3 className="mt-3 text-h2">{etapa.titulo}</h3>
                  <p className="mt-2 text-lead text-muted">{etapa.resumen}</p>

                  <p className="mt-6 font-mono text-micro text-muted">{etapa.detalle}</p>
                  <ul className="mt-3 grid gap-2">
                    {etapa.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small">
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {etapa.recibis && (
                    <>
                      <p className="mt-6 font-mono text-micro text-muted">{etapa.recibisTitulo}</p>
                      <ul className="mt-3 grid gap-2">
                        {etapa.recibis.map((item) => (
                          <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-small text-muted">
                            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {etapa.nota && (
                    <p className="mt-5 max-w-[52ch] rounded-xl border border-line bg-paper-bright px-4 py-3 text-small text-muted">
                      {etapa.nota}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
            <Tablero activo={activo} />
            <p className="mt-4 font-mono text-micro text-muted">
              la escena muestra el sistema armándose etapa por etapa · contenido ilustrativo
            </p>
          </aside>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Tiempos</p>
            <h2 className="mt-4 text-h1">¿Cuánto demora?</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-muted">
              Una implementación base puede estar lista desde{" "}
              <span className="font-mono text-text">[PLAZO VALIDADO]</span> días hábiles, una vez
              recibido el contenido y aprobado el alcance. Proyectos con migraciones o integraciones
              especiales requieren un cronograma propio.
            </p>
          </div>
          <div>
            <p className="font-mono text-micro text-muted">factores que afectan el plazo</p>
            <ul className="mt-4 grid gap-2.5">
              {FACTORES_PLAZO.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-ink/20" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-text-invert lg:py-28">
        <div className="container-site">
          <p className="kicker" style={{ color: "rgba(244,243,238,0.55)" }}>
            Responsabilidades
          </p>
          <h2 className="mt-4 max-w-[18ch] text-h1">Cada parte sabe qué le toca</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-line-dark bg-ink-soft p-6 lg:p-8">
              <p className="text-h4 text-accent">Fleximy</p>
              <ul className="mt-5 grid gap-2.5">
                {RESPONSABILIDADES.fleximy.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-small text-text-invert/85">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line-dark bg-ink-soft p-6 lg:p-8">
              <p className="text-h4 text-text-invert">Cliente</p>
              <ul className="mt-5 grid gap-2.5">
                {RESPONSABILIDADES.cliente.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-small text-text-invert/85">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
            Empecemos
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">Empecemos por entender tu operación</h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            No necesitás llegar con una especificación técnica. Contanos qué hacés hoy, qué
            herramientas usás y qué parte del proceso querés mejorar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar diagnóstico gratuito
            </Button>
            <Button to="/demos" variant="secondary" size="lg">
              Ver demos
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
