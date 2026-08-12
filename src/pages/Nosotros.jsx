import { ArrowUpRight } from "lucide-react"
import Button from "../components/ui/Button"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
import { PRINCIPIOS, COMO_TRABAJAMOS } from "../data/comercial"

export default function Nosotros() {
  return (
    <main>
      <PageHero
        kicker="Sobre Fleximy"
        title={
          <>
            Creamos Fleximy para que la tecnología{" "}
            <span className="text-gradient">se adapte a la PyME.</span>
          </>
        }
        lead="Muchas empresas no necesitan un sistema enorme. Necesitan ordenar lo que ya hacen, reducir tareas manuales y contar con una herramienta que su equipo realmente pueda usar."
        actions={
          <Button href="#como-trabajamos" size="lg">
            Conocer nuestra forma de trabajo
            <ArrowUpRight className="size-4" />
          </Button>
        }
      />

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site">
          <p className="kicker">Nuestra razón de ser</p>
          <h2 className="text-h2 mt-4 max-w-[20ch] text-text-1">
            Entre una web estática y un sistema complejo había un espacio sin resolver
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="font-mono text-micro text-text-3">por un lado</p>
              <p className="text-h3 mt-3 text-text-1">Webs que muestran</p>
              <p className="mt-3 text-small text-text-2">
                Las PyMEs invertían en sitios que mostraban información pero no ayudaban a operar.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="font-mono text-micro text-text-3">por el otro</p>
              <p className="text-h3 mt-3 text-text-1">Sistemas que complican</p>
              <p className="mt-3 text-small text-text-2">
                Encontraban sistemas rígidos, costosos o sobredimensionados para su realidad.
              </p>
            </div>
            <div
              className="rounded-[var(--radius-card)] border border-outline p-6 lg:p-8"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              <p className="font-mono text-micro text-white/70">en el medio</p>
              <p className="text-h3 mt-3 text-white">Fleximy conecta ambos mundos</p>
              <p className="mt-3 text-small text-white/85">
                Una experiencia profesional para el cliente y herramientas simples para el equipo
                que gestiona el negocio.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="border-t border-outline pt-6">
              <p className="font-mono text-micro text-text-3">misión</p>
              <p className="lead-text mt-3 text-text-1">
                Ayudar a las PyMEs a trabajar con mayor claridad mediante herramientas digitales
                accesibles, conectadas y adaptadas a su operación.
              </p>
            </div>
            <div className="border-t border-outline pt-6">
              <p className="font-mono text-micro text-text-3">visión</p>
              <p className="lead-text mt-3 text-text-1">
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
        <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Cómo decidimos</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPIOS.map((p, i) => (
            <div key={p.titulo} className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-h3 mt-3 text-text-1">{p.titulo}</h3>
              <p className="mt-3 text-small text-text-2">{p.texto}</p>
            </div>
          ))}
          <div
            className="flex flex-col justify-between gap-4 rounded-[var(--radius-card)] border border-outline p-6 lg:p-8"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <p className="text-h4 text-white">¿Cómo se nota en la práctica?</p>
            <p className="text-small text-white/85">
              En cada proyecto hay un alcance documentado, una persona que valida y una primera
              versión que se puede medir.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">El equipo</p>
            <h2 className="text-h2 mt-4 text-text-1">Gente responsable detrás de la plataforma</h2>
          </div>
          <div className="rounded-[var(--radius-card)] border border-dashed border-ink/30 bg-surface-1/60 p-6 lg:p-8">
            <p className="font-mono text-micro text-text-3">sección en preparación</p>
            <p className="lead-text mt-4 text-text-1">
              Las biografías y fotografías reales del equipo se incorporan antes de la publicación.
              No reemplazamos esa información con perfiles ficticios.
            </p>
            <div className="mt-6">
              <OutlineCTA to="/contacto">
                Conocer al equipo en una reunión
              </OutlineCTA>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Experiencia y respaldo</p>
            <h2 className="text-h2 mt-4 text-text-1">Datos verificables, sin cifras de relleno</h2>
          </div>
          <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
            <p className="font-mono text-micro text-text-3">pendiente de validación</p>
            <p className="lead-text mt-4 text-text-2">
              Años de experiencia, proyectos implementados, industrias atendidas y certificaciones
              se incorporan únicamente cuando pueden respaldarse con fuentes reales.
            </p>
            <ul className="mt-6 grid gap-2.5">
              {["Años de experiencia combinada.", "Proyectos implementados.", "Industrias atendidas.", "Partners y tecnologías relevantes."].map((t) => (
                <li key={t} className="flex items-start gap-3 text-small text-text-2">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-surface-3/70" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-trabajamos" className="container-site py-20 lg:py-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-8 lg:p-12"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">Cómo trabajamos</p>
              <h2 className="font-display h2-title mt-4 text-text-1">Un orden simple que se cumple</h2>
            </div>
            <PrimaryCTA to="/como-funciona" large>
              Ver cómo funciona la implementación
              <ArrowUpRight className="size-4" />
            </PrimaryCTA>
          </div>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMO_TRABAJAMOS.map((paso, i) => (
              <li key={paso} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-5">
                <span className="font-mono text-micro text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-small text-text-1">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site pb-20 lg:pb-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">Conversemos</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            Hablemos sobre la operación que querés mejorar
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Conocer al equipo en una reunión
            </PrimaryCTA>
            <OutlineCTA to="/soluciones" large>
              Ver soluciones
            </OutlineCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
