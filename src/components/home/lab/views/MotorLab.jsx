import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronRight, Gauge, ListTodo, Package, Timer, Users, Warehouse, Wrench, X } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import MobileShell from "../MobileShell"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useToast } from "../useToast"

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

const DIAG_OPTIONS = ["Cambio de pastillas traseras", "Regulación de freno", "Líquido de frenos", "Rotación de cubiertas"]

const CUSTOMERS = [
  { name: "M. Ferreyra", car: "VW Golf · 2021", visits: 12, spent: "$482K", last: "Hoy", tone: "acc-logistica" },
  { name: "R. Sosa", car: "Peugeot 208 · 2022", visits: 7, spent: "$310K", last: "Hoy", tone: "acc-turnos" },
  { name: "C. Prado", car: "Fiat Cronos · 2020", visits: 9, spent: "$268K", last: "Ayer", tone: "acc-gestion" },
  { name: "L. Guzmán", car: "Ford Ranger · 2019", visits: 15, spent: "$620K", last: "Lun", tone: "acc-comercio" },
  { name: "S. Vélez", car: "Toyota Yaris · 2023", visits: 4, spent: "$124K", last: "Vie", tone: "acc-logistica" },
]

const TAB_TITLES = {
  tablero: "Taller central",
  ordenes: "Órdenes de trabajo",
  bahuas: "Bahías del taller",
  stock: "Repuestos e inventario",
  clientes: "Clientes del taller",
}

const TAB_SUBTITLES = {
  tablero: "Lunes 12 ago · 7 órdenes esta semana",
  ordenes: "Avanzá cada trabajo a su etapa",
  bahuas: "Estado en tiempo real de cada elevador",
  stock: "Niveles de inventario por pieza",
  clientes: "Historial y valor de cada cliente",
}

