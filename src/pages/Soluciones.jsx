import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight,
  Utensils,
  CalendarClock,
  LayoutDashboard,
  ShoppingCart,
  Building2,
  GraduationCap,
  Wrench,
} from "lucide-react"
import Button from "../components/ui/Button"
import { INDUSTRIES } from "../data/industries"

const ICONS = {
  gastronomia: Utensils,
  turnos: CalendarClock,
  pymes: LayoutDashboard,
  comercio: ShoppingCart,
  inmobiliarias: Building2,
  educacion: GraduationCap,
  talleres: Wrench,
}

const NECESIDADES = [
  { label: "Recibir reservas o turnos.", slug: "turnos" },
  { label: "Mostrar productos y actualizar precios.", slug: "comercio" },
  { label: "Gestionar clientes y seguimientos.", slug: "pymes" },
  { label: "Coordinar proyectos y tareas.", slug: "pymes" },
  { label: "Administrar pedidos u órdenes.", slug: "comercio" },
  { label: "Organizar propiedades y visitas.", slug: "inmobiliarias" },
  { label: "Gestionar alumnos y contenidos.", slug: "educacion" },
]

const MODULOS = {
  gastronomia: ["Menú digital", "Reservas", "Pedidos", "Mesas"],
  turnos: ["Reservas", "Disponibilidad", "Recordatorios", "Clientes"],
  pymes: ["CRM", "Proyectos", "Tareas", "Reportes"],
  comercio: ["Catálogo", "Stock", "Pedidos", "WhatsApp"],
  inmobiliarias: ["Propiedades", "Leads", "Visitas", "Agenda"],
  educacion: ["Cursos", "Inscripción", "Alumnos", "Progreso"],
  talleres: ["Órdenes", "Presupuestos", "Repuestos", "Estados"],
}

const ROWS = {
  gastronomia: [
    { t: "Comanda · mesa 4", meta: "Tortilla de papas", est: "nueva" },
    { t: "Reserva 20:30", meta: "4 personas", est: "activo" },
  ],
  turnos: [
    { t: "Camila S.", meta: "Corte · 16:00 hs", est: "nueva" },
    { t: "Javier P.", meta: "Barba · 17:30 hs", est: "activo" },
  ],
  pymes: [
    { t: "Estudio Ríos", meta: "Sitio + reservas", est: "nueva" },
    { t: "Vivero Alba", meta: "Catálogo + pedidos", est: "activo" },
  ],
  comercio: [
    { t: "Bicicleta urbana", meta: "Rodado 26 · $189.900", est: "nueva" },
    { t: "Pedido #128", meta: "2 unidades", est: "activo" },
  ],
  inmobiliarias: [
    { t: "Depto 2 amb. Palermo", meta: "USD 185.000", est: "nueva" },
    { t: "Casa 3 dorm.", meta: "USD 310.000", est: "activo" },
  ],
  educacion: [
    { t: "Diseño Web N1", meta: "8 inscriptos", est: "nueva" },
    { t: "Fotografía", meta: "4 inscriptos", est: "activo" },
  ],
  talleres: [
    { t: "OT #1042", meta: "Peugeot 208", est: "nueva" },
    { t: "OT #1039", meta: "Bicicleta MTB", est: "activo" },
  ],
}

const TRANSVERSALES = [
  "Sitio institucional",
  "Catálogo",
  "Formularios y leads",
  "CRM y seguimiento",
  "Agenda y reservas",
  "Pedidos y pagos",
  "Proyectos y tareas",
  "Inventario",
  "Notificaciones",
  "Reportes",
  "Usuarios y permisos",
]

const INCLUYE = [
  "Identidad visual.",
  "Información y estructura del negocio.",
  "Configuración de módulos acordados.",
  "Roles y permisos estándar.",
  "Carga inicial definida.",
  "Capacitación.",
]

const COTIZA = [
  "Integraciones no estándar.",
  "Migraciones complejas.",
  "Desarrollo de módulos exclusivos.",
  "Automatizaciones avanzadas.",
  "Volúmenes extraordinarios.",
  "Requerimientos regulatorios específicos.",
]

