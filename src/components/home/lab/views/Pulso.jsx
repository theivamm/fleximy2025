import { useEffect, useMemo, useRef, useState } from "react"
import { Activity, CalendarDays, Check, Heart, MessageCircle, Smile, TrendingUp, Users, X } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

const OKRS = [
  {
    id: "okr1",
    objective: "Lanzar checkout 2.0",
    tone: "acc-gestion",
    pct: 64,
    krs: [
      { name: "Integración pasarela", pct: 100, done: true },
      { name: "Pruebas con 50 usuarios", pct: 70, done: false },
      { name: "Migration de datos", pct: 22, done: false },
    ],
  },
  {
    id: "okr2",
    objective: "Subir satisfacción a 9.2",
    tone: "acc-logistica",
    pct: 48,
    krs: [
      { name: "CSAT post-venta", pct: 84, done: false },
      { name: "Reducir tickets 30%", pct: 12, done: false },
    ],
  },
  {
    id: "okr3",
    objective: "Equipo arriba del foco 85%",
    tone: "acc-turnos",
    pct: 79,
    krs: [
      { name: "Capacitación 3 equipos", pct: 100, done: true },
      { name: "Semanas de foco 4/6", pct: 66, done: false },
    ],
  },
]

const TEAM = [
  { name: "Camila Rivas", role: "Producto", pulse: 92, tone: "acc-gestion" },
  { name: "Iván Pereyra", role: "Ingeniería", pulse: 76, tone: "acc-logistica" },
  { name: "Flor Duarte", role: "Diseño", pulse: 88, tone: "acc-turnos" },
  { name: "Tomás Ibarra", role: "Marketing", pulse: 61, tone: "warning" },
]

const NEXT_MEETINGS = [
  { name: "Retro sprint 24", when: "Vie 16 · 10:00", members: 6, tone: "acc-turnos" },
  { name: "Review OKR Q3", when: "Lun 19 · 09:30", members: 4, tone: "acc-gestion" },
]

const MEETING_WEEK = [
  { day: "Jue 15", items: [["09:30", "Daily producto", "sala B"], ["14:00", "Sync diseño-desarrollo", "online"]] },
  { day: "Vie 16", items: [["10:00", "Retro sprint 24", "sala A"], ["17:00", "Happy hour", "terraza"]] },
  { day: "Lun 19", items: [["09:30", "Review OKR Q3", "sala A"], ["11:00", "Planning sprint 25", "sala B"]] },
]

const CLIMATE = [
  { area: "Producto", score: 88, tone: "acc-gestion" },
  { area: "Ingeniería", score: 74, tone: "acc-logistica" },
  { area: "Diseño", score: 82, tone: "acc-turnos" },
  { area: "Marketing", score: 63, tone: "warning" },
]

const TAB_TITLES = {
  resumen: "Panel de equipo",
  okrs: "Objetivos trimestrales",
  equipo: "Equipo",
  reuniones: "Reuniones",
  clima: "Clima del equipo",
}

const TAB_SUBTITLES = {
  resumen: "Q3 · 12 personas · 3 equipos",
  okrs: "3 OKRs en curso · avance general 63%",
  equipo: "Pulso individual · último reporte",
  reuniones: "Próximos 7 días · 5 agendadas",
  clima: "Encuesta abierta · 8/12 respondieron",
}

