import { useState, useEffect, useCallback, useRef } from "react"

const VIEW_DURATIONS = { web: 5000, app: 5000, dashboard: 6000 }
const PAUSE_AFTER_INTERACTION = 15000
const ORDER = ["web", "app", "dashboard"]

export function useHeroAutoplay(preferReduced) {
  const [activeView, setActiveView] = useState("web")
  const [isAutoplay, setIsAutoplay] = useState(!preferReduced)
  const timerRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const lastInteractionRef = useRef(0)

  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current)
    clearTimeout(pauseTimeoutRef.current)
    timerRef.current = null
    pauseTimeoutRef.current = null
  }, [])

  const goTo = useCallback(
    (view) => {
      clearTimers()
      setActiveView(view)
      lastInteractionRef.current = Date.now()
      if (!preferReduced) {
        setIsAutoplay(false)
        pauseTimeoutRef.current = setTimeout(() => {
          setIsAutoplay(true)
        }, PAUSE_AFTER_INTERACTION)
      }
    },
    [clearTimers, preferReduced]
  )

  useEffect(() => {
    if (preferReduced || !isAutoplay) return

    const currentIndex = ORDER.indexOf(activeView)
    const nextIndex = (currentIndex + 1) % ORDER.length
    const duration = VIEW_DURATIONS[activeView]

    timerRef.current = setTimeout(() => {
      setActiveView(ORDER[nextIndex])
    }, duration)

    return () => clearTimeout(timerRef.current)
  }, [activeView, isAutoplay, preferReduced])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) clearTimers()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      clearTimers()
    }
  }, [clearTimers])

  return { activeView, goTo, isAutoplay }
}