export default function Soluciones() {
  const root = useRef(null)
  const [activo, setActivo] = useState(0)
  const ind = INDUSTRIES[activo]

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hub-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".hub-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  const elegirNecesidad = (slug) => {
    const i = INDUSTRIES.findIndex((x) => x.slug === slug)
    setActivo(i === -1 ? 0 : i)
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="bg-paper text-text">
      <section ref={root} className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="hub-fade kicker">Soluciones Fleximy</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hub-line-inner block">Una base para cada negocio.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hub-line-inner block">Una solución adaptada a tu operación.</span>
            </span>
          </h1>
          <p className="hub-fade mt-6 max-w-[52ch] text-lead text-muted">
            Elegí el punto de partida más parecido a tu empresa. Configuramos los módulos, la
            identidad y los flujos según tu forma real de trabajar.
          </p>
          <div className="hub-fade mt-8">
            <Button to="/contacto" size="lg">
              Ayudarme a elegir una solución
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-16 lg:py-20">
        <div className="container-site">
          <p className="kicker">¿Qué necesitás ordenar primero?</p>
          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {NECESIDADES.map((n) => (
              <button
                key={n.label}
                onClick={() => elegirNecesidad(n.slug)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 text-left transition-colors hover:border-ink/40"
              >
                <span className="text-small text-text">{n.label}</span>
                <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-ink" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="container-site py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="kicker">Catálogo de soluciones</p>
            <h2 className="mt-4 text-h1">Un índice de sistemas, no una grilla de cards</h2>
          </div>
          <span className="font-mono text-micro text-muted">
            solución {String(activo + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-dark-surface/10">
          <motion.div
            animate={{ width: `${((activo + 1) / INDUSTRIES.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ backgroundColor: ind.accent }}
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div className="flex flex-col gap-1">
            {INDUSTRIES.map((item, i) => (
              <button
                key={item.slug}
                aria-pressed={activo === i}
                onClick={() => setActivo(i)}
                className={`group flex items-start gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  activo === i ? "border-ink bg-paper-bright" : "border-transparent hover:bg-paper-bright"
                }`}
              >
                <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-h3 text-text">{item.label}</span>
                  <span className="mt-1 block text-small text-muted">{item.tagline}</span>
                </span>
                {activo === i && (
                  <span className="mt-2 size-2 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} />
                )}
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Workbench ind={ind} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-dark-surface py-20 text-text-invert lg:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="kicker" style={{ color: "rgba(245,246,255,0.55)" }}>
              Arquitectura modular
            </p>
            <h2 className="mt-4 text-h1">Tu solución no queda encerrada en una categoría</h2>
            <p className="mt-5 text-lead text-text-invert/65">
              Un comercio puede necesitar turnos. Una inmobiliaria puede necesitar proyectos. Una
              academia puede vender productos. Fleximy permite combinar módulos cuando existe una
              necesidad real.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-2.5">
            {TRANSVERSALES.map((m, i) => (
              <li
                key={m}
                className="flex items-center gap-3 rounded-full border border-line-dark bg-ink-soft px-4 py-2 text-small text-text-invert/85"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {m}
                <span className="font-mono text-micro text-text-invert/35">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">Qué significa "adaptado"</p>
            <h2 className="mt-4 text-h1">Incluye normalmente</h2>
            <ul className="mt-8 grid gap-2.5">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-micro text-muted">se cotiza por separado cuando corresponde</p>
            <ul className="mt-4 grid gap-2.5">
              {COTIZA.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small text-muted">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-dark-surface/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark-surface text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(245,246,255,0.55)" }}>
            ¿Dudás?
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            ¿No sabés qué solución elegir?
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            Contanos cómo trabajás hoy y te proponemos una primera versión concreta, sin sumar
            funciones que no necesitás.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar diagnóstico gratuito
            </Button>
            <Button to="/demos" variant="secondary" size="lg">
              Probar las demos
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function Workbench({ ind }) {
  const Icon = ICONS[ind.slug]
  const modulos = MODULOS[ind.slug]
  const rows = ROWS[ind.slug]

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-dark-surface/15" />
        <span className="size-2.5 rounded-full bg-dark-surface/15" />
        <span className="size-2.5 rounded-full bg-dark-surface/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper px-2 py-1 font-mono text-micro text-muted">
          fleximy.app/{ind.slug}
        </span>
        <span className="font-mono text-micro text-muted">panel interno</span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl" style={{ backgroundColor: ind.accent, color: "var(--color-ink)" }}>
            <Icon className="size-6" />
          </span>
          <div>
            <p className="font-mono text-micro text-muted">solución {ind.label}</p>
            <h3 className="text-h3 text-text">{ind.label}</h3>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {modulos.map((m) => (
            <span key={m} className="rounded-full border border-line bg-paper px-3 py-1.5 text-small text-text">
              {m}
            </span>
          ))}
        </div>

        <ul className="mt-5 grid gap-2">
          {rows.map((r) => (
            <li key={r.t} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text">{r.t}</p>
                <p className="truncate font-mono text-micro text-muted">{r.meta}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-micro ${
                  r.est === "nueva" ? "bg-accent text-on-accent" : "bg-cyan/15 text-cyan-deep"
                }`}
              >
                {r.est === "nueva" ? "Nuevo" : "Activo"}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to={ind.to}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text hover:underline underline-offset-4"
        >
          Explorar {ind.label}
          <ArrowUpRight className="size-4 transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  )
}
