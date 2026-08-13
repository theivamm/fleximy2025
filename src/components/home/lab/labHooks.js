import { useEffect, useState } from "react"

/**
 * Devuelve el ancho real (px) del contenedor de la escena para escalar la
 * tipografía con unidades `em` y mantener densidad y proporción sin scale().
 */
export function useContainerWidth(ref) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setWidth(el.getBoundingClientRect().width)
    measure()
    if (typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return width
}

/**
 * Escala tipográfica del laboratorio: 1.35% del ancho, entre 9.5px y 18.5px.
 * A 1360px -> ~18.4px; a 360px -> ~9.7px (la composición compacta compensa).
 */
export function emScale(width) {
  if (!width) return 14
  return Math.min(Math.max(width * 0.0135, 9.5), 18.5)
}
