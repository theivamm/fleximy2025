import Button from "../ui/Button"
import { Server, Database, Users, LifeBuoy, RefreshCw, Unlink } from "lucide-react"

const ITEMS = [
  {
    icon: Server,
    titulo: "Alojamiento y dominio",
    detalle: "Nos ocupamos del hosting y el dominio para que no tengas que pensar en la técnica.",
  },
  {
    icon: Database,
    titulo: "Datos con respaldo",
    detalle: "Tu información respaldada y accesible desde el panel, siempre.",
  },
  {
    icon: Users,
    titulo: "Capacitación incluida",
    detalle: "Te enseñamos a usar tu panel hasta que tu equipo se sienta cómodo.",
  },
  {
    icon: LifeBuoy,
    titulo: "Soporte humano",
    detalle: "Si algo se complica, hablamos con personas que conocen tu negocio.",
  },
  {
    icon: RefreshCw,
    titulo: "Actualizaciones",
    detalle: "Mantenemos tu sitio actualizado, seguro y funcionando.",
  },
  {
    icon: Unlink,
    titulo: "Sin permanencia",
    detalle: "Seguís mientras te sirva, sin contratos que te atan.",
  },
]

export default function Confianza() {
  return (
    <section className="bg-bg-primary py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="kicker">Confianza</p>
            <h2 className="mt-5 text-h1">
              Tecnología administrada. <span className="text-primary">Acompañamiento humano.</span>
            </h2>
          </div>
          <Button to="/seguridad" variant="secondary">
            Conocer seguridad y continuidad
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.titulo}
                className="rounded-2xl border border-outline bg-surface p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary-deep">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-4 text-h4 text-ink-primary">{item.titulo}</h3>
                <p className="mt-2 text-small text-ink-secondary">{item.detalle}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
