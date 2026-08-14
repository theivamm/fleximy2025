import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, Presentation, Repeat, RotateCcw, X } from "lucide-react"
import BrowserFrame from "./BrowserFrame"
import LabCursor from "./LabCursor"
import { Pill } from "./primitives"
import { INDUSTRIES, toneSoft, toneVar } from "./industries"
import { useVisibility } from "../hero/hooks"
import CafeNomada from "./views/CafeNomada"
import Distrito from "./views/Distrito"
import Habitat from "./views/Habitat"
import Aurea from "./views/Aurea"
import Nexo from "./views/Nexo"
import MotorLab from "./views/MotorLab"
import Ruta from "./views/Ruta"
import Pulso from "./views/Pulso"

const VIEWS = [CafeNomada, Distrito, Habitat, Aurea, Nexo, MotorLab, Ruta, Pulso]

const CONTROL =
  "grid size-9 shrink-0 place-items-center rounded-full border border-outline bg-surface-1 text-text-2 transition-colors hover:border-outline-strong hover:text-text-1"

export default function IndustryLab() {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(1)
  const [playing, setPlaying] = useState(() => {
    if (typeof window === "undefined") return true
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })
  const [auto, setAuto] = useState(true)
  const [immersive, setImmersive] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const stackRef = useRef(null)
  const immersiveStackRef = useRef(null)
  const cursorRef = useRef(null)

  const motionOk = useMemo(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )
  const [cursorAllowed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const visible = useVisibility(sectionRef, 0.2)
  const industry = INDUSTRIES[index]

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % INDUSTRIES.length)
    setCycle((c) => c + 1)
  }, [])

  const pause = useCallback(() => setPlaying(false), [])
  const resetDemo = useCallback(() => {
    setCycle((c) => c + 1)
    setPlaying(true)
  }, [])

  const bump = useCallback(() => {
    if (!auto || !motionOk) return
    advance()
  }, [auto, motionOk, advance])

  const select = (i) => {
    if (i === index) return
    setIndex(i)
    setCycle((c) => c + 1)
    setPlaying(true)
  }

  const scrollTabs = (dir) => {
    const el = listRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pill = [...el.querySelectorAll('[role="tab"]')].find(
      (p) => p.getBoundingClientRect().right > rect.left + 8
    )
    const step = pill ? pill.offsetWidth + 8 : el.clientWidth * 0.6
    el.scrollBy({ left: dir * step, behavior: motionOk ? "smooth" : "auto" })
  }

  const updateArrows = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const fits = el.scrollWidth <= el.clientWidth + 2
    setCanPrev(!fits && el.scrollLeft > 2)
    setCanNext(!fits && el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const t = setTimeout(updateArrows, 150)
    el.addEventListener("scroll", updateArrows, { passive: true })
    window.addEventListener("resize", updateArrows)
    return () => {
      clearTimeout(t)
      el.removeEventListener("scroll", updateArrows)
      window.removeEventListener("resize", updateArrows)
    }
  }, [updateArrows])

  const bindController = useCallback((c) => {
    cursorRef.current = c
  }, [])

  useEffect(() => {
    if (!immersive) return
    const onKey = (e) => {
      if (e.key === "Escape") setImmersive(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [immersive])

  // Interacción real dentro del frame: pausa el recorrido automático,
  // mantiene el estado actual y no cambia de industria.
  useEffect(() => {
    const handler = () => pause()
    const a = stackRef.current
    const b = immersiveStackRef.current
    a?.addEventListener("pointerdown", handler)
    b?.addEventListener("pointerdown", handler)
    return () => {
      a?.removeEventListener("pointerdown", handler)
      b?.removeEventListener("pointerdown", handler)
    }
  }, [pause])

  useEffect(() => {
    const btn = listRef.current?.querySelector(`[data-index="${index}"]`)
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [index])

  const demo = useMemo(
    () => ({
      playing: playing && visible && !immersive,
      cycle,
      tone: industry.tone,
      bump,
      pause,
      reset: resetDemo,
      next: advance,
      getCursor: () => cursorRef.current,
    }),
    [playing, visible, immersive, cycle, industry.tone, bump, pause, resetDemo, advance]
  )
  const idleDemo = useMemo(() => ({ ...demo, playing: false }), [demo])

  const isMini = industry.kind === "mini"
  const ctaLabel = isMini ? "Abrir mini app" : "Explorar recorrido"
  const tagLabel = isMini ? "Mini app interactiva" : "Concepto interactivo"
  const url = `app.fleximy.dev/${industry.product.toLowerCase().replace(/\s+/g, "-")}`

  const renderStack = (stack, withCursor) => (
    <div ref={stack} className="relative h-full">
      {INDUSTRIES.map((ind, i) => {
        const ViewCmp = VIEWS[i]
        const isActive = i === index
        return (
          <div
            key={ind.id}
            id={`lab-panel-${ind.id}`}
            role="tabpanel"
            aria-hidden={!isActive}
            aria-labelledby={`lab-tab-${ind.id}`}
            className="absolute inset-0 transition-all duration-[550ms] ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(0.6em)",
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 2 : 1,
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            <ViewCmp demo={isActive ? demo : idleDemo} />
          </div>
        )
      })}
      {withCursor && cursorAllowed && (
        <LabCursor containerRef={stack} bindController={bindController} tone={industry.tone} />
      )}
    </div>
  )

  return (
    <div ref={sectionRef} className="container-wide flex flex-col gap-4">
      {/* Selector de industria */}
      <div className="flex items-center gap-3">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Industrias del Laboratorio Fleximy"
          className="no-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]"
        >
          {INDUSTRIES.map((ind, i) => {
            const active = i === index
            const Icon = ind.Icon
            return (
              <button
                key={ind.id}
                id={`lab-tab-${ind.id}`}
                type="button"
                role="tab"
                data-index={i}
                aria-selected={active}
                aria-controls={`lab-panel-${ind.id}`}
                onClick={() => select(i)}
                className="flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 transition-all duration-300"
                style={{
                  backgroundColor: active ? toneSoft(ind.tone) : "var(--color-surface-1)",
                  borderColor: active ? toneVar(ind.tone) : "var(--color-outline)",
                  color: active ? toneVar(ind.tone) : "var(--color-text-2)",
                }}
              >
                <Icon size={15} style={{ color: active ? toneVar(ind.tone) : "var(--color-text-3)" }} />
                <span className="text-sm font-semibold">{ind.product}</span>
                <span className="hidden font-mono text-[11px] tracking-tight opacity-75 lg:block">{ind.label}</span>
              </button>
            )
          })}
        </div>

        {(canPrev || canNext) && (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              className={`${CONTROL} ${canPrev ? "" : "pointer-events-none opacity-35"}`}
              onClick={() => scrollTabs(-1)}
              disabled={!canPrev}
              aria-label="Deslizar a industrias anteriores"
              title="Deslizar a industrias anteriores"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              className={`${CONTROL} ${canNext ? "" : "pointer-events-none opacity-35"}`}
              onClick={() => scrollTabs(1)}
              disabled={!canNext}
              aria-label="Deslizar a siguientes industrias"
              title="Deslizar a siguientes industrias"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>

      {/* Controles de la demo */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex shrink-0 items-center gap-1.5" aria-label="Controles de la demo">
          <button
            type="button"
            className={`${CONTROL} ${playing ? "!border-outline-strong !text-text-1" : ""}`}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausar recorrido" : "Reproducir recorrido"}
            title={playing ? "Pausar recorrido" : "Reproducir recorrido"}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" className={CONTROL} onClick={resetDemo} aria-label="Reiniciar vista" title="Reiniciar vista">
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            className={`${CONTROL} ${auto ? "" : "opacity-50"}`}
            onClick={() => setAuto((a) => !a)}
            aria-label="Alternar avance automático entre industrias"
            aria-pressed={auto}
            title={auto ? "Avance automático activado" : "Avance automático apagado"}
          >
            <Repeat size={15} style={{ color: auto ? toneVar(industry.tone) : undefined }} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setImmersive(true)}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: toneVar(industry.tone) }}
        >
          <Presentation size={15} />
          <span className="hidden sm:inline">{ctaLabel}</span>
        </button>
      </div>

      {/* Marco 16:9 con las ocho vistas */}
      <div className="relative" aria-hidden={immersive}>
        <BrowserFrame url={url} tone={industry.tone}>
          {renderStack(stackRef, true)}
        </BrowserFrame>
        <div className="pointer-events-none relative z-10 mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 font-mono text-[11px] text-text-3">
            <Pill tone={industry.tone} dot>
              {tagLabel}
            </Pill>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
            </span>
          </p>
          <p className="font-mono text-[11px] text-text-4">
            Elegí una industria y probá las acciones destacadas dentro de cada producto.
          </p>
        </div>
      </div>

      {/* Modo inmersivo */}
      {immersive && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-surface-2/95 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 border-b border-outline px-4 py-3 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="grid size-9 shrink-0 place-items-center rounded-xl text-white"
                style={{ backgroundColor: toneVar(industry.tone) }}
              >
                <industry.Icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-text-1">{industry.product}</p>
                <p className="font-mono text-[11px] text-text-3">
                  {tagLabel} · {industry.label}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-outline bg-surface-1 px-3.5 text-xs font-semibold text-text-2 transition-colors hover:text-text-1"
              >
                <RotateCcw size={14} />
                Reiniciar
              </button>
              <button
                type="button"
                onClick={() => setImmersive(false)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-outline bg-surface-1 px-3.5 text-xs font-semibold text-text-1 transition-colors hover:border-outline-strong"
              >
                <X size={14} />
                Cerrar demo
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 lg:p-8">
            <div className="mx-auto w-full max-w-[1500px]">
              <BrowserFrame url={url} tone={industry.tone} immersive>
                {renderStack(immersiveStackRef, false)}
              </BrowserFrame>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
