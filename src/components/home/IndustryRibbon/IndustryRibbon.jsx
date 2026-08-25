import { useRef, useEffect, useState } from "react"
import "./industry-ribbon.css"

const RIBBONS = [
  { text: "GASTRONOMÍA · INMOBILIARIAS · ÓPTICAS · COMERCIO · SERVICIOS · LOGÍSTICA · EDUCACIÓN · FITNESS", fill: [1, 3, 6], speed: 28 },
  { text: "TURNOS · PEDIDOS · CLIENTES · STOCK · EQUIPOS · PROYECTOS · RESERVAS · FACTURACIÓN", fill: [0, 4, 7], speed: 34 },
  { text: "WEBSITE · APP DE GESTIÓN · DASHBOARD · SOPORTE · CRECIMIENTO · AUTOMATIZACIÓN", fill: [2, 5], speed: 24 },
]

function RibbonRow({ text, fill, speed, idx }) {
  const words = text.split(" · ")
  const items = words.flatMap((w, i) => {
    const els = [
      <span key={`w-${i}`} className={`rib-word ${fill.includes(i) ? "rib-fill" : ""}`}>{w}</span>,
    ]
    if (i < words.length - 1) {
      els.push(<span key={`d-${i}`} className="rib-dot">·</span>)
    }
    return els
  })

  const track = <span className="rib-track">{items}</span>

  return (
    <div className="rib-row" aria-hidden="true">
      {track}
      {track}
      <style>{`.rib-row:nth-child(${idx + 1}) .rib-track{animation-duration:${speed}s}`}</style>
    </div>
  )
}

export default function IndustryRibbon() {
  const ref = useRef(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "80px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="rubros" ref={ref} className="rib">
      <header className="rib-header container">
        <p className="rib-eyebrow">Una plataforma distinta para cada negocio</p>
        <h2 className="rib-title font-display">
          Si tu negocio funciona distinto, su tecnología también debería hacerlo.
        </h2>
        <p className="rib-bajada">
          Diseñamos cada plataforma alrededor de sus clientes, sus procesos y su forma de trabajar.
        </p>
      </header>

      <div className={`rib-ribbons ${active ? "" : "is-paused"}`} aria-hidden="true">
        {RIBBONS.map((r, i) => (
          <RibbonRow key={r.text} {...r} idx={i} />
        ))}
      </div>

      <div className="rib-closing container">
        <h3 className="font-display">No importa el rubro. Importa cómo funciona tu negocio.</h3>
        <p className="rib-sub">Contanos tu caso y diseñamos una solución alrededor de él.</p>
      </div>
    </section>
  )
}
