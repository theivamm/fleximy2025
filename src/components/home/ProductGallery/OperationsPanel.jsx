export default function OperationsPanel() {
  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-ops">
        <div className="sc-ops__board">
          <div className="sc-ops__col">
            <span className="sc-ops__col-head">Nuevo</span>
            <div className="sc-ops__ticket">
              <b>#187 · Mesa 4</b>
              <span>2 cafés · medialunas</span>
            </div>
            <div className="sc-ops__ticket">
              <b>#188 · Delivery</b>
              <span>Capuccino ×2</span>
            </div>
          </div>
          <div className="sc-ops__col">
            <span className="sc-ops__col-head">Preparando</span>
            <div className="sc-ops__ticket amber">
              <b>#185 · Barra</b>
              <span>Laguna + tostado</span>
            </div>
            <div className="sc-ops__ticket">
              <b>#186 · Take away</b>
              <span>Flat white</span>
            </div>
          </div>
          <div className="sc-ops__col">
            <span className="sc-ops__col-head">Listo</span>
            <div className="sc-ops__ticket cyan">
              <b>#184 · Mesa 2</b>
              <span>Servido ✓</span>
            </div>
          </div>
        </div>

        <div className="sc-ops__footer">
          <div className="sc-ops__alert">Stock bajo: granos Brasil</div>
          <div className="sc-ops__meta">
            <span>Martí · Barra</span>
            <span>Turnos hoy 14:00–22:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
