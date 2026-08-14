import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react"
import { useLabFrame } from "./BrowserFrame"
import { toneVar } from "./industries"

/**
 * Microflujo guiado de los conceptos (Tipo B).
 * `steps`: [{ label, cue, run }] ejecutadas en orden estricto.
 *  - `cue`: getter del elemento a destacar (puede devolver null en compact).
 *  - `run`: acción con efecto visible + feedback inmediato.
 *
 * La primera interacción manual pausa el recorrido automático. `storyStep`
 * avanza igual pero sin pausar (lo usa la historia automática).
 */
export function useConceptFlow({ steps, pause }) {
  const stepsRef = useRef(steps)
  const doneRef = useRef(0)
  const manualRef = useRef(false)
  const [done, setDone] = useState(0)
  const [manual, setManual] = useState(false)

  const total = steps.length

  const step = useCallback(
    (i) => {
      if (i !== doneRef.current) return
      const s = stepsRef.current[i]
      if (!s) return
      if (!manualRef.current) {
        manualRef.current = true
        setManual(true)
        pause()
      }
      s.run()
      doneRef.current += 1
      setDone(doneRef.current)
    },
    [pause]
  )

  const storyStep = useCallback((i) => {
    if (i !== doneRef.current) return
    const s = stepsRef.current[i]
    if (!s) return
    s.run()
    doneRef.current += 1
    setDone(doneRef.current)
  }, [])

  const reset = useCallback(() => {
    doneRef.current = 0
    manualRef.current = false
    setDone(0)
    setManual(false)
  }, [])

  const target = useCallback(() => {
    const s = stepsRef.current[doneRef.current]
    return s ? s.cue() : null
  }, [])

  const currentLabel = stepsRef.current[doneRef.current]?.label

  return useMemo(
    () => ({
      done,
      total,
      current: Math.min(done, total),
      complete: manual && done >= total,
      manual,
      currentLabel,
      step,
      storyStep,
      reset,
      target,
    }),
    [done, total, manual, currentLabel, step, storyStep, reset, target]
  )
}

/**
 * Capa de guiado visual sobre un concepto:
 *  - contador "X de N acciones" (role=status, anunciado a lectores)
 *  - halo discreto + etiqueta "Probalo" sobre la acción siguiente
 *  - en compact: barra inferior con la acción destacada (área táctil)
 *  - al completar: overlay "Recorrido completado" con Reiniciar / Elegir
 *    otra industria / Contanos tu idea
 */
export function HotspotLayer({ flow, containerRef, tone, resetDemo, next }) {
  const { done, total, current, complete, manual, currentLabel, target } = flow
  const { compact } = useLabFrame()
  const [rect, setRect] = useState(null)

  useEffect(() => {
    if (!manual || complete) {
      setRect(null)
      return
    }
    const measure = () => {
      const el = target()
      const c = containerRef.current
      if (el && c) {
        const cr = c.getBoundingClientRect()
        const er = el.getBoundingClientRect()
        if (er.width > 0) {
          setRect({ left: er.left - cr.left, top: er.top - cr.top, width: er.width, height: er.height })
          return
        }
      }
      setRect(null)
    }
    measure()
    const id = window.setInterval(measure, 220)
    window.addEventListener("resize", measure)
    return () => {
      window.clearInterval(id)
      window.removeEventListener("resize", measure)
    }
  }, [manual, complete, target, containerRef])

  const restart = () => {
    flow.reset()
    resetDemo()
  }

  return (
    <div className="absolute inset-0 z-40">
      {/* Contador de acciones */}
      <div
        role="status"
        className="absolute right-[0.9em] top-[0.9em] flex items-center gap-[0.45em] rounded-full border border-outline-strong bg-surface-1/90 px-[0.7em] py-[0.3em] font-mono text-[0.58em] font-medium text-text-2 shadow-[var(--shadow-sm)]"
      >
        <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar(tone) }} />
        {done} de {total} acciones
      </div>

      {/* Halo de la siguiente acción (solo exploración manual) */}
      {manual && !complete && rect && (
        <div aria-hidden="true" className="pointer-events-none absolute z-40">
          <div
            className="absolute animate-[pulse-ring_1.8s_ease-out_infinite] rounded-[0.7em]"
            style={{
              left: rect.left - 7,
              top: rect.top - 7,
              width: rect.width + 14,
              height: rect.height + 14,
              border: `1.5px solid ${toneVar(tone)}`,
              "--ring-color": toneVar(tone),
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-[0.6em] py-[0.18em] font-mono text-[0.52em] font-semibold text-white shadow-[var(--shadow-sm)]"
            style={{ top: Math.max(rect.top - 1.6, 0), backgroundColor: toneVar(tone) }}
          >
            Probalo · {currentLabel}
          </div>
        </div>
      )}

      {/* Barra compacta: una acción destacada por paso (sobre el bottom nav) */}
      {compact && !complete && (
        <div className="absolute inset-x-0 bottom-[2.9em] z-40 flex items-center gap-[0.6em] border-t border-outline bg-surface-1/95 px-[0.7em] py-[0.5em] shadow-[var(--shadow-sm)]">
          <span className="shrink-0 font-mono text-[0.55em] text-text-3">
            {done}/{total}
          </span>
          {current < total ? (
            <button
              type="button"
              onClick={() => flow.step(current)}
              className="inline-flex min-h-[2.4em] flex-1 items-center justify-center gap-[0.4em] rounded-[0.6em] px-[0.8em] text-[0.68em] font-semibold text-white transition-transform active:scale-[0.97]"
              style={{ backgroundColor: toneVar(tone) }}
            >
              <Sparkles size="0.8em" />
              Probalo · {currentLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[2.4em] flex-1 items-center justify-center gap-[0.4em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[0.8em] text-[0.68em] font-semibold text-text-1"
            >
              <RotateCcw size="0.8em" /> Reiniciar recorrido
            </button>
          )}
        </div>
      )}

      {/* Recorrido completado */}
      {complete && (
        <div className="absolute inset-0 z-50 grid place-items-center p-[1em]">
          <div className="w-[24em] max-w-full animate-[scale-in_0.35s_var(--motion-ease)] rounded-[1em] border border-outline bg-surface-1 p-[1.3em] text-center shadow-[var(--shadow-lg)]">
            <span className="mx-auto grid size-[2.6em] place-items-center rounded-full" style={{ backgroundColor: toneVar("acc-gestion") }}>
              <CheckCircle2 size="1.4em" className="text-white" />
            </span>
            <p className="mt-[0.7em] text-[0.95em] font-bold text-text-1">Recorrido completado</p>
            <p className="mt-[0.25em] text-[0.68em] text-text-3">
              {done} de {total} acciones · flujo completo del concepto
            </p>
            <div className="mt-[1.1em] flex flex-col gap-[0.55em]">
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-[2.4em] items-center justify-center gap-[0.4em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[0.9em] text-[0.7em] font-semibold text-text-1 transition-colors hover:bg-surface-2"
              >
                <RotateCcw size="0.85em" /> Reiniciar
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex min-h-[2.4em] items-center justify-center gap-[0.4em] rounded-[0.6em] px-[0.9em] text-[0.7em] font-semibold text-white transition-transform active:scale-[0.97]"
                style={{ backgroundColor: toneVar(tone) }}
              >
                Elegir otra industria
              </button>
              <a
                href="/contacto"
                className="inline-flex min-h-[2.4em] items-center justify-center rounded-[0.6em] text-[0.7em] font-semibold text-text-2 underline decoration-text-4 underline-offset-4 transition-colors hover:text-text-1"
              >
                Contanos tu idea
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
