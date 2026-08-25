export default function WebsitePanel({ active }) {
  return (
    <>
      <div className="pg-copy">
        <p className="pg-kicker">01 · Tu web</p>
        <h3>Una web preparada para convertir visitas en clientes.</h3>
        <p>
          Una experiencia única para mostrar, vender y recibir consultas, reservas o
          pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.
        </p>
        <p className="pg-punch">Tu negocio abierto y listo para vender, las 24 horas.</p>
      </div>

      <div className="pg-scene" aria-hidden="true">
        <svg className="pg-wire" viewBox="0 0 600 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pgWireGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7957ff" />
              <stop offset="100%" stopColor="#15cbea" />
            </linearGradient>
          </defs>
          {active && (
            <path d="M430 90 C 500 110, 520 140, 470 165 S 380 190, 330 175" />
          )}
        </svg>

        <div className="pg-web">
          <div className="pg-web__bar">
            <i /><i /><i />
            <span className="pg-web__url">tuinmueble.com/propiedades</span>
          </div>
          <div className="pg-web__body">
            <div className="pg-web__photo">
              <span className="pg-web__price">USD 185.000 · Palermo</span>
            </div>
            <div className="pg-web__side">
              <i className="pg-web__h" />
              <i className="pg-web__h pg-web__h--sub" />
              <div className="pg-web__rows">
                <i style={{ width: "92%" }} />
                <i style={{ width: "78%" }} />
                <i style={{ width: "85%" }} />
              </div>
              <div className="pg-web__cta">Quiero visitarla</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
