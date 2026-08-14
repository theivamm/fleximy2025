import { createContext, useContext, useRef } from "react"
import { Sparkles } from "lucide-react"
import { emScale, useContainerWidth } from "./labHooks"
import { toneVar } from "./industries"

const FrameContext = createContext({ compact: false, em: 14, immersive: false })

export function useLabFrame() {
  return useContext(FrameContext)
}

/**
 * Mockup de navegador con proporción exacta 16:9.
 * Escala la tipografía interna con `em` (root = ancho×1.35%) para conservar
 * proporción, densidad y jerarquía sin recurrir a transform: scale().
 */
export default function BrowserFrame({
  url,
  tone,
  children,
  className = "",
  immersive = false,
  overlay = false,
}) {
  const ref = useRef(null)
  const width = useContainerWidth(ref)
  const em = emScale(width)
  const compact = !!width && width < 760

  return (
    <FrameContext.Provider value={{ compact, em, immersive }}>
      <div
        ref={ref}
        className={`relative flex aspect-[16/9] w-full flex-col overflow-hidden rounded-2xl border border-outline bg-surface-1 shadow-[var(--shadow-md)] ${className}`}
        style={{ fontSize: `${em}px` }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-[10%] -top-[30%] size-[45%] rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: toneVar(tone) }}
          />
          <div
            className="absolute -bottom-[25%] right-[5%] size-[35%] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: toneVar(tone) }}
          />
        </div>

        {/* Chrome del navegador */}
        <div className="relative flex h-[2.5em] items-center gap-[0.6em] border-b border-outline bg-surface-2/70 px-[1em]">
          <span className="flex shrink-0 gap-[0.35em]" aria-hidden="true">
            <span className="size-[0.7em] rounded-full bg-error/80" />
            <span className="size-[0.7em] rounded-full bg-warning/80" />
            <span className="size-[0.7em] rounded-full bg-success/80" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-[0.4em] rounded-[0.6em] bg-surface-1 px-[0.8em] py-[0.3em] text-text-3">
            <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M9 12h6m-5-7 4 7-4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate font-mono text-[0.78em]">{url}</span>
          </span>
          <span className="flex shrink-0 items-center gap-[0.35em]" aria-hidden="true">
            <span className="hidden size-[0.5em] rounded-sm bg-text-3 opacity-50 sm:block" />
            <span className="hidden size-[0.5em] rounded-sm bg-text-3 opacity-50 sm:block" />
            <span className="size-[0.5em] rounded-sm bg-text-3 opacity-50" />
            <span className="size-[0.5em] rounded-full" style={{ backgroundColor: toneVar(tone) }} />
          </span>
        </div>

        {/* Aviso de muestra conceptual */}
        <div className="relative flex shrink-0 items-center justify-center gap-[0.5em] border-b border-outline bg-surface-2/50 px-[1em] py-[0.38em]">
          <Sparkles size="0.75em" className="shrink-0" style={{ color: toneVar(tone) }} />
          <p className="min-w-0 truncate text-center text-[0.62em] font-medium leading-none text-text-3">
            <span className="font-bold uppercase tracking-[0.08em]" style={{ color: toneVar(tone) }}>
              Muestras simples
            </span>
            <span className="hidden sm:inline"> · cada app refleja la necesidad real de tu negocio</span>
          </p>
        </div>

        {/* Contenido de la app */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {children}
        </div>

        {overlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
          />
        )}
      </div>
    </FrameContext.Provider>
  )
}
