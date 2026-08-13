import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays, Check, Scissors, Sparkles, Users } from "lucide-react"
import { Avatar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const DAYS = ["Lun 12", "Mar 13", "Mié 14", "Jue 15", "Vie 16", "Sáb 17", "Dom 18"]
const HOURS = ["09:00", "11:00", "13:00", "15:00", "17:00"]

const SLOTS = [
  { d: 0, h: 1, client: "Martina", svc: "Corte" },
  { d: 0, h: 3, client: "Julián", svc: "Tinte" },
  { d: 2, h: 2, client: "Sofía", svc: "Balayage" },
  { d: 2, h: 4, client: "Ramiro", svc: "Barba" },
  { d: 4, h: 0, client: "Lucía", svc: "Corte" },
  { d: 4, h: 3, client: "Diego", svc: "Peinado" },
]

const PROFESIONALES = [
  { name: "Mora Torres", svc: "Colorista", pct: 82, tone: "acc-turnos" },
  { name: "Luca Vidal", svc: "Cortes", pct: 64, tone: "acc-educacion" },
  { name: "Emma Paz", svc: "Estética", pct: 91, tone: "acc-gastro" },
]

export default function Aurea({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [tab, setTab] = useState("agenda")
  const [booking, setBooking] = useState(null)
  const [occupied, setOccupied] = useState(SLOTS)
  const [professional, setProfessional] = useState("Mora Torres")
  const [confirmed, setConfirmed] = useState(false)

  const slotRef = useRef(null)
  const profRef = useRef(null)
  const confirmRef = useRef(null)

  const isTaken = (d, h) => occupied.some((s) => s.d === d && s.h === h)

  const confirmTurno = () => {
    if (!booking) return
    setOccupied((rows) => [...rows, { d: booking.d, h: booking.h, client: "Nuevo", svc: booking.svc }])
    setConfirmed(true)
    setBooking(null)
  }

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(slotRef.current, { wait: 260 }) },
      { at: 1700, run: () => { demo.getCursor()?.click(slotRef.current); setBooking({ d: 2, h: 1, svc: "Corte + peinado" }) } },
      { at: 3400, run: () => demo.getCursor()?.moveTo(profRef.current, { wait: 220 }) },
      { at: 4600, run: () => { demo.getCursor()?.click(profRef.current); setProfessional("Luca Vidal") } },
      { at: 5700, run: () => demo.getCursor()?.moveTo(confirmRef.current, { wait: 200 }) },
      { at: 6800, run: () => { demo.getCursor()?.click(confirmRef.current); confirmTurno() } },
      { at: 8800, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2400, onComplete: demo.bump })

  useEffect(() => {
    setOccupied(SLOTS)
    setBooking(null)
    setProfessional("Mora Torres")
    setConfirmed(false)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="flex items-center gap-[0.4em] font-display text-[0.9em] font-bold"><Scissors size="0.9em" /> Áurea Studio</p>
          <Pill tone={demo.tone} dot>Abierto</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Ocupación hoy" value="86%" delta={9} />
          <Kpi label="Turnos confirmados" value="18" delta={5} />
          <Kpi label="Recaudación" value="$412.800" delta={12} />
          <Kpi label="Clientes activos" value="342" delta={4} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
            <SectionHead title="Hoy · Jue 15" extra={<Pill tone="acc-gestion">5 turnos</Pill>} />
            <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
              {[["09:00", "Martina · Corte", "acc-gastro"], ["11:00", "Libre", "text-4"], ["13:00", "Sofía · Balayage", "acc-educacion"], ["15:00", "Libre", "text-4"]].map(([h, t, tone]) => (
                <div key={h} className="flex items-center gap-[0.6em] rounded-[0.6em] border border-outline bg-surface-2/50 px-[0.8em] py-[0.5em]">
                  <span className="w-[3.4em] font-mono text-[0.62em] text-text-3">{h}</span>
                  <span className="min-w-0 flex-1 truncate text-[0.7em] text-text-1">{t}</span>
                  <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar(tone) }} />
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
            <Scissors size="0.9em" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78em] font-bold leading-none">Áurea Studio</p>
            <p className="text-[0.55em] text-text-3">Belleza & estética</p>
          </div>
        </div>
        <nav className="flex flex-col gap-[0.25em]">
          {["agenda", "profesionales", "clientes", "historial", "servicios", "pagos"].map((k) => {
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
              </button>
            )
          })}
        </nav>
        <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(demo.tone) }}>
          <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(demo.tone) }}>Recordatorio</p>
          <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Sofía · Balayage · 13:00</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
          <div>
            <p className="text-[0.78em] font-bold leading-none">Agenda semanal</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Semana del 12 al 18</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <Pill tone="acc-gestion" dot>Recordatorios activos</Pill>
            <Btn tone={demo.tone}><CalendarDays size="0.8em" /> Nuevo turno</Btn>
          </div>
        </div>

        {confirmed && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">Turno confirmado · Mié 13:00 · Luca Vidal</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            <Kpi label="Ocupación hoy" value="86%" delta={9} />
            <Kpi label="Turnos confirmados" value="18" delta={5} />
            <Kpi label="Recaudación semanal" value="$412.800" delta={12} />
            <Kpi label="Clientes activos" value="342" delta={4} />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Disponibilidad" icon={<Sparkles size="0.85em" />} extra={<Pill tone={demo.tone}>86% ocupado</Pill>} />
              <div className="mt-[0.6em] grid grid-cols-7 gap-[0.4em]">
                {DAYS.map((d, di) => (
                  <div key={d} className="flex flex-col gap-[0.35em]">
                    <p className="truncate text-center font-mono text-[0.52em] uppercase tracking-wide text-text-3">{d}</p>
                    {HOURS.map((h, hi) => {
                      const taken = isTaken(di, hi)
                      const isTarget = di === 2 && hi === 1
                      return (
                        <button
                          key={h}
                          type="button"
                          ref={isTarget ? slotRef : undefined}
                          disabled={taken}
                          onClick={() => setBooking({ d: di, h: hi, svc: "Corte + peinado" })}
                          className={`rounded-[0.45em] border px-[0.2em] py-[0.55em] text-center transition-all ${
                            taken ? "cursor-default border-outline bg-surface-2/70" : "cursor-pointer hover:border-transparent"
                          }`}
                          style={
                            taken
                              ? {}
                              : isTarget
                                ? { borderColor: toneVar(demo.tone), backgroundColor: toneSoft(demo.tone) }
                                : { borderColor: "var(--color-outline)", backgroundColor: "var(--color-surface-2/40)" }
                          }
                        >
                          {taken ? (
                            <span className="text-[0.5em] text-text-3">{h} · {occupied.find((s) => s.d === di && s.h === hi).client}</span>
                          ) : (
                            <span className="text-[0.5em] font-semibold text-text-2">{h} · Libre</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[0.7em]">
              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Profesionales" icon={<Users size="0.85em" />} extra={<Pill tone="acc-gestion">3 activos</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.5em]">
                  {PROFESIONALES.map((p) => (
                    <div key={p.name} className="flex items-center gap-[0.5em]">
                      <Avatar name={p.name} tone={p.tone} size={1.6} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.64em] font-semibold">{p.name}</p>
                        <div className="mt-[0.25em] flex items-center gap-[0.4em]">
                          <div className="h-[0.3em] min-w-0 flex-1 overflow-hidden rounded-full bg-surface-3">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${p.pct}%`, backgroundColor: toneVar(demo.tone) }} />
                          </div>
                          <span className="font-mono text-[0.5em] text-text-3">{p.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
                <SectionHead title="Próximos turnos" extra={<Pill tone="acc-gastro">Hoy</Pill>} />
                <div className="mt-[0.55em] flex flex-col gap-[0.45em]">
                  {[
                    { h: "13:00", who: "Sofía P.", svc: "Balayage · Emma" },
                    { h: "15:00", who: "Ramiro V.", svc: "Barba · Luca" },
                    { h: "17:00", who: "Lucía F.", svc: "Corte · Mora" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-[0.5em]">
                      <span className="w-[3em] shrink-0 font-mono text-[0.56em] text-text-3">{t.h}</span>
                      <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{t.who} · {t.svc}</span>
                      <Check size="0.7em" style={{ color: toneVar("acc-gestion") }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {booking && (
        <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
          <div className="w-[22em] animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.8em] font-bold">Nuevo turno</p>
              <Pill tone={demo.tone}>Mié 13:00</Pill>
            </div>
            <p className="mt-[0.3em] text-[0.62em] text-text-3">{booking.svc}</p>
            <p className="mt-[0.7em] text-[0.6em] font-semibold uppercase tracking-wide text-text-3">Profesional</p>
            <div className="mt-[0.35em] flex gap-[0.5em]">
              {PROFESIONALES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  ref={p.name === "Luca Vidal" ? profRef : undefined}
                  onClick={() => setProfessional(p.name)}
                  className="flex flex-1 items-center gap-[0.4em] rounded-[0.6em] border px-[0.6em] py-[0.5em] transition-colors"
                  style={{
                    borderColor: professional === p.name ? toneVar(demo.tone) : "var(--color-outline)",
                    backgroundColor: professional === p.name ? toneSoft(demo.tone) : "var(--color-surface-1)",
                  }}
                >
                  <Avatar name={p.name} tone={p.tone} size={1.5} />
                  <div className="min-w-0">
                    <p className="truncate text-[0.6em] font-semibold">{p.name}</p>
                    <p className="truncate text-[0.5em] text-text-3">{p.svc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-[0.8em] flex gap-[0.5em]">
              <Btn tone={demo.tone} className="flex-1 justify-center" innerRef={confirmRef} onClick={confirmTurno}>
                Confirmar turno
              </Btn>
              <button type="button" onClick={() => setBooking(null)} className="rounded-[0.55em] border border-outline px-[0.9em] text-[0.68em] font-semibold text-text-2 hover:bg-surface-2">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
