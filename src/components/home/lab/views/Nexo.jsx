import { useEffect, useMemo, useRef, useState } from "react"
import { Book, Check, File, GraduationCap, Play, Search, Video } from "lucide-react"
import { Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const COURSES = [
  { name: "Diseño de interfaces", pct: 68, lessons: 24, tone: "acc-educacion" },
  { name: "Bases de UX", pct: 34, lessons: 9, tone: "acc-turnos" },
  { name: "Producto digital", pct: 91, lessons: 41, tone: "acc-gastro" },
]

const DELIVERIES = [
  { name: "Entrega módulo 3", course: "Diseño de interfaces", due: "Vie 16", tone: "warning" },
  { name: "Proyecto final", course: "Bases de UX", due: "22 jun", tone: "acc-gastro" },
]

const EXAMS = [
  { name: "Evaluación · Tipografía", pct: 82, tone: "acc-gestion" },
  { name: "Evaluación · Sistemas", pct: 74, tone: "acc-logistica" },
]

const LESSONS = [
  { n: 12, title: "Jerarquía visual", done: true },
  { n: 13, title: "Sistemas de color", done: true },
  { n: 14, title: "Tipografía en producto", done: false },
  { n: 15, title: "Layout y grillas", done: false },
]

export default function Nexo({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [tab, setTab] = useState("inicio")
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [lessons, setLessons] = useState(LESSONS)
  const [progress, setProgress] = useState(68)

  const playerRef = useRef(null)
  const completeRef = useRef(null)
  const courseRef = useRef(null)

  const completeLesson = () => {
    if (completed) return
    setLessons((rows) => rows.map((r) => (r.n === 14 ? { ...r, done: true } : r)))
    setProgress((p) => Math.min(p + 6, 100))
    setCompleted(true)
    setPlaying(false)
  }

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(playerRef.current, { wait: 260 }) },
      { at: 1600, run: () => { demo.getCursor()?.click(playerRef.current); setPlaying(true) } },
      { at: 3400, run: () => demo.getCursor()?.moveTo(courseRef.current, { wait: 240 }) },
      { at: 4800, run: () => demo.getCursor()?.moveTo(completeRef.current, { wait: 200 }) },
      { at: 5900, run: () => { demo.getCursor()?.click(completeRef.current); completeLesson() } },
      { at: 8200, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2400, onComplete: demo.bump })

  useEffect(() => {
    setPlaying(false)
    setCompleted(false)
    setLessons(LESSONS)
    setProgress(68)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><GraduationCap size="0.9em" /> Nexo Campus</p>
          <Pill tone={demo.tone} dot>Progreso 68%</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Progreso general" value="68%" delta={6} />
          <Kpi label="Cursos en curso" value="3" delta={1} />
          <Kpi label="Lecciones listas" value="41" delta={5} />
          <Kpi label="Horas esta semana" value="6,5" delta={12} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
            <SectionHead title="Mis cursos" extra={<Pill tone="acc-gestion">2 certificados</Pill>} />
            <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
              {COURSES.map((c) => (
                <div key={c.name} className="flex items-center gap-[0.6em]">
                  <span className="w-[6em] shrink-0 truncate text-[0.64em]">{c.name}</span>
                  <Bar value={c.pct} tone={c.tone} />
                  <span className="w-[2.4em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{c.pct}%</span>
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
            <GraduationCap size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">Nexo Campus</p>
            <p className="text-[0.55em] text-text-3">Educación online</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {["inicio", "cursos", "calendario", "mensajes", "notas", "comunidad"].map((k) => {
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
                <span className="flex-1 capitalize">{k}</span>
                {k === "mensajes" && <span className="font-mono text-[0.58em] text-text-3">5</span>}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Racha</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">12 días seguidos 🔥</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Lección 14 · Tipografía en producto</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Diseño de interfaces · 12:40</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
              <Search size="0.8em" /> Buscar lección…
            </span>
            <Btn tone={demo.tone} innerRef={completeRef} onClick={completeLesson} className={completed ? "opacity-60" : ""}>
              <Check size="0.8em" /> {completed ? "Completada" : "Completar lección"}
            </Btn>
          </div>
        </div>

        {completed && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">Lección 14 completada · Progreso 74%</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Progreso general" value={`${progress}%`} delta={progress > 68 ? 6 : 2} />
            <Kpi label="Cursos en curso" value="3" delta={1} />
            <Kpi label="Lecciones completadas" value="41" delta={5} />
            <Kpi label="Horas esta semana" value="6,5" delta={12} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-[0.7em]">
              <div ref={playerRef} className="overflow-hidden rounded-[0.8em] border border-outline bg-surface-1">
                <div className="relative grid h-[11em] place-items-center" style={{ backgroundColor: toneSoft(demo.tone) }}>
                  <span className="absolute left-[1em] top-[0.8em]">
                    <Pill tone={demo.tone}>{playing ? "Reproduciendo" : "Listo para reproducir"}</Pill>
                  </span>
                  <button
                    type="button"
                    aria-label={playing ? "Pausar" : "Reproducir"}
                    onClick={() => setPlaying((p) => !p)}
                    className="grid size-[3.2em] place-items-center rounded-full text-white shadow-[var(--shadow-md)] transition-transform hover:scale-105"
                    style={{ backgroundColor: toneVar(demo.tone) }}
                  >
                    {playing ? <span className="flex gap-[0.2em]"><span className="size-[0.3em] rounded-sm bg-white" /><span className="size-[0.3em] rounded-sm bg-white" /></span> : <Play size="1.3em" />}
                  </button>
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-[0.5em] bg-surface-1 px-[0.9em] py-[0.5em]">
                    <span className="font-mono text-[0.52em] text-text-3">12:40</span>
                    <div className="h-[0.35em] min-w-0 flex-1 overflow-hidden rounded-full bg-surface-3">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: playing ? "100%" : "38%", backgroundColor: toneVar(demo.tone) }} />
                    </div>
                    <span className="font-mono text-[0.52em] text-text-3">18:04</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-[0.8em] px-[0.9em] py-[0.6em]">
                  <div className="min-w-0">
                    <p className="truncate text-[0.7em] font-semibold">Jerarquía tipográfica en interfaces</p>
                    <p className="truncate text-[0.56em] text-text-3">Módulo 4 · Materiales: PDF, ejercicios y apuntes</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-[0.4em] text-[0.6em] text-text-3"><File size="0.8em" /> 3 materiales</span>
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Contenido del módulo" icon={<Book size="0.85em" />} extra={<Pill tone={demo.tone}>{lessons.filter((l) => l.done).length}/4 listas</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.45em]">
                  {lessons.map((l) => (
                    <div key={l.n} className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.5em] py-[0.4em] transition-colors hover:bg-surface-2">
                      <span
                        className="grid size-[1.2em] shrink-0 place-items-center rounded-full border text-[0.6em]"
                        style={{
                          borderColor: l.done ? toneVar("acc-gestion") : "var(--color-outline-strong)",
                          backgroundColor: l.done ? toneVar("acc-gestion") : "transparent",
                          color: l.done ? "#fff" : "var(--color-text-3)",
                        }}
                      >
                        {l.done ? <Check size="0.7em" /> : l.n}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.66em] font-medium" style={{ color: l.n === 14 ? toneVar(demo.tone) : "var(--color-text-1)", fontWeight: l.n === 14 ? 700 : 500 }}>
                        {l.n === 14 ? "Lección activa · " : ""}{l.title}
                      </span>
                      <span className="font-mono text-[0.5em] text-text-4">{l.done ? "Completada" : "Pendiente"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[0.7em]">
              <div ref={courseRef} className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Mis cursos" icon={<Video size="0.85em" />} extra={<Pill tone="acc-gestion">2 certificados</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
                  {COURSES.map((c) => (
                    <div key={c.name} className="flex items-center gap-[0.6em]">
                      <span className="w-[7em] shrink-0 truncate text-[0.64em] font-medium">{c.name}</span>
                      <Bar value={c.pct} tone={c.tone} />
                      <span className="w-[2.2em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Próximas entregas" extra={<Pill tone="warning">2 pendientes</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
                  {DELIVERIES.map((d) => (
                    <div key={d.name} className="flex items-center gap-[0.5em]">
                      <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(d.tone) }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.62em] font-medium">{d.name}</p>
                        <p className="truncate text-[0.5em] text-text-3">{d.course}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.52em] text-text-2">{d.due}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Evaluaciones" extra={<Pill tone={demo.tone}>Promedio 78%</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
                  {EXAMS.map((e) => (
                    <div key={e.name} className="flex items-center gap-[0.5em]">
                      <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{e.name}</span>
                      <span className="w-[2em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{e.pct}%</span>
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
