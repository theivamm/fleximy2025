export default function ClientsPanel({ active }) {
  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-inbox">
        {/* Contact list */}
        <div className="sc-inbox__list">
          <div className="sc-inbox__list-head">Bandeja</div>
          <div className={`sc-inbox__contact${active ? " active" : ""}`}>
            <span className="sc-inbox__ava">LM</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Laura M.</div>
              <div className="sc-inbox__contact-src">WhatsApp</div>
            </div>
          </div>
          <div className="sc-inbox__contact">
            <span className="sc-inbox__ava" style={{ background: "linear-gradient(135deg, #20d5c7, #4d8dff)" }}>JP</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Juan P.</div>
              <div className="sc-inbox__contact-src">Formulario web</div>
            </div>
          </div>
          <div className="sc-inbox__contact">
            <span className="sc-inbox__ava" style={{ background: "linear-gradient(135deg, #ff6fae, #ffb45e)" }}>CS</span>
            <div className="sc-inbox__contact-info">
              <div className="sc-inbox__contact-name">Carina S.</div>
              <div className="sc-inbox__contact-src">Reserva online</div>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="sc-inbox__chat">
          <div className="sc-inbox__chat-head">
            <span className="sc-inbox__chat-name">Juan P.</span>
            <span className="sc-inbox__chat-channel">vía formulario web</span>
          </div>

          <div className="sc-inbox__msg incoming">
            <span className="sc-inbox__bubble">Hola, ¿tienen disponibilidad para el sábado?</span>
          </div>

          <div className="sc-inbox__msg outgoing">
            <span className="sc-inbox__bubble">¡Sí! Tenemos turno a las 10:00 y a las 11:30.</span>
          </div>

          <div className="sc-inbox__actions">
            <span className="sc-inbox__btn">Agendar turno</span>
            <span className="sc-inbox__status">En seguimiento</span>
          </div>
        </div>
      </div>
    </div>
  )
}
