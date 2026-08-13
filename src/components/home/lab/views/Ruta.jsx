import { useEffect, useMemo, useRef, useState } from "react"
import { Check, Fuel, MapPin, Navigation, PackageCheck, Route, Truck } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

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
  { x: 36, y: 40, label: "Café Nómada", tone: "acc-turnos", done: false },
  { x: 52, y: 28, label: "Studio Áurea", tone: "acc-gestion", done: false },
  { x: 68, y: 52, label: "Distrito SRL", tone: "acc-logistica", done: false },
]

export default function Ruta({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [deliveries, setDeliveries] = useState(DELIVERY_SEED)
  const [toast, setToast] = useState(null)

  const cardRef = useRef(null)
  const mapRef = useRef(null)

  const deliver = (id) => {
    const item = deliveries.find((d) => d.id === id)
    if (!item || item.status !== "reparto") return
    setDeliveries((rows) => rows.map((r) => (r.id === id ? { ...r, status: "entregado", eta: "—" } : r)))
    setToast(`Envío ${id} entregado`)
    window.setTimeout(() => setToast(null), 2600)
  }

  const count = (k) => deliveries.filter((d) => d.status === k).length
  const onTime = Math.round(((count("entregado") + 2) / (deliveries.length + 2)) * 100)

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(mapRef.current, { wait: 260 }) },
      { at: 1500, run: () => demo.getCursor()?.moveTo(cardRef.current, { wait: 220 }) },
      { at: 2600, run: () => { demo.getCursor()?.click(cardRef.current); deliver("EN-3180") } },
      { at: 4300, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2200, onComplete: demo.bump })

  useEffect(() => {
    setDeliveries(DELIVERY_SEED)
    setToast(null)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><Route size="0.9em" /> Ruta</p>
          <Pill tone={demo.tone} dot>4 activos</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Envíos activos" value={count("reparto")} delta={2} />
          <Kpi label="Entregas hoy" value={count("entregado") + 14} delta={9} />
          <Kpi label="Puntualidad" value={`${onTime}%`} delta={3} />
          <Kpi label="Flota activa" value="4/6" delta={0} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="flex h-full flex-col gap-[0.5em]">
            {deliveries.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-[0.55em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[0.7em] py-[0.5em]">
                <span className="grid size-[1.6em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(d.status === "entregado" ? "acc-gestion" : "acc-turnos"), color: toneVar(d.status === "entregado" ? "acc-gestion" : "acc-turnos") }}>
                  <PackageCheck size="0.8em" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[0.4em]">
                    <p className="truncate text-[0.64em] font-semibold">{d.client}</p>
                    <span className="shrink-0 font-mono text-[0.48em] text-text-4">{d.id}</span>
                  </div>
                  <p className="truncate text-[0.54em] text-text-3">{d.addr}</p>
                </div>
                <Pill tone={d.status === "entregado" ? "acc-gestion" : "acc-turnos"}>{d.status === "entregado" ? "Entregado" : "En reparto"}</Pill>
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
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] font-medium text-text-2 transition-colors hover:bg-surface-2"
            >
              <span className="size-[0.4em] rounded-full bg-text-4" />
              <span className="flex-1">{label}</span>
              {k === "envios" && <span className="rounded-full px-[0.45em] py-[0.05em] font-mono text-[0.55em]" style={{ backgroundColor: toneSoft(demo.tone), color: toneVar(demo.tone) }}>{count("reparto")}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Hora punta</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">2 camionetas en tránsito</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Centro de distribución</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Lunes 12 ago · turno mañana</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <Pill tone={demo.tone} dot>Optimización activa</Pill>
            <Btn tone={demo.tone}><Navigation size="0.8em" /> Nueva ruta</Btn>
          </div>
        </div>

        {toast && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">{toast} · ruta Norte</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
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
                      ref={d.id === "EN-3180" ? cardRef : null}
                      onClick={() => deliver(d.id)}
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
                    <div key={f.id} className="flex items-center gap-[0.55em]">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Mapa en vivo · Zona Norte" icon={<MapPin size="0.85em" />} extra={<Pill tone={demo.tone}>Ruta F-12</Pill>} />
              <div ref={mapRef} className="relative mt-[0.7em] h-[16em] overflow-hidden rounded-[0.6em] border border-outline-strong">
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
                {ROUTE_STOPS.map((s, i) => (
                  <span
                    key={s.label}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[0.2em]"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    <span
                      className={`grid size-[1.35em] place-items-center rounded-full text-[0.6em] font-bold text-white shadow-[var(--shadow-sm)]`}
                      style={{ backgroundColor: s.done ? toneVar("acc-gestion") : toneVar(s.tone), opacity: s.done ? 0.75 : 1 }}
                    >
                      {s.done ? <Check size="0.65em" /> : i + 1}
                    </span>
                    <span className="rounded-full bg-surface-1 px-[0.5em] py-[0.1em] font-mono text-[0.46em] font-medium text-text-2 shadow-[var(--shadow-sm)]">{s.label}</span>
                  </span>
                ))}
                <div className="absolute bottom-[0.7em] right-[0.7em] flex items-center gap-[0.4em] rounded-full border border-outline-strong bg-surface-1 px-[0.7em] py-[0.3em] font-mono text-[0.52em] text-text-2">
                  <Route size="0.7em" style={{ color: toneVar(demo.tone) }} /> 12,4 km
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
