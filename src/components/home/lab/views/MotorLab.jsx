import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronRight, Gauge, ListTodo, Timer, Users, Warehouse, Wrench } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const STAGES = [
  { key: "recibido", label: "Recibido", tone: "acc-logistica" },
  { key: "taller", label: "En taller", tone: "acc-turnos" },
  { key: "listo", label: "Listo", tone: "acc-gestion" },
]

const ORDER_SEED = [
  { id: "OD-1042", customer: "M. Ferreyra", car: "VW Golf · 2021", issue: "Servicio 40.000 km", stage: "recibido", tech: "L. Torres", mins: 25 },
  { id: "OD-1041", customer: "R. Sosa", car: "Peugeot 208 · 2022", issue: "Freno trasero", stage: "recibido", tech: "A. Molina", mins: 60 },
  { id: "OD-1040", customer: "C. Prado", car: "Fiat Cronos · 2020", issue: "Distribución", stage: "taller", tech: "D. Ferro", mins: 140 },
  { id: "OD-1038", customer: "L. Guzmán", car: "Ford Ranger · 2019", issue: "Suspensión", stage: "taller", tech: "L. Torres", mins: 90 },
  { id: "OD-1035", customer: "S. Vélez", car: "Toyota Yaris · 2023", issue: "Alineación", stage: "listo", tech: "A. Molina", mins: 0 },
]

const TECHS = [
  { name: "Leandro Torres", role: "Mecánico general", load: 92, jobs: 4, tone: "acc-logistica" },
  { name: "Daniel Ferro", role: "Especialista motor", load: 74, jobs: 3, tone: "acc-turnos" },
  { name: "Agustina Molina", role: "Diagnóstico", load: 58, jobs: 2, tone: "acc-gestion" },
]

const LIFTS = [
  { bay: "Bahía 1", car: "VW Golf", stage: "taller", mins: 25, tone: "acc-turnos" },
  { bay: "Bahía 2", car: "Fiat Cronos", stage: "taller", mins: 140, tone: "acc-turnos" },
  { bay: "Bahía 3", car: "—", stage: "libre", mins: 0, tone: "text-4" },
  { bay: "Bahía 4", car: "Ford Ranger", stage: "taller", mins: 90, tone: "acc-turnos" },
]

const PARTS = [
  { name: "Filtros de aceite", qty: 42, tone: "acc-logistica" },
  { name: "Pastillas de freno", qty: 18, tone: "acc-turnos" },
  { name: "Bujías", qty: 30, tone: "acc-gestion" },
  { name: "Correas de distribución", qty: 9, tone: "warning" },
]

