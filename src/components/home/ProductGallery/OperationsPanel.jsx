export default function OperationsPanel({ active }) {
  return (
    <>
      <div className="pg-copy">
        <p className="pg-kicker">03 · Tu operación</p>
        <h3>Todo lo que necesitás para trabajar, en una sola app.</h3>
        <p>
          Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación
          alrededor de cómo funciona tu negocio.
        </p>
        <p className="pg-punch">Menos planillas, menos mensajes sueltos y más orden.</p>
      </div>

      <div className="pg-scene pg-ops" aria-hidden="true">
        <div className="pg-cols">
          <div className="pg-col">
            <span className="pg-col__t">Nuevo</span>
            {active && (
              <>
                <div className="pg-card"><b>#187 · Mesa 4</b><span>2 cafés · medialunas</span></div>
                <div className="pg-card"><b>#188 · Delivery</b><span>Capuccino x2</span></div>
              </>
            )}
          </div>
          <div className="pg-col">
            <span className="pg-col__t">Preparando</span>
            <div className="pg-card amber"><b>#185 · Barra</b><span>Laguna + tostado</span></div>
            {active && (
              <div className="pg-card"><b>#186 · Take away</b><span>Flat white</span></div>
            )}
          </div>
          <div className="pg-col">
            <span className="pg-col__t">Listo</span>
            {active && (
              <div className="pg-card cyan"><b>#184 · Mesa 2</b><span>Servido ✓</span></div>
            )}
          </div>
        </div>

        <div className="pg-opsrow">
          <div className="pg-tables">
            {[...Array(8)].map((_, i) => (
              <i key={i} className={active && (i === 1 || i === 4 || i === 6) ? "busy" : ""} />
            ))}
          </div>
          <div className="pg-sideinfo">
            <span className="pg-alerta">Stock bajo: granos Brasil</span>
            <div className="pg-staff"><span>Martí · Barra</span><span>Rocío · Salon</span></div>
            <div className="pg-staff"><span>Turnos hoy</span><b>14:00–22:00</b></div>
          </div>
        </div>

        {active && <span className="pg-notif">Pedido #184 listo ✓</span>}
      </div>
    </>
  )
}