export default function Pulso({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("resumen")
  const [okrs, setOkrs] = useState(OKRS)
  const [open, setOpen] = useState(null)
  const [owner, setOwner] = useState("Camila Rivas")
  const [toast, setToast] = useToast()

  const rootRef = useRef(null)
  const objectiveRef = useRef(null)
  const krRef = useRef(null)
  const ownerRef = useRef(null)
  const saveRef = useRef(null)

  const okrsRef = useRef(okrs)
  okrsRef.current = okrs
  const openRef = useRef(open)
  openRef.current = open

  const finishKR = (okrId, krName) => {
    setOkrs((rows) =>
      rows.map((o) => {
        if (o.id !== okrId) return o
        const krs = o.krs.map((k) => (k.name === krName ? { ...k, pct: 100, done: true } : k))
        const pct = Math.round(krs.reduce((a, k) => a + k.pct, 0) / krs.length)
        return { ...o, krs, pct }
      })
    )
  }

  const save = () => {
    const o = okrsRef.current.find((r) => r.id === openRef.current)
    if (!o) return
    setOpen(null)
    setToast(`Avance guardado · ${o.objective} al ${o.pct}%`)
  }

  const openObjective = (id) => {
    setOpen(id)
    if (id === "okr1") flow.step(0)
  }

  const avgPulse = Math.round(TEAM.reduce((a, t) => a + t.pulse, 0) / TEAM.length)
  const doneKRs = okrs.reduce((a, o) => a + o.krs.filter((k) => k.done).length, 0)
  const totalKRs = okrs.reduce((a, o) => a + o.krs.length, 0)
  const openOkr = open ? okrs.find((o) => o.id === open) : null

  const steps = useMemo(
    () => [
      { label: "Abrir el objetivo", cue: () => objectiveRef.current, run: () => setOpen("okr1") },
      { label: "Completar el KR", cue: () => krRef.current, run: () => finishKR("okr1", "Pruebas con 50 usuarios") },
      { label: "Asignar responsable", cue: () => ownerRef.current, run: () => setOwner("Camila Rivas") },
      { label: "Guardar el avance", cue: () => saveRef.current, run: save },
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
    setOkrs(OKRS)
    setOpen(null)
    setOwner("Camila Rivas")
    setToast(null)
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  if (compact) {
    return (
      <div ref={rootRef} className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Activity size="0.95em" />}
          brand="Pulso"
          subtitle="Gestión de equipos"
          status={<Pill tone={demo.tone} dot>3 OKRs</Pill>}
          tabs={[
            { key: "resumen", label: "Panel", Icon: Activity },
            { key: "okrs", label: "OKRs", Icon: TrendingUp },
            { key: "equipo", label: "Equipo", Icon: Users },
            { key: "reuniones", label: "Reuniones", Icon: CalendarDays },
            { key: "clima", label: "Clima", Icon: Heart },
          ]}
          tab={tab}
          onTab={setTab}
          overlay={
            <>
              {openOkr && (
                <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
                  <div className="w-[22em] max-w-full animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
                    <div className="flex items-start justify-between gap-[0.8em]">
                      <div className="min-w-0">
                        <p className="text-[0.8em] font-bold">{openOkr.objective}</p>
                        <p className="mt-[0.15em] text-[0.6em] text-text-3">Q3 · {openOkr.krs.length} key results</p>
                      </div>
                      <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar objetivo" className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                        <X size="0.85em" />
                      </button>
                    </div>

                    <div className="mt-[0.8em] flex items-center gap-[0.6em]">
                      <Bar value={openOkr.pct} tone={openOkr.tone} className="flex-1" />
                      <span className="font-mono text-[0.6em] font-semibold" style={{ color: toneVar(openOkr.tone) }}>{openOkr.pct}%</span>
                    </div>

                    <div className="mt-[0.8em] flex flex-col gap-[0.4em]">
                      {openOkr.krs.map((k) => (
                        <button
                          key={k.name}
                          type="button"
                          ref={openOkr.id === "okr1" && k.name === "Pruebas con 50 usuarios" ? krRef : null}
                          onClick={() => { finishKR(openOkr.id, k.name); if (openOkr.id === "okr1" && k.name === "Pruebas con 50 usuarios") flow.step(1) }}
                          disabled={k.done}
                          className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.3em] text-left transition-colors hover:bg-surface-2"
                        >
                          <span
                            className="grid size-[1.1em] shrink-0 place-items-center rounded-full border text-[0.55em]"
                            style={{
                              borderColor: k.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                              backgroundColor: k.done ? toneVar("acc-gestion") : "transparent",
                              color: "#fff",
                            }}
                          >
                            {k.done && <Check size="0.6em" />}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium" style={{ opacity: k.done ? 0.55 : 1 }}>{k.name}</span>
                          <span className="shrink-0 font-mono text-[0.52em] text-text-3">{k.done ? "Listo" : `${k.pct}%`}</span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-[0.8em] text-[0.58em] font-semibold uppercase tracking-wide text-text-3">Responsable</p>
                    <div className="mt-[0.35em] flex flex-wrap gap-[0.4em]">
                      {TEAM.slice(0, 3).map((t) => (
                        <button
                          key={t.name}
                          type="button"
                          ref={t.name === "Camila Rivas" ? ownerRef : null}
                          onClick={() => { setOwner(t.name); if (t.name === "Camila Rivas") flow.step(2) }}
                          className="flex items-center gap-[0.4em] rounded-full border px-[0.55em] py-[0.25em] text-[0.58em] font-medium transition-colors"
                          style={{
                            borderColor: owner === t.name ? toneVar(demo.tone) : "var(--color-outline)",
                            backgroundColor: owner === t.name ? toneSoft(demo.tone) : "transparent",
                            color: owner === t.name ? toneVar(demo.tone) : "var(--color-text-2)",
                          }}
                        >
                          <Avatar name={t.name} tone={t.tone} size={1.1} />
                          {t.name}
                          {owner === t.name && <Check size="0.7em" />}
                        </button>
                      ))}
                    </div>

                    <div className="mt-[0.9em] flex gap-[0.5em]">
                      <Btn tone={demo.tone} className="flex-1 justify-center" innerRef={saveRef} onClick={() => { save(); flow.step(3) }}>
                        Guardar avance
                      </Btn>
                      <button type="button" onClick={() => setOpen(null)} className="rounded-[0.55em] border border-outline px-[0.9em] text-[0.68em] font-semibold text-text-2 hover:bg-surface-2">
                        Cerrar
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
          {tab === "resumen" && (
            <>
              <div className="grid grid-cols-2 gap-[0.55em]">
                <Kpi label="Pulso de equipo" value={`${avgPulse}%`} delta={4} />
                <Kpi label="OKRs en curso" value="3" delta={1} />
                <Kpi label="KR completados" value={`${doneKRs}/${totalKRs}`} delta={0} />
                <Kpi label="Foco promedio" value="74%" delta={6} />
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Objetivos trimestrales" icon={<TrendingUp size="0.85em" />} extra={<Pill tone="acc-gestion">{doneKRs}/{totalKRs} KRs</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.6em]">
                  {okrs.map((o) => (
                    <div
                      key={o.id}
                      role="button"
                      tabIndex={0}
                      ref={o.id === "okr1" ? objectiveRef : null}
                      onClick={() => openObjective(o.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openObjective(o.id) }}
                      className="cursor-pointer rounded-[0.6em] border border-outline-strong bg-surface-2 p-[0.65em] transition-all hover:border-outline hover:bg-surface-3"
                    >
                      <div className="flex items-center justify-between gap-[0.5em]">
                        <p className="truncate text-[0.66em] font-semibold">{o.objective}</p>
                        <span className="shrink-0 font-mono text-[0.58em] font-semibold" style={{ color: toneVar(o.tone) }}>{o.pct}%</span>
                      </div>
                      <div className="mt-[0.4em] flex flex-col gap-[0.35em]">
                        {o.krs.map((k) => (
                          <div key={k.name} className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.28em]">
                            <span
                              className="grid size-[1em] shrink-0 place-items-center rounded-full border text-[0.55em]"
                              style={{
                                borderColor: k.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                                backgroundColor: k.done ? toneVar("acc-gestion") : "transparent",
                                color: "#fff",
                              }}
                            >
                              {k.done && <Check size="0.6em" />}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[0.6em] font-medium text-text-1" style={{ opacity: k.done ? 0.55 : 1 }}>{k.name}</span>
                            <span className="shrink-0 font-mono text-[0.5em] text-text-3">{k.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Próximas reuniones" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={demo.tone}>2</Pill>} />
                <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
                  {NEXT_MEETINGS.map((m) => (
                    <div key={m.name} className="flex items-center gap-[0.5em]">
                      <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.4em]" style={{ backgroundColor: toneSoft(m.tone), color: toneVar(m.tone) }}>
                        <Users size="0.7em" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.62em] font-semibold">{m.name}</p>
                        <p className="truncate text-[0.52em] text-text-3">{m.when}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.5em] text-text-3">{m.members} pers.</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Pulso por persona" icon={<Heart size="0.85em" />} extra={<Pill tone="acc-gestion">{avgPulse}%</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {TEAM.map((t) => (
                    <div key={t.name} className="flex items-center gap-[0.55em]">
                      <Avatar name={t.name} tone={t.tone} size={1.6} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.62em] font-semibold">{t.name}</p>
                          <span className="shrink-0 font-mono text-[0.5em]" style={{ color: t.pulse < 70 ? toneVar("warning") : "var(--color-text-3)" }}>{t.pulse}%</span>
                        </div>
                        <p className="truncate text-[0.5em] text-text-3">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Actividad" icon={<MessageCircle size="0.85em" />} extra={<Pill tone="acc-turnos">7 hoy</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {[
                    ["Camila actualizó", "KR · Pruebas con usuarios", "hace 20 min"],
                    ["Flor completó", "Retro sprint 23", "hace 1 h"],
                    ["Iván subió", "Diseño de métricas", "hace 2 h"],
                  ].map(([who, what, when]) => (
                    <div key={when} className="flex items-center gap-[0.5em]">
                      <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.6em] font-medium text-text-1"><span className="font-semibold">{who}</span> {what}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.48em] text-text-4">{when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {tab === "okrs" && <OkrsView okrs={okrs} onOpen={openObjective} />}
          {tab === "equipo" && <Equipo avgPulse={avgPulse} />}
          {tab === "reuniones" && <Reuniones tone={demo.tone} />}
          {tab === "clima" && <Clima tone={demo.tone} onToast={setToast} />}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <aside className="hidden w-[10.5em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] lg:flex">
        <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
          <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
            <Activity size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">Pulso</p>
            <p className="text-[0.55em] text-text-3">Gestión de equipos</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {[
            ["resumen", "Resumen"],
            ["okrs", "Objetivos"],
            ["equipo", "Equipo"],
            ["reuniones", "Reuniones"],
            ["clima", "Clima"],
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
                {k === "clima" && <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar("acc-gestion") }} />}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Encuesta de clima</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">8/12 respondieron</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">{TAB_TITLES[tab]}</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">{TAB_SUBTITLES[tab]}</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            {tab === "resumen" && <Pill tone={demo.tone} dot>OKR review 19 ago</Pill>}
            {(tab === "resumen" || tab === "okrs" || tab === "reuniones") && (
              <Btn tone={demo.tone} onClick={() => setToast("Retro agendada · se sincroniza con el calendario")}><CalendarDays size="0.8em" /> Nueva retro</Btn>
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
          {tab === "resumen" && (
            <>
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Pulso de equipo" value={`${avgPulse}%`} delta={4} />
            <Kpi label="OKRs en curso" value="3" delta={1} />
            <Kpi label="KR completados" value={`${doneKRs}/${totalKRs}`} delta={0} />
            <Kpi label="Foco promedio" value="74%" delta={6} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Objetivos trimestrales" icon={<TrendingUp size="0.85em" />} extra={<Pill tone="acc-gestion">{doneKRs}/{totalKRs} KRs</Pill>} />
                <div className="mt-[0.7em] flex flex-col gap-[0.7em]">
                  {okrs.map((o) => (
                    <div
                      key={o.id}
                      role="button"
                      tabIndex={0}
                      ref={o.id === "okr1" ? objectiveRef : null}
                      onClick={() => openObjective(o.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openObjective(o.id) }}
                      className="cursor-pointer rounded-[0.6em] border border-outline-strong bg-surface-2 p-[0.7em] transition-all hover:border-outline hover:bg-surface-3"
                    >
                      <div className="flex items-center justify-between gap-[0.5em]">
                        <p className="truncate text-[0.66em] font-semibold">{o.objective}</p>
                        <span className="shrink-0 font-mono text-[0.58em] font-semibold" style={{ color: toneVar(o.tone) }}>{o.pct}%</span>
                      </div>
                      <div className="mt-[0.4em] flex flex-col gap-[0.35em]">
                        {o.krs.map((k) => (
                          <div key={k.name} className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.28em]">
                            <span
                              className="grid size-[1em] shrink-0 place-items-center rounded-full border text-[0.55em]"
                              style={{
                                borderColor: k.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                                backgroundColor: k.done ? toneVar("acc-gestion") : "transparent",
                                color: "#fff",
                              }}
                            >
                              {k.done && <Check size="0.6em" />}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[0.6em] font-medium text-text-1" style={{ opacity: k.done ? 0.55 : 1 }}>{k.name}</span>
                            <span className="shrink-0 font-mono text-[0.5em] text-text-3">{k.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Próximas reuniones" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={demo.tone}>2 agendadas</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
                  {NEXT_MEETINGS.map((m) => (
                    <div key={m.name} className="flex items-center gap-[0.5em]">
                      <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.4em]" style={{ backgroundColor: toneSoft(m.tone), color: toneVar(m.tone) }}>
                        <Users size="0.7em" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.62em] font-semibold">{m.name}</p>
                        <p className="truncate text-[0.52em] text-text-3">{m.when}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.5em] text-text-3">{m.members} personas</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Pulso por persona" icon={<Heart size="0.85em" />} extra={<Pill tone="acc-gestion">{avgPulse}% promedio</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
                  {TEAM.map((t) => (
                    <div key={t.name} className="flex items-center gap-[0.55em]">
                      <Avatar name={t.name} tone={t.tone} size={1.6} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-[0.5em]">
                          <p className="truncate text-[0.62em] font-semibold">{t.name}</p>
                          <span className="shrink-0 font-mono text-[0.5em]" style={{ color: t.pulse < 70 ? toneVar("warning") : "var(--color-text-3)" }}>{t.pulse}%</span>
                        </div>
                        <p className="truncate text-[0.5em] text-text-3">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Actividad" icon={<MessageCircle size="0.85em" />} extra={<Pill tone="acc-turnos">7 hoy</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
                  {[
                    ["Camila actualizó", "KR · Pruebas con usuarios", "hace 20 min"],
                    ["Flor completó", "Retro sprint 23", "hace 1 h"],
                    ["Iván subió", "Diseño de métricas", "hace 2 h"],
                  ].map(([who, what, when]) => (
                    <div key={when} className="flex items-center gap-[0.5em]">
                      <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.6em] font-medium text-text-1"><span className="font-semibold">{who}</span> {what}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.48em] text-text-4">{when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </>
          )}
          {tab === "okrs" && <OkrsView okrs={okrs} onOpen={openObjective} />}
          {tab === "equipo" && <Equipo avgPulse={avgPulse} />}
          {tab === "reuniones" && <Reuniones tone={demo.tone} />}
          {tab === "clima" && <Clima tone={demo.tone} onToast={setToast} />}
        </div>
      </div>

      {openOkr && (
        <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
          <div className="w-[22em] animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-[0.8em]">
              <div className="min-w-0">
                <p className="text-[0.8em] font-bold">{openOkr.objective}</p>
                <p className="mt-[0.15em] text-[0.6em] text-text-3">Q3 · {openOkr.krs.length} key results</p>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar objetivo" className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                <X size="0.85em" />
              </button>
            </div>

            <div className="mt-[0.8em] flex items-center gap-[0.6em]">
              <Bar value={openOkr.pct} tone={openOkr.tone} className="flex-1" />
              <span className="font-mono text-[0.6em] font-semibold" style={{ color: toneVar(openOkr.tone) }}>{openOkr.pct}%</span>
            </div>

            <div className="mt-[0.8em] flex flex-col gap-[0.4em]">
              {openOkr.krs.map((k) => (
                <button
                  key={k.name}
                  type="button"
                  ref={openOkr.id === "okr1" && k.name === "Pruebas con 50 usuarios" ? krRef : null}
                  onClick={() => { finishKR(openOkr.id, k.name); if (openOkr.id === "okr1" && k.name === "Pruebas con 50 usuarios") flow.step(1) }}
                  disabled={k.done}
                  className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.3em] text-left transition-colors hover:bg-surface-2"
                >
                  <span
                    className="grid size-[1.1em] shrink-0 place-items-center rounded-full border text-[0.55em]"
                    style={{
                      borderColor: k.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                      backgroundColor: k.done ? toneVar("acc-gestion") : "transparent",
                      color: "#fff",
                    }}
                  >
                    {k.done && <Check size="0.6em" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium" style={{ opacity: k.done ? 0.55 : 1 }}>{k.name}</span>
                  <span className="shrink-0 font-mono text-[0.52em] text-text-3">{k.done ? "Listo" : `${k.pct}%`}</span>
                </button>
              ))}
            </div>

            <p className="mt-[0.8em] text-[0.58em] font-semibold uppercase tracking-wide text-text-3">Responsable</p>
            <div className="mt-[0.35em] flex flex-wrap gap-[0.4em]">
              {TEAM.slice(0, 3).map((t) => (
                <button
                  key={t.name}
                  type="button"
                  ref={t.name === "Camila Rivas" ? ownerRef : null}
                  onClick={() => { setOwner(t.name); if (t.name === "Camila Rivas") flow.step(2) }}
                  className="flex items-center gap-[0.4em] rounded-full border px-[0.55em] py-[0.25em] text-[0.58em] font-medium transition-colors"
                  style={{
                    borderColor: owner === t.name ? toneVar(demo.tone) : "var(--color-outline)",
                    backgroundColor: owner === t.name ? toneSoft(demo.tone) : "transparent",
                    color: owner === t.name ? toneVar(demo.tone) : "var(--color-text-2)",
                  }}
                >
                  <Avatar name={t.name} tone={t.tone} size={1.1} />
                  {t.name}
                  {owner === t.name && <Check size="0.7em" />}
                </button>
              ))}
            </div>

            <div className="mt-[0.9em] flex gap-[0.5em]">
              <Btn tone={demo.tone} className="flex-1 justify-center" innerRef={saveRef} onClick={() => { save(); flow.step(3) }}>
                Guardar avance
              </Btn>
              <button type="button" onClick={() => setOpen(null)} className="rounded-[0.55em] border border-outline px-[0.9em] text-[0.68em] font-semibold text-text-2 hover:bg-surface-2">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function OkrsView({ okrs, onOpen }) {
  return (
    <div className="flex flex-col gap-[0.6em]">
      {okrs.map((o) => (
        <div
          key={o.id}
          role="button"
          tabIndex={0}
          onClick={() => onOpen(o.id)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(o.id) }}
          className="cursor-pointer rounded-[0.6em] border border-outline-strong bg-surface-1 p-[0.7em] transition-all hover:border-outline hover:bg-surface-2"
        >
          <div className="flex items-center justify-between gap-[0.5em]">
            <p className="truncate text-[0.66em] font-semibold">{o.objective}</p>
            <span className="shrink-0 font-mono text-[0.58em] font-semibold" style={{ color: toneVar(o.tone) }}>{o.pct}%</span>
          </div>
          <Bar value={o.pct} tone={o.tone} className="mt-[0.45em]" h={0.4} />
          <div className="mt-[0.4em] flex flex-col gap-[0.3em]">
            {o.krs.map((k) => (
              <div key={k.name} className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.28em] transition-colors hover:bg-surface-2">
                <span
                  className="grid size-[1em] shrink-0 place-items-center rounded-full border text-[0.55em]"
                  style={{
                    borderColor: k.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                    backgroundColor: k.done ? toneVar("acc-gestion") : "transparent",
                    color: "#fff",
                  }}
                >
                  {k.done && <Check size="0.6em" />}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.6em] font-medium text-text-1" style={{ opacity: k.done ? 0.55 : 1 }}>{k.name}</span>
                <span className="shrink-0 font-mono text-[0.5em] text-text-3">{k.done ? "Listo" : `${k.pct}%`}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Equipo({ avgPulse }) {
  return (
    <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
      <SectionHead title="Pulso por persona" icon={<Heart size="0.85em" />} extra={<Pill tone="acc-gestion">{avgPulse}% promedio</Pill>} />
      <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
        {TEAM.map((t) => (
          <div key={t.name} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
            <Avatar name={t.name} tone={t.tone} size={1.7} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-[0.5em]">
                <p className="truncate text-[0.62em] font-semibold">{t.name}</p>
                <span className="shrink-0 font-mono text-[0.5em] text-text-3">{t.role}</span>
              </div>
              <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                <Bar value={t.pulse} tone={t.pulse < 70 ? "warning" : t.tone} h={0.4} />
                <span className="shrink-0 font-mono text-[0.5em]" style={{ color: t.pulse < 70 ? toneVar("warning") : "var(--color-text-3)" }}>{t.pulse}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reuniones({ tone }) {
  return (
    <div className="grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Agenda de la semana" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={tone}>5 agendadas</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.6em]">
          {MEETING_WEEK.map((d) => (
            <div key={d.day} className="rounded-[0.5em] border border-outline bg-surface-2/50 p-[0.6em]">
              <p className="font-mono text-[0.54em] uppercase tracking-wider text-text-3">{d.day}</p>
              <div className="mt-[0.35em] flex flex-col gap-[0.3em]">
                {d.items.map(([h, n, s]) => (
                  <div key={h} className="flex items-center gap-[0.5em]">
                    <span className="w-[3em] shrink-0 font-mono text-[0.54em] text-text-3">{h}</span>
                    <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{n}</span>
                    <span className="shrink-0 text-[0.5em] text-text-3">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Próximas" icon={<Users size="0.85em" />} extra={<Pill tone="acc-gestion">2 confirmadas</Pill>} />
        <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
          {NEXT_MEETINGS.map((m) => (
            <div key={m.name} className="flex items-center gap-[0.5em] rounded-[0.5em] border border-outline bg-surface-2 p-[0.6em]">
              <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.4em]" style={{ backgroundColor: toneSoft(m.tone), color: toneVar(m.tone) }}>
                <Users size="0.7em" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.62em] font-semibold">{m.name}</p>
                <p className="truncate text-[0.52em] text-text-3">{m.when}</p>
              </div>
              <span className="shrink-0 font-mono text-[0.5em] text-text-3">{m.members} personas</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Clima({ tone, onToast }) {
  const avg = Math.round(CLIMATE.reduce((a, c) => a + c.score, 0) / CLIMATE.length)
  return (
    <div className="grid gap-[0.7em] xl:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Índice por área" icon={<Smile size="0.85em" />} extra={<Pill tone="acc-gestion">{avg} promedio</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
          {CLIMATE.map((c) => (
            <div key={c.area} className="flex items-center gap-[0.5em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
              <span className="w-[5em] shrink-0 truncate text-[0.62em] font-medium">{c.area}</span>
              <Bar value={c.score} tone={c.score < 70 ? "warning" : c.tone} className="flex-1" h={0.4} />
              <span className="w-[2.4em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{c.score}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onToast?.("Encuesta enviada a 12 personas")}
          className="mt-[0.7em] w-full rounded-[0.5em] py-[0.5em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.98]"
          style={{ backgroundColor: toneVar(tone) }}
        >
          Enviar nueva encuesta
        </button>
      </div>
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Lo que dice el equipo" icon={<MessageCircle size="0.85em" />} extra={<Pill tone="acc-turnos">12 respuestas</Pill>} />
          <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
            {[["“La comunicación mejoró mucho este trimestre”", "Ingeniería"], ["“Queremos más días de foco”", "Producto"], ["“El onboarding nuevo es claro”", "Diseño"]].map(([q, a]) => (
              <div key={q} className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.6em]">
                <p className="text-[0.6em] font-medium">{q}</p>
                <p className="mt-[0.2em] font-mono text-[0.5em] text-text-3">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
