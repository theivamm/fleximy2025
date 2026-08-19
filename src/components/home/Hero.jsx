import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { CONTACT } from "../../data/navigation"

const TABS = ["Web", "App", "Dashboard"]

function WebView() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-1.5 px-4 pt-3 pb-2">
        <span className="size-2.5 rounded-full bg-error/70" />
        <span className="size-2.5 rounded-full bg-warning/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
      </div>
      <div className="flex-1 bg-surface-2/50 mx-3 mb-3 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/30" />
          <div className="h-2.5 flex-1 rounded bg-surface-3/60" />
          <div className="h-2.5 w-16 rounded bg-surface-3/40" />
          <div className="h-2.5 w-16 rounded bg-surface-3/40" />
        </div>
        <div className="flex-1 rounded-lg bg-surface-3/30 border border-outline/50 p-4 flex flex-col gap-3">
          <div className="h-3 w-2/3 rounded bg-primary/20" />
          <div className="h-2 w-full rounded bg-surface-3/40" />
          <div className="h-2 w-4/5 rounded bg-surface-3/40" />
          <div className="h-2 w-3/5 rounded bg-surface-3/30" />
          <div className="mt-auto flex gap-2">
            <div className="h-7 w-24 rounded-md bg-primary/40" />
            <div className="h-7 w-20 rounded-md bg-surface-3/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AppView() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-[220px] h-[380px] rounded-[2rem] border-2 border-outline bg-surface-2/50 overflow-hidden flex flex-col">
        <div className="h-5 flex items-center justify-center">
          <div className="w-16 h-3 rounded-b-xl bg-surface-3/60" />
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2.5">
          <div className="h-2.5 w-1/2 rounded bg-primary/30" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-14 rounded-lg bg-surface-3/40 border border-outline/40" />
            <div className="h-14 rounded-lg bg-surface-3/40 border border-outline/40" />
            <div className="h-14 rounded-lg bg-primary/15 border border-primary/20" />
            <div className="h-14 rounded-lg bg-surface-3/40 border border-outline/40" />
          </div>
          <div className="flex-1 rounded-lg bg-surface-3/30 border border-outline/30 p-2.5">
            <div className="h-2 w-3/4 rounded bg-surface-3/50 mb-2" />
            <div className="h-1.5 w-full rounded bg-surface-3/30 mb-1.5" />
            <div className="h-1.5 w-5/6 rounded bg-surface-3/30" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded-full bg-primary/30" />
            <div className="h-8 flex-1 rounded-full bg-surface-3/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-1.5 px-4 pt-3 pb-2">
        <span className="size-2.5 rounded-full bg-error/70" />
        <span className="size-2.5 rounded-full bg-warning/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
      </div>
      <div className="flex-1 mx-3 mb-3 flex gap-2.5">
        <div className="w-36 rounded-lg bg-surface-2/60 border border-outline/40 p-2.5 flex flex-col gap-2">
          <div className="h-2.5 w-12 rounded bg-primary/30" />
          <div className="h-1.5 w-full rounded bg-surface-3/40" />
          <div className="h-1.5 w-4/5 rounded bg-surface-3/30" />
          <div className="h-1.5 w-full rounded bg-surface-3/40" />
          <div className="h-1.5 w-3/5 rounded bg-surface-3/30" />
        </div>
        <div className="flex-1 rounded-lg bg-surface-2/40 border border-outline/40 p-3 flex flex-col gap-2.5">
          <div className="flex gap-2">
            <div className="h-16 flex-1 rounded-lg bg-primary/15 border border-primary/20 p-2">
              <div className="h-1.5 w-8 rounded bg-primary/30" />
              <div className="h-3 w-12 rounded bg-primary/40 mt-1.5" />
            </div>
            <div className="h-16 flex-1 rounded-lg bg-surface-3/30 border border-outline/30 p-2">
              <div className="h-1.5 w-8 rounded bg-surface-3/50" />
              <div className="h-3 w-10 rounded bg-surface-3/50 mt-1.5" />
            </div>
            <div className="h-16 flex-1 rounded-lg bg-surface-3/30 border border-outline/30 p-2">
              <div className="h-1.5 w-8 rounded bg-surface-3/50" />
              <div className="h-3 w-14 rounded bg-surface-3/50 mt-1.5" />
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-surface-3/20 border border-outline/30 p-3">
            <div className="h-2 w-1/3 rounded bg-surface-3/40 mb-3" />
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/25"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const VIEWS = [WebView, AppView, DashboardView]

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  const nextTab = useCallback(() => {
    setActiveTab((t) => (t + 1) % TABS.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextTab, 4000)
    return () => clearInterval(interval)
  }, [nextTab])

  const ActiveView = VIEWS[activeTab]

  return (
    <section className="section-space relative overflow-hidden pt-28 pb-8 md:pt-36 md:pb-12">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-center">
          <div className="max-w-[600px]">
            <span className="kicker">Diseño + desarrollo para negocios</span>

            <h1 className="hero-title mt-6 font-display font-bold text-text-1">
              Creamos{" "}
              <span className="text-gradient">webs, apps y dashboards</span>{" "}
              que hacen avanzar negocios.
            </h1>

            <p className="lead-text mt-6 max-w-[52ch] text-text-2">
              Diseñamos y desarrollamos soluciones digitales a medida para vender,
              organizar procesos, conectar equipos y mejorar la experiencia de tus clientes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                data-track="hero_cta_principal"
                className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                {CONTACT.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
              >
                Ver servicios
              </a>
            </div>

            <p className="mt-6 font-mono text-micro tracking-wider text-text-3">
              Estrategia · UX/UI · Desarrollo · Automatización
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-outline bg-surface-1/40 backdrop-blur-sm overflow-hidden shadow-[var(--shadow-lg)]">
              <div className="flex border-b border-outline bg-surface-2/40">
                {TABS.map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`relative flex-1 px-4 py-2.5 text-xs font-semibold transition-colors ${
                      activeTab === i ? "text-text-1" : "text-text-3 hover:text-text-2"
                    }`}
                  >
                    {tab}
                    {activeTab === i && (
                      <span
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                        style={{ backgroundImage: "var(--gradient-primary)" }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="h-[320px] sm:h-[380px]">
                <ActiveView />
              </div>
            </div>

            <div
              className="absolute -inset-8 -z-10 rounded-3xl opacity-30 blur-3xl"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
