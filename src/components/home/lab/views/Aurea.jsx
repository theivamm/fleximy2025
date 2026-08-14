import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays, Check, CreditCard, History, LayoutList, Scissors, Sparkles, UserRound, Users } from "lucide-react"
import { Avatar, Bar, Btn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

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

const CLIENTES = [
  { name: "Martina G.", visits: 12, tone: "acc-turnos", last: "Hoy 13:00", spend: "$128.400" },
  { name: "Sofía P.", visits: 8, tone: "acc-educacion", last: "Mié 14:30", spend: "$96.000" },
  { name: "Julián R.", visits: 5, tone: "acc-gastro", last: "Mar 11:00", spend: "$54.800" },
  { name: "Lucía F.", visits: 9, tone: "acc-gestion", last: "Vie 16:00", spend: "$71.200" },
  { name: "Ramiro V.", visits: 3, tone: "acc-logistica", last: "Lun 17:00", spend: "$22.500" },
  { name: "Diego M.", visits: 6, tone: "acc-comercio", last: "Jue 15:00", spend: "$63.000" },
]

const HISTORIAL = [
  { when: "Hoy 13:00", svc: "Balayage", client: "Sofía P.", prof: "Emma Paz", price: "$24.000", tone: "acc-educacion" },
  { when: "Hoy 11:00", svc: "Corte + peinado", client: "Julián R.", prof: "Luca Vidal", price: "$9.000", tone: "acc-turnos" },
  { when: "Ayer 17:00", svc: "Barba", client: "Ramiro V.", prof: "Luca Vidal", price: "$3.500", tone: "acc-logistica" },
  { when: "Ayer 15:00", svc: "Tinte completo", client: "Diego M.", prof: "Mora Torres", price: "$16.500", tone: "acc-gastro" },
  { when: "Lun 16:00", svc: "Tratamiento capilar", client: "Lucía F.", prof: "Emma Paz", price: "$12.000", tone: "acc-comercio" },
  { when: "Lun 12:00", svc: "Manicuría", client: "Martina G.", prof: "Mora Torres", price: "$6.200", tone: "acc-gestion" },
]

const SERVICIOS = [
  { name: "Corte + peinado", dur: "45 min", price: "$9.000", tone: "acc-turnos", rating: "4,8" },
  { name: "Balayage", dur: "2 h", price: "$24.000", tone: "acc-educacion", rating: "4,9" },
  { name: "Tinte completo", dur: "90 min", price: "$16.500", tone: "acc-gastro", rating: "4,7" },
  { name: "Barba", dur: "20 min", price: "$3.500", tone: "acc-logistica", rating: "4,6" },
  { name: "Manicuría", dur: "40 min", price: "$6.200", tone: "acc-gestion", rating: "4,8" },
  { name: "Tratamiento capilar", dur: "50 min", price: "$12.000", tone: "acc-comercio", rating: "4,5" },
]

const PAGOS = [
  { method: "Efectivo", pct: 42, tone: "acc-turnos", total: "$173.400" },
  { method: "Tarjeta débito", pct: 28, tone: "acc-educacion", total: "$115.600" },
  { method: "Tarjeta crédito", pct: 22, tone: "acc-gastro", total: "$90.800" },
  { method: "Transferencia", pct: 8, tone: "acc-logistica", total: "$33.000" },
]

const TAB_TITLES = {
  agenda: "Agenda semanal",
  profesionales: "Profesionales",
  clientes: "Clientes",
  historial: "Historial de servicios",
  servicios: "Carta de servicios",
  pagos: "Pagos y cobranza",
}

export default function Aurea({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("agenda")
  const [booking, setBooking] = useState(null)
  const [occupied, setOccupied] = useState(SLOTS)
  const [professional, setProfessional] = useState("Mora Torres")
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedSlot, setConfirmedSlot] = useState({ d: 2, h: 1 })
  const [toast, setToast] = useToast()

  const rootRef = useRef(null)
  const slotRef = useRef(null)
  const profRef = useRef(null)
  const confirmRef = useRef(null)
  const agendaRef = useRef(null)

  const bookingRef = useRef(booking)
  bookingRef.current = booking
  const professionalRef = useRef(professional)
  professionalRef.current = professional

  const isTaken = (d, h) => occupied.some((s) => s.d === d && s.h === h)

  const confirmTurno = () => {
    const b = bookingRef.current
    if (!b) return
    setOccupied((rows) => [...rows, { d: b.d, h: b.h, client: "Nuevo", svc: b.svc }])
    setConfirmedSlot({ d: b.d, h: b.h })
    setConfirmed(true)
    setToast(`Turno confirmado · ${DAYS[b.d]} ${HOURS[b.h]} · ${professionalRef.current}`)
    setBooking(null)
  }

  const openSlot = (di, hi) => {
    setBooking({ d: di, h: hi, svc: "Corte + peinado" })
    if (di === 2 && hi === 1) flow.step(0)
  }

  const steps = useMemo(
    () => [
      { label: "Elegir un horario", cue: () => slotRef.current, run: () => setBooking({ d: 2, h: 1, svc: "Corte + peinado" }) },
      { label: "Elegir el profesional", cue: () => profRef.current, run: () => setProfessional("Luca Vidal") },
      { label: "Confirmar el turno", cue: () => confirmRef.current, run: confirmTurno },
      { label: "Ver la agenda del día", cue: () => agendaRef.current, run: () => { setTab("agenda"); setConfirmed(false) } },
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
    setOccupied(SLOTS)
    setBooking(null)
    setProfessional("Mora Torres")
    setConfirmed(false)
    setConfirmedSlot({ d: 2, h: 1 })
    setToast(null)
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  const confirmedCount = confirmed ? 19 : 18

  if (compact) {
    return (
      <div ref={rootRef} className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Scissors size="0.95em" />}
          brand="Áurea Studio"
          subtitle="Belleza & estética"
          status={<Pill tone={demo.tone} dot>Abierto</Pill>}
          tabs={[
            { key: "agenda", label: "Agenda", Icon: CalendarDays },
            { key: "profesionales", label: "Equipo", Icon: Users },
            { key: "clientes", label: "Clientes", Icon: UserRound },
            { key: "historial", label: "Historial", Icon: History },
            { key: "servicios", label: "Servicios", Icon: LayoutList },
            { key: "pagos", label: "Pagos", Icon: CreditCard },
          ]}
          tab={tab}
          onTab={setTab}
          overlay={
            <>
              {booking && (
                <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
                  <div className="w-[22em] max-w-full animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.8em] font-bold">Nuevo turno</p>
                      <Pill tone={demo.tone}>{DAYS[booking.d]} {HOURS[booking.h]}</Pill>
                    </div>
                    <p className="mt-[0.3em] text-[0.62em] text-text-3">{booking.svc}</p>
                    <p className="mt-[0.7em] text-[0.6em] font-semibold uppercase tracking-wide text-text-3">Profesional</p>
                    <div className="mt-[0.35em] flex gap-[0.5em]">
                      {PROFESIONALES.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          ref={p.name === "Luca Vidal" ? profRef : undefined}
                          onClick={() => { setProfessional(p.name); if (p.name === "Luca Vidal") flow.step(1) }}
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
                      <Btn tone={demo.tone} className="flex-1 justify-center" innerRef={confirmRef} onClick={() => { confirmTurno(); flow.step(2) }}>
                        Confirmar turno
                      </Btn>
                      <button type="button" onClick={() => setBooking(null)} className="rounded-[0.55em] border border-outline px-[0.9em] text-[0.68em] font-semibold text-text-2 hover:bg-surface-2">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {confirmed && (
                <div className="absolute inset-x-0 bottom-[3.6em] z-30 flex justify-center px-[1em]">
                  <button
                    type="button"
                    ref={agendaRef}
                    onClick={() => { setTab("agenda"); setConfirmed(false); flow.step(3) }}
                    className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)] transition-colors hover:bg-surface-2"
                  >
                    <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                      <Check size="0.7em" />
                    </span>
                    <span className="text-[0.7em] font-semibold">Turno confirmado · {DAYS[confirmedSlot.d]} {HOURS[confirmedSlot.h]} · {professional}</span>
                    <span className="text-[0.62em] font-semibold" style={{ color: toneVar(demo.tone) }}>Ver agenda →</span>
                  </button>
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
          {tab === "agenda" && (
            <>
              <div className="grid grid-cols-2 gap-[0.55em]">
                <Kpi label="Ocupación hoy" value="86%" delta={9} />
                <Kpi label="Turnos confirmados" value={confirmedCount} delta={confirmed ? 1 : 5} />
                <Kpi label="Recaudación" value="$412.800" delta={12} />
                <Kpi label="Clientes activos" value="342" delta={4} />
              </div>

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
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
                            onClick={() => openSlot(di, hi)}
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

              <div className="mt-[0.65em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
                <SectionHead title="Próximos turnos" extra={<Pill tone="acc-gastro">Hoy</Pill>} />
                <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
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
            </>
          )}
          {tab === "profesionales" && <Profesionales tone={demo.tone} />}
          {tab === "clientes" && <Clientes tone={demo.tone} />}
          {tab === "historial" && <Historial tone={demo.tone} />}
          {tab === "servicios" && <Servicios tone={demo.tone} onToast={setToast} />}
          {tab === "pagos" && <Pagos tone={demo.tone} />}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
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
            <p className="text-[0.78em] font-bold leading-none">{TAB_TITLES[tab]}</p>
            <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Semana del 12 al 18</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            {tab === "agenda" ? (
              <>
                <Pill tone="acc-gestion" dot>Recordatorios activos</Pill>
                <Btn tone={demo.tone} onClick={() => setToast("Seleccioná un horario disponible en la grilla")}><CalendarDays size="0.8em" /> Nuevo turno</Btn>
              </>
            ) : (
              <Pill tone={demo.tone} dot>Actualizado hace 2 min</Pill>
            )}
          </div>
        </div>

        {confirmed && (
          <div className="absolute inset-x-0 bottom-[0.9em] z-30 flex justify-center px-[1em]">
            <button
              type="button"
              ref={agendaRef}
              onClick={() => { setTab("agenda"); setConfirmed(false); flow.step(3) }}
              className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)] transition-colors hover:bg-surface-2"
            >
              <span className="grid size-[1.2em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.7em" />
              </span>
              <span className="text-[0.7em] font-semibold">Turno confirmado · {DAYS[confirmedSlot.d]} {HOURS[confirmedSlot.h]} · {professional}</span>
              <span className="text-[0.62em] font-semibold" style={{ color: toneVar(demo.tone) }}>Ver agenda →</span>
            </button>
          </div>
        )}

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
            <Kpi label="Ocupación hoy" value="86%" delta={9} />
            <Kpi label="Turnos confirmados" value={confirmedCount} delta={confirmed ? 1 : 5} />
            <Kpi label="Recaudación semanal" value="$412.800" delta={12} />
            <Kpi label="Clientes activos" value="342" delta={4} />
          </div>

          {tab === "agenda" && (
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
                          onClick={() => openSlot(di, hi)}
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
          )}

          {tab === "profesionales" && <Profesionales tone={demo.tone} />}
          {tab === "clientes" && <Clientes tone={demo.tone} />}
          {tab === "historial" && <Historial tone={demo.tone} />}
          {tab === "servicios" && <Servicios tone={demo.tone} onToast={setToast} />}
          {tab === "pagos" && <Pagos tone={demo.tone} />}
        </div>
      </div>

      {booking && (
        <div className="absolute inset-0 z-30 grid place-items-center p-[1.5em]" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 70%, transparent)" }}>
          <div className="w-[22em] animate-[scale-in_0.4s_var(--motion-ease)] rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] shadow-[var(--shadow-lg)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.8em] font-bold">Nuevo turno</p>
              <Pill tone={demo.tone}>{DAYS[booking.d]} {HOURS[booking.h]}</Pill>
            </div>
            <p className="mt-[0.3em] text-[0.62em] text-text-3">{booking.svc}</p>
            <p className="mt-[0.7em] text-[0.6em] font-semibold uppercase tracking-wide text-text-3">Profesional</p>
            <div className="mt-[0.35em] flex gap-[0.5em]">
              {PROFESIONALES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  ref={p.name === "Luca Vidal" ? profRef : undefined}
                  onClick={() => { setProfessional(p.name); if (p.name === "Luca Vidal") flow.step(1) }}
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
              <Btn tone={demo.tone} className="flex-1 justify-center" innerRef={confirmRef} onClick={() => { confirmTurno(); flow.step(2) }}>
                Confirmar turno
              </Btn>
              <button type="button" onClick={() => setBooking(null)} className="rounded-[0.55em] border border-outline px-[0.9em] text-[0.68em] font-semibold text-text-2 hover:bg-surface-2">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function Profesionales({ tone }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Equipo del estudio" icon={<Users size="0.85em" />} extra={<Pill tone="acc-gestion">3 activos</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.55em]">
          {PROFESIONALES.map((p) => (
            <div key={p.name} className="flex items-center gap-[0.55em] rounded-[0.6em] border border-outline-strong bg-surface-2 px-[0.7em] py-[0.55em]">
              <Avatar name={p.name} tone={p.tone} size={1.8} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-[0.5em]">
                  <p className="truncate text-[0.66em] font-semibold">{p.name}</p>
                  <span className="shrink-0 font-mono text-[0.52em]" style={{ color: toneVar(p.tone) }}>{p.pct}%</span>
                </div>
                <p className="truncate text-[0.56em] text-text-3">{p.svc} · 4 turnos hoy</p>
                <div className="mt-[0.3em]"><Bar value={p.pct} tone={p.tone} h={0.35} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Turnos asignados hoy" icon={<CalendarDays size="0.85em" />} extra={<Pill tone={tone}>6 turnos</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {[["09:00", "Martina · Corte", "Mora"], ["13:00", "Sofía · Balayage", "Emma"], ["15:00", "Ramiro · Barba", "Luca"], ["17:00", "Lucía · Corte", "Mora"]].map(([h, w, prof]) => (
            <div key={h} className="flex items-center gap-[0.55em]">
              <span className="w-[3.2em] shrink-0 font-mono text-[0.56em] text-text-3">{h}</span>
              <span className="min-w-0 flex-1 truncate text-[0.62em] font-medium">{w}</span>
              <Pill tone={tone}>{prof}</Pill>
            </div>
          ))}
        </div>
        <p className="mt-[0.7em] rounded-[0.6em] border border-dashed border-outline-strong p-[0.6em] text-[0.56em] leading-relaxed text-text-3">
          Los turnos se asignan automáticamente según la especialidad y la disponibilidad de cada profesional.
        </p>
      </div>
    </div>
  )
}

function Clientes({ tone }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Clientes frecuentes" icon={<UserRound size="0.85em" />} extra={<Pill tone={tone}>342 registrados</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {CLIENTES.map((c) => (
            <div key={c.name} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
              <Avatar name={c.name} tone={c.tone} size={1.7} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.66em] font-semibold">{c.name}</p>
                <p className="truncate text-[0.54em] text-text-3">Última visita {c.last}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[0.66em] font-bold">{c.spend}</p>
                <p className="font-mono text-[0.5em] text-text-3">{c.visits} visitas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Fidelidad" icon={<Sparkles size="0.85em" />} extra={<Pill tone="acc-gestion">Top 20%</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
          <div className="flex items-center justify-between rounded-[0.5em] border border-outline bg-surface-2 px-[0.7em] py-[0.5em]">
            <span className="text-[0.62em] font-medium">Recompensas activas</span>
            <span className="font-mono text-[0.62em] font-bold" style={{ color: toneVar(tone) }}>12</span>
          </div>
          <div className="flex items-center justify-between rounded-[0.5em] border border-outline bg-surface-2 px-[0.7em] py-[0.5em]">
            <span className="text-[0.62em] font-medium">Clientes recurrentes</span>
            <span className="font-mono text-[0.62em] font-bold" style={{ color: toneVar(tone) }}>68%</span>
          </div>
          <div className="flex items-center justify-between rounded-[0.5em] border border-outline bg-surface-2 px-[0.7em] py-[0.5em]">
            <span className="text-[0.62em] font-medium">Citas canceladas</span>
            <span className="font-mono text-[0.62em] font-bold" style={{ color: toneVar("warning") }}>4%</span>
          </div>
        </div>
        <p className="mt-[0.7em] text-[0.56em] leading-relaxed text-text-3">
          Recordá el historial de cada cliente para personalizar la próxima visita y reducir ausencias.
        </p>
      </div>
    </div>
  )
}

function Historial({ tone }) {
  return (
    <div className="mt-[0.7em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
      <SectionHead title="Servicios realizados" icon={<History size="0.85em" />} extra={<Pill tone={tone}>6 recientes</Pill>} />
      <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
        {HISTORIAL.map((h) => (
          <div key={h.when + h.client} className="flex items-center gap-[0.55em] rounded-[0.55em] px-[0.4em] py-[0.4em] transition-colors hover:bg-surface-2">
            <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(h.tone), color: toneVar(h.tone) }}>
              <Scissors size="0.85em" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.66em] font-semibold">{h.svc}</p>
              <p className="truncate text-[0.54em] text-text-3">{h.client} · {h.prof}</p>
            </div>
            <span className="hidden shrink-0 font-mono text-[0.52em] text-text-3 sm:block">{h.when}</span>
            <span className="shrink-0 text-[0.66em] font-bold">{h.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Servicios({ tone, onToast }) {
  return (
    <div className="mt-[0.7em]">
      <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-3">
        {SERVICIOS.map((s) => (
          <div key={s.name} className="flex flex-col rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
            <div className="flex items-start justify-between gap-[0.5em]">
              <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(s.tone), color: toneVar(s.tone) }}>
                <LayoutList size="0.85em" />
              </span>
              <Pill tone={s.tone}>★ {s.rating}</Pill>
            </div>
            <p className="mt-[0.5em] text-[0.72em] font-semibold">{s.name}</p>
            <p className="mt-[0.15em] text-[0.56em] text-text-3">Duración {s.dur}</p>
            <div className="mt-auto flex items-center justify-between gap-[0.5em] pt-[0.6em]">
              <span className="text-[0.8em] font-bold">{s.price}</span>
              <button
                type="button"
                onClick={() => onToast?.(`${s.name} · ${s.dur} · ${s.price}`)}
                className="inline-flex min-h-[2.2em] items-center gap-[0.3em] rounded-[0.5em] px-[0.7em] text-[0.6em] font-bold text-white transition-transform active:scale-[0.96]"
                style={{ backgroundColor: toneVar(tone) }}
              >
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pagos({ tone }) {
  return (
    <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Ingresos por medio de pago" icon={<CreditCard size="0.85em" />} extra={<Pill tone="acc-gestion">Hoy $412.800</Pill>} />
        <div className="mt-[0.7em] flex flex-col gap-[0.6em]">
          {PAGOS.map((p) => (
            <div key={p.method} className="flex items-center gap-[0.6em]">
              <span className="w-[7em] shrink-0 truncate text-[0.62em] font-medium">{p.method}</span>
              <Bar value={p.pct} tone={p.tone} h={0.4} />
              <span className="w-[3em] shrink-0 text-right font-mono text-[0.54em] text-text-3">{p.pct}%</span>
              <span className="w-[4.5em] shrink-0 text-right font-mono text-[0.56em] font-semibold">{p.total}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[0.7em]">
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Cobros pendientes" icon={<Check size="0.85em" />} extra={<Pill tone="warning">3</Pill>} />
          <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
            {[["Sofía P.", "Balayage · 2 h", "$24.000"], ["Diego M.", "Tinte completo", "$16.500"], ["Lucía F.", "Tratamiento", "$12.000"]].map(([who, svc, price]) => (
              <div key={who} className="flex items-center gap-[0.5em]">
                <Avatar name={who} tone={tone} size={1.5} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.62em] font-semibold">{who}</p>
                  <p className="truncate text-[0.52em] text-text-3">{svc}</p>
                </div>
                <span className="shrink-0 font-mono text-[0.56em] font-semibold">{price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
          <SectionHead title="Cierre de caja" icon={<CreditCard size="0.85em" />} extra={<Pill tone="acc-gestion">Cuadrado</Pill>} />
          <p className="mt-[0.5em] text-[0.56em] leading-relaxed text-text-3">
            Cada turno confirmado genera el cobro o la señal. Los pagos se concilian de forma automática al cierre.
          </p>
        </div>
      </div>
    </div>
  )
}
