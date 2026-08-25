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
        <div className="pg-card pg-card--01">
          <div className="pg-card__copy">
            <p className="pg-card__index">01 · Tu web</p>
            <h3>Una web preparada para convertir visitas en clientes.</h3>
            <p className="pg-card__description">
              Una experiencia única para mostrar, vender y recibir consultas, reservas o
              pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.
            </p>
            <span className="pg-card__benefit">Tu negocio abierto y listo para vender, las 24 horas.</span>
          </div>
          <WebsitePanel />
        </div>

        <div className="pg-card pg-card--02">
          <div className="pg-card__copy">
            <p className="pg-card__index">02 · Tus clientes</p>
            <h3>Cada consulta se convierte en una oportunidad.</h3>
            <p className="pg-card__description">
              WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el
              historial completo de cada cliente.
            </p>
            <span className="pg-card__benefit">Ninguna consulta olvidada. Ninguna oportunidad perdida.</span>
          </div>
          <ClientsPanel active={inView} />
        </div>

        <div className="pg-card pg-card--03">
          <div className="pg-card__copy">
            <p className="pg-card__index">03 · Tu operación</p>
            <h3>Todo lo que necesitás para trabajar, en una sola app.</h3>
            <p className="pg-card__description">
              Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación
              alrededor de cómo funciona tu negocio.
            </p>
            <span className="pg-card__benefit">Menos planillas, menos mensajes sueltos y más orden.</span>
          </div>
          <OperationsPanel />
        </div>

        <div className="pg-card pg-card--04">
          <div className="pg-card__copy">
            <p className="pg-card__index">04 · Tus números</p>
            <h3>Mirá cómo funciona tu negocio, sin armar reportes.</h3>
            <p className="pg-card__description">
              Ventas, clientes, productos y tareas importantes reunidos en un dashboard
              claro para decidir mejor.
            </p>
            <span className="pg-card__benefit">La información importante, lista para usar.</span>
          </div>
          <InsightsPanel />
        </div>
      </div>
    </section>
  )
}
