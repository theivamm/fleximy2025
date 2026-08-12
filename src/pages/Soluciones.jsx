import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Utensils, CalendarClock, LayoutDashboard, ShoppingCart, Building2, GraduationCap, Wrench } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
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
  const [activo, setActivo] = useState(0)
  const ind = INDUSTRIES[activo]

  const elegirNecesidad = (slug) => {
    const i = INDUSTRIES.findIndex((x) => x.slug === slug)
    setActivo(i === -1 ? 0 : i)
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main>
      <PageHero
        kicker="Soluciones Fleximy"
        title={
          <>
            Una base para cada negocio.{" "}
            <span className="text-gradient">Una solución adaptada a tu operación.</span>
          </>
        }
        lead="Elegí el punto de partida más parecido a tu empresa. Configuramos los módulos, la identidad y los flujos según tu forma real de trabajar."
        actions={
          <PrimaryCTA to="/contacto" large>
            Ayudarme a elegir una solución
          </PrimaryCTA>
        }
        meta={`${INDUSTRIES.length} bases listas para adaptar · diagnóstico gratuito`}
      />

      <section className="border-y border-outline bg-surface-2/40 py-16 lg:py-20">
        <div className="container-site">
          <span className="kicker">¿Qué necesitás ordenar primero?</span>
          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {NECESIDADES.map((n) => (
              <button
                key={n.label}
                onClick={() => elegirNecesidad(n.slug)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3.5 text-left transition-colors hover:border-primary/60"
              >
                <span className="text-small text-text-1">{n.label}</span>
                <ArrowUpRight className="size-4 shrink-0 text-text-3 transition-colors group-hover:text-primary" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="container-site py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="kicker">Catálogo de soluciones</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">
              Un índice de sistemas, no una grilla de cards
            </h2>
          </div>
          <span className="font-mono text-micro text-text-3">
            solución {String(activo + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-3/60">
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
                  activo === i ? "border-primary/70 bg-surface-2/60" : "border-transparent hover:bg-surface-2/40"
                }`}
              >
                <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="font-display block text-h3 text-text-1">{item.label}</span>
                  <span className="mt-1 block text-small text-text-3">{item.tagline}</span>
                </span>
                {activo === i && (
                  <span className="mt-2 size-2 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} />
                )}
              </button>
            ))}
          </div>

          <div>
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

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="kicker">Arquitectura modular</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">
              Tu solución no queda encerrada en una categoría
            </h2>
            <p className="lead-text mt-5 text-text-2">
              Un comercio puede necesitar turnos. Una inmobiliaria puede necesitar proyectos. Una
              academia puede vender productos. Fleximy permite combinar módulos cuando existe una
              necesidad real.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-2.5">
            {TRANSVERSALES.map((m, i) => (
              <li
                key={m}
                className="flex items-center gap-3 rounded-full border border-outline bg-surface-1/60 px-4 py-2 text-small text-text-2"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {m}
                <span className="font-mono text-micro text-text-4">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="kicker">Qué significa "adaptado"</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">Incluye normalmente</h2>
            <ul className="mt-8 grid gap-2.5">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-2">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-micro text-text-3">se cotiza por separado cuando corresponde</p>
            <ul className="mt-4 grid gap-2.5">
              {COTIZA.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/40 px-4 py-3 text-small text-text-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-surface-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site pb-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16" style={{ backgroundImage: "var(--background-image-primary)" }}>
          <span className="kicker justify-center">¿Dudás?</span>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            ¿No sabés qué solución elegir?
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Contanos cómo trabajás hoy y te proponemos una primera versión concreta, sin sumar
            funciones que no necesitás.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar diagnóstico gratuito
            </PrimaryCTA>
            <OutlineCTA to="/demos" large>
              Probar las demos
            </OutlineCTA>
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
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-outline bg-surface-1/80 shadow-[var(--shadow-lg)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-outline px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="size-2.5 rounded-full bg-surface-3" />
        <span className="ml-2 flex-1 truncate rounded-md bg-surface-2/70 px-2 py-1 font-mono text-micro text-text-3">
          fleximy.app/{ind.slug}
        </span>
        <span className="font-mono text-micro text-text-3">panel interno</span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3">
          <span
            className="grid size-12 place-items-center rounded-xl"
            style={{ backgroundColor: `color-mix(in srgb, ${ind.accent} 22%, transparent)`, color: ind.accent }}
          >
            <Icon className="size-6" />
          </span>
          <div>
            <p className="font-mono text-micro text-text-3">solución {ind.label}</p>
            <h3 className="font-display text-h3 text-text-1">{ind.label}</h3>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {modulos.map((m) => (
            <span key={m} className="rounded-full border border-outline bg-surface-2/60 px-3 py-1.5 text-small text-text-2">
              {m}
            </span>
          ))}
        </div>

        <ul className="mt-5 grid gap-2">
          {rows.map((r) => (
            <li key={r.t} className="flex items-center justify-between gap-3 rounded-xl border border-outline bg-surface-2/40 px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-1">{r.t}</p>
                <p className="truncate font-mono text-micro text-text-3">{r.meta}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-micro ${
                  r.est === "nueva" ? "bg-accent text-accent-on" : "bg-cyan/15 text-cyan"
                }`}
              >
                {r.est === "nueva" ? "Nuevo" : "Activo"}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to={ind.to}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-1 hover:text-primary"
        >
          Explorar {ind.label}
          <ArrowUpRight className="size-4 transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  )
}
