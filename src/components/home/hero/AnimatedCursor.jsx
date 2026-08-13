import { useEffect, useMemo, useRef, useState } from "react"

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
 * Cursor decorativo que se mueve por curvas suaves, hace pausas antes de
 * los clics y emite un ripple discreto. Es puramente visual (aria-hidden) y
 * se oculta para touch/reduced-motion (el padre lo deja de renderizar).
 */
export default function CursorLayer({ containerRef, bindController, className = "" }) {
  const [mode, setMode] = useState("idle")
  const [ripples, setRipples] = useState([])
  const elRef = useRef(null)
  const posRef = useRef({ x: -60, y: -60 })
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
      async moveTo(targetEl, { dur = 620, arc = 22, wait = 0 } = {}) {
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
      async click(targetEl, { dur = 560, arc = 16, wait = 0 } = {}) {
        const el = elRef.current
        if (!el) return
        await this.moveTo(targetEl, { dur, arc, wait })
        const { x, y } = posRef.current
        spawnRipple(x, y)
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0.82)`
        await sleep(110)
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        setMode("idle")
        await sleep(200)
      },
      async fadeOut(dur = 420) {
        const el = elRef.current
        if (!el) return
        const from = { ...posRef.current }
        await bezierMove(from, { x: from.x + 150, y: from.y - 50 }, dur, 26, (p) => {
          posRef.current = p
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        })
        el.style.opacity = "0"
        shownRef.current = false
        posRef.current = { x: -60, y: -60 }
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
          <path d="M4 3l7 17 2.5-6.5L20 11 4 3Z" fill="#FAF6EC" stroke="#3B2A20" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        <span
          className="absolute -left-1.5 -top-1.5 -z-10 size-6 rounded-full border-2 transition-all duration-200"
          style={{
            borderColor: "rgba(224,120,90,0.75)",
            opacity: mode === "hover" ? 1 : 0,
            transform: mode === "hover" ? "scale(1)" : "scale(0.55)",
          }}
        />
      </div>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-30 size-5 animate-[ripple_0.5s_var(--motion-ease)] rounded-full"
          style={{ left: r.x, top: r.y, border: "2px solid rgba(224,120,90,0.85)" }}
        />
      ))}
    </>
  )
}