export default function MotorLab({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("tablero")
  const [orders, setOrders] = useState(ORDER_SEED)
  const [open, setOpen] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [toast, setToast] = useToast()

  const rootRef = useRef(null)
  const orderRef = useRef(null)
  const diagRef = useRef(null)
  const approveRef = useRef(null)
  const readyRef = useRef(null)

  const ordersRef = useRef(orders)
  ordersRef.current = orders

  const advance = (id) => {
    const order = ordersRef.current.find((o) => o.id === id)
    if (!order || order.stage === "listo") return
    const idx = STAGES.findIndex((s) => s.key === order.stage)
    const next = STAGES[idx + 1]
    setOrders((rows) => rows.map((r) => (r.id === id ? { ...r, stage: next.key, mins: next.key === "listo" ? 0 : r.mins } : r)))
    setToast(`OD-${id.slice(3)} → ${next.label}`)
  }

  const registerDiag = () => {
    setDiagnosis(DIAG_OPTIONS.slice(0, 2).join(" + "))
    setToast("Diagnóstico registrado · OD-1042")
  }

  const approveOrder = (id) => {
    setOrders((rows) => rows.map((r) => (r.id === id ? { ...r, stage: "taller" } : r)))
    setOpen(null)
    setToast(`OD-${id.slice(3)} → En taller · presupuesto aprobado`)
  }

  const openOrder = (id) => {
    setOpen(id)
    if (id === "OD-1042") flow.step(0)
  }

  const count = (key) => orders.filter((o) => o.stage === key).length
  const openOrderData = open ? orders.find((o) => o.id === open) : null

  const steps = useMemo(
    () => [
      { label: "Abrir la orden OD-1042", cue: () => orderRef.current, run: () => setOpen("OD-1042") },
      { label: "Registrar el diagnóstico", cue: () => diagRef.current, run: registerDiag },
      { label: "Aprobar el presupuesto", cue: () => approveRef.current, run: () => approveOrder("OD-1042") },
      { label: "Avanzar a Listo", cue: () => readyRef.current, run: () => advance("OD-1042") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const flow = useConceptFlow({ steps, pause: demo.pause })

  const timeline = useMemo(
    () =>
      steps.map((s, i) => ({
        at: 500 + i * 2000,
        run: () => {
          const el = s.cue()
          if (el) demo.getCursor()?.moveTo(el, { wait: 80 })
          flow.storyStep(i)
        },
      })),
    [steps, flow, demo]
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps: timeline, hold: 2200, onComplete: demo.bump })

  useEffect(() => {
    setOrders(ORDER_SEED)
    setOpen(null)
    setDiagnosis(null)
    setToast(null)
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  if (compact) {
    return (
      <div ref={rootRef} className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Wrench size="0.95em" />}
          brand="MotorLab"
          subtitle="Taller central · Av. Colón 820"
          status={<Pill tone={demo.tone} dot>{count("recibido") + count("taller")} activas</Pill>}
          tabs={[
            { key: "tablero", label: "Panel", Icon: Gauge },
            { key: "ordenes", label: "Órdenes", Icon: ListTodo, badge: count("recibido") },
            { key: "bahuas", label: "Bahías", Icon: Warehouse },
            { key: "stock", label: "Stock", Icon: Package },
            { key: "clientes", label: "Clientes", Icon: Users },
          ]}
          tab={tab}
          onTab={setTab}
          overlay={
            <>
              {openOrderData && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-[1em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 72%, transparent)" }}>
                  <div className="w-[20em] max-w-full animate-[scale-in_0.35s_var(--motion-ease)] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                    <div className="flex items-start justify-between gap-[0.6em]">
                      <div className="min-w-0">
                        <div className="flex items-center gap-[0.4em]">
                          <p className="truncate text-[0.75em] font-bold">{openOrderData.customer}</p>
                          <span className="shrink-0 font-mono text-[0.5em] text-text-4">{openOrderData.id}</span>
                        </div>
                        <p className="mt-[0.1em] text-[0.58em] text-text-3">{openOrderData.car} · {openOrderData.issue}</p>
                      </div>
                      <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar detalle de la orden" className="grid size-[1.6em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                        <X size="0.8em" />
                      </button>
                    </div>

                    <div className="mt-[0.6em] rounded-[0.55em] border border-outline bg-surface-2 p-[0.6em]">
                      <p className="text-[0.54em] font-semibold uppercase tracking-wide text-text-3">Diagnóstico</p>
                      {diagnosis ? (
                        <div className="mt-[0.3em] flex items-start gap-[0.35em]">
                          <Check size="0.7em" className="mt-[0.1em] shrink-0" style={{ color: toneVar("acc-gestion") }} />
                          <p className="text-[0.6em] font-medium">{diagnosis}</p>
                        </div>
                      ) : (
                        <>
                          <div className="mt-[0.35em] flex flex-wrap gap-[0.3em]">
                            {DIAG_OPTIONS.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => { setDiagnosis(d); setToast(`Diagnóstico · ${openOrderData.id}`); if (openOrderData.id === "OD-1042") flow.step(1) }}
                                className="rounded-full border border-outline-strong px-[0.5em] py-[0.15em] text-[0.52em] font-medium text-text-2 transition-colors hover:bg-surface-3"
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => { registerDiag(); if (openOrderData.id === "OD-1042") flow.step(1) }}
                            className="mt-[0.4em] w-full rounded-[0.45em] border border-outline-strong px-[0.5em] py-[0.35em] text-[0.58em] font-semibold text-text-1 transition-colors hover:bg-surface-3"
                          >
                            Guardar diagnóstico
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-[0.5em] rounded-[0.55em] border border-outline bg-surface-2 p-[0.6em]">
                      <p className="text-[0.54em] font-semibold uppercase tracking-wide text-text-3">Presupuesto</p>
                      <div className="mt-[0.3em] flex items-center justify-between text-[0.6em]">
                        <span className="text-text-3">Repuestos + mano de obra</span>
                        <span className="font-bold">$142.000</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { approveOrder(openOrderData.id); if (openOrderData.id === "OD-1042") flow.step(2) }}
                        className="mt-[0.45em] w-full rounded-[0.45em] py-[0.45em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.98]"
                        style={{ backgroundColor: toneVar(demo.tone) }}
                      >
                        Aprobar presupuesto · En taller
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toast && (
                <div aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-[3.6em] z-40 flex justify-center px-[1em]">
                  <div className="flex animate-[fade-up_0.4s_var(--motion-ease)] items-center gap-[0.5em] rounded-full border border-outline-strong bg-surface-1 px-[1em] py-[0.5em] shadow-[var(--shadow-md)]">
                    <span className="grid size-[1.1em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                      <Check size="0.65em" />
                    </span>
                    <span className="text-[0.68em] font-semibold">{toast}</span>
                  </div>
                </div>
              )}
              <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
            </>
          }
        >
          {tab === "tablero" && (
            <>
              <div className="grid grid-cols-2 gap-[0.55em]">
                <Kpi label="Órdenes activas" value={count("recibido") + count("taller")} delta={2} />
                <Kpi label="Ocupación taller" value="3/4 bahías" delta={-1} />
                <Kpi label="Facturación mes" value="$82K" delta={14} />
                <Kpi label="Piezas críticas" value={PARTS.filter((p) => p.tone === "warning").length} delta={0} />
              </div>
              <div className="mt-[0.65em] flex flex-col gap-[0.5em]">
                {STAGES.map((s) => (
                  <div key={s.key} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.65em]">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.7em] font-semibold" style={{ color: toneVar(s.tone) }}>{s.label}</p>
                      <span className="font-mono text-[0.54em] text-text-3">{count(s.key)}</span>
                    </div>
                    <div className="mt-[0.45em] flex flex-col gap-[0.4em]">
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
            </>
          )}
          {tab === "ordenes" && <Ordenes orders={orders} onOpen={openOrder} onAdvance={advance} />}
          {tab === "bahuas" && <Bahias tone={demo.tone} />}
          {tab === "stock" && <Stock tone={demo.tone} onToast={setToast} />}
          {tab === "clientes" && <Clientes tone={demo.tone} />}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
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
          ].map(([k, label]) => {
            const active = tab === k
            return (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] transition-colors"
                style={{
                  backgroundColor: active ? toneSoft(demo.tone) : "transparent",
                  color: active ? toneVar(demo.tone) : "var(--color-text-2)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                <span className="size-[0.4em] rounded-full" style={{ backgroundColor: active ? toneVar(demo.tone) : "var(--color-text-4)" }} />
                <span className="flex-1">{label}</span>
                {k === "stock" && <span className="rounded-full px-[0.45em] py-[0.05em] font-mono text-[0.55em]" style={{ backgroundColor: toneSoft("warning"), color: toneVar("warning") }}>4</span>}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Taller activo</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Central · Av. Colón 820</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">{TAB_TITLES[tab]}</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">{TAB_SUBTITLES[tab]}</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            {tab === "tablero" && <Pill tone={demo.tone} dot>3/4 bahías ocupadas</Pill>}
            {(tab === "tablero" || tab === "ordenes") && (
              <Btn tone={demo.tone} onClick={() => setToast("Las nuevas órdenes se cargan desde el módulo de ingreso")}><Warehouse size="0.8em" /> Nueva orden</Btn>
            )}
          </div>
        </div>

        {toast && (
          <div aria-live="polite" className="absolute inset-x-0 bottom-[0.9em] z-40 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.4s_var(--motion-ease)] items-center gap-[0.5em] rounded-full border border-outline-strong bg-surface-1 px-[1em] py-[0.5em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.1em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.65em" />
              </span>
              <span className="text-[0.68em] font-semibold">{toast}</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          {tab === "tablero" && (
            <>
              <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
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
                    <div
                      key={o.id}
                      role="button"
                      tabIndex={0}
                      ref={o.id === "OD-1042" ? orderRef : null}
                      onClick={() => openOrder(o.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openOrder(o.id) }}
                      className="group flex cursor-pointer items-center gap-[0.7em] rounded-[0.6em] border border-outline-strong bg-surface-2 px-[0.8em] py-[0.6em] transition-all hover:border-outline hover:bg-surface-3"
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
                          <span key={s.key} className="flex items-center gap-[0.35em]" style={{ opacity: i === idx ? 1 : 0.35 }}>
                            <span className="size-[0.5em] rounded-full" style={{ backgroundColor: i <= idx ? toneVar(s.tone) : "var(--color-text-4)" }} />
                            {i < STAGES.length - 1 && <ChevronRight size="0.5em" className="text-text-4" />}
                          </span>
                        ))}
                      </div>
                      <span className="hidden shrink-0 font-mono text-[0.52em] text-text-3 md:block">{o.mins ? `${o.mins} min` : "Listo"}</span>
                      {o.stage !== "listo" ? (
                        <button
                          type="button"
                          ref={o.id === "OD-1042" ? readyRef : null}
                          onClick={(e) => { e.stopPropagation(); advance(o.id); if (o.id === "OD-1042") flow.step(3) }}
                          className="shrink-0 rounded-[0.5em] border border-outline-strong px-[0.7em] py-[0.3em] text-[0.58em] font-semibold text-text-2 transition-colors hover:bg-surface-3"
                        >
                          Avanzar
                        </button>
                      ) : (
                        <Check size="0.85em" className="shrink-0" style={{ color: toneVar("acc-gestion") }} />
                      )}
                    </div>
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
            </>
          )}
          {tab === "ordenes" && <Ordenes orders={orders} onOpen={openOrder} onAdvance={advance} />}
          {tab === "bahuas" && <Bahias tone={demo.tone} />}
          {tab === "stock" && <Stock tone={demo.tone} onToast={setToast} />}
          {tab === "clientes" && <Clientes tone={demo.tone} />}
        </div>
      </div>

      {openOrderData && (
        <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
          <div className="w-[24em] animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-[0.8em]">
              <div className="min-w-0">
                <div className="flex items-center gap-[0.5em]">
                  <p className="text-[0.8em] font-bold">{openOrderData.customer}</p>
                  <span className="font-mono text-[0.52em] text-text-4">{openOrderData.id}</span>
                </div>
                <p className="mt-[0.15em] text-[0.62em] text-text-3">{openOrderData.car} · {openOrderData.issue}</p>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar detalle de la orden" className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                <X size="0.85em" />
              </button>
            </div>

            <div className="mt-[0.8em] flex items-center gap-[0.4em]">
              {STAGES.map((s, i) => {
                const idx = STAGES.findIndex((x) => x.key === openOrderData.stage)
                return (
                  <span key={s.key} className="flex items-center gap-[0.4em]" style={{ opacity: i === idx ? 1 : 0.4 }}>
                    <span className="grid size-[1.3em] place-items-center rounded-full text-[0.55em] font-bold text-white" style={{ backgroundColor: i <= idx ? toneVar(s.tone) : "var(--color-surface-3)" }}>
                      {i + 1}
                    </span>
                    {i < STAGES.length - 1 && <span className="h-[0.15em] w-[2.2em] rounded-full" style={{ backgroundColor: i < idx ? toneVar(s.tone) : "var(--color-outline)" }} />}
                  </span>
                )
              })}
            </div>

            <div className="mt-[0.8em] rounded-[0.6em] border border-outline bg-surface-2 p-[0.7em]">
              <p className="text-[0.58em] font-semibold uppercase tracking-wide text-text-3">Diagnóstico</p>
              {diagnosis ? (
                <div className="mt-[0.35em] flex items-start gap-[0.4em]">
                  <Check size="0.75em" className="mt-[0.1em] shrink-0" style={{ color: toneVar("acc-gestion") }} />
                  <p className="text-[0.64em] font-medium">{diagnosis}</p>
                </div>
              ) : (
                <>
                  <div className="mt-[0.4em] flex flex-wrap gap-[0.35em]">
                    {DIAG_OPTIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => { setDiagnosis(d); setToast(`Diagnóstico registrado · ${openOrderData.id}`); if (openOrderData.id === "OD-1042") flow.step(1) }}
                        className="rounded-full border border-outline-strong px-[0.55em] py-[0.2em] text-[0.56em] font-medium text-text-2 transition-colors hover:bg-surface-3"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    ref={diagRef}
                    onClick={() => { registerDiag(); if (openOrderData.id === "OD-1042") flow.step(1) }}
                    className="mt-[0.5em] w-full rounded-[0.5em] border border-outline-strong px-[0.6em] py-[0.4em] text-[0.62em] font-semibold text-text-1 transition-colors hover:bg-surface-3"
                  >
                    Guardar diagnóstico
                  </button>
                </>
              )}
            </div>

            <div className="mt-[0.6em] rounded-[0.6em] border border-outline bg-surface-2 p-[0.7em]">
              <p className="text-[0.58em] font-semibold uppercase tracking-wide text-text-3">Presupuesto</p>
              <div className="mt-[0.35em] flex items-center justify-between text-[0.64em]">
                <span className="text-text-3">Repuestos + mano de obra</span>
                <span className="font-bold">$142.000</span>
              </div>
              <button
                type="button"
                ref={approveRef}
                onClick={() => { approveOrder(openOrderData.id); if (openOrderData.id === "OD-1042") flow.step(2) }}
                className="mt-[0.5em] w-full rounded-[0.5em] py-[0.5em] text-[0.66em] font-bold text-white transition-transform active:scale-[0.98]"
                style={{ backgroundColor: toneVar(demo.tone) }}
              >
                Aprobar presupuesto · pasar a En taller
              </button>
            </div>
          </div>
        </div>
      )}

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function Ordenes({ orders, onOpen, onAdvance }) {
  return (
    <div className="flex flex-col gap-[0.6em]">
      {orders.map((o) => {
        const idx = STAGES.findIndex((s) => s.key === o.stage)
        return (
          <div
            key={o.id}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(o.id)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(o.id) }}
            className="group flex cursor-pointer items-center gap-[0.7em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[0.8em] py-[0.6em] transition-all hover:border-outline hover:bg-surface-2"
          >
            <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(o.stage === "taller" ? "acc-turnos" : o.stage === "listo" ? "acc-gestion" : "acc-logistica"), color: toneVar(o.stage === "taller" ? "acc-turnos" : o.stage === "listo" ? "acc-gestion" : "acc-logistica") }}>
              <Gauge size="0.9em" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[0.5em]">
                <p className="truncate text-[0.66em] font-semibold">{o.customer}</p>
                <span className="shrink-0 font-mono text-[0.5em] text-text-4">{o.id}</span>
              </div>
              <p className="truncate text-[0.56em] text-text-3">{o.car} · {o.issue} · {o.tech}</p>
            </div>
            <div className="hidden shrink-0 items-center gap-[0.35em] sm:flex">
              {STAGES.map((s, i) => (
                <span key={s.key} className="flex items-center gap-[0.35em]" style={{ opacity: i === idx ? 1 : 0.35 }}>
                  <span className="size-[0.5em] rounded-full" style={{ backgroundColor: i <= idx ? toneVar(s.tone) : "var(--color-text-4)" }} />
                  {i < STAGES.length - 1 && <ChevronRight size="0.5em" className="text-text-4" />}
                </span>
              ))}
            </div>
            <span className="hidden shrink-0 font-mono text-[0.52em] text-text-3 md:block">{o.mins ? `${o.mins} min` : "Listo"}</span>
            {o.stage !== "listo" ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAdvance(o.id) }}
                className="shrink-0 rounded-[0.5em] border border-outline-strong px-[0.7em] py-[0.3em] text-[0.58em] font-semibold text-text-2 transition-colors hover:bg-surface-3"
              >
                Avanzar
              </button>
            ) : (
              <Check size="0.85em" className="shrink-0" style={{ color: toneVar("acc-gestion") }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Bahias({ tone }) {
  return (
    <div className="grid gap-[0.6em] xl:grid-cols-2">
      {LIFTS.map((b) => (
        <div key={b.bay} className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.58em] uppercase tracking-wider text-text-3">{b.bay}</p>
            <Pill tone={b.stage === "libre" ? "acc-gestion" : "acc-turnos"}>{b.stage === "libre" ? "Libre" : "En uso"}</Pill>
          </div>
          <p className="mt-[0.45em] text-[0.72em] font-bold">{b.stage === "libre" ? "Disponible ahora" : b.car}</p>
          <p className="mt-[0.15em] text-[0.58em] text-text-3">{b.stage === "libre" ? "Lista para asignar la próxima orden" : `${b.mins} min restantes · ${b.car} en taller`}</p>
          {b.stage !== "libre" && (
            <div className="mt-[0.6em]">
              <Bar value={Math.max(10, 100 - b.mins / 2)} tone={b.tone} h={0.45} />
            </div>
          )}
        </div>
      ))}
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Turnos agendados" icon={<Timer size="0.85em" />} extra={<Pill tone={tone}>5 próximos</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {[["18:30", "S. López · VW Amarok", "Cambio de correa"], ["19:00", "N. Ríos · Fiat Argo", "Alineación"], ["19:30", "T. Mesa · Renault Sandero", "Diagnóstico"]].map(([h, c, j]) => (
            <div key={h} className="flex items-center gap-[0.5em]">
              <span className="w-[3em] shrink-0 font-mono text-[0.54em] text-text-3">{h}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.62em] font-medium">{c}</p>
                <p className="truncate text-[0.5em] text-text-3">{j}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stock({ tone, onToast }) {
  const critical = PARTS.filter((p) => p.tone === "warning").length
  return (
    <div className="grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Inventario" icon={<Warehouse size="0.85em" />} extra={<Pill tone="warning">{critical} a reponer</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
          {PARTS.map((p) => (
            <div key={p.name} className="flex items-center gap-[0.5em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
              <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{p.name}</span>
              <Bar value={Math.min((p.qty / 50) * 100, 100)} tone={p.tone} className="max-w-[10em]" />
              <span className="w-[3.2em] shrink-0 text-right font-mono text-[0.52em] text-text-3">{p.qty} u.</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Pedidos a proveedores" icon={<Check size="0.85em" />} extra={<Pill tone="acc-gestion">2 en camino</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {[["Correas de distribución", "Recambio NAF SA · llega mañana"], ["Pastillas de freno", "Recambio NAF SA · llega viernes"]].map(([n, d]) => (
            <div key={n} className="flex items-start gap-[0.5em] rounded-[0.5em] border border-outline bg-surface-2 p-[0.6em]">
              <span className="mt-[0.25em] size-[0.5em] shrink-0 rounded-full" style={{ backgroundColor: toneVar("acc-gestion") }} />
              <div className="min-w-0">
                <p className="text-[0.62em] font-semibold">{n}</p>
                <p className="text-[0.52em] text-text-3">{d}</p>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => onToast?.("Pedido enviado a Recambio NAF SA")} className="mt-[0.3em] rounded-[0.5em] py-[0.5em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.98]" style={{ backgroundColor: toneVar(tone) }}>
            Generar pedido de reposición
          </button>
        </div>
      </div>
    </div>
  )
}

function Clientes({ tone }) {
  return (
    <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
      <SectionHead title="Clientes del taller" icon={<Users size="0.85em" />} extra={<Pill tone={tone}>{CUSTOMERS.length} activos</Pill>} />
      <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
        {CUSTOMERS.map((c) => (
          <div key={c.name} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.45em] transition-colors hover:bg-surface-2">
            <Avatar name={c.name} tone={c.tone} size={1.8} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-[0.5em]">
                <p className="truncate text-[0.64em] font-semibold">{c.name}</p>
                <span className="shrink-0 font-mono text-[0.5em] text-text-4">{c.last}</span>
              </div>
              <p className="truncate text-[0.54em] text-text-3">{c.car}</p>
            </div>
            <div className="hidden shrink-0 flex-col items-end sm:flex">
              <p className="font-mono text-[0.56em] font-bold">{c.spent}</p>
              <p className="text-[0.5em] text-text-4">{c.visits} visitas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