export default function MotorLab({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [orders, setOrders] = useState(ORDER_SEED)
  const [toast, setToast] = useState(null)

  const cardRef = useRef(null)
  const kpiRef = useRef(null)

  const advance = (id) => {
    const order = orders.find((o) => o.id === id)
    if (!order || order.stage === "listo") return
    const idx = STAGES.findIndex((s) => s.key === order.stage)
    const next = STAGES[idx + 1]
    setOrders((rows) => rows.map((r) => (r.id === id ? { ...r, stage: next.key } : r)))
    setToast(`OD-${id.slice(3)} → ${next.label}`)
    window.setTimeout(() => setToast(null), 2600)
  }

  const count = (key) => orders.filter((o) => o.stage === key).length

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(cardRef.current, { wait: 260 }) },
      { at: 1500, run: () => { demo.getCursor()?.click(cardRef.current); advance("OD-1042") } },
      { at: 2800, run: () => demo.getCursor()?.moveTo(kpiRef.current, { wait: 200 }) },
      { at: 4000, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2200, onComplete: demo.bump })

  useEffect(() => {
    setOrders(ORDER_SEED)
    setToast(null)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><Wrench size="0.9em" /> MotorLab</p>
          <Pill tone={demo.tone} dot>3 activas · 2 listas</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Órdenes activas" value={count("recibido") + count("taller")} delta={2} />
          <Kpi label="Ocupación taller" value="3/4 bahías" delta={-1} />
          <Kpi label="Facturación mes" value="$82K" delta={14} />
          <Kpi label="Piezas críticas" value={PARTS.filter((p) => p.tone === "warning").length} delta={0} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="flex h-full flex-col gap-[0.5em]">
            {STAGES.map((s) => (
              <div key={s.key} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.7em]">
                <div className="flex items-center justify-between">
                  <p className="text-[0.72em] font-semibold" style={{ color: toneVar(s.tone) }}>{s.label}</p>
                  <span className="font-mono text-[0.55em] text-text-3">{count(s.key)}</span>
                </div>
                <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
                  {orders.filter((o) => o.stage === s.key).slice(0, 2).map((o) => (
                    <div key={o.id} className="rounded-[0.5em] border border-outline-strong bg-surface-2 px-[0.6em] py-[0.4em]">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.62em] font-semibold">{o.customer}</p>
                        <span className="font-mono text-[0.5em] text-text-3">{o.id}</span>
                      </div>
                      <p className="truncate text-[0.55em] text-text-3">{o.car} · {o.issue}</p>
                    </div>
                  ))}
                  {!orders.some((o) => o.stage === s.key) && <p className="text-center text-[0.55em] text-text-4">Sin órdenes</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <aside className="hidden w-[10.5em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] lg:flex">
        <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
          <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
            <Wrench size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">MotorLab</p>
            <p className="text-[0.55em] text-text-3">Talleres</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {[
            ["tablero", "Dashboard"],
            ["ordenes", "Órdenes"],
            ["bahuas", "Bahías"],
            ["stock", "Repuestos"],
            ["clientes", "Clientes"],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] font-medium text-text-2 transition-colors hover:bg-surface-2"
            >
              <span className="size-[0.4em] rounded-full bg-text-4" />
              <span className="flex-1">{label}</span>
              {k === "stock" && <span className="rounded-full px-[0.45em] py-[0.05em] font-mono text-[0.55em]" style={{ backgroundColor: toneSoft("warning"), color: toneVar("warning") }}>4</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Taller activo</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Central · Av. Colón 820</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Taller central</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Lunes 12 ago · 7 órdenes esta semana</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <Pill tone={demo.tone} dot>3/4 bahías ocupadas</Pill>
            <Btn tone={demo.tone}><Warehouse size="0.8em" /> Nueva orden</Btn>
          </div>
        </div>

        {toast && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">Orden {toast} · técnico asignado</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div ref={kpiRef} className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Órdenes activas" value={count("recibido") + count("taller")} delta={2} />
            <Kpi label="Ocupación taller" value="3/4 bahías" delta={-1} />
            <Kpi label="Facturación mes" value="$82.4K" delta={14} />
            <Kpi label="Piezas críticas" value={PARTS.filter((p) => p.tone === "warning").length} delta={0} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Órdenes de trabajo" icon={<ListTodo size="0.85em" />} extra={<Pill tone={demo.tone}>7 esta semana</Pill>} />
              <div className="mt-[0.7em] flex flex-col gap-[0.6em]">
                {orders.map((o) => {
                  const idx = STAGES.findIndex((s) => s.key === o.stage)
                  return (
                    <button
                      key={o.id}
                      type="button"
                      ref={o.id === "OD-1042" ? cardRef : null}
                      onClick={() => advance(o.id)}
                      className="group flex items-center gap-[0.7em] rounded-[0.6em] border border-outline-strong bg-surface-2 px-[0.8em] py-[0.6em] text-left transition-all hover:border-outline hover:bg-surface-3"
                    >
                      <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(o.stage === "taller" ? "acc-turnos" : o.stage === "listo" ? "acc-gestion" : "acc-logistica"), color: toneVar(o.stage === "taller" ? "acc-turnos" : o.stage === "listo" ? "acc-gestion" : "acc-logistica") }}>
                        <Gauge size="0.9em" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[0.5em]">
                          <p className="truncate text-[0.66em] font-semibold">{o.customer}</p>
                          <span className="shrink-0 font-mono text-[0.5em] text-text-4">{o.id}</span>
                        </div>
                        <p className="truncate text-[0.56em] text-text-3">{o.car} · {o.issue}</p>
                      </div>
                      <div className="hidden shrink-0 items-center gap-[0.35em] sm:flex">
                        {STAGES.map((s, i) => (
                          <span
                            key={s.key}
                            className="flex items-center gap-[0.35em]"
                            style={{ opacity: i === idx ? 1 : 0.35 }}
                          >
                            <span
                              className="size-[0.5em] rounded-full"
                              style={{ backgroundColor: i <= idx ? toneVar(s.tone) : "var(--color-text-4)" }}
                            />
                            {i < STAGES.length - 1 && <ChevronRight size="0.5em" className="text-text-4" />}
                          </span>
                        ))}
                      </div>
                      <span className="hidden shrink-0 font-mono text-[0.52em] text-text-3 md:block">{o.mins ? `${o.mins} min` : "Listo"}</span>
                      <ChevronRight size="0.8em" className="shrink-0 text-text-3 transition-transform group-hover:translate-x-[2px]" />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Bahías del taller" icon={<Timer size="0.85em" />} extra={<Pill tone="acc-gestion">3 en uso</Pill>} />
                <div className="mt-[0.6em] grid grid-cols-2 gap-[0.5em]">
                  {LIFTS.map((b) => (
                    <div key={b.bay} className="rounded-[0.5em] border border-outline-strong bg-surface-2 p-[0.55em]">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[0.52em] uppercase tracking-wider text-text-3">{b.bay}</p>
                        <span className="size-[0.5em] rounded-full" style={{ backgroundColor: b.stage === "libre" ? "var(--color-text-4)" : toneVar(b.tone) }} />
                      </div>
                      <p className="mt-[0.3em] truncate text-[0.62em] font-semibold">{b.stage === "libre" ? "Disponible" : b.car}</p>
                      <p className="truncate text-[0.52em] text-text-3">{b.stage === "libre" ? "Sin asignación" : `${b.mins} min restantes`}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Equipo técnico" icon={<Users size="0.85em" />} extra={<Pill tone={demo.tone}>3 on-line</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
                  {TECHS.map((t) => (
                    <div key={t.name} className="flex items-center gap-[0.55em]">
                      <Avatar name={t.name} tone={t.tone} size={1.7} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.62em] font-semibold">{t.name}</p>
                          <span className="shrink-0 font-mono text-[0.5em] text-text-3">{t.jobs} órdenes</span>
                        </div>
                        <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                          <Bar value={t.load} tone={t.tone} h={0.4} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Stock crítico" extra={<Pill tone="warning">1 a reponer</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.45em]">
                  {PARTS.map((p) => (
                    <div key={p.name} className="flex items-center gap-[0.5em]">
                      <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{p.name}</span>
                      <Bar value={Math.min((p.qty / 50) * 100, 100)} tone={p.tone} className="max-w-[4em]" />
                      <span className="w-[1.8em] shrink-0 text-right font-mono text-[0.52em] text-text-3">{p.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
