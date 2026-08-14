import { useEffect, useMemo, useRef, useState } from "react"
import { Award, Book, CalendarDays, Check, File, GraduationCap, MessagesSquare, Play, Search, Sparkles, Video, X } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

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

const CATALOG = [
  { name: "Diseño de interfaces", pct: 68, lessons: 24, tone: "acc-educacion", level: "Avanzado" },
  { name: "Bases de UX", pct: 34, lessons: 9, tone: "acc-turnos", level: "Inicial" },
  { name: "Producto digital", pct: 91, lessons: 41, tone: "acc-gastro", level: "Intermedio" },
  { name: "Investigación con usuarios", pct: 0, lessons: 14, tone: "acc-comercio", level: "Intermedio" },
  { name: "Storytelling de marca", pct: 0, lessons: 12, tone: "acc-logistica", level: "Inicial" },
]

const WEEK = [
  { day: "Lun 12", classes: [["09:00", "Bases de UX · aula A"], ["14:00", "Producto digital · aula B"]] },
  { day: "Mar 13", classes: [["10:00", "Diseño de interfaces · online"], ["16:00", "Mentoría grupal"]] },
  { day: "Mié 14", classes: [["09:00", "Bases de UX · aula A"], ["15:00", "Taller de portfolio"]] },
  { day: "Jue 15", classes: [["11:00", "Diseño de interfaces · online"], ["18:00", "Entrega módulo 3"]] },
  { day: "Vie 16", classes: [["10:00", "Producto digital · aula B"], ["17:00", "Charla invitados"]] },
]

const MESSAGES = [
  { who: "Prof. Luciana", tone: "acc-educacion", msg: "Revisé tu entrega del módulo 3, excelente trabajo en la jerarquía.", when: "10:24", unread: true },
  { who: "Grupo · Diseño UI", tone: "acc-turnos", msg: "¿Alguien tiene el figma de la lección 14?", when: "09:12", unread: true },
  { who: "Mentor", tone: "acc-gestion", msg: "Agendamos la mentoría del jueves a las 16.", when: "Ayer", unread: false },
  { who: "Becas", tone: "acc-logistica", msg: "Tu certificado del curso de UX está listo.", when: "Lun", unread: false },
]

const GRADES = [
  { name: "Evaluación · Tipografía", pct: 82, tone: "acc-gestion" },
  { name: "Evaluación · Sistemas", pct: 74, tone: "acc-logistica" },
  { name: "Entrega módulo 2", pct: 90, tone: "acc-educacion" },
  { name: "Proyecto integrador", pct: 68, tone: "acc-turnos" },
]

const POSTS = [
  { who: "Florencia A.", tone: "acc-gestion", text: "Terminé el módulo de color, ¡se nota el progreso en el portfolio!", likes: 12, replies: 4, when: "hace 2 h" },
  { who: "Martín L.", tone: "acc-turnos", text: "¿Alguien para practicar entrevistas de usuario esta semana?", likes: 8, replies: 6, when: "hace 5 h" },
  { who: "Caro S.", tone: "acc-logistica", text: "Comparto apuntes de jerarquía visual en la carpeta del grupo.", likes: 21, replies: 3, when: "hace 1 d" },
]

const TAB_TITLES = {
  inicio: "Lección 14 · Tipografía en producto",
  cursos: "Mis cursos",
  calendario: "Calendario académico",
  mensajes: "Mensajes",
  notas: "Notas y evaluaciones",
  comunidad: "Comunidad",
}

