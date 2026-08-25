import { useEffect, useState } from "react"

const STAGES = ["ENTENDER", "DISEÑAR", "CREAR"]

export default function FleximyCore({ active, reducedMotion, finePointer }) {
  const [idx, setIdx] = useState(reducedMotion ? 2 : 0)

  useEffect(() => {
    if (!active || reducedMotion) return
    let i = 0
    let interval = null
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i = (i + 1) % STAGES.length
        setIdx(i)
      }, 2600)
    }, 1400)
    return () => {
      clearTimeout(start)
      if (interval) clearInterval(interval)
    }
  }, [active, reducedMotion])

  return (
    <div className="m3p-corezone">
      <div
        className="m3p-core"
        role="img"
        aria-label={`Fleximy: proceso de ${STAGES.join(", ").toLowerCase()}`}
      >
        <span className={`m3p-ring m3p-ring--1 ${finePointer && !reducedMotion ? "parallax" : ""}`} aria-hidden="true" />
        <span className={`m3p-ring m3p-ring--2 ${finePointer && !reducedMotion ? "parallax" : ""}`} aria-hidden="true" />
        <span className={`m3p-ring m3p-ring--3 ${finePointer && !reducedMotion ? "parallax" : ""}`} aria-hidden="true" />

        <svg className="m3p-beam" viewBox="0 0 320 40" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="m3pBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#765dff" stopOpacity="0" />
              <stop offset="45%" stopColor="#4d7dff" stopOpacity=".55" />
              <stop offset="55%" stopColor="#18d6d2" stopOpacity=".6" />
              <stop offset="100%" stopColor="#18d6d2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="16" width="320" height="8" rx="4" fill="url(#m3pBeam)" />
        </svg>

        {STAGES.map((s, i) => (
          <span
            key={s}
            className={`m3p-corelabel m3p-corelabel--${i + 1} ${i === idx ? "is-on" : ""}`}
            aria-hidden="true"
          >
            {s}
          </span>
        ))}

        <span className="m3p-f font-display" aria-hidden="true">F</span>
        <span key={idx} className={`m3p-stage ${reducedMotion || !active ? "" : "swap"}`}>
          {STAGES[idx]}
        </span>
      </div>
    </div>
  )
}
