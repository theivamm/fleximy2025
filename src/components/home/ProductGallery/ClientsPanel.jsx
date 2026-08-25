const MSGS = [
  { ini: "LM", name: "Laura M.", src: "WhatsApp", live: false },
  { ini: "JP", name: "Juan P.", src: "Formulario web", live: true },
  { ini: "CS", name: "Carina S.", src: "Reserva online", live: false },
]

export default function ClientsPanel({ active }) {
  return (
    <>
      <div className="pg-copy">
        <p className="pg-kicker">02 · Tus clientes</p>
        <h3>Cada consulta se convierte en una oportunidad.</h3>
        <p>
          WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el
          historial completo de cada cliente.
        </p>
        <p className="pg-punch">Ninguna consulta olvidada. Ninguna oportunidad perdida.</p>
      </div>

      <div className="pg-scene" aria-hidden="true">
        <div className="pg-inbox">
          {MSGS.map((m) => (
            <div key={m.name} className={`pg-msg ${m.live && active ? "is-live" : ""}`}>
              <span className="pg-ava">{m.ini}</span>
              <div className="pg-msg__meta">
                <div className="pg-msg__name">{m.name}</div>
                <div className="pg-msg__src">vía {m.src}</div>
              </div>
              <span className={`pg-chipst ${m.live ? (active ? "seg" : "nueva") : ""}`}>
                {!m.live ? "En seguimiento" : active ? "En seguimiento" : "Nueva"}
              </span>
            </div>
          ))}

          <p className="pg-quote">&ldquo;¿Tienen turno para hoy?&rdquo;</p>

          <div className="pg-cal">
            <div className="pg-cal__grid">
              {[...Array(10)].map((_, i) => (
                <i key={i} className={active && i === 7 ? "hit" : ""} />
              ))}
            </div>
            <span className="pg-cal__time">16:30 ✓</span>
          </div>
        </div>
      </div>
    </>
  )
}
