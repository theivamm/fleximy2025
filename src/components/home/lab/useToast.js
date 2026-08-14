import { useEffect, useRef, useState } from "react"

/**
 * Notificación efímera con auto-limpieza. Al desmontar (o cambiar de
 * industria) cancela el timer pendiente para no tocar estado muerto.
 */
export function useToast(duration = 2600) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    []
  )

  const show = (msg) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setToast(msg)
    timerRef.current = window.setTimeout(() => {
      setToast(null)
      timerRef.current = null
    }, duration)
  }

  const dismiss = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = null
    setToast(null)
  }

  return [toast, show, dismiss]
}
