import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import Button from "../components/ui/Button"
import { PRINCIPIOS, COMO_TRABAJAMOS } from "../data/comercial"

export default function Nosotros() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".no-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".no-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  return (
    <main ref={root} className="bg-paper text-text">
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="no-fade kicker">Sobre Fleximy</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="no-line-inner block">Creamos Fleximy para que la</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="no-line-inner block">tecnología se adapte a la PyME.</span>
            </span>
          </h1>
          <p className="no-fade mt-6 max-w-[52ch] text-lead text-muted">
            Muchas empresas no necesitan un sistema enorme. Necesitan ordenar lo que ya hacen,
            reducir tareas manuales y contar con una herramienta que su equipo realmente pueda usar.
          </p>
          <div className="no-fade mt-8">
            <Button href="#como-trabajamos" size="lg">
              Conocer nuestra forma de trabajo
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site">
          <p className="kicker">Nuestra razón de ser</p>
          <h2 className="mt-4 max-w-[20ch] text-h1">
            Entre una web estática y un sistema complejo había un espacio sin resolver
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8">
              <p className="font-mono text-micro text-muted">por un lado</p>
              <p className="mt-3 text-h3">Webs que muestran</p>
              <p className="mt-3 text-small text-muted">
                Las PyMEs invertían en sitios que mostraban información pero no ayudaban a operar.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8">
              <p className="font-mono text-micro text-muted">por el otro</p>
              <p className="mt-3 text-h3">Sistemas que complican</p>
              <p className="mt-3 text-small text-muted">
                Encontraban sistemas rígidos, costosos o sobredimensionados para su realidad.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-ink p-6 text-text-invert lg:p-8">
              <p className="font-mono text-micro text-text-invert/60">en el medio</p>
              <p className="mt-3 text-h3 text-accent">Fleximy conecta ambos mundos</p>
              <p className="mt-3 text-small text-text-invert/80">
                Una experiencia profesional para el cliente y herramientas simples para el equipo
                que gestiona el negocio.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="border-t border-line pt-6">
              <p className="font-mono text-micro text-muted">misión</p>
              <p className="mt-3 text-lead">
                Ayudar a las PyMEs a trabajar con mayor claridad mediante herramientas digitales
                accesibles, conectadas y adaptadas a su operación.
              </p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="font-mono text-micro text-muted">visión</p>
              <p className="mt-3 text-lead">
                Que una empresa pequeña o mediana pueda acceder a una plataforma profesional sin
                depender de múltiples herramientas, procesos técnicos innecesarios o desarrollos
                imposibles de sostener.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Principios</p>
        <h2 className="mt-4 max-w-[16ch] text-h1">Cómo decidimos</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPIOS.map((p, i) => (
            <div key={p.titulo} className="bg-paper-bright p-6 lg:p-8">
              <p className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-h3">{p.titulo}</h3>
              <p className="mt-3 text-small text-muted">{p.texto}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between gap-4 bg-ink p-6 text-text-invert lg:p-8">
            <p className="text-h4 text-accent">¿Cómo se nota en la práctica?</p>
            <p className="text-small text-text-invert/75">
              En cada proyecto hay un alcance documentado, una persona que valida y una primera
              versión que se puede medir.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">El equipo</p>
            <h2 className="mt-4 text-h1">Gente responsable detrás de la plataforma</h2>
          </div>
          <div className="rounded-[var(--radius-card)] border border-dashed border-ink/30 bg-paper p-6 lg:p-8">
            <p className="font-mono text-micro text-muted">sección en preparación</p>
            <p className="mt-4 text-lead">
              Las biografías y fotografías reales del equipo se incorporan antes de la publicación.
              No reemplazamos esa información con perfiles ficticios.
            </p>
            <div className="mt-6">
              <Button to="/contacto" variant="secondary">
                Conocer al equipo en una reunión
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Experiencia y respaldo</p>
            <h2 className="mt-4 text-h1">Datos verificables, sin cifras de relleno</h2>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-6 lg:p-8">
            <p className="font-mono text-micro text-muted">pendiente de validación</p>
            <p className="mt-4 text-lead text-muted">
              Años de experiencia, proyectos implementados, industrias atendidas y certificaciones
              se incorporan únicamente cuando pueden respaldarse con fuentes reales.
            </p>
            <ul className="mt-6 grid gap-2.5">
              {["Años de experiencia combinada.", "Proyectos implementados.", "Industrias atendidas.", "Partners y tecnologías relevantes."].map((t) => (
                <li key={t} className="flex items-start gap-3 text-small text-muted">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-ink/20" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-trabajamos" className="bg-ink py-20 text-text-invert lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker" style={{ color: "rgba(244,243,238,0.55)" }}>
                Cómo trabajamos
              </p>
              <h2 className="mt-4 text-h1">Un orden simple que se cumple</h2>
            </div>
            <Button to="/como-funciona" variant="dark" size="lg">
              Ver cómo funciona la implementación
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
            {COMO_TRABAJAMOS.map((paso, i) => (
              <li key={paso} className="flex items-start gap-4 bg-ink-soft p-6">
                <span className="font-mono text-micro text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-small text-text-invert/85">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
            Conversemos
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            Hablemos sobre la operación que querés mejorar
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Conocer al equipo en una reunión
            </Button>
            <Button to="/soluciones" variant="secondary" size="lg">
              Ver soluciones
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
