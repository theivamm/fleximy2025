import { useState, useEffect } from "react"

export default function ClientsPanel({ active }) {
  const [showMsg1, setShowMsg1] = useState(false)
  const [showMsg2, setShowMsg2] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setShowMsg1(true), 1200)
    const t2 = setTimeout(() => setShowMsg2(true), 2400)
    const t3 = setTimeout(() => setShowStatus(true), 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [active])

  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-inbox">
        {/* Contact list */}
        <div className="sc-inbox__list">
          <div className="sc-inbox__list-head">Consultas</div>
          <div className={`sc-inbox__contact${active ? " active" : ""}`}>
            <span className="sc-inbox__ava">LM</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Laura M.</div>
              <div className="sc-inbox__contact-src">WhatsApp · 11:42</div>
            </div>
          </div>
          <div className="sc-inbox__contact">
            <span className="sc-inbox__ava" style={{ background: "linear-gradient(135deg, #20d5c7, #4d8dff)" }}>JP</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Juan P.</div>
              <div className="sc-inbox__contact-src">Formulario web · 10:15</div>
            </div>
          </div>
          <div className="sc-inbox__contact">
            <span className="sc-inbox__ava" style={{ background: "linear-gradient(135deg, #ff6fae, #ffb45e)" }}>CS</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Carina S.</div>
              <div className="sc-inbox__contact-src">Reserva online · 09:30</div>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="sc-inbox__chat">
          <div className="sc-inbox__chat-head">
            <span className="sc-inbox__chat-name">Juan P.</span>
            <span className="sc-inbox__chat-channel">vía formulario web</span>
          </div>

          {showMsg1 && (
            <div className="sc-inbox__msg incoming animate-fade">
              <span className="sc-inbox__bubble">Hola, ¿tienen disponibilidad para el sábado?</span>
            </div>
          )}

          {showMsg2 && (
            <div className="sc-inbox__msg outgoing animate-fade">
              <span className="sc-inbox__bubble">¡Sí! Tenemos turno a las 10:00 y a las 11:30.</span>
            </div>
          )}

          <div className="sc-inbox__meta">
            <span className="sc-inbox__meta-tag">Interés: turno</span>
            <span className="sc-inbox__meta-tag">Sábado</span>
          </div>

          <div className="sc-inbox__actions">
            <span className="sc-inbox__btn">Agendar turno</span>
            {showStatus ? (
              <span className="sc-inbox__status animate-fade">En seguimiento</span>
            ) : (
              <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Pendiente</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
