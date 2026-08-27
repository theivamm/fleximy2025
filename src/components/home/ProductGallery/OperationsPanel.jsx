import { useState, useEffect } from "react"

export default function OperationsPanel() {
  const [movingTicket, setMovingTicket] = useState(null)

  useEffect(() => {
    const t1 = setTimeout(() => setMovingTicket("#188"), 2000)
    const t2 = setTimeout(() => setMovingTicket("#188-prep"), 5000)
    const t3 = setTimeout(() => setMovingTicket("#188-done"), 8000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-ops">
        <div className="sc-ops__board">
          {/* Nuevo */}
          <div className="sc-ops__col">
            <span className="sc-ops__col-head sc-ops__col-head--violet">Nuevo</span>
            <div className="sc-ops__ticket">
              <b>#187 · Mesa 4</b>
              <span>2 cafés · medialunas</span>
            </div>
            {movingTicket !== "#188" && movingTicket !== "#188-prep" && movingTicket !== "#188-done" && (
              <div className="sc-ops__ticket animate-move">
                <b>#188 · Delivery</b>
                <span>Capuccino ×2</span>
              </div>
            )}
          </div>

          {/* Preparando */}
          <div className="sc-ops__col">
            <span className="sc-ops__col-head sc-ops__col-head--amber">Preparando</span>
            <div className="sc-ops__ticket amber">
              <b>#185 · Barra</b>
              <span>Laguna + tostado</span>
            </div>
            <div className="sc-ops__ticket">
              <b>#186 · Take away</b>
              <span>Flat white</span>
            </div>
            {(movingTicket === "#188" || movingTicket === "#188-prep") && (
              <div className="sc-ops__ticket amber animate-move">
                <b>#188 · Delivery</b>
                <span>Capuccino ×2</span>
              </div>
            )}
          </div>

          {/* Listo */}
          <div className="sc-ops__col">
            <span className="sc-ops__col-head sc-ops__col-head--cyan">Listo</span>
            <div className="sc-ops__ticket cyan">
              <b>#184 · Mesa 2</b>
              <span>Servido ✓</span>
            </div>
            {movingTicket === "#188-done" && (
              <div className="sc-ops__ticket cyan animate-move">
                <b>#188 · Delivery</b>
                <span>En camino ✓</span>
              </div>
            )}
          </div>
        </div>

        <div className="sc-ops__footer">
          <div className="sc-ops__alert">Stock bajo: granos Brasil</div>
          <div className="sc-ops__meta">
            <span>Martí · Barra</span>
            <span>14:00–22:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
