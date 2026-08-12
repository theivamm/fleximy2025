import { Link } from "react-router-dom"
import SectionIntro from "../components/ui/SectionIntro"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import StatusChip from "../components/ui/StatusChip"
import CssChart from "../components/ui/CssChart"
import CssKanban from "../components/ui/CssKanban"

const SERVICES = [
  {
    n: "01",
    name: "Aplicaciones y plataformas",
    desc: "Productos web con lógica real: portales, SaaS, apps y automatizaciones que operan tu negocio.",
    features: ["Portales de clientes", "Plataformas SaaS", "Apps web", "Automatizaciones"],
    tone: "primary",
  },
  {
    n: "02",
    name: "Sitios web que convierten",
    desc: "Presencia digital clara y comercial, pensada para vender, captar y generar confianza.",
    features: ["Sitios comerciales", "Landings", "Ecommerce", "SEO"],
    tone: "secondary",
  },
  {
    n: "03",
    name: "Dashboards y sistemas de gestión",
    desc: "Paneles, tableros y sistemas internos para administrar clientes, stock, equipos y reportes.",
    features: ["Dashboards", "Sistemas de gestión", "Reportes", "KPIs"],
    tone: "blue",
  },
  {
    n: "04",
    name: "Diseño UI/UX",
    desc: "Interfaces claras y agradables, basadas en la forma en que trabajan tus usuarios.",
    features: ["UX research", "Diseño de interfaces", "Design systems", "Prototipos"],
    tone: "accent",
  },
]

export default function Servicios() {
  return (
    <main className="pt-28 text-text-1 sm:pt-36">
      {/* Hero */}
      <section className="container-site">
        <div className="flex max-w-3xl flex-col items-start">
          <span className="kicker">Servicios</span>
          <h1 className="display-title mt-6 font-display">
            Productos digitales que <span className="text-gradient">hacen el trabajo pesado.</span>
          </h1>
          <p className="lead-text mt-6 max-w-xl text-text-secondary">
            Diseñamos y desarrollamos aplicaciones, sitios, dashboards y sistemas. Elegí el servicio según lo que necesite tu negocio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCTA large>Contanos tu idea</PrimaryCTA>
            <Link
              to="/demos"
              data-track="servicios_demos"
              className="inline-flex h-14 items-center rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 transition-colors hover:bg-surface-2/70"
            >
              Ver demos
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios detallados */}
      <section className="container-site mt-20 flex flex-col gap-16 sm:mt-28">
        {SERVICES.map((s, i) => (
          <article
            key={s.n}
            className={`grid items-center gap-8 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div className="lg:[direction:ltr]">
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `var(--${s.tone})` }}>
                {s.n} · {s.name}
              </span>
              <h2 className="h3-title mt-3 font-display text-text-1">{s.name}</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-text-secondary">{s.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.features.map((f) => (
                  <li key={f} className="rounded-full border border-outline bg-surface-1/60 px-3 py-1 text-xs text-text-2">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-3">
                <Link
                  to="/contacto"
                  data-track={`servicio_${s.tone}`}
                  className="group inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  Empezar
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:[direction:ltr]">
              <ServiceDemo index={i} />
            </div>
          </article>
        ))}
      </section>

      {/* CTA final */}
      <section className="container-site py-24 sm:py-32">
        <div className="rounded-3xl border border-outline p-10 text-center sm:p-16" style={{ backgroundImage: "var(--background-image-primary)" }}>
          <SectionIntro
            kicker="¿No sabés por dónde empezar?"
            title={<>Contanos qué necesitás y te orientamos</>}
            lead="Una llamada inicial para entender tu negocio y proponerte el mejor camino, sin compromiso."
          />
          <div className="mt-8 flex justify-center">
            <PrimaryCTA large>Pedir una consulta</PrimaryCTA>
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceDemo({ index }) {
  if (index === 1) {
    return (
      <div className="rounded-2xl border border-outline bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
        <div className="mb-3 flex items-center gap-2">
          <StatusChip label="En línea" tone="success" />
        </div>
        <p className="font-display text-3xl font-bold leading-tight text-text-1">
          Tu negocio, <span className="text-gradient">operando online</span>
        </p>
        <p className="mt-2 text-sm text-text-2">Clientes, pedidos y consultas entrando desde tu web.</p>
        <button type="button" className="mt-5 h-11 w-full rounded-lg text-sm font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
          Pedir cotización
        </button>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="rounded-2xl border border-outline bg-surface-1 p-5 shadow-[var(--shadow-sm)]">
        <CssChart
          label="Operación del mes"
          height={120}
          data={[
            { label: "S1", value: 34, color: "var(--primary)" },
            { label: "S2", value: 52, color: "var(--secondary)" },
            { label: "S3", value: 44, color: "var(--accent)" },
            { label: "S4", value: 71, color: "var(--blue)" },
          ]}
        />
        <div className="mt-4">
          <CssKanban
            columns={[
              { title: "Abierto", tone: "warning", cards: ["Reponer stock"] },
              { title: "Proceso", tone: "blue", cards: ["Pedido #41"] },
              { title: "Listo", tone: "success", cards: ["Entrega #38"] },
            ]}
          />
        </div>
      </div>
    )
  }
  if (index === 3) {
    return (
      <div className="rounded-2xl border border-outline bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-3">Sistema de diseño</span>
        <div className="mt-3 flex gap-2">
          {["primary", "secondary", "accent", "warm", "blue"].map((c) => (
            <span key={c} className="h-12 flex-1 rounded-lg" style={{ backgroundColor: `var(--${c})` }} aria-hidden="true" />
          ))}
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-4xl font-bold text-text-1">Aa</span>
          <span className="font-display text-2xl font-semibold text-text-2">Aa</span>
          <span className="text-lg text-text-3">Aa</span>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="h-9 flex-1 rounded-lg border border-outline bg-surface-2 px-3 py-2 text-xs text-text-3">nombre@empresa.com</span>
          <span className="grid h-9 place-items-center rounded-lg px-4 text-xs font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
            Enviar
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-2xl border border-outline bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-text-1">Portal de clientes</span>
        <StatusChip label="Activo" tone="success" />
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-outline bg-surface-2/40 p-3">
        <span className="grid size-10 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundImage: "var(--gradient-warm)" }}>
          M
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-text-1">María L. · Plan Pro</p>
          <p className="font-mono text-[11px] text-text-3">Al día · próximo pago 12 jun</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {["Presupuesto enviado", "3 documentos nuevos", "Estado: En revisión"].map((r, i) => (
          <div key={r} className="flex items-center gap-2 rounded-lg border border-outline bg-surface-1 px-3 py-2 text-xs text-text-2">
            <StatusChip label={["+1", "2", "↻"][i]} tone={["success", "blue", "warning"][i]} dot={false} />
            {r}
          </div>
        ))}
      </div>
    </div>
  )
}