export default function Nexo({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("inicio")
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [lessons, setLessons] = useState(LESSONS)
  const [progress, setProgress] = useState(68)
  const [active, setActive] = useState(14)
  const [courseOpen, setCourseOpen] = useState(null)
  const [toast, setToast] = useToast()

  const rootRef = useRef(null)
  const playRef = useRef(null)
  const completeRef = useRef(null)
  const nextLessonRef = useRef(null)
  const courseRef = useRef(null)

  const completeLesson = () => {
    if (completed) return
    setLessons((rows) => rows.map((r) => (r.n === 14 ? { ...r, done: true } : r)))
    setProgress((p) => Math.min(p + 6, 100))
    setCompleted(true)
    setPlaying(false)
    setToast("Lección 14 completada · Progreso 74%")
  }

  const openLesson = (n) => {
    setActive(n)
    setToast(`Abriste la lección ${n} · ${LESSONS.find((l) => l.n === n).title}`)
    if (n === 15) flow.step(2)
  }

  const steps = useMemo(
    () => [
      { label: "Reproducir la lección", cue: () => playRef.current, run: () => setPlaying(true) },
      { label: "Completar la lección", cue: () => completeRef.current, run: completeLesson },
      { label: "Abrir la próxima lección", cue: () => nextLessonRef.current, run: () => setActive(15) },
      { label: "Ver el detalle del curso", cue: () => courseRef.current, run: () => setCourseOpen(COURSES[0]) },
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
    setPlaying(false)
    setCompleted(false)
    setLessons(LESSONS)
    setProgress(68)
    setActive(14)
    setCourseOpen(null)
    setToast(null)
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  if (compact) {
    return (
      <div ref={rootRef} className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<GraduationCap size="0.95em" />}
          brand="Nexo Campus"
          subtitle="Educación online"
          status={<Pill tone={demo.tone} dot>Progreso {progress}%</Pill>}
          tabs={[
            { key: "inicio", label: "Inicio", Icon: GraduationCap },
            { key: "cursos", label: "Cursos", Icon: Book },
            { key: "calendario", label: "Agenda", Icon: CalendarDays },
            { key: "mensajes", label: "Chats", Icon: MessagesSquare, badge: 2 },
            { key: "notas", label: "Notas", Icon: Award },
            { key: "comunidad", label: "Grupos", Icon: Sparkles },
          ]}
          tab={tab}
          onTab={setTab}
          overlay={
            <>
              {courseOpen && (
                <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
                  <div className="w-[20em] max-w-full animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
                    <div className="flex items-start justify-between gap-[0.8em]">
                      <div className="min-w-0">
                        <p className="text-[0.8em] font-bold">{courseOpen.name}</p>
                        <p className="mt-[0.15em] text-[0.6em] text-text-3">{courseOpen.lessons} lecciones · Certificado incluido</p>
                      </div>
                      <button type="button" onClick={() => setCourseOpen(null)} aria-label="Cerrar detalle del curso" className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                        <X size="0.85em" />
                      </button>
                    </div>
                    <div className="mt-[0.9em] flex items-center gap-[0.6em]">
                      <Bar value={progress} tone={courseOpen.tone} className="flex-1" />
                      <span className="font-mono text-[0.6em] font-semibold" style={{ color: toneVar(courseOpen.tone) }}>{progress}%</span>
                    </div>
                    <div className="mt-[0.6em] grid grid-cols-3 gap-[0.4em] text-center">
                      <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                        <p className="text-[0.72em] font-bold">{courseOpen.lessons - 14}</p>
                        <p className="text-[0.5em] text-text-3">Pendientes</p>
                      </div>
                      <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                        <p className="text-[0.72em] font-bold">12d</p>
                        <p className="text-[0.5em] text-text-3">Racha</p>
                      </div>
                      <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                        <p className="text-[0.72em] font-bold">4,8</p>
                        <p className="text-[0.5em] text-text-3">Rating</p>
                      </div>
                    </div>
                    <div className="mt-[0.8em] flex gap-[0.5em]">
                      <Btn tone={courseOpen.tone} className="flex-1 justify-center" onClick={() => { setCourseOpen(null); setToast(`Continuaste ${courseOpen.name}`) }}>
                        Continuar curso
                      </Btn>
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
          {tab === "inicio" && (
            <>
              <div className="grid grid-cols-2 gap-[0.55em]">
                <Kpi label="Progreso general" value={`${progress}%`} delta={progress > 68 ? 6 : 2} />
                <Kpi label="Cursos en curso" value="3" delta={1} />
                <Kpi label="Lecciones listas" value="41" delta={5} />
                <Kpi label="Horas esta semana" value="6,5" delta={12} />
              </div>

              <div className="mt-[0.65em] overflow-hidden rounded-[0.8em] border border-outline bg-surface-1">
                <div className="relative grid h-[9em] place-items-center" style={{ backgroundColor: toneSoft(demo.tone) }}>
                  <span className="absolute left-[0.8em] top-[0.6em]">
                    <Pill tone={demo.tone}>{playing ? "Reproduciendo" : "Listo para reproducir"}</Pill>
                  </span>
                  <button
                    type="button"
                    ref={playRef}
                    aria-label={playing ? "Pausar" : "Reproducir"}
                    onClick={() => { setPlaying((p) => !p); if (!playing) flow.step(0) }}
                    className="grid size-[2.8em] place-items-center rounded-full text-white shadow-[var(--shadow-md)] transition-transform hover:scale-105"
                    style={{ backgroundColor: toneVar(demo.tone) }}
                  >
                    {playing ? <span className="flex gap-[0.2em]"><span className="size-[0.3em] rounded-sm bg-white" /><span className="size-[0.3em] rounded-sm bg-white" /></span> : <Play size="1.15em" />}
                  </button>
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-[0.5em] bg-surface-1 px-[0.9em] py-[0.45em]">
                    <span className="font-mono text-[0.52em] text-text-3">12:40</span>
                    <div className="h-[0.35em] min-w-0 flex-1 overflow-hidden rounded-full bg-surface-3">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: playing ? "100%" : "38%", backgroundColor: toneVar(demo.tone) }} />
                    </div>
                    <span className="font-mono text-[0.52em] text-text-3">18:04</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-[0.8em] px-[0.9em] py-[0.55em]">
                  <div className="min-w-0">
                    <p className="truncate text-[0.7em] font-semibold">Jerarquía tipográfica en interfaces</p>
                    <p className="truncate text-[0.56em] text-text-3">Módulo 4 · PDF, ejercicios y apuntes</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-[0.4em] text-[0.6em] text-text-3"><File size="0.8em" /> 3</span>
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
                <div className="flex items-center justify-between gap-[0.6em]">
                  <div className="min-w-0">
                    <p className="truncate text-[0.7em] font-bold">Lección 14 · Tipografía en producto</p>
                    <p className="mt-[0.1em] text-[0.56em] text-text-3">{completed ? "Completada · Progreso 74%" : "Pendiente · 68% del curso"}</p>
                  </div>
                  <Btn tone={demo.tone} innerRef={completeRef} onClick={() => { completeLesson(); flow.step(1) }} className={completed ? "opacity-60" : ""}>
                    <Check size="0.8em" /> {completed ? "Completada" : "Completar"}
                  </Btn>
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Contenido del módulo" icon={<Book size="0.85em" />} extra={<Pill tone={demo.tone}>{lessons.filter((l) => l.done).length}/4</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.4em]">
                  {lessons.map((l) => (
                    <button
                      key={l.n}
                      type="button"
                      ref={l.n === 15 ? nextLessonRef : undefined}
                      onClick={() => openLesson(l.n)}
                      className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.5em] py-[0.4em] text-left transition-colors hover:bg-surface-2"
                    >
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
                      <span className="min-w-0 flex-1 truncate text-[0.66em] font-medium" style={{ color: active === l.n ? toneVar(demo.tone) : "var(--color-text-1)", fontWeight: active === l.n ? 700 : 500 }}>
                        {active === l.n ? "Lección activa · " : ""}{l.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Mis cursos" extra={<Pill tone="acc-gestion">2 certificados</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {COURSES.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      ref={i === 0 ? courseRef : undefined}
                      onClick={() => { setCourseOpen(c); if (i === 0) flow.step(3) }}
                      className="flex items-center gap-[0.6em] rounded-[0.5em] px-[0.4em] py-[0.35em] text-left transition-colors hover:bg-surface-2"
                    >
                      <span className="w-[6.5em] shrink-0 truncate text-[0.64em] font-medium">{c.name}</span>
                      <Bar value={c.pct} tone={c.tone} />
                      <span className="w-[2.2em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{c.pct}%</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Próximas entregas" extra={<Pill tone="warning">2 pendientes</Pill>} />
                <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
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
            </>
          )}
          {tab === "cursos" && <Cursos tone={demo.tone} onOpen={(c) => { setCourseOpen(c); if (c.name === COURSES[0].name) flow.step(3) }} />}
          {tab === "calendario" && <Calendario tone={demo.tone} />}
          {tab === "mensajes" && <Mensajes tone={demo.tone} />}
          {tab === "notas" && <Notas tone={demo.tone} />}
          {tab === "comunidad" && <Comunidad tone={demo.tone} />}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
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
            <p className="truncate text-[0.78em] font-bold leading-none">{TAB_TITLES[tab]}</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Diseño de interfaces · 12:40</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            {tab === "inicio" ? (
              <>
                <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
                  <Search size="0.8em" /> Buscar lección…
                </span>
                <Btn tone={demo.tone} innerRef={completeRef} onClick={() => { completeLesson(); flow.step(1) }} className={completed ? "opacity-60" : ""}>
                  <Check size="0.8em" /> {completed ? "Completada" : "Completar lección"}
                </Btn>
              </>
            ) : (
              <Pill tone={demo.tone} dot>Actualizado hoy</Pill>
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
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Progreso general" value={`${progress}%`} delta={progress > 68 ? 6 : 2} />
            <Kpi label="Cursos en curso" value="3" delta={1} />
            <Kpi label="Lecciones completadas" value="41" delta={5} />
            <Kpi label="Horas esta semana" value="6,5" delta={12} />
          </div>

          {tab === "inicio" && (
          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-[0.7em]">
              <div className="overflow-hidden rounded-[0.8em] border border-outline bg-surface-1">
                <div className="relative grid h-[11em] place-items-center" style={{ backgroundColor: toneSoft(demo.tone) }}>
                  <span className="absolute left-[1em] top-[0.8em]">
                    <Pill tone={demo.tone}>{playing ? "Reproduciendo" : "Listo para reproducir"}</Pill>
                  </span>
                  <button
                    type="button"
                    ref={playRef}
                    aria-label={playing ? "Pausar" : "Reproducir"}
                    onClick={() => { setPlaying((p) => !p); if (!playing) flow.step(0) }}
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
                    <button
                      key={l.n}
                      type="button"
                      ref={l.n === 15 ? nextLessonRef : undefined}
                      onClick={() => openLesson(l.n)}
                      className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.5em] py-[0.4em] text-left transition-colors hover:bg-surface-2"
                    >
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
                      <span className="min-w-0 flex-1 truncate text-[0.66em] font-medium" style={{ color: active === l.n ? toneVar(demo.tone) : "var(--color-text-1)", fontWeight: active === l.n ? 700 : 500 }}>
                        {active === l.n ? "Lección activa · " : ""}{l.title}
                      </span>
                      <span className="font-mono text-[0.5em] text-text-4">{l.done ? "Completada" : "Pendiente"}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Mis cursos" icon={<Video size="0.85em" />} extra={<Pill tone="acc-gestion">2 certificados</Pill>} />
                <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
                  {COURSES.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      ref={i === 0 ? courseRef : undefined}
                      onClick={() => { setCourseOpen(c); if (i === 0) flow.step(3) }}
                      className="flex items-center gap-[0.6em] rounded-[0.5em] px-[0.4em] py-[0.35em] text-left transition-colors hover:bg-surface-2"
                    >
                      <span className="w-[7em] shrink-0 truncate text-[0.64em] font-medium">{c.name}</span>
                      <Bar value={c.pct} tone={c.tone} />
                      <span className="w-[2.2em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{c.pct}%</span>
                    </button>
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
          )}

          {tab === "cursos" && <Cursos tone={demo.tone} onOpen={(c) => { setCourseOpen(c); if (c.name === COURSES[0].name) flow.step(3) }} />}
          {tab === "calendario" && <Calendario tone={demo.tone} />}
          {tab === "mensajes" && <Mensajes tone={demo.tone} />}
          {tab === "notas" && <Notas tone={demo.tone} />}
          {tab === "comunidad" && <Comunidad tone={demo.tone} />}
        </div>
      </div>

      {courseOpen && (
        <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
          <div className="w-[20em] animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-[0.8em]">
              <div className="min-w-0">
                <p className="text-[0.8em] font-bold">{courseOpen.name}</p>
                <p className="mt-[0.15em] text-[0.6em] text-text-3">{courseOpen.lessons} lecciones · Certificado incluido</p>
              </div>
              <button type="button" onClick={() => setCourseOpen(null)} aria-label="Cerrar detalle del curso" className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
                <X size="0.85em" />
              </button>
            </div>
            <div className="mt-[0.9em] flex items-center gap-[0.6em]">
              <Bar value={progress} tone={courseOpen.tone} className="flex-1" />
              <span className="font-mono text-[0.6em] font-semibold" style={{ color: toneVar(courseOpen.tone) }}>{progress}%</span>
            </div>
            <div className="mt-[0.6em] grid grid-cols-3 gap-[0.4em] text-center">
              <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                <p className="text-[0.72em] font-bold">{courseOpen.lessons - 14}</p>
                <p className="text-[0.5em] text-text-3">Pendientes</p>
              </div>
              <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                <p className="text-[0.72em] font-bold">12d</p>
                <p className="text-[0.5em] text-text-3">Racha</p>
              </div>
              <div className="rounded-[0.5em] border border-outline bg-surface-2 p-[0.45em]">
                <p className="text-[0.72em] font-bold">4,8</p>
                <p className="text-[0.5em] text-text-3">Rating</p>
              </div>
            </div>
            <div className="mt-[0.8em] flex gap-[0.5em]">
              <Btn tone={courseOpen.tone} className="flex-1 justify-center" onClick={() => { setCourseOpen(null); setToast(`Continuaste ${courseOpen.name}`) }}>
                Continuar curso
              </Btn>
            </div>
          </div>
        </div>
      )}

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function Cursos({ tone, onOpen }) {
  return (
    <div className="mt-[0.7em]">
      <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-3">
        {CATALOG.map((c) => (
          <div key={c.name} className="flex flex-col rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
            <div className="flex items-start justify-between gap-[0.5em]">
              <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(c.tone), color: toneVar(c.tone) }}>
                <Book size="0.85em" />
              </span>
              <Pill tone={c.tone}>{c.level}</Pill>
            </div>
            <p className="mt-[0.5em] truncate text-[0.72em] font-semibold">{c.name}</p>
            <p className="mt-[0.15em] text-[0.56em] text-text-3">{c.lessons} lecciones · certificado</p>
            {c.pct > 0 && (
              <div className="mt-[0.55em] flex items-center gap-[0.5em]">
                <Bar value={c.pct} tone={c.tone} h={0.4} />
                <span className="shrink-0 font-mono text-[0.52em] text-text-3">{c.pct}%</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => onOpen(c)}
              className="mt-[0.7em] inline-flex min-h-[2.2em] items-center justify-center gap-[0.3em] rounded-[0.5em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.97]"
              style={{ backgroundColor: toneVar(c.pct > 0 ? tone : c.tone) }}
            >
              {c.pct > 0 ? "Continuar curso" : "Inscribirme"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Calendario({ tone }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Semana del 12 al 18" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={tone}>10 actividades</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.6em]">
          {WEEK.map((d) => (
            <div key={d.day} className="rounded-[0.5em] border border-outline bg-surface-2/50 p-[0.6em]">
              <p className="font-mono text-[0.54em] uppercase tracking-wider text-text-3">{d.day}</p>
              <div className="mt-[0.35em] flex flex-col gap-[0.3em]">
                {d.classes.map(([h, c]) => (
                  <div key={h} className="flex items-center gap-[0.5em]">
                    <span className="w-[3em] shrink-0 font-mono text-[0.54em] text-text-3">{h}</span>
                    <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{c}</span>
                    <span className="size-[0.45em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(tone) }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Próximas entregas" icon={<File size="0.85em" />} extra={<Pill tone="warning">2 pendientes</Pill>} />
          <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
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
          <SectionHead title="Recordatorios" icon={<Sparkles size="0.85em" />} extra={<Pill tone="acc-gestion">Activos</Pill>} />
          <p className="mt-[0.5em] text-[0.56em] leading-relaxed text-text-3">
            Cada clase sincroniza tu agenda y te avisa 15 minutos antes por notificación.
          </p>
        </div>
      </div>
    </div>
  )
}

function Mensajes({ tone }) {
  return (
    <div className="mt-[0.7em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
      <SectionHead title="Conversaciones" icon={<MessagesSquare size="0.85em" />} extra={<Pill tone={tone}>5 sin leer</Pill>} />
      <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
        {MESSAGES.map((m) => (
          <div key={m.who} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.45em] transition-colors hover:bg-surface-2" style={{ backgroundColor: m.unread ? toneSoft(tone) : "transparent" }}>
            <Avatar name={m.who} tone={m.tone} size={1.8} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-[0.5em]">
                <p className="truncate text-[0.66em] font-semibold">{m.who}</p>
                <span className="shrink-0 font-mono text-[0.5em] text-text-4">{m.when}</span>
              </div>
              <p className="truncate text-[0.56em] text-text-3">{m.msg}</p>
            </div>
            {m.unread && <span className="size-[0.55em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(tone) }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function Notas({ tone }) {
  const avg = Math.round(GRADES.reduce((a, g) => a + g.pct, 0) / GRADES.length)
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Notas y evaluaciones" icon={<Award size="0.85em" />} extra={<Pill tone="acc-gestion">Promedio {avg}%</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
          {GRADES.map((g) => (
            <div key={g.name} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
              <span className="grid size-[1.6em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(g.tone), color: toneVar(g.tone) }}>
                <File size="0.75em" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.64em] font-medium">{g.name}</span>
              <Bar value={g.pct} tone={g.tone} className="max-w-[6em]" h={0.4} />
              <span className="w-[2.4em] shrink-0 text-right font-mono text-[0.56em] text-text-3">{g.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Para mejorar" icon={<Sparkles size="0.85em" />} extra={<Pill tone={tone}>1 pendiente</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          <div className="flex items-start gap-[0.5em] rounded-[0.5em] border border-outline bg-surface-2 p-[0.6em]">
            <Check size="0.8em" className="mt-[0.1em] shrink-0" style={{ color: toneVar("acc-gestion") }} />
            <p className="text-[0.58em] leading-relaxed text-text-2">Recuperá el proyecto integrador antes del 22 de junio para sumar al promedio.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Comunidad({ tone }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-[0.6em]">
        {POSTS.map((p) => (
          <div key={p.who} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.8em]">
            <div className="flex items-center gap-[0.5em]">
              <Avatar name={p.who} tone={p.tone} size={1.6} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.64em] font-semibold">{p.who}</p>
                <p className="font-mono text-[0.5em] text-text-4">{p.when}</p>
              </div>
            </div>
            <p className="mt-[0.5em] text-[0.62em] leading-relaxed text-text-2">{p.text}</p>
            <div className="mt-[0.5em] flex items-center gap-[0.8em] text-[0.56em] text-text-3">
              <span className="flex items-center gap-[0.3em]"><span className="text-[0.75em]" style={{ color: toneVar(tone) }}>♥</span> {p.likes}</span>
              <span className="flex items-center gap-[0.3em]"><MessagesSquare size="0.65em" /> {p.replies} respuestas</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Grupos activos" icon={<Sparkles size="0.85em" />} extra={<Pill tone="acc-gestion">4</Pill>} />
          <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
            {[["Diseño UI", "acc-educacion", 128], ["UX Research", "acc-turnos", 96], ["Portfolio 2026", "acc-logistica", 74]].map(([g, t, n]) => (
              <div key={g} className="flex items-center gap-[0.5em]">
                <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar(t) }} />
                <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{g}</span>
                <span className="font-mono text-[0.5em] text-text-3">{n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Evento próximo" icon={<Video size="0.85em" />} extra={<Pill tone={tone}>Vie 16</Pill>} />
          <p className="mt-[0.5em] text-[0.62em] font-semibold">Charla · Diseño de sistemas con invitados</p>
          <p className="mt-[0.15em] text-[0.54em] text-text-3">17:00 · transmisión en vivo · 340 confirmados</p>
        </div>
      </div>
    </div>
  )
}
