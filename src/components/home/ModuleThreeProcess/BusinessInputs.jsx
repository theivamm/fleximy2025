import { useEffect, useState } from "react"

const WORDS = [
  { label: "clientes", top: "6%", left: "4%", size: 1.05, weight: 700, o: 1, d: "0s" },
  { label: "pedidos", top: "26%", left: "30%", size: 0.85, weight: 600, o: 0.8, d: ".9s" },
  { label: "equipo", top: "52%", left: "10%", size: 1.15, weight: 800, o: 1, d: "1.7s" },
  { label: "stock", top: "74%", left: "38%", size: 0.78, weight: 600, o: 0.66, d: "2.4s" },
  { label: "turnos", top: "88%", left: "6%", size: 0.9, weight: 600, o: 0.75, d: "3.1s" },
  { label: "ventas", top: "12%", left: "58%", size: 0.95, weight: 700, o: 0.9, d: "3.8s" },
  { label: "tareas", top: "40%", left: "52%", size: 0.8, weight: 500, o: 0.6, d: "4.5s" },
  { label: "consultas", top: "64%", left: "62%", size: 0.88, weight: 600, o: 0.72, d: "5.2s" },
]

const TRAVELERS = [
  { label: "clientes", top: "18%", d: "0s" },
  { label: "equipo", top: "48%", d: "3s" },
  { label: "ventas", top: "76%", d: "6s" },
]

const PHRASES = [
    "\u201CEsto hoy lo hacemos por WhatsApp\u201D",
    "\u201CAcá necesitamos más orden\u201D",
    "\u201CQuiero ver las ventas\u201D",
]

export default function BusinessInputs({ active, reducedMotion }) {
  const [phraseIdx, setPhraseIdx] = useState(-1)
  const showPhrases = active && !reducedMotion

  useEffect(() => {
    if (!showPhrases) return
    let i = 0
    setPhraseIdx(0)
    const id = setInterval(() => {
      i = (i + 1) % PHRASES.length
      setPhraseIdx(i)
    }, 3400)
    return () => clearInterval(id)
  }, [showPhrases])

  return (
    <div className="m3p-inputs">
      <span className="m3p-zone-label">Tu negocio</span>

      <div className="m3p-wordfield" aria-hidden={reducedMotion ? undefined : "true"}>
        {WORDS.map((w) => (
          <span
            key={w.label}
            className={`m3p-word ${active && !reducedMotion ? "" : "is-still"}`}
            style={{
              top: w.top,
              left: w.left,
              fontSize: `${w.size * 17}px`,
              fontWeight: w.weight,
              opacity: w.o,
              "--d": w.d,
            }}
          >
            {w.label}
          </span>
        ))}
      </div>

      {!reducedMotion && (
        <div className="m3p-travelers" aria-hidden="true">
          {TRAVELERS.map((t) => (
            <span key={t.label} className={`m3p-traveler ${active ? "" : "is-still"}`} style={{ top: t.top, "--d": t.d }}>
              {t.label}
            </span>
          ))}
        </div>
      )}

      <p key={phraseIdx} className={`m3p-phrase ${phraseIdx >= 0 ? "on" : ""}`} aria-live="polite">
        {phraseIdx >= 0 || reducedMotion ? PHRASES[Math.max(phraseIdx, 0)] : ""}
      </p>
    </div>
  )
}
