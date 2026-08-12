import { useEffect, useRef, useState } from "react"

/**
 * Palabras alternantes con máscara vertical, blur y desplazamiento.
 * Ancho y alto estables (sin layout shift): un span invisible reserva el
 * ancho de la palabra más larga. Frase estática para lectores de pantalla y
 * estado final con prefers-reduced-motion.
 */
export default function AnimatedWords({
  words = [],
  interval = 3200,
  className = "",
  staticLabel = "",
}) {
  const reduced = useRef(false)
  if (typeof window !== "undefined" && !reduced.current) {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced.current || words.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "")

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span className="sr-only">{staticLabel || words.join(" / ")}</span>
      <span aria-hidden="true" className="word-mask">
        <span className="invisible whitespace-nowrap">{longest}</span>
        {words.map((w, i) => (
          <span
            key={w}
            className={`word-item ${reduced.current ? "is-in" : i === index ? "is-in" : "is-out"}`}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  )
}
