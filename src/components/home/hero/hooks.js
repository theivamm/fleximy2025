import { useEffect, useRef, useState } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])
  return matches
}

export function useVisibility(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setVisible(e.isIntersecting)
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return visible
}

/**
 * Avanza una lista de pasos { at: ms, run: fn }. Se congela cuando `active`
 * es false (pausa el hero fuera de pantalla) y se reinicia en cada `cycle`.
 */
export function useTimeline({ active, cycle, steps, hold = 3000, onComplete }) {
  const stepsRef = useRef(steps)
  const doneRef = useRef(new Set())
  const elapsedRef = useRef(0)
  const lastRef = useRef(0)
  const activeRef = useRef(active)
  const onCompleteRef = useRef(onComplete)
  activeRef.current = active
  onCompleteRef.current = onComplete

  useEffect(() => {
    stepsRef.current = steps
    doneRef.current = new Set()
    elapsedRef.current = 0
    lastRef.current = performance.now()
  }, [cycle, steps])

  useEffect(() => {
    if (!active) return
    lastRef.current = performance.now()
    const id = window.setInterval(() => {
      if (!activeRef.current) return
      const now = performance.now()
      elapsedRef.current += now - lastRef.current
      lastRef.current = now
      const current = stepsRef.current
      for (const s of current) {
        if (!doneRef.current.has(s.at) && elapsedRef.current >= s.at) {
          doneRef.current.add(s.at)
          s.run()
        }
      }
      if (current.every((s) => doneRef.current.has(s.at))) {
        window.clearInterval(id)
        window.setTimeout(() => {
          if (activeRef.current) onCompleteRef.current()
        }, hold)
      }
    }, 80)
    return () => window.clearInterval(id)
  }, [active, cycle])
}
