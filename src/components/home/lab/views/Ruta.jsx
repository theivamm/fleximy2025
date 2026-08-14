import { useEffect, useMemo, useRef, useState } from "react"
import { Check, Clock, Fuel, MapPin, Navigation, PackageCheck, Route, TrendingUp, Truck } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

const FLEET = [
  { id: "F-12", driver: "N. Acosta", zone: "Zona Norte", fuel: 62, deliveries: 8, tone: "acc-logistica" },
  { id: "F-07", driver: "P. Ríos", zone: "Zona Sur", fuel: 41, deliveries: 5, tone: "acc-turnos" },
  { id: "F-21", driver: "J. Correa", zone: "Zona Este", fuel: 88, deliveries: 6, tone: "acc-gestion" },
  { id: "F-03", driver: "M. Luna", zone: "Centro", fuel: 15, deliveries: 3, tone: "warning" },
]

const DELIVERY_SEED = [
  { id: "EN-3181", client: "Café Nómada", addr: "Av. Mitre 410", status: "reparto", zone: "Norte", eta: "12:05" },
  { id: "EN-3180", client: "Studio Áurea", addr: "Güemes 1122", status: "reparto", zone: "Norte", eta: "12:20" },
  { id: "EN-3179", client: "Distrito SRL", addr: "Sarmiento 310", status: "preparando", zone: "Centro", eta: "13:00" },
  { id: "EN-3178", client: "Habitat Inmob.", addr: "9 de Julio 520", status: "preparando", zone: "Sur", eta: "13:15" },
  { id: "EN-3176", client: "Nexo Campus", addr: "Roca 88", status: "entregado", zone: "Este", eta: "—" },
  { id: "EN-3175", client: "MotorLab", addr: "Colón 820", status: "entregado", zone: "Centro", eta: "—" },
]

const ROUTE_STOPS = [
  { x: 22, y: 66, label: "Depósito", tone: "acc-logistica", done: true },
  { x: 36, y: 40, label: "Café Nómada", tone: "acc-turnos", delivery: "EN-3181" },
  { x: 52, y: 28, label: "Studio Áurea", tone: "acc-gestion", delivery: "EN-3180" },
  { x: 68, y: 52, label: "Distrito SRL", tone: "acc-logistica" },
]

const ZONES = [
  { name: "Zona Norte", active: 2, done: 6, tone: "acc-logistica" },
  { name: "Zona Sur", active: 1, done: 4, tone: "acc-turnos" },
  { name: "Zona Este", active: 1, done: 5, tone: "acc-gestion" },
  { name: "Centro", active: 0, done: 8, tone: "acc-comercio" },
]

const TAB_TITLES = {
  live: "Centro de distribución",
  envios: "Envíos del día",
  flota: "Flota",
  zonas: "Zonas de cobertura",
  reportes: "Reportes de operación",
}

const TAB_SUBTITLES = {
  live: "Lunes 12 ago · turno mañana",
  envios: "6 envíos planificados · 2 en reparto",
  flota: "4 de 6 vehículos activos",
  zonas: "Cobertura del turno mañana",
  reportes: "Resumen semanal · últimos 7 días",
}

