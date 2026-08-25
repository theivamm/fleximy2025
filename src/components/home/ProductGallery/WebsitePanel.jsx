export default function WebsitePanel() {
  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-web">
        <div className="sc-web__bar">
          <div className="sc-web__dots"><i /><i /><i /></div>
          <span className="sc-web__url">tuinmueble.com/propiedades</span>
        </div>
        <div className="sc-web__body">
          <div className="sc-web__photo">
            <span className="sc-web__price">USD 185.000 · Palermo</span>
          </div>
          <div className="sc-web__side">
            <i className="sc-web__h" />
            <i className="sc-web__h sc-web__h--sub" />
            <div className="sc-web__rows">
              <i style={{ width: "92%" }} />
              <i style={{ width: "78%" }} />
              <i style={{ width: "85%" }} />
            </div>
            <div className="sc-web__cta">Consultar propiedad</div>
          </div>
        </div>
      </div>

      <div className="sc-web__notifs">
        <span className="sc-web__notif">Nueva consulta recibida</span>
        <span className="sc-web__notif">Visita agendada · 16:30</span>
      </div>
    </div>
  )
}
