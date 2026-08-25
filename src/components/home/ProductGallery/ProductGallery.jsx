import { useEffect, useRef, useState } from "react"
import WebsitePanel from "./WebsitePanel"
import ClientsPanel from "./ClientsPanel"
import OperationsPanel from "./OperationsPanel"
import InsightsPanel from "./InsightsPanel"
import "./product-gallery.css"

export default function ProductGallery() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="que-hacemos" ref={ref} className="pg">
      <header className="pg-header container">
        <p className="pg-eyebrow">Website + App de gestión</p>
        <h2 className="pg-title font-display">
          Una web por fuera.
          <br />
          <span
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Todo tu negocio por dentro.
          </span>
        </h2>
        <p className="pg-bajada">
          Creamos tu website completo y una aplicación de gestión a medida para vender,
          administrar clientes y manejar la operación desde un solo lugar.
        </p>
        <p className="pg-remate">Tecnología a medida, al alcance de tu negocio.</p>
      </header>

      <div className="pg-grid container">
        <div className="pg-panel pg-panel--01">
          <WebsitePanel active={inView} />
        </div>
        <div className="pg-panel pg-panel--02">
          <ClientsPanel active={inView} />
        </div>
        <div className="pg-panel pg-panel--03">
          <OperationsPanel active={inView} />
        </div>
        <div className="pg-panel pg-panel--04">
          <InsightsPanel active={inView} />
        </div>
      </div>
    </section>
  )
}
