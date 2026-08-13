import { useEffect, useMemo, useRef, useState } from "react"
import { toneVar } from "./industries"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function bezierMove(from, to, dur, arc, onFrame) {
  return new Promise((resolve) => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const len = Math.hypot(dx, dy) || 1
    const mid = {
      x: (from.x + to.x) / 2 + (-dy / len) * arc,
      y: (from.y + to.y) / 2 + (dx / len) * arc,
    }
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = easeInOutCubic(t)
      const mt = 1 - e
      onFrame({
        x: mt * mt * from.x + 2 * mt * e * mid.x + e * e * to.x,
        y: mt * mt * from.y + 2 * mt * e * mid.y + e * e * to.y,
      })
      if (t < 1) requestAnimationFrame(tick)
      else resolve()
    }
    requestAnimationFrame(tick)
  })
}

/**
 * Cursor decorativo del laboratorio. Movimiento bézier deliberado, ripple con
 * el acento de la industria activa. Puramente visual (aria-hidden); el padre
 * no lo renderiza para touch ni prefers-reduced-motion.
 */
export default function LabCursor({ containerRef, bindController, tone = "acc-educacion", className = "" }) {
  const [mode, setMode] = useState("idle")
  const [ripples, setRipples] = useState([])
  const elRef = useRef(null)
  const posRef = useRef({ x: -80, y: -80 })
  const shownRef = useRef(false)

  const controller = useMemo(() => {
    const spawnRipple = (x, y) => {
      const id = `${Date.now()}-${Math.random()}`
      setRipples((rs) => [...rs, { id, x, y }])
      window.setTimeout(() => setRipples((rs) => rs.filter((r) => r.id !== id)), 520)
    }
    const show = () => {
      if (shownRef.current) return
      shownRef.current = true
      if (elRef.current) elRef.current.style.opacity = "1"
    }
    return {
      setHover: (h) => setMode(h ? "hover" : "idle"),
      async moveTo(targetEl, { dur = 540, arc = 18, wait = 0 } = {}) {
        const container = containerRef.current
        const el = elRef.current
        if (!container || !el || !targetEl) return
        if (wait) await sleep(wait)
        show()
        const cRect = container.getBoundingClientRect()
        const tRect = targetEl.getBoundingClientRect()
        const to = {
          x: tRect.left - cRect.left + tRect.width / 2,
          y: tRect.top - cRect.top + tRect.height / 2,
        }
        setMode("hover")
        await bezierMove({ ...posRef.current }, to, dur, arc, (p) => {
          posRef.current = p
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        })
      },
      async click(targetEl, { dur = 480, arc = 12, wait = 0 } = {}) {
        const el = elRef.current
        if (!el) return
        await this.moveTo(targetEl, { dur, arc, wait })
        const { x, y } = posRef.current
        spawnRipple(x, y)
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0.8)`
        await sleep(100)
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        setMode("idle")
        await sleep(160)
      },
      async fadeOut(dur = 360) {
        const el = elRef.current
        if (!el) return
        const from = { ...posRef.current }
        await bezierMove(from, { x: from.x + 130, y: from.y - 40 }, dur, 22, (p) => {
          posRef.current = p
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        })
        el.style.opacity = "0"
        shownRef.current = false
        posRef.current = { x: -80, y: -80 }
        setMode("idle")
      },
    }
  }, [containerRef])

  useEffect(() => {
    if (bindController) bindController(controller)
    return () => {
      if (bindController) bindController(null)
    }
  }, [controller, bindController])

  return (
    <>
      <div
        ref={elRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-40 transition-opacity duration-300 ${className}`}
        style={{ opacity: 0, willChange: "transform" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M4 3l7 17 2.5-6.5L20 11 4 3Z" fill="var(--color-text-1)" stroke="var(--color-text-3)" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        <span
          className="absolute -left-[0.6em] -top-[0.6em] -z-10 size-[1.9em] rounded-full border-2 transition-all duration-200"
          style={{
            borderColor: toneVar(tone),
            opacity: mode === "hover" ? 1 : 0,
            transform: mode === "hover" ? "scale(1)" : "scale(0.55)",
          }}
        />
      </div>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-30 size-[1.5em] animate-[ripple_0.5s_var(--motion-ease)] rounded-full"
          style={{ left: r.x, top: r.y, border: `2px solid ${toneVar(tone)}` }}
        />
      ))}
    </>
  )
}
