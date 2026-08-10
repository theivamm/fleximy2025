import { Link } from "react-router-dom"
import Button from "../ui/Button"
import { Play } from "lucide-react"

export default function DemoSeccion() {
  return (
    <section className="container-site py-20 lg:py-28">
      <div className="overflow-hidden rounded-[calc(var(--radius-card)*1.5)] bg-dark-surface text-text-invert">
        <div className="grid gap-10 p-8 lg:grid-cols-2 lg:items-center lg:p-14">
          <div>
            <p className="kicker" style={{ color: "rgba(245,246,255,0.55)" }}>
              Demo
            </p>
            <h2 className="mt-4 text-h1">Miralo funcionar</h2>
            <p className="mt-5 max-w-[46ch] text-lead text-text-invert/70">
              No te mostramos capturas ni videos editados. Probá demos reales y mirá cómo se
              siente recibir una consulta desde la web y atenderla desde el panel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/demos" size="lg">
                Probar demos
              </Button>
              <Button to="/contacto" variant="secondary" size="lg">
                Pedir una demo personalizada
              </Button>
            </div>
            <p className="mt-4 font-mono text-micro text-text-invert/50">
              demostraciones guiadas · con tus datos reales
            </p>
          </div>

          <Link
            to="/demos"
            className="group relative block aspect-video overflow-hidden rounded-2xl border border-line-dark bg-ink-soft"
          >
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-accent text-on-accent shadow-lift transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:scale-110">
                <Play className="size-6 translate-x-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <span className="rounded-full bg-dark-surface/70 px-3 py-1 font-mono text-micro text-text-invert/80">
                demo cliente → equipo
              </span>
              <span className="rounded-full bg-dark-surface/70 px-3 py-1 font-mono text-micro text-cyan">
                en vivo
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
