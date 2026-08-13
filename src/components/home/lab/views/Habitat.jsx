import { useEffect, useMemo, useRef, useState } from "react"
import { Bell, Building2, CalendarDays, Home, MapPin, Search, Users } from "lucide-react"
import { Avatar, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const NAV = [
  { key: "panel", label: "Panel" },
  { key: "propiedades", label: "Propiedades" },
  { key: "consultas", label: "Consultas" },
  { key: "visitas", label: "Visitas" },
  { key: "mensajes", label: "Mensajes" },
]

const PROPS = [
  { id: "p1", name: "Depto 2 amb. Recoleta", type: "Venta", price: "$145.000", zona: "Recoleta", x: 22, y: 30, tone: "acc-inmob", estado: "Destacado" },
  { id: "p2", name: "Casa 4 dorm. Zona Norte", type: "Venta", price: "$290.000", zona: "Núñez", x: 66, y: 22, tone: "acc-comercio", estado: "Nuevo" },
  { id: "p3", name: "Oficina flexible Palermo", type: "Alquiler", price: "$1.850.000", zona: "Palermo", x: 44, y: 58, tone: "acc-educacion", estado: "En cartel" },
]

const CONSULTAS = [
  { id: "c1", name: "Lucía M.", prop: "Depto Recoleta", cuando: "Hoy 15:30", col: "nueva", tone: "acc-gastro" },
  { id: "c2", name: "Ramiro P.", prop: "Casa Zona Norte", cuando: "Ayer 18:10", col: "seguimiento", tone: "acc-turnos" },
  { id: "c3", name: "Sofía P.", prop: "Oficina Palermo", cuando: "Ayer 11:20", col: "seguimiento", tone: "acc-logistica" },
  { id: "c4", name: "Diego M.", prop: "Depto Recoleta", cuando: "Lun 10:05", col: "agendada", tone: "acc-gestion" },
]

const VISITAS = [
  { who: "Martina G.", prop: "Casa Zona Norte", when: "Jue 14:30", tone: "acc-gestion" },
  { who: "Diego M.", prop: "Depto Recoleta", when: "Vie 11:00", tone: "acc-gestion" },
]

const ACTIVITY = [
  { text: "Nueva consulta · Lucía M.", time: "5 min", tone: "acc-gastro" },
  { text: "Ficha actualizada · P1", time: "42 min", tone: "acc-inmob" },
  { text: "Visita confirmada · Jue", time: "2 h", tone: "acc-gestion" },
]

export default function Habitat({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [tab, setTab] = useState("panel")
  const [prop, setProp] = useState("p1")
  const [consultas, setConsultas] = useState(CONSULTAS)
  const [visitas, setVisitas] = useState(VISITAS)
  const [agendada, setAgendada] = useState(false)

  const pinRef = useRef(null)
  const consultaRef = useRef(null)
  const agendaRef = useRef(null)

  const schedule = () => {
    setConsultas((rows) =>
      rows.map((r) => (r.id === "c1" ? { ...r, col: "agendada", cuando: "Jue 14:30" } : r))
    )
    setVisitas((rows) => [...rows, { who: "Lucía M.", prop: "Depto Recoleta", when: "Jue 14:30", tone: "acc-inmob" }])
    setAgendada(true)
  }

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(pinRef.current, { wait: 260 }) },
      { at: 1700, run: () => { demo.getCursor()?.click(pinRef.current); setProp("p2") } },
      { at: 3300, run: () => demo.getCursor()?.moveTo(consultaRef.current, { wait: 220 }) },
      { at: 4600, run: () => { demo.getCursor()?.click(consultaRef.current); schedule() } },
      { at: 6800, run: () => demo.getCursor()?.moveTo(agendaRef.current, { wait: 200, dur: 540 }) },
      { at: 8200, run: () => demo.getCursor()?.fadeOut(320) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2400, onComplete: demo.bump })

  useEffect(() => {
    setProp("p1")
    setConsultas(CONSULTAS)
    setVisitas(VISITAS)
    setAgendada(false)
  }, [demo.cycle])

  const activeProp = PROPS.find((p) => p.id === prop)
  const cols = { nueva: consultas.filter((c) => c.col === "nueva"), seguimiento: consultas.filter((c) => c.col === "seguimiento"), agendada: consultas.filter((c) => c.col === "agendada") }

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><Home size="0.9em" /> Habitat</p>
          <Pill tone={demo.tone} dot>CRM</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Contactos nuevos" value="48" delta={14} />
          <Kpi label="Visitas agendadas" value="12" delta={8} />
          <Kpi label="Propiedades" value="23" delta={3} />
          <Kpi label="Ratio cierre" value="31%" delta={-2} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
            <SectionHead title="Pipeline de consultas" extra={<Pill tone="acc-gastro">1 nueva</Pill>} />
            <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
              {consultas.map((c) => (
                <div key={c.id} className="flex items-center gap-[0.6em]">
                  <Avatar name={c.name} tone={c.tone} size={1.7} />
                  <span className="min-w-0 flex-1 truncate text-[0.68em]">{c.name} · {c.prop}</span>
                  <Pill tone={c.col === "nueva" ? "acc-gastro" : c.col === "seguimiento" ? "warning" : "acc-gestion"}>{c.col === "agendada" ? "Agendada" : c.col === "seguimiento" ? "En seguimiento" : "Nueva"}</Pill>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <aside className="hidden w-[11em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] md:flex">
        <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
          <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
            <Building2 size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">Habitat CRM</p>
            <p className="text-[0.55em] text-text-3">Inmobiliaria</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {NAV.map((n) => {
            const active = tab === n.key
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => setTab(n.key)}
                className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] transition-colors"
                style={{
                  backgroundColor: active ? toneSoft(demo.tone) : "transparent",
                  color: active ? toneVar(demo.tone) : "var(--color-text-2)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                <span className="size-[0.4em] rounded-full" style={{ backgroundColor: active ? toneVar(demo.tone) : "var(--color-text-4)" }} />
                <span className="flex-1">{n.label}</span>
                {n.key === "consultas" && <span className="font-mono text-[0.58em] text-text-3">14</span>}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Próxima visita</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Jue 14:30 · Casa Núñez</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Panel comercial</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">3 operaciones en curso</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
              <Search size="0.8em" /> Buscar propiedad, cliente…
            </span>
            <span className="relative grid size-[1.8em] place-items-center rounded-[0.5em] border border-outline text-text-2">
              <Bell size="0.8em" />
              <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.85em] place-items-center rounded-full text-[0.5em] font-bold text-white" style={{ backgroundColor: toneVar(demo.tone) }}>2</span>
            </span>
            <Avatar name="Mora T." tone={demo.tone} size={1.8} />
          </div>
        </div>

        {agendada && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <CalendarDays size="0.85em" style={{ color: toneVar(demo.tone) }} />
              <span className="text-[0.7em] font-semibold">Visita agendada · Lucía M. · Jue 14:30</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Contactos nuevos" value="48" delta={14} />
            <Kpi label="Visitas agendadas" value="12" delta={8} />
            <Kpi label="Propiedades activas" value="23" delta={3} />
            <Kpi label="Ratio de cierre" value="31%" delta={-2} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1fr_1.15fr_1fr]">
            {/* Mapa */}
            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Mapa de cartera" icon={<MapPin size="0.85em" />} extra={<Pill tone={demo.tone}>{activeProp.zona}</Pill>} />
              <div className="relative mt-[0.7em] h-[12.5em] overflow-hidden rounded-[0.6em] border border-outline" style={{ backgroundColor: "var(--color-surface-2)" }} aria-hidden="true">
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(var(--color-outline) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline) 1px, transparent 1px)", backgroundSize: "2em 2em" }} />
                {PROPS.map((p) => {
                  const active = p.id === prop
                  return (
                    <button
                      key={p.id}
                      type="button"
                      ref={p.id === "p2" ? pinRef : undefined}
                      onClick={() => setProp(p.id)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      aria-label={`${p.name} ${p.price}`}
                    >
                      <span
                        className={`grid size-[1.5em] place-items-center rounded-full border-2 border-surface-1 text-[0.7em] text-white transition-all ${active ? "scale-125" : ""}`}
                        style={{ backgroundColor: active ? toneVar(demo.tone) : toneVar(p.tone) }}
                      >
                        <Home size="0.8em" />
                      </span>
                      <span className="absolute left-1/2 top-full mt-[0.2em] -translate-x-1/2 whitespace-nowrap rounded-full px-[0.5em] py-[0.12em] text-[0.52em] font-semibold text-text-1" style={{ backgroundColor: "var(--color-surface-1)" }}>
                        {p.price}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-[0.6em] flex flex-col gap-[0.35em]">
                {PROPS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProp(p.id)}
                    className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.5em] py-[0.3em] text-left transition-colors hover:bg-surface-2"
                    style={{ backgroundColor: p.id === prop ? toneSoft(demo.tone) : "transparent" }}
                  >
                    <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(p.tone) }} />
                    <span className="min-w-0 flex-1 truncate text-[0.64em]">{p.name}</span>
                    <span className="font-mono text-[0.56em] text-text-3">{p.type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Pipeline de consultas" extra={<Pill tone="acc-gastro">1 nueva</Pill>} />
              <div className="mt-[0.6em] grid grid-cols-3 gap-[0.5em]">
                {[
                  { key: "nueva", title: "Nuevas", tone: "acc-gastro" },
                  { key: "seguimiento", title: "En seguimiento", tone: "warning" },
                  { key: "agendada", title: "Agendadas", tone: "acc-gestion" },
                ].map((col) => (
                  <div key={col.key} className="rounded-[0.55em] border border-outline bg-surface-2/50 p-[0.5em]">
                    <div className="mb-[0.4em] flex items-center gap-[0.35em] px-[0.2em]">
                      <span className="size-[0.4em] rounded-full" style={{ backgroundColor: toneVar(col.tone) }} />
                      <span className="truncate text-[0.56em] font-semibold uppercase tracking-wide text-text-2">{col.title}</span>
                      <span className="ml-auto font-mono text-[0.52em] text-text-4">{cols[col.key].length}</span>
                    </div>
                    <div className="flex flex-col gap-[0.4em]">
                      {cols[col.key].map((c) => (
                        <div
                          key={c.id}
                          ref={c.id === "c1" ? consultaRef : undefined}
                          className={`rounded-[0.5em] border px-[0.55em] py-[0.45em] ${c.id === "c1" ? "border-primary bg-primary-soft" : "border-outline bg-surface-1"}`}
                        >
                          <div className="flex items-center gap-[0.4em]">
                            <Avatar name={c.name} tone={c.tone} size={1.4} />
                            <span className="min-w-0 flex-1 truncate text-[0.62em] font-semibold">{c.name}</span>
                          </div>
                          <p className="mt-[0.25em] truncate text-[0.56em] text-text-3">{c.prop}</p>
                          <p className="mt-[0.15em] font-mono text-[0.5em] text-text-4">{c.cuando}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Derecha: ficha + agenda + actividad */}
            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Ficha de propiedad" icon={<Building2 size="0.85em" />} extra={<Pill tone={activeProp.tone}>{activeProp.estado}</Pill>} />
                <div className="mt-[0.6em] flex items-center gap-[0.6em]">
                  <span className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.6em] text-white" style={{ backgroundColor: toneVar(activeProp.tone) }}>
                    <Home size="1.1em" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.72em] font-bold">{activeProp.name}</p>
                    <p className="text-[0.56em] text-text-3">{activeProp.zona} · {activeProp.type}</p>
                  </div>
                  <span className="ml-auto text-[0.8em] font-bold" style={{ color: toneVar(demo.tone) }}>{activeProp.price}</span>
                </div>
                <div className="mt-[0.5em] grid grid-cols-3 gap-[0.4em] text-center">
                  {[["2 amb", "Dorm"], ["72 m²", "Sup."], ["5º piso", "Piso"]].map(([v, l]) => (
                    <div key={l} className="rounded-[0.5em] border border-outline bg-surface-2/50 px-[0.3em] py-[0.35em]">
                      <p className="text-[0.66em] font-bold text-text-1">{v}</p>
                      <p className="text-[0.5em] text-text-3">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={agendaRef} className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Agenda de visitas" icon={<CalendarDays size="0.85em" />} extra={<Pill tone="acc-gestion">{visitas.length} visitas</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.4em]">
                  {visitas.map((v, i) => (
                    <div key={i} className="flex items-center gap-[0.5em]">
                      <Avatar name={v.who} tone={v.tone} size={1.4} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.62em] font-medium">{v.who}</p>
                        <p className="truncate text-[0.52em] text-text-3">{v.prop}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.55em] text-text-2">{v.when}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Actividad reciente" icon={<Users size="0.85em" />} />
                <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-center gap-[0.5em]">
                      <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(a.tone) }} />
                      <p className="min-w-0 flex-1 truncate text-[0.6em] text-text-2">{a.text}</p>
                      <span className="font-mono text-[0.5em] text-text-4">{a.time}</span>
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
