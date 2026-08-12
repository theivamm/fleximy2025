import { useEffect, useRef } from "react"

/**
 * Fondo reactivo al puntero: una luz radial sigue suavemente al cursor.
 * Se desactiva en touch y con prefers-reduced-motion.
 */
export default function ReactiveBackground({ className = "", children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mouse-x", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`)
        el.style.setProperty("--mouse-y", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`)
      })
    }
    el.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      el.removeEventListener("pointermove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={`reactive-bg relative ${className}`}>
      {children}
    </div>
  )
}
