import { useEffect, useMemo, useRef, useState } from "react"
import { Bell, Building2, CalendarDays, Check, Home, MapPin, Search, UserPlus, Users } from "lucide-react"
import { Avatar, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

const NAV = [
  { key: "propiedades", label: "Propiedades" },
  { key: "mapa", label: "Mapa" },
  { key: "consultas", label: "Consultas" },
  { key: "contactos", label: "Contactos" },
  { key: "agenda", label: "Agenda" },
]

const PROPS = [
  { id: "p1", name: "Depto 2 amb. Recoleta", type: "Venta", price: "$145.000", zona: "Recoleta", x: 22, y: 30, tone: "acc-inmob", estado: "Destacado", specs: [["2", "Amb."], ["72 m²", "Sup."], ["5º", "Piso"]] },
  { id: "p2", name: "Casa 4 dorm. Zona Norte", type: "Venta", price: "$290.000", zona: "Núñez", x: 66, y: 22, tone: "acc-comercio", estado: "Nuevo", specs: [["4", "Dorm."], ["220 m²", "Sup."], ["2", "Garages"]] },
  { id: "p3", name: "Oficina flexible Palermo", type: "Alquiler", price: "$1.850.000", zona: "Palermo", x: 44, y: 58, tone: "acc-educacion", estado: "En cartel", specs: [["3", "Ofic."], ["140 m²", "Sup."], ["10º", "Piso"]] },
]

const CONSULTAS_SEED = [
  { id: "c1", name: "Lucía M.", prop: "Depto Recoleta", cuando: "Hoy 15:30", col: "nueva", tone: "acc-gastro", interesado: false },
  { id: "c2", name: "Ramiro P.", prop: "Casa Zona Norte", cuando: "Ayer 18:10", col: "seguimiento", tone: "acc-turnos", interesado: true },
  { id: "c3", name: "Sofía P.", prop: "Oficina Palermo", cuando: "Ayer 11:20", col: "seguimiento", tone: "acc-logistica", interesado: false },
  { id: "c4", name: "Diego M.", prop: "Depto Recoleta", cuando: "Lun 10:05", col: "agendada", tone: "acc-gestion", interesado: true },
]

const VISITAS_SEED = [
  { who: "Martina G.", prop: "Casa Zona Norte", when: "Jue 14:30", tone: "acc-gestion", new: false },
  { who: "Diego M.", prop: "Depto Recoleta", when: "Vie 11:00", tone: "acc-gestion", new: false },
]

const CONTACTOS_SEED = [
  { name: "Lucía M.", etapa: "Lead", tone: "acc-gastro" },
  { name: "Ramiro P.", etapa: "Interesado", tone: "acc-turnos" },
  { name: "Sofía P.", etapa: "Lead", tone: "acc-logistica" },
  { name: "Diego M.", etapa: "Con visita", tone: "acc-gestion" },
]

const etapaInfo = {
  Lead: { tone: "acc-gastro" },
  Interesado: { tone: "warning" },
  "Con visita": { tone: "acc-gestion" },
}

export default function Habitat({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("propiedades")
  const [prop, setProp] = useState("p1")
  const [consultas, setConsultas] = useState(CONSULTAS_SEED)
  const [visitas, setVisitas] = useState(VISITAS_SEED)
  const [toast, setToast] = useToast()

  const propRef = useRef(null)
  const consultaBtnRef = useRef(null)
  const leadCardRef = useRef(null)
  const interesRef = useRef(null)
  const agendarRef = useRef(null)
  const agendaNavRef = useRef(null)

  const addConsulta = () => {
    if (consultas.some((c) => c.id === "c5")) return
    setConsultas((rows) => [
      { id: "c5", name: "Lucía M.", prop: "Depto Recoleta", cuando: "Hoy 14:35", col: "nueva", tone: "acc-gastro", interesado: false },
      ...rows,
    ])
    setToast("Consulta registrada · Lucía M.")
  }

  const promote = (id) => {
    setConsultas((rows) => rows.map((r) => (r.id === id && r.col === "nueva" ? { ...r, col: "seguimiento" } : r)))
    setToast("Lucía M. ahora es un lead")
  }

  const markInteresado = (id) => {
    setConsultas((rows) => rows.map((r) => (r.id === id ? { ...r, interesado: true } : r)))
    setToast("Lucía M. marcada como interesada")
  }

  const schedule = (id) => {
    setConsultas((rows) => rows.map((r) => (r.id === id ? { ...r, col: "agendada", cuando: "Jue 14:30", interesado: true } : r)))
    setVisitas((rows) => [{ who: "Lucía M.", prop: "Depto Recoleta", when: "Jue 14:30", tone: "acc-inmob", new: true }, ...rows])
    setToast("Visita agendada · Lucía M. · Jue 14:30")
  }

  const resetAll = () => {
    setTab("propiedades")
    setProp("p1")
    setConsultas(CONSULTAS_SEED)
    setVisitas(VISITAS_SEED)
    setToast(null)
  }
  useEffect(() => {
    resetAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  const timeline = useMemo(
    () => [
      { at: 500, run: () => click(propRef.current, () => setProp("p1")) },
      { at: 1700, run: () => click(consultaBtnRef.current, () => { addConsulta(); setTab("consultas") }) },
      { at: 3300, run: () => click(leadCardRef.current, () => promote("c5")) },
      { at: 4800, run: () => click(interesRef.current, () => markInteresado("c5")) },
      { at: 6400, run: () => click(agendarRef.current, () => schedule("c5")) },
      { at: 8100, run: () => click(agendaNavRef.current, () => setTab("agenda")) },
      { at: 9800, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  function click(el, fn) {
    demo.getCursor()?.moveTo(el, { wait: 100 })
    demo.getCursor()?.click(el)
    fn()
  }

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps: timeline, hold: 2400, onComplete: demo.bump })

  const activeProp = PROPS.find((p) => p.id === prop)
  const cols = {
    nueva: consultas.filter((c) => c.col === "nueva"),
    seguimiento: consultas.filter((c) => c.col === "seguimiento"),
    agendada: consultas.filter((c) => c.col === "agendada"),
  }
  const c5 = consultas.find((c) => c.id === "c5")

  const onNav = (key) => {
    demo.pause()
    setTab(key)
  }

  const body = (
    <>
      <div className="grid grid-cols-2 gap-[0.55em]">
        <Kpi label="Contactos nuevos" value="48" delta={14} />
        <Kpi label="Visitas agendadas" value={visitas.length + 10} delta={8} />
        <Kpi label="Propiedades activas" value="23" delta={3} />
        <Kpi label="Ratio de cierre" value="31%" delta={-2} />
      </div>

      {tab === "propiedades" && (
        <div className="mt-[0.65em]">
          <Propiedades tone={demo.tone} prop={activeProp} onSelect={setProp} onConsulta={addConsulta} propRef={propRef} consultaBtnRef={consultaBtnRef} />
        </div>
      )}
      {tab === "mapa" && (
        <div className="mt-[0.65em]">
          <Mapa tone={demo.tone} prop={activeProp} onSelect={setProp} onConsulta={addConsulta} consultaBtnRef={consultaBtnRef} />
        </div>
      )}
      {tab === "consultas" && (
        <div className="mt-[0.65em]">
          <Consultas
            tone={demo.tone}
            cols={cols}
            onPromote={promote}
            onInteresado={markInteresado}
            onSchedule={schedule}
            leadCardRef={leadCardRef}
            interesRef={interesRef}
            agendarRef={agendarRef}
          />
        </div>
      )}
      {tab === "contactos" && <div className="mt-[0.65em]"><Contactos tone={demo.tone} c5={c5} /></div>}
      {tab === "agenda" && <div className="mt-[0.65em]"><Agenda tone={demo.tone} visitas={visitas} /></div>}
    </>
  )

  if (compact) {
    return (
      <div className="relative flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Building2 size="0.95em" />}
          brand="Habitat CRM"
          subtitle="Inmobiliaria"
          status={<Pill tone={demo.tone} dot>3 operaciones</Pill>}
          tabs={[
            { key: "propiedades", label: "Props.", Icon: Home },
            { key: "mapa", label: "Mapa", Icon: MapPin },
            { key: "consultas", label: "Consultas", Icon: UserPlus, badge: consultas.filter((c) => c.col === "nueva").length },
            { key: "contactos", label: "Contactos", Icon: Users },
            { key: "agenda", label: "Agenda", Icon: CalendarDays, ref: agendaNavRef },
          ]}
          tab={tab}
          onTab={onNav}
          overlay={
            <>
              {toast && (
                <div className="pointer-events-none absolute inset-x-0 bottom-[3.6em] z-30 flex justify-center px-[1em]">
                  <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
                    <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
                      <Check size="0.7em" />
                    </span>
                    <span className="text-[0.7em] font-semibold">{toast}</span>
                  </div>
                </div>
              )}
            </>
          }
        >
          {body}
        </MobileShell>
      </div>
    )
  }

  return (
    <div className="relative flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <Sidebar tone={demo.tone} tab={tab} setTab={setTab} agendaNavRef={agendaNavRef} count={consultas.filter((c) => c.col === "nueva").length} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar tone={demo.tone} title={NAV.find((n) => n.key === tab)?.label} />

        {toast && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">{toast}</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          {body}
        </div>
      </div>
    </div>
  )
}

function Sidebar({ tone, tab, setTab, agendaNavRef, count }) {
  return (
    <aside className="hidden w-[11.5em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] md:flex">
      <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
        <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-white" style={{ backgroundColor: toneVar(tone) }}>
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
              ref={n.key === "agenda" ? agendaNavRef : undefined}
              onClick={() => setTab(n.key)}
              className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] transition-colors"
              style={{
                backgroundColor: active ? toneSoft(tone) : "transparent",
                color: active ? toneVar(tone) : "var(--color-text-2)",
                fontWeight: active ? 700 : 500,
              }}
            >
              <span className="size-[0.4em] rounded-full" style={{ backgroundColor: active ? toneVar(tone) : "var(--color-text-4)" }} />
              <span className="flex-1">{n.label}</span>
              {n.key === "consultas" && count > 0 && (
                <span className="grid min-w-[1.3em] place-items-center rounded-full px-[0.3em] py-[0.05em] font-mono text-[0.55em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(tone) }}>
        <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(tone) }}>Próxima visita</p>
        <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Jue 14:30 · Casa Núñez</p>
      </div>
    </aside>
  )
}

function Topbar({ tone, title }) {
  return (
    <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
      <div className="min-w-0">
        <p className="truncate text-[0.78em] font-bold leading-none">{title}</p>
        <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">3 operaciones en curso</p>
      </div>
      <div className="flex shrink-0 items-center gap-[0.5em]">
        <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
          <Search size="0.8em" /> Buscar propiedad, cliente…
        </span>
        <span className="relative grid size-[1.8em] place-items-center rounded-[0.5em] border border-outline text-text-2">
          <Bell size="0.8em" />
          <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.85em] place-items-center rounded-full text-[0.5em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>2</span>
        </span>
        <Avatar name="Mora T." tone={tone} size={1.8} />
      </div>
    </div>
  )
}

function Propiedades({ tone, prop, onSelect, onConsulta, propRef, consultaBtnRef }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-[0.6em]">
        <SectionHead title="Propiedades en cartera" extra={<Pill tone={tone}>23 activas</Pill>} />
        {PROPS.map((p) => {
          const active = p.id === prop.id
          return (
            <button
              key={p.id}
              type="button"
              ref={p.id === "p1" ? propRef : undefined}
              onClick={() => onSelect(p.id)}
              className="flex items-center gap-[0.6em] rounded-[0.7em] border px-[0.8em] py-[0.6em] text-left transition-colors"
              style={{
                borderColor: active ? toneVar(tone) : "var(--color-outline)",
                backgroundColor: active ? toneSoft(tone) : "var(--color-surface-1)",
              }}
            >
              <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.55em] text-white" style={{ backgroundColor: toneVar(p.tone) }}>
                <Home size="0.9em" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.68em] font-semibold text-text-1">{p.name}</p>
                <p className="text-[0.56em] text-text-3">{p.zona} · {p.type}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[0.72em] font-bold" style={{ color: active ? toneVar(tone) : "var(--color-text-1)" }}>{p.price}</p>
                <Pill tone={p.tone}>{p.estado}</Pill>
              </div>
            </button>
          )
        })}
      </div>

      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Ficha de propiedad" icon={<Building2 size="0.85em" />} extra={<Pill tone={prop.tone}>{prop.estado}</Pill>} />
        <div className="mt-[0.6em] flex items-center gap-[0.6em]">
          <span className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.6em] text-white" style={{ backgroundColor: toneVar(prop.tone) }}>
            <Home size="1.1em" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.72em] font-bold">{prop.name}</p>
            <p className="text-[0.56em] text-text-3">{prop.zona} · {prop.type}</p>
          </div>
          <span className="ml-auto text-[0.8em] font-bold" style={{ color: toneVar(tone) }}>{prop.price}</span>
        </div>
        <div className="mt-[0.5em] grid grid-cols-3 gap-[0.4em] text-center">
          {prop.specs.map(([v, l]) => (
            <div key={l} className="rounded-[0.5em] border border-outline bg-surface-2/50 px-[0.3em] py-[0.35em]">
              <p className="text-[0.66em] font-bold text-text-1">{v}</p>
              <p className="text-[0.5em] text-text-3">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-[0.8em] flex flex-wrap gap-[0.5em]">
          <button
            ref={consultaBtnRef}
            type="button"
            onClick={onConsulta}
            className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] px-[1em] text-[0.7em] font-bold text-white transition-transform active:scale-[0.97]"
            style={{ backgroundColor: toneVar(tone) }}
          >
            <UserPlus size="0.8em" /> Registrar consulta
          </button>
          <button
            type="button"
            onClick={onConsulta}
            className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[1em] text-[0.7em] font-semibold text-text-2 transition-colors hover:text-text-1"
          >
            <CalendarDays size="0.8em" /> Agendar visita
          </button>
        </div>
        <div className="mt-[0.7em] rounded-[0.6em] border border-outline bg-surface-2/50 p-[0.6em]">
          <p className="font-mono text-[0.52em] uppercase tracking-wider text-text-4">Historial</p>
          <p className="mt-[0.25em] text-[0.58em] text-text-3">3 consultas · 1 visita realizada · última actualización hace 42 min</p>
        </div>
      </div>
    </div>
  )
}

function Mapa({ tone, prop, onSelect, onConsulta, consultaBtnRef }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Mapa de cartera" icon={<MapPin size="0.85em" />} extra={<Pill tone={tone}>{prop.zona}</Pill>} />
        <div className="relative mt-[0.7em] h-[15em] overflow-hidden rounded-[0.6em] border border-outline" style={{ backgroundColor: "var(--color-surface-2)" }}>
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(var(--color-outline) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline) 1px, transparent 1px)", backgroundSize: "2em 2em" }} />
          {PROPS.map((p) => {
            const active = p.id === prop.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={`${p.name} ${p.price}`}
              >
                <span
                  className={`grid size-[1.5em] place-items-center rounded-full border-2 border-surface-1 text-[0.7em] text-white transition-all ${active ? "scale-125" : ""}`}
                  style={{ backgroundColor: active ? toneVar(tone) : toneVar(p.tone) }}
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
      </div>

      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Propiedad seleccionada" icon={<Building2 size="0.85em" />} extra={<Pill tone={prop.tone}>{prop.estado}</Pill>} />
        <div className="mt-[0.6em] flex items-center gap-[0.6em]">
          <span className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.6em] text-white" style={{ backgroundColor: toneVar(prop.tone) }}>
            <Home size="1.1em" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.72em] font-bold">{prop.name}</p>
            <p className="text-[0.56em] text-text-3">{prop.zona} · {prop.type}</p>
          </div>
          <span className="ml-auto text-[0.8em] font-bold" style={{ color: toneVar(tone) }}>{prop.price}</span>
        </div>
        <div className="mt-[0.5em] grid grid-cols-3 gap-[0.4em] text-center">
          {prop.specs.map(([v, l]) => (
            <div key={l} className="rounded-[0.5em] border border-outline bg-surface-2/50 px-[0.3em] py-[0.35em]">
              <p className="text-[0.66em] font-bold text-text-1">{v}</p>
              <p className="text-[0.5em] text-text-3">{l}</p>
            </div>
          ))}
        </div>
        <button
          ref={consultaBtnRef}
          type="button"
          onClick={onConsulta}
          className="mt-[0.8em] inline-flex min-h-[2.4em] w-full items-center justify-center gap-[0.4em] rounded-[0.6em] text-[0.7em] font-bold text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: toneVar(tone) }}
        >
          <UserPlus size="0.8em" /> Registrar consulta
        </button>
      </div>
    </div>
  )
}

function Consultas({ tone, cols, onPromote, onInteresado, onSchedule, leadCardRef, interesRef, agendarRef }) {
  const columns = [
    { key: "nueva", title: "Nuevas", tone: "acc-gastro", hint: "Hacé clic para contactar" },
    { key: "seguimiento", title: "En seguimiento", tone: "warning", hint: "Lead en proceso" },
    { key: "agendada", title: "Agendadas", tone: "acc-gestion", hint: "Con visita pautada" },
  ]
  return (
    <div className="mt-[0.7em] grid grid-cols-3 gap-[0.6em]">
      {columns.map((col) => (
        <div key={col.key} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.7em]">
          <div className="mb-[0.45em] flex items-center gap-[0.35em] px-[0.2em]">
            <span className="size-[0.4em] rounded-full" style={{ backgroundColor: toneVar(col.tone) }} />
            <span className="truncate text-[0.56em] font-semibold uppercase tracking-wide text-text-2">{col.title}</span>
            <span className="ml-auto font-mono text-[0.52em] text-text-4">{cols[col.key].length}</span>
          </div>
          <div className="flex flex-col gap-[0.4em]">
            {cols[col.key].map((c) => (
              <div key={c.id} className="rounded-[0.5em] border border-outline bg-surface-2/50 p-[0.55em]">
                <div className="flex items-center gap-[0.4em]">
                  <Avatar name={c.name} tone={c.tone} size={1.4} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.62em] font-semibold text-text-1">{c.name}</p>
                    <p className="truncate text-[0.54em] text-text-3">{c.prop}</p>
                  </div>
                  {c.interesado && (
                    <Pill tone="acc-gestion" dot>Interesada</Pill>
                  )}
                </div>
                <p className="mt-[0.25em] font-mono text-[0.5em] text-text-4">{c.cuando}</p>
                {col.key === "nueva" && (
                  <button
                    ref={c.id === "c5" ? leadCardRef : undefined}
                    type="button"
                    onClick={() => onPromote(c.id)}
                    className="mt-[0.4em] inline-flex min-h-[2em] w-full items-center justify-center gap-[0.3em] rounded-[0.4em] border border-outline-strong bg-surface-1 text-[0.56em] font-semibold text-text-2 transition-colors hover:text-text-1"
                  >
                    Pasar a seguimiento
                  </button>
                )}
                {col.key === "seguimiento" && (
                  <div className="mt-[0.4em] flex gap-[0.4em]">
                    <button
                      ref={c.id === "c5" ? interesRef : undefined}
                      type="button"
                      onClick={() => onInteresado(c.id)}
                      disabled={c.interesado}
                      className="inline-flex min-h-[2em] flex-1 items-center justify-center gap-[0.3em] rounded-[0.4em] border border-outline-strong bg-surface-1 text-[0.54em] font-semibold text-text-2 transition-colors hover:text-text-1"
                      style={{ opacity: c.interesado ? 0.5 : 1 }}
                    >
                      <Check size="0.65em" /> {c.interesado ? "Interesada" : "Interesado"}
                    </button>
                    <button
                      ref={c.id === "c5" ? agendarRef : undefined}
                      type="button"
                      onClick={() => onSchedule(c.id)}
                      className="inline-flex min-h-[2em] flex-1 items-center justify-center gap-[0.3em] rounded-[0.4em] px-[0.4em] text-[0.54em] font-bold text-white transition-transform active:scale-[0.96]"
                      style={{ backgroundColor: toneVar(tone) }}
                    >
                      <CalendarDays size="0.65em" /> Agendar
                    </button>
                  </div>
                )}
              </div>
            ))}
            {cols[col.key].length === 0 && <p className="py-[0.8em] text-center text-[0.54em] text-text-4">Sin {col.title.toLowerCase()}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function Contactos({ tone, c5 }) {
  const rows = CONTACTOS_SEED.map((ct) => (ct.name === "Lucía M." && c5 ? { ...ct, etapa: c5.col === "nueva" ? "Lead" : c5.col === "seguimiento" ? (c5.interesado ? "Interesado" : "Lead") : "Con visita" } : ct))
  return (
    <div className="mt-[0.7em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
      <SectionHead title="Contactos y leads" icon={<Users size="0.85em" />} extra={<Pill tone={tone}>48 este mes</Pill>} />
      <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
        {rows.map((c) => (
          <div key={c.name} className="flex items-center gap-[0.55em] rounded-[0.5em] px-[0.4em] py-[0.35em]">
            <Avatar name={c.name} tone={c.tone} size={1.6} />
            <span className="min-w-0 flex-1 truncate text-[0.66em] font-medium text-text-1">{c.name}</span>
            <Pill tone={etapaInfo[c.etapa].tone} dot>{c.etapa}</Pill>
          </div>
        ))}
      </div>
    </div>
  )
}

function Agenda({ tone, visitas }) {
  const next = visitas.find((v) => v.new) ?? visitas[0]
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Agenda de visitas" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={tone}>{visitas.length} agendadas</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {visitas.map((v, i) => (
            <div key={i} className="flex items-center gap-[0.55em] rounded-[0.6em] border px-[0.6em] py-[0.5em]" style={{ borderColor: v.new ? toneVar(tone) : "var(--color-outline)", backgroundColor: v.new ? toneSoft(tone) : "var(--color-surface-2/50)" }}>
              <Avatar name={v.who} tone={v.tone} size={1.5} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.64em] font-semibold text-text-1">{v.who}</p>
                <p className="truncate text-[0.54em] text-text-3">{v.prop}</p>
              </div>
              <span className="shrink-0 font-mono text-[0.56em] text-text-2">{v.when}</span>
              {v.new && <Pill tone={tone} dot>Nueva</Pill>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Próxima visita" icon={<Home size="0.85em" />} extra={<Pill tone="acc-gestion">Confirmada</Pill>} />
        <div className="mt-[0.6em] rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(tone) }}>
          <p className="text-[0.72em] font-bold text-text-1">{next?.who ?? "Lucía M."}</p>
          <p className="text-[0.6em] text-text-3">{next?.prop ?? "Depto Recoleta"}</p>
          <p className="mt-[0.35em] font-mono text-[0.58em]" style={{ color: toneVar(tone) }}>{next?.when ?? "Jue 14:30"} · 40 min</p>
        </div>
        <p className="mt-[0.6em] text-[0.56em] text-text-3">Se envía recordatorio al cliente 24 h antes y se actualiza el pipeline automáticamente.</p>
      </div>
    </div>
  )
}
