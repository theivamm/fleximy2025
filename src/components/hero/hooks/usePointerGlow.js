import { useState, useEffect, useRef, useCallback } from "react"

export function usePointerGlow(containerRef, { maxOffset = 35, enabled = true } = {}) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 50, y: 50 })
  const currentRef = useRef({ x: 50, y: 50 })

  const lerp = (a, b, t) => a + (b - a) * t

  const animate = useCallback(() => {
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08)
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08)
    setPos({ x: currentRef.current.x, y: currentRef.current.y })
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const el = containerRef.current
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      targetRef.current = { x, y }
    }

    el.addEventListener("mousemove", onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      el.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, containerRef, animate])

  const offset = {
    x: ((pos.x - 50) / 50) * maxOffset,
    y: ((pos.y - 50) / 50) * maxOffset,
  }

  return { pos, offset }
}
