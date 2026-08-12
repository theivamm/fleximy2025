import { Link } from "react-router-dom"
import ReactiveBackground from "../ui/ReactiveBackground"
import AnimatedWords from "../ui/AnimatedWords"
import GradientText from "../ui/GradientText"
import PrimaryCTA from "../ui/PrimaryCTA"
import DashboardShell from "../ui/DashboardShell"
import MobileAppMockup from "../ui/MobileAppMockup"
import NotificationToast from "../ui/NotificationToast"
import StatusChip from "../ui/StatusChip"
import CssChart from "../ui/CssChart"
import CssKanban from "../ui/CssKanban"

const HERO_WORDS = [
  "venden.",
  "organizan.",
  "conectan.",
  "automatizan.",
  "hacen crecer.",
]

const HERO_KANBAN = [
  { title: "Por hacer", tone: "text-muted", cards: ["Brief", "Auditoría"] },
  { title: "En curso", tone: "blue", cards: ["Diseño UI"] },
  { title: "Listo", tone: "success", cards: ["Wireframes"] },
]

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <ReactiveBackground className="min-h-svh overflow-hidden">
        {/* Luces de color */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-16 size-[28rem] rounded-full opacity-40 blur-3xl" style={{ backgroundColor: "var(--primary-soft)" }} />
          <div className="absolute right-0 top-0 size-[24rem] rounded-full opacity-30 blur-3xl" style={{ backgroundColor: "var(--secondary-soft)" }} />
          <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "var(--accent-soft)" }} />
        </div>

        <div className="container-site grid min-h-svh items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Columna texto */}
          <div className="flex flex-col items-start">
            <span className="kicker">Diseño + Tecnología + Producto</span>

            <h1 className="display-title mt-6 font-display text-text-1">
              Creamos{" "}
              <GradientText className="whitespace-nowrap">aplicaciones</GradientText>
              <br />
              que mueven negocios.
            </h1>

            <p className="mt-6 h3-title font-display font-semibold text-text-2">
              <span className="sr-only">Apps que venden, organizan, conectan, automatizan y hacen crecer.</span>
              <span aria-hidden="true">
                Apps que{" "}
                <AnimatedWords
                  words={HERO_WORDS}
                  staticLabel="Apps que venden, organizan, conectan, automatizan y hacen crecer."
                  className="text-gradient-ink"
                />
              </span>
            </p>

            <p className="lead-text mt-5 max-w-xl text-text-secondary">
              Diseñamos y desarrollamos sitios, aplicaciones, dashboards y sistemas digitales adaptados a cada negocio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA to="/contacto" large>Contanos tu idea</PrimaryCTA>
              <Link
                to="/servicios"
                data-track="hero_explorar"
                className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
              >
                Explorar lo que hacemos
              </Link>
            </div>

            <p className="mt-6 font-mono text-xs tracking-wide text-text-3">
              Diseño UI/UX · desarrollo web · productos digitales
            </p>
          </div>

          {/* Escena visual */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative z-10">
              <DashboardShell title="Panel de ventas" kpi="Demo" className="animate-[float_9s_ease-in-out_infinite]">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { k: "Ingresos", v: "$48.2k", t: "success" },
                      { k: "Clientes", v: "1.204", t: "primary" },
                      { k: "Conversión", v: "6.8%", t: "accent" },
                    ].map((x) => (
                      <div key={x.k} className="rounded-xl border border-outline bg-surface-1 p-2.5">
                        <p className="text-[10px] uppercase tracking-wide text-text-3">{x.k}</p>
                        <p className="mt-0.5 text-sm font-bold text-text-1">{x.v}</p>
                      </div>
                    ))}
                  </div>
                  <CssChart
                    label="Ventas de la semana"
                    height={90}
                    data={[
                      { label: "L", value: 42, color: "var(--primary)" },
                      { label: "M", value: 55, color: "var(--primary)" },
                      { label: "M", value: 38, color: "var(--secondary)" },
                      { label: "J", value: 66, color: "var(--secondary)" },
                      { label: "V", value: 48, color: "var(--accent)" },
                      { label: "S", value: 80, color: "var(--accent)" },
                    ]}
                  />
                  <div className="rounded-xl border border-outline bg-surface-1 p-2">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-3">Proyectos</span>
                      <StatusChip label="En vivo" tone="success" />
                    </div>
                    <CssKanban columns={HERO_KANBAN} />
                  </div>
                </div>
              </DashboardShell>
            </div>

            {/* Mobile superpuesta */}
            <MobileAppMockup className="absolute -bottom-10 -right-2 z-20 w-40 animate-[float_7s_ease-in-out_infinite_0.6s] sm:-right-6 sm:w-48">
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-1">Turnos</span>
                  <span className="size-1.5 rounded-full bg-success" />
                </div>
                {[
                  { w: "Sofía G.", t: "16:30", tone: "success" },
                  { w: "Ramiro P.", t: "18:00", tone: "warning" },
                  { w: "Lucía M.", t: "10:00", tone: "blue" },
                ].map((x) => (
                  <div key={x.w} className="flex items-center gap-2 rounded-lg border border-outline bg-surface-1 p-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: `var(--${x.tone})` }}>
                      {x.w[0]}
                    </span>
                    <span className="truncate text-[10px] font-medium text-text-1">{x.w}</span>
                    <span className="ml-auto font-mono text-[9px] text-text-3">{x.t}</span>
                  </div>
                ))}
              </div>
            </MobileAppMockup>

            {/* Notificación */}
            <NotificationToast
              title="Nuevo pedido · Mesa 4"
              meta="Pedido confirmado hace un instante"
              tone="secondary"
              className="absolute -left-2 -top-6 z-20 w-64 animate-[float_8s_ease-in-out_infinite_1.2s] sm:-left-8"
            />

            {/* Cursor simulado */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-4 right-6 z-30 hidden animate-[float_6s_ease-in-out_infinite_0.4s] lg:block">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 3l7 17 2.5-6.5L20 11 4 3Z" fill="#fff" stroke="#090b17" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </ReactiveBackground>
    </section>
  )
}
