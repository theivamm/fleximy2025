import { Link } from "react-router-dom"
import Button from "../ui/Button"
import { Play } from "lucide-react"

export default function DemoSeccion() {
  return (
    <section className="container-site py-24 lg:py-32">
      <div className="overflow-hidden rounded-[calc(var(--radius-card)*1.5)] bg-night text-on-night shadow-[var(--shadow-night)]">
        <div className="grid gap-10 p-8 lg:grid-cols-2 lg:items-center lg:p-14">
          <div>
            <p className="kicker" style={{ color: "rgba(246,247,255,0.55)" }}>
              Demo
            </p>
            <h2 className="mt-4 text-h1">
              Miralo <span className="text-primary-on-dark">funcionar</span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead text-on-night/70">
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
            <p className="mt-4 font-mono text-micro text-on-night/50">
              demostraciones guiadas · con tus datos reales
            </p>
          </div>

          <Link
            to="/demos"
            className="group relative block aspect-video overflow-hidden rounded-2xl border border-outline-night bg-night-elevated"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-pattern-dark opacity-50"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-primary text-white shadow-lift transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:scale-110">
                <Play className="size-6 translate-x-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <span className="rounded-full bg-night-mid px-3 py-1 font-mono text-micro text-on-night/80">
                demo cliente → equipo
              </span>
              <span className="rounded-full bg-night-mid px-3 py-1 font-mono text-micro text-secondary">
                en vivo
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
