import { useEffect, useMemo, useRef, useState } from "react"
import { Activity, CalendarDays, Check, Heart, MessageCircle, TrendingUp, Users } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

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

export default function Pulso({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [okrs, setOkrs] = useState(OKRS)
  const [toast, setToast] = useState(null)

  const cardRef = useRef(null)
  const kpiRef = useRef(null)

  const finishKR = (okrId, krName) => {
    setOkrs((rows) =>
      rows.map((o) => {
        if (o.id !== okrId) return o
        const krs = o.krs.map((k) => (k.name === krName ? { ...k, pct: 100, done: true } : k))
        const pct = Math.round((krs.reduce((a, k) => a + k.pct, 0) / krs.length))
        return { ...o, krs, pct }
      })
    )
    setToast(`KR completado · ${krName}`)
    window.setTimeout(() => setToast(null), 2600)
  }

  const avgPulse = Math.round(TEAM.reduce((a, t) => a + t.pulse, 0) / TEAM.length)
  const doneKRs = okrs.reduce((a, o) => a + o.krs.filter((k) => k.done).length, 0)
  const totalKRs = okrs.reduce((a, o) => a + o.krs.length, 0)

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(cardRef.current, { wait: 260 }) },
      { at: 1600, run: () => { demo.getCursor()?.click(cardRef.current); finishKR("okr1", "Pruebas con 50 usuarios") } },
      { at: 3200, run: () => demo.getCursor()?.moveTo(kpiRef.current, { wait: 200 }) },
      { at: 4400, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2200, onComplete: demo.bump })

  useEffect(() => {
    setOkrs(OKRS)
    setToast(null)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><Activity size="0.9em" /> Pulso</p>
          <Pill tone={demo.tone} dot>3 OKRs en curso</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Pulso de equipo" value={`${avgPulse}%`} delta={4} />
          <Kpi label="OKRs en curso" value="3" delta={1} />
          <Kpi label="KR completados" value={`${doneKRs}/${totalKRs}`} delta={0} />
          <Kpi label="Foco promedio" value="74%" delta={6} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="flex h-full flex-col gap-[0.55em]">
            {okrs.map((o) => (
              <div key={o.id} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.7em]">
                <div className="flex items-center justify-between gap-[0.5em]">
                  <p className="truncate text-[0.66em] font-semibold">{o.objective}</p>
                  <span className="shrink-0 font-mono text-[0.55em]" style={{ color: toneVar(o.tone) }}>{o.pct}%</span>
                </div>
                <Bar value={o.pct} tone={o.tone} className="mt-[0.45em]" h={0.4} />
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
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] font-medium text-text-2 transition-colors hover:bg-surface-2"
            >
              <span className="size-[0.4em] rounded-full bg-text-4" />
              <span className="flex-1">{label}</span>
              {k === "clima" && <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar("acc-gestion") }} />}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Encuesta de clima</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">8/12 respondieron</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Panel de equipo</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Q3 · 12 personas · 3 equipos</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <Pill tone={demo.tone} dot>OKR review 19 ago</Pill>
            <Btn tone={demo.tone}><CalendarDays size="0.8em" /> Nueva retro</Btn>
          </div>
        </div>

        {toast && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">{toast} · OKR al 73%</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div ref={kpiRef} className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
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
                    <div key={o.id} className="rounded-[0.6em] border border-outline-strong bg-surface-2 p-[0.7em]">
                      <div className="flex items-center justify-between gap-[0.5em]">
                        <p className="truncate text-[0.66em] font-semibold">{o.objective}</p>
                        <span className="shrink-0 font-mono text-[0.58em] font-semibold" style={{ color: toneVar(o.tone) }}>{o.pct}%</span>
                      </div>
                      <div className="mt-[0.4em] flex flex-col gap-[0.35em]">
                        {o.krs.map((k) => (
                          <button
                            key={k.name}
                            type="button"
                            ref={o.id === "okr1" && k.name === "Pruebas con 50 usuarios" ? cardRef : null}
                            onClick={() => finishKR(o.id, k.name)}
                            disabled={k.done}
                            className="flex items-center gap-[0.5em] rounded-[0.45em] px-[0.4em] py-[0.28em] text-left transition-colors hover:bg-surface-3"
                          >
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
                          </button>
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
        </div>
      </div>
    </div>
  )
}