export default function Ruta({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("live")
  const [deliveries, setDeliveries] = useState(DELIVERY_SEED)
  const [vehicle, setVehicle] = useState("F-12")
  const [km, setKm] = useState(12.4)
  const [toast, setToast] = useToast()

  const rootRef = useRef(null)
  const vehicleRef = useRef(null)
  const cafeRef = useRef(null)
  const aureaRef = useRef(null)
  const recalcRef = useRef(null)

  const deliver = (id) => {
    const item = deliveries.find((d) => d.id === id)
    if (!item || item.status !== "reparto") return
    setDeliveries((rows) => rows.map((r) => (r.id === id ? { ...r, status: "entregado", eta: "—" } : r)))
    setToast(`Envío ${id} entregado`)
  }

  const recalc = () => {
    setKm(11.8)
    setToast("Ruta recalculada · ahorro 0,6 km")
  }

  const selectVehicle = (id) => {
    setVehicle(id)
    if (id === "F-12") flow.step(0)
  }

  const count = (k) => deliveries.filter((d) => d.status === k).length
  const onTime = Math.round(((count("entregado") + 2) / (deliveries.length + 2)) * 100)
  const stops = ROUTE_STOPS.map((s) => ({ ...s, done: s.delivery ? deliveries.find((d) => d.id === s.delivery)?.status === "entregado" : s.done }))
  const doneStops = stops.filter((s) => s.done).length

  const steps = useMemo(
    () => [
      { label: "Elegir la camioneta F-12", cue: () => vehicleRef.current, run: () => setVehicle("F-12") },
      { label: "Entregar en Café Nómada", cue: () => cafeRef.current, run: () => deliver("EN-3181") },
      { label: "Entregar en Studio Áurea", cue: () => aureaRef.current, run: () => deliver("EN-3180") },
      { label: "Recalcular la ruta", cue: () => recalcRef.current, run: recalc },
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
    setDeliveries(DELIVERY_SEED)
    setVehicle("F-12")
    setKm(12.4)
    setToast(null)
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  if (compact) {
    return (
      <div ref={rootRef} className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Route size="0.95em" />}
          brand="Ruta"
          subtitle="Logística"
          status={<Pill tone={demo.tone} dot>4 activos</Pill>}
          tabs={[
            { key: "live", label: "En vivo", Icon: Route },
            { key: "envios", label: "Envíos", Icon: PackageCheck, badge: count("reparto") },
            { key: "flota", label: "Flota", Icon: Truck },
            { key: "zonas", label: "Zonas", Icon: MapPin },
            { key: "reportes", label: "Reportes", Icon: TrendingUp },
          ]}
          tab={tab}
          onTab={setTab}
          overlay={
            <>
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
          {tab === "live" && (
            <>
              <div className="grid grid-cols-2 gap-[0.55em]">
                <Kpi label="Envíos activos" value={count("reparto")} delta={2} />
                <Kpi label="Entregas hoy" value={count("entregado") + 14} delta={9} />
                <Kpi label="Puntualidad" value={`${onTime}%`} delta={3} />
                <Kpi label="Flota activa" value="4/6" delta={0} />
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Entregas del día" icon={<PackageCheck size="0.85em" />} extra={<Pill tone="acc-gestion">{count("entregado")}/6 completadas</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {deliveries.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      ref={d.id === "EN-3181" ? cafeRef : d.id === "EN-3180" ? aureaRef : null}
                      onClick={() => { deliver(d.id); if (d.id === "EN-3181") flow.step(1); if (d.id === "EN-3180") flow.step(2) }}
                      disabled={d.status === "preparando" || d.status === "entregado"}
                      className="flex items-center gap-[0.55em] rounded-[0.6em] border border-outline-strong bg-surface-2 px-[0.7em] py-[0.5em] text-left transition-all hover:border-outline hover:bg-surface-3"
                      style={{ opacity: d.status === "entregado" ? 0.6 : 1 }}
                    >
                      <span className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(d.status === "entregado" ? "acc-gestion" : "acc-turnos"), color: toneVar(d.status === "entregado" ? "acc-gestion" : "acc-turnos") }}>
                        <PackageCheck size="0.8em" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[0.4em]">
                          <p className="truncate text-[0.64em] font-semibold">{d.client}</p>
                          <span className="shrink-0 font-mono text-[0.48em] text-text-4">{d.id}</span>
                        </div>
                        <p className="flex items-center gap-[0.3em] truncate text-[0.54em] text-text-3"><MapPin size="0.55em" /> {d.addr}</p>
                      </div>
                      {d.status === "entregado" ? (
                        <Pill tone="acc-gestion" className="shrink-0">Entregado</Pill>
                      ) : d.status === "reparto" ? (
                        <span className="shrink-0 rounded-full px-[0.5em] py-[0.2em] font-mono text-[0.52em]" style={{ backgroundColor: toneSoft("acc-turnos"), color: toneVar("acc-turnos") }}>ETA {d.eta}</span>
                      ) : (
                        <Pill tone="warning" className="shrink-0">Preparando</Pill>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Flota" icon={<Fuel size="0.85em" />} extra={<Pill tone="warning">1 bajo</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {FLEET.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      ref={f.id === "F-12" ? vehicleRef : null}
                      onClick={() => selectVehicle(f.id)}
                      className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.35em] text-left transition-colors hover:bg-surface-2"
                      style={{
                        backgroundColor: vehicle === f.id ? toneSoft(demo.tone) : "transparent",
                        boxShadow: vehicle === f.id ? `inset 0 0 0 1px ${toneVar(demo.tone)}` : undefined,
                      }}
                    >
                      <Avatar name={f.driver} tone={f.tone} size={1.6} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.62em] font-semibold">{f.id} · {f.driver}</p>
                          <span className="shrink-0 font-mono text-[0.5em] text-text-3">{f.deliveries} envíos</span>
                        </div>
                        <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                          <Bar value={f.fuel} tone={f.fuel < 25 ? "warning" : f.tone} h={0.4} />
                        </div>
                      </div>
                      {vehicle === f.id && <Check size="0.8em" className="shrink-0" style={{ color: toneVar(demo.tone) }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title={`Mapa en vivo · ${FLEET.find((f) => f.id === vehicle)?.zone ?? "Zona Norte"}`} icon={<MapPin size="0.85em" />} extra={<Pill tone={demo.tone}>Ruta {vehicle}</Pill>} />
                <div className="relative mt-[0.7em] h-[12em] overflow-hidden rounded-[0.6em] border border-outline-strong">
                  <div className="absolute inset-0" style={{ backgroundColor: toneSoft("acc-logistica"), opacity: 0.35 }} />
                  {[
                    "left-[6%] top-[18%] w-[20%] h-[6%] rotate-[12deg]",
                    "left-[30%] top-[8%] w-[16%] h-[5%] rotate-[-8deg]",
                    "left-[18%] top-[42%] w-[24%] h-[5%] rotate-[8deg]",
                    "left-[48%] top-[30%] w-[18%] h-[5%] rotate-[14deg]",
                    "left-[8%] top-[68%] w-[22%] h-[5%] rotate-[-6deg]",
                    "left-[38%] top-[62%] w-[20%] h-[5%] rotate-[10deg]",
                    "left-[60%] top-[8%] w-[24%] h-[5%] rotate-[10deg]",
                    "left-[66%] top-[40%] w-[18%] h-[5%] rotate-[-10deg]",
                    "left-[70%] top-[70%] w-[22%] h-[5%] rotate-[8deg]",
                  ].map((pos, i) => (
                    <span key={i} className={`absolute ${pos} rounded-full`} style={{ backgroundColor: "var(--color-outline)", opacity: 0.7 }} />
                  ))}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M 22 66 L 36 40 L 52 28 L 68 52" fill="none" stroke={toneVar(demo.tone)} strokeWidth="1.6" strokeDasharray="3 2" strokeLinecap="round" />
                  </svg>
                  {stops.map((s, i) => (
                    <span key={s.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[0.2em]" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                      <span
                        className={`grid size-[1.35em] place-items-center rounded-full text-[0.6em] font-bold text-white shadow-[var(--shadow-sm)]`}
                        style={{ backgroundColor: s.done ? toneVar("acc-gestion") : toneVar(s.tone), opacity: s.done ? 0.75 : 1 }}
                      >
                        {s.done ? <Check size="0.65em" /> : i + 1}
                      </span>
                      <span className="rounded-full bg-surface-1 px-[0.5em] py-[0.1em] font-mono text-[0.46em] font-medium text-text-2 shadow-[var(--shadow-sm)]">{s.label}</span>
                    </span>
                  ))}
                  <div className="absolute bottom-[0.7em] right-[0.7em] flex items-center gap-[0.5em]">
                    <span className="flex items-center gap-[0.4em] rounded-full border border-outline-strong bg-surface-1 px-[0.7em] py-[0.3em] font-mono text-[0.52em] text-text-2">
                      <Route size="0.7em" style={{ color: toneVar(demo.tone) }} /> {km.toFixed(1)} km
                    </span>
                    <button
                      type="button"
                      ref={recalcRef}
                      onClick={() => { recalc(); flow.step(3) }}
                      className="flex items-center gap-[0.4em] rounded-full px-[0.7em] py-[0.3em] text-[0.56em] font-semibold text-white transition-transform active:scale-[0.96]"
                      style={{ backgroundColor: toneVar(demo.tone) }}
                    >
                      <Navigation size="0.7em" /> Recalcular
                    </button>
                  </div>
                </div>
                <div className="mt-[0.5em] flex items-center justify-between">
                  <span className="font-mono text-[0.52em] text-text-3">{doneStops}/{stops.length} paradas</span>
                  <span className="font-mono text-[0.52em]" style={{ color: toneVar("acc-gestion") }}>Llegada 12:20</span>
                </div>
              </div>
            </>
          )}
          {tab === "envios" && <Envios tone={demo.tone} deliveries={deliveries} onDeliver={deliver} />}
          {tab === "flota" && <Flota tone={demo.tone} vehicle={vehicle} onSelect={selectVehicle} />}
          {tab === "zonas" && <Zonas />}
          {tab === "reportes" && <Reportes tone={demo.tone} onTime={onTime} />}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <aside className="hidden w-[10.5em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] lg:flex">
        <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
          <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
            <Truck size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">Ruta</p>
            <p className="text-[0.55em] text-text-3">Logística</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {[
            ["live", "En vivo"],
            ["envios", "Envíos"],
            ["flota", "Flota"],
            ["zonas", "Zonas"],
            ["reportes", "Reportes"],
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
                {k === "envios" && <span className="rounded-full px-[0.45em] py-[0.05em] font-mono text-[0.55em]" style={{ backgroundColor: toneSoft(demo.tone), color: toneVar(demo.tone) }}>{count("reparto")}</span>}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Hora punta</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">2 camionetas en tránsito</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">{TAB_TITLES[tab]}</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">{TAB_SUBTITLES[tab]}</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            {tab === "live" && <Pill tone={demo.tone} dot>Optimización activa</Pill>}
            {(tab === "live" || tab === "envios") && (
              <Btn tone={demo.tone} onClick={() => setToast("Nueva ruta · se planifica desde el módulo de zonas")}><Navigation size="0.8em" /> Nueva ruta</Btn>
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
          {tab === "live" && (
            <>
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Envíos activos" value={count("reparto")} delta={2} />
            <Kpi label="Entregas hoy" value={count("entregado") + 14} delta={9} />
            <Kpi label="Puntualidad" value={`${onTime}%`} delta={3} />
            <Kpi label="Flota activa" value="4/6" delta={0} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1fr_1.25fr]">
            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Entregas del día" icon={<PackageCheck size="0.85em" />} extra={<Pill tone="acc-gestion">{count("entregado")}/6 completadas</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
                  {deliveries.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      ref={d.id === "EN-3181" ? cafeRef : d.id === "EN-3180" ? aureaRef : null}
                      onClick={() => { deliver(d.id); if (d.id === "EN-3181") flow.step(1); if (d.id === "EN-3180") flow.step(2) }}
                      disabled={d.status === "preparando" || d.status === "entregado"}
                      className="flex items-center gap-[0.55em] rounded-[0.6em] border border-outline-strong bg-surface-2 px-[0.7em] py-[0.5em] text-left transition-all hover:border-outline hover:bg-surface-3"
                      style={{ opacity: d.status === "entregado" ? 0.6 : 1 }}
                    >
                      <span className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(d.status === "entregado" ? "acc-gestion" : "acc-turnos"), color: toneVar(d.status === "entregado" ? "acc-gestion" : "acc-turnos") }}>
                        <PackageCheck size="0.8em" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[0.4em]">
                          <p className="truncate text-[0.64em] font-semibold">{d.client}</p>
                          <span className="shrink-0 font-mono text-[0.48em] text-text-4">{d.id}</span>
                        </div>
                        <p className="flex items-center gap-[0.3em] truncate text-[0.54em] text-text-3"><MapPin size="0.55em" /> {d.addr}</p>
                      </div>
                      {d.status === "entregado" ? (
                        <Pill tone="acc-gestion" className="shrink-0">Entregado</Pill>
                      ) : d.status === "reparto" ? (
                        <span className="shrink-0 rounded-full px-[0.5em] py-[0.2em] font-mono text-[0.52em]" style={{ backgroundColor: toneSoft("acc-turnos"), color: toneVar("acc-turnos") }}>ETA {d.eta}</span>
                      ) : (
                        <Pill tone="warning" className="shrink-0">Preparando</Pill>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Flota" icon={<Fuel size="0.85em" />} extra={<Pill tone="warning">1 combustible bajo</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
                  {FLEET.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      ref={f.id === "F-12" ? vehicleRef : null}
                      onClick={() => selectVehicle(f.id)}
                      className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.35em] text-left transition-colors hover:bg-surface-2"
                      style={{
                        backgroundColor: vehicle === f.id ? toneSoft(demo.tone) : "transparent",
                        boxShadow: vehicle === f.id ? `inset 0 0 0 1px ${toneVar(demo.tone)}` : undefined,
                      }}
                    >
                      <Avatar name={f.driver} tone={f.tone} size={1.6} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.62em] font-semibold">{f.id} · {f.driver}</p>
                          <span className="shrink-0 font-mono text-[0.5em] text-text-3">{f.deliveries} envíos</span>
                        </div>
                        <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                          <Bar value={f.fuel} tone={f.fuel < 25 ? "warning" : f.tone} h={0.4} />
                        </div>
                      </div>
                      {vehicle === f.id && <Check size="0.8em" className="shrink-0" style={{ color: toneVar(demo.tone) }} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title={`Mapa en vivo · ${FLEET.find((f) => f.id === vehicle)?.zone ?? "Zona Norte"}`} icon={<MapPin size="0.85em" />} extra={<Pill tone={demo.tone}>Ruta {vehicle}</Pill>} />
              <div className="relative mt-[0.7em] h-[16em] overflow-hidden rounded-[0.6em] border border-outline-strong">
                <div className="absolute inset-0" style={{ backgroundColor: toneSoft("acc-logistica"), opacity: 0.35 }} />
                {[
                  "left-[6%] top-[18%] w-[20%] h-[6%] rotate-[12deg]",
                  "left-[30%] top-[8%] w-[16%] h-[5%] rotate-[-8deg]",
                  "left-[18%] top-[42%] w-[24%] h-[5%] rotate-[8deg]",
                  "left-[48%] top-[30%] w-[18%] h-[5%] rotate-[14deg]",
                  "left-[8%] top-[68%] w-[22%] h-[5%] rotate-[-6deg]",
                  "left-[38%] top-[62%] w-[20%] h-[5%] rotate-[10deg]",
                  "left-[60%] top-[8%] w-[24%] h-[5%] rotate-[10deg]",
                  "left-[66%] top-[40%] w-[18%] h-[5%] rotate-[-10deg]",
                  "left-[70%] top-[70%] w-[22%] h-[5%] rotate-[8deg]",
                ].map((pos, i) => (
                  <span key={i} className={`absolute ${pos} rounded-full`} style={{ backgroundColor: "var(--color-outline)", opacity: 0.7 }} />
                ))}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M 22 66 L 36 40 L 52 28 L 68 52"
                    fill="none"
                    stroke={toneVar(demo.tone)}
                    strokeWidth="1.6"
                    strokeDasharray="3 2"
                    strokeLinecap="round"
                  />
                </svg>
                {stops.map((s, i) => (
                  <span key={s.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[0.2em]" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <span
                      className={`grid size-[1.35em] place-items-center rounded-full text-[0.6em] font-bold text-white shadow-[var(--shadow-sm)]`}
                      style={{ backgroundColor: s.done ? toneVar("acc-gestion") : toneVar(s.tone), opacity: s.done ? 0.75 : 1 }}
                    >
                      {s.done ? <Check size="0.65em" /> : i + 1}
                    </span>
                    <span className="rounded-full bg-surface-1 px-[0.5em] py-[0.1em] font-mono text-[0.46em] font-medium text-text-2 shadow-[var(--shadow-sm)]">{s.label}</span>
                  </span>
                ))}
                <div className="absolute bottom-[0.7em] right-[0.7em] flex items-center gap-[0.5em]">
                  <span className="flex items-center gap-[0.4em] rounded-full border border-outline-strong bg-surface-1 px-[0.7em] py-[0.3em] font-mono text-[0.52em] text-text-2">
                    <Route size="0.7em" style={{ color: toneVar(demo.tone) }} /> {km.toFixed(1)} km
                  </span>
                  <button
                    type="button"
                    ref={recalcRef}
                    onClick={() => { recalc(); flow.step(3) }}
                    className="flex items-center gap-[0.4em] rounded-full px-[0.7em] py-[0.3em] text-[0.56em] font-semibold text-white transition-transform active:scale-[0.96]"
                    style={{ backgroundColor: toneVar(demo.tone) }}
                  >
                    <Navigation size="0.7em" /> Recalcular
                  </button>
                </div>
              </div>
              <div className="mt-[0.5em] flex items-center justify-between">
                <span className="font-mono text-[0.52em] text-text-3">{doneStops}/{stops.length} paradas completadas</span>
                <span className="font-mono text-[0.52em]" style={{ color: toneVar("acc-gestion") }}>Llegada estimada 12:20</span>
              </div>
            </div>
          </div>
            </>
          )}
          {tab === "envios" && <Envios tone={demo.tone} deliveries={deliveries} onDeliver={deliver} />}
          {tab === "flota" && <Flota tone={demo.tone} vehicle={vehicle} onSelect={selectVehicle} />}
          {tab === "zonas" && <Zonas />}
          {tab === "reportes" && <Reportes tone={demo.tone} onTime={onTime} />}
        </div>
      </div>

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function Envios({ tone, deliveries, onDeliver }) {
  return (
    <div className="flex flex-col gap-[0.6em]">
      {deliveries.map((d) => (
        <div key={d.id} className="flex items-center gap-[0.55em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[0.7em] py-[0.55em]">
          <span className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(d.status === "entregado" ? "acc-gestion" : d.status === "reparto" ? "acc-turnos" : "warning"), color: toneVar(d.status === "entregado" ? "acc-gestion" : d.status === "reparto" ? "acc-turnos" : "warning") }}>
            <PackageCheck size="0.8em" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-[0.4em]">
              <p className="truncate text-[0.64em] font-semibold">{d.client}</p>
              <span className="shrink-0 font-mono text-[0.48em] text-text-4">{d.id}</span>
            </div>
            <p className="flex items-center gap-[0.3em] truncate text-[0.54em] text-text-3"><MapPin size="0.55em" /> {d.addr} · {d.zone}</p>
          </div>
          {d.status === "entregado" ? (
            <Pill tone="acc-gestion" className="shrink-0">Entregado</Pill>
          ) : d.status === "reparto" ? (
            <button
              type="button"
              onClick={() => onDeliver(d.id)}
              className="shrink-0 rounded-[0.5em] px-[0.6em] py-[0.3em] text-[0.58em] font-bold text-white transition-transform active:scale-[0.97]"
              style={{ backgroundColor: toneVar(tone) }}
            >
              Marcar entrega
            </button>
          ) : (
            <Pill tone="warning" className="shrink-0">Preparando · ETA {d.eta}</Pill>
          )}
        </div>
      ))}
    </div>
  )
}

function Flota({ tone, vehicle, onSelect }) {
  const totalFuel = Math.round(FLEET.reduce((a, f) => a + f.fuel, 0) / FLEET.length)
  return (
    <div className="grid gap-[0.7em] xl:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Vehículos" icon={<Truck size="0.85em" />} extra={<Pill tone="warning">1 combustible bajo</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {FLEET.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onSelect(f.id)}
              className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.4em] text-left transition-colors hover:bg-surface-2"
              style={{ backgroundColor: vehicle === f.id ? toneSoft(tone) : "transparent", boxShadow: vehicle === f.id ? `inset 0 0 0 1px ${toneVar(tone)}` : undefined }}
            >
              <Avatar name={f.driver} tone={f.tone} size={1.7} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-[0.5em]">
                  <p className="truncate text-[0.62em] font-semibold">{f.id} · {f.driver}</p>
                  <span className="shrink-0 font-mono text-[0.5em] text-text-3">{f.deliveries} envíos</span>
                </div>
                <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                  <Bar value={f.fuel} tone={f.fuel < 25 ? "warning" : f.tone} h={0.4} />
                  <span className="shrink-0 font-mono text-[0.5em] text-text-3">{f.fuel}%</span>
                </div>
              </div>
              {vehicle === f.id && <Check size="0.8em" className="shrink-0" style={{ color: toneVar(tone) }} />}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title={`Detalle · ${vehicle}`} icon={<Fuel size="0.85em" />} extra={<Pill tone="acc-gestion">Promedio {totalFuel}%</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.45em]">
          {[["Combustible promedio", `${totalFuel}%`], ["Paradas por hora", "6,4"], ["Km recorridos hoy", "142"], ["Próximo service", "dentro de 2.100 km"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b border-outline/50 py-[0.4em] last:border-0">
              <span className="text-[0.58em] text-text-3">{k}</span>
              <span className="font-mono text-[0.6em] font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Zonas() {
  return (
    <div className="grid gap-[0.6em] sm:grid-cols-2 xl:grid-cols-4">
      {ZONES.map((z) => (
        <div key={z.name} className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <div className="flex items-center justify-between">
            <p className="text-[0.68em] font-semibold">{z.name}</p>
            <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar(z.tone) }} />
          </div>
          <p className="mt-[0.4em] font-mono text-[0.95em] font-bold">{z.done}<span className="text-[0.55em] text-text-3"> entregas</span></p>
          <div className="mt-[0.35em] flex items-center gap-[0.5em]">
            <Bar value={(z.done / 8) * 100} tone={z.tone} h={0.4} className="flex-1" />
            <span className="shrink-0 font-mono text-[0.5em] text-text-3">{z.active} activos</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Reportes({ tone, onTime }) {
  const WEEK = [["Lun", 18, "acc-logistica"], ["Mar", 22, "acc-turnos"], ["Mié", 16, "acc-gestion"], ["Jue", 25, "acc-comercio"], ["Vie", 30, "acc-gestion"], ["Sáb", 21, "acc-logistica"]]
  return (
    <div className="grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Entregas por día" icon={<TrendingUp size="0.85em" />} extra={<Pill tone="acc-gestion">+12% vs semana pasada</Pill>} />
        <div className="mt-[0.7em] flex items-end gap-[0.55em]" style={{ height: "7.5em" }}>
          {WEEK.map(([d, v, t]) => (
            <div key={d} className="flex min-w-0 flex-1 flex-col items-center gap-[0.3em]">
              <div className="flex w-full flex-1 items-end justify-center" style={{ height: "100%" }}>
                <div className="w-full rounded-[0.3em] transition-transform hover:scale-[1.03]" style={{ height: `${(v / 30) * 100}%`, backgroundColor: toneVar(t), opacity: 0.9 }} />
              </div>
              <span className="font-mono text-[0.5em] text-text-3">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Indicadores" icon={<Clock size="0.85em" />} extra={<Pill tone={tone}>{onTime}% puntualidad</Pill>} />
          <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
            {[["Puntualidad", `${onTime}%`, tone], ["Costo por envío", "$2.140", "acc-gestion"], ["Distancia promedio", "8,2 km", "acc-logistica"]].map(([k, v, t]) => (
              <div key={k} className="flex items-center justify-between rounded-[0.5em] border border-outline bg-surface-2 px-[0.6em] py-[0.45em]">
                <span className="text-[0.58em] text-text-3">{k}</span>
                <span className="font-mono text-[0.6em] font-bold" style={{ color: toneVar(t) }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
