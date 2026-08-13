import SectionIntro from "../ui/SectionIntro"
import StatusChip from "../ui/StatusChip"
import CssChart from "../ui/CssChart"

export default function CapabilitiesSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Qué hacemos"
        title={<>Capacidades con demostración real</>}
        lead="Cuatro especialidades, cuatro interfaces distintas. Cada una construida en HTML y CSS, como si fuera un producto terminado."
      />

      <div className="container-wide mt-14 grid gap-5 lg:grid-cols-6">
        {/* Aplicaciones y plataformas */}
        <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-outline bg-surface-1 p-8 shadow-[var(--shadow-sm)] lg:col-span-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-primary">01 · Aplicaciones y plataformas</span>
            <h3 className="h3-title mt-3 font-display text-text-1">Productos que operan tu negocio</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              Portales, plataformas y apps web con lógica real: datos, usuarios, roles y procesos conectados entre sí.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Portales", "SaaS", "Apps web", "Automatizaciones"].map((f) => (
                <li key={f} className="rounded-full border border-outline bg-surface-2/50 px-3 py-1 text-xs text-text-2">{f}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-outline bg-surface-2/40 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 8h16M4 12h10M4 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex-1">
              <div className="mb-1 flex justify-between">
                <span className="text-xs font-semibold text-text-1">Automatización de turnos</span>
                <StatusChip label="Activa" tone="success" dot={false} />
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full w-[78%] rounded-full" style={{ backgroundImage: "var(--gradient-primary)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sitios web que convierten */}
        <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-outline bg-surface-1 p-8 shadow-[var(--shadow-sm)] lg:col-span-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-secondary">02 · Sitios web</span>
            <h3 className="h3-title mt-3 font-display text-text-1">Que convierten</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Sitios pensados para vender, captar y dar claridad.
            </p>
          </div>
          <div className="rounded-2xl border border-outline bg-surface-2/40 p-4">
            <p className="font-display text-2xl font-bold leading-tight text-text-1">
              Tu negocio, <span className="text-gradient">operando online</span>
            </p>
            <button type="button" className="mt-3 h-9 w-full rounded-lg text-xs font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Pedir cotización
            </button>
          </div>
        </div>

        {/* Diseño UI/UX */}
        <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-outline bg-surface-1 p-8 shadow-[var(--shadow-sm)] lg:col-span-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent">03 · Diseño UI/UX</span>
            <h3 className="h3-title mt-3 font-display text-text-1">Sistemas pensados</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Interfaces claras, coherentes y agradables de usar.
            </p>
          </div>
          <div className="rounded-2xl border border-outline bg-surface-2/40 p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-3">Paleta</span>
            <div className="mt-2 flex gap-2">
              {["primary", "secondary", "accent", "warm", "blue"].map((c) => (
                <span key={c} className="grid h-9 flex-1 place-items-center rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: `var(--${c})` }} aria-hidden="true">
                  <span className="opacity-80">{c[0].toUpperCase()}</span>
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-text-1">Aa</span>
              <span className="font-display text-lg font-semibold text-text-2">Aa</span>
              <span className="text-sm text-text-3">Aa</span>
            </div>
          </div>
        </div>

        {/* Dashboards y sistemas de gestión */}
        <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-outline bg-surface-1 p-8 shadow-[var(--shadow-sm)] lg:col-span-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-blue">04 · Dashboards y gestión</span>
              <h3 className="h3-title mt-3 font-display text-text-1">El negocio en un solo panel</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                KPIs, clientes, stock, tareas y reportes en tiempo real. Adiós a las planillas que se actualizan a mano.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["KPIs", "Reportes", "Stock", "Equipos"].map((f) => (
                  <li key={f} className="rounded-full border border-outline bg-surface-2/50 px-3 py-1 text-xs text-text-2">{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline bg-surface-2/40 p-4">
              <CssChart
                label="Resultados del mes"
                height={110}
                data={[
                  { label: "S1", value: 34, color: "var(--primary)" },
                  { label: "S2", value: 52, color: "var(--secondary)" },
                  { label: "S3", value: 44, color: "var(--accent)" },
                  { label: "S4", value: 71, color: "var(--blue)" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
