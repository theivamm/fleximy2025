import { useState, useEffect, useCallback, useRef } from "react"

const TIMELINE = [
  { time: 0, view: "web", action: null },
  { time: 1500, view: "web", action: "selectCroissant" },
  { time: 2500, view: "web", action: "expandDetail" },
  { time: 4000, view: "web", action: "addToCart" },
  { time: 5000, view: "app", action: null },
  { time: 6500, view: "app", action: "setVariant" },
  { time: 8000, view: "app", action: "confirmOrder" },
  { time: 9000, view: "app", action: "showConfirmation" },
  { time: 10500, view: "dashboard", action: null },
  { time: 12000, view: "dashboard", action: "receiveOrder" },
  { time: 13000, view: "dashboard", action: "updateMetrics" },
  { time: 14500, view: "dashboard", action: "prepareOrder" },
  { time: 16000, view: "web", action: "reset" },
]
const CYCLE_DURATION = 16000
const PAUSE_AFTER_INTERACTION = 8000

export function useHeroAutoplay(preferReduced, storyActions) {
  const [isAutoplay, setIsAutoplay] = useState(!preferReduced)
  const [demoPhase, setDemoPhase] = useState(null)
  const timerRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const startTimeRef = useRef(null)
  const stepIndexRef = useRef(0)
  const lastInteractionRef = useRef(0)

  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current)
    clearTimeout(pauseTimeoutRef.current)
    timerRef.current = null
    pauseTimeoutRef.current = null
    startTimeRef.current = null
    stepIndexRef.current = 0
  }, [])

  const scheduleStep = useCallback(
    (startFromZero) => {
      if (preferReduced || !isAutoplay || !storyActions) return

      const now = Date.now()
      const elapsed = startFromZero ? 0 : (now - startTimeRef.current) % CYCLE_DURATION
      const nextStepIdx = TIMELINE.findIndex((s) => s.time > elapsed)

      if (nextStepIdx === -1 || nextStepIdx <= stepIndexRef.current && !startFromZero) {
        stepIndexRef.current = 0
        startTimeRef.current = Date.now()
        const firstStep = TIMELINE[0]
        storyActions.setView(firstStep.view)
        timerRef.current = setTimeout(() => scheduleStep(true), TIMELINE[1].time)
        return
      }

      stepIndexRef.current = nextStepIdx
      const step = TIMELINE[nextStepIdx]
      const delay = step.time - elapsed

      timerRef.current = setTimeout(() => {
        storyActions.setView(step.view)
        executeAction(step.action, storyActions)
        const nextIdx = nextStepIdx + 1
        if (nextIdx < TIMELINE.length) {
          const nextDelay = TIMELINE[nextIdx].time - step.time
          timerRef.current = setTimeout(() => scheduleStep(false), nextDelay)
        } else {
          stepIndexRef.current = 0
          startTimeRef.current = Date.now()
          timerRef.current = setTimeout(() => scheduleStep(true), 500)
        }
      }, delay)
    },
    [preferReduced, isAutoplay, storyActions]
  )

  const goTo = useCallback(
    (view) => {
      clearTimers()
      storyActions?.setView(view)
      lastInteractionRef.current = Date.now()
      if (!preferReduced) {
        setIsAutoplay(false)
        pauseTimeoutRef.current = setTimeout(() => {
          setIsAutoplay(true)
        }, PAUSE_AFTER_INTERACTION)
      }
    },
    [clearTimers, preferReduced, storyActions]
  )

  useEffect(() => {
    if (!isAutoplay || preferReduced || !storyActions) {
      clearTimers()
      return
    }
    startTimeRef.current = Date.now()
    stepIndexRef.current = 0
    scheduleStep(true)
    return clearTimers
  }, [isAutoplay, preferReduced, scheduleStep, clearTimers, storyActions])

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

  return { isAutoplay, demoPhase, setDemoPhase, goTo }
}

function executeAction(action, storyActions) {
  if (!action || !storyActions) return
  switch (action) {
    case "selectCroissant":
      storyActions.selectProduct("croissant-pistacho")
      break
    case "addToCart":
      storyActions.addToCart()
      break
    case "setVariant":
      storyActions.setVariant("extra pistacho")
      break
    case "confirmOrder":
      storyActions.confirmOrder()
      break
    case "receiveOrder":
      storyActions.receiveOrder()
      break
    case "prepareOrder":
      storyActions.prepareOrder()
      break
    case "reset":
      storyActions.setView("web")
      break
    default:
      break
  }
}
