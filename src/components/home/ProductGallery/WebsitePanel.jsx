import { useState, useEffect } from "react"

export default function WebsitePanel() {
  const [eventIdx, setEventIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setEventIdx((prev) => (prev + 1) % 2)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-web">
        <div className="sc-web__bar">
          <div className="sc-web__dots"><i /><i /><i /></div>
          <span className="sc-web__url">tuinmueble.com/propiedades</span>
        </div>

        {/* Site header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderBottom: "1px solid rgba(150,165,220,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                background: "linear-gradient(135deg, #7957ff, #15cbea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Space Grotesk'",
              }}
            >
              T
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(220,228,255,0.9)", fontFamily: "'Space Grotesk'" }}>
              Tu Inmueble
            </span>
          </div>
          <div style={{ display: "flex", gap: "14px", fontSize: "10px", color: "rgba(183,192,221,0.6)" }}>
            <span style={{ color: "rgba(220,228,255,0.9)", fontWeight: 500 }}>Propiedades</span>
            <span>Nosotros</span>
            <span>Contacto</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="sc-web__body">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#45e2d5", fontWeight: 600, marginBottom: "6px" }}>
              Palermo · Buenos Aires
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1.15, fontFamily: "'Space Grotesk'", margin: 0, maxWidth: "16ch" }}>
              Encontrá un lugar que se sienta tuyo.
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#a78bff" }}>USD 185.000</span>
              <span style={{ fontSize: "10px", color: "rgba(183,192,221,0.5)" }}>· 3 amb · 78 m²</span>
            </div>
            <div
              className="sc-web__cta animate-pulse"
              style={{ marginTop: "14px", width: "fit-content", height: "30px", padding: "0 16px", fontSize: "10px" }}
            >
              Consultar propiedad
            </div>
          </div>

          <div className="sc-web__photo">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(123,97,255,0.4), rgba(21,203,234,0.2))", zIndex: 0 }} />
            <div style={{ position: "absolute", bottom: "28px", left: "12px", right: "12px", height: "60px", background: "linear-gradient(to top, rgba(3,6,20,0.6), transparent)", zIndex: 1 }} />
            <span className="sc-web__price">USD 185.000 · Palermo</span>
          </div>
        </div>

        {/* Secondary property strip */}
        <div style={{ display: "flex", gap: "10px", padding: "8px 16px", borderTop: "1px solid rgba(150,165,220,0.08)" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", background: "rgba(150,165,220,0.06)", border: "1px solid rgba(150,165,220,0.1)" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "linear-gradient(135deg, rgba(124,108,255,0.2), rgba(32,213,199,0.15))", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(220,228,255,0.85)" }}>Belgrano · USD 210.000</div>
              <div style={{ fontSize: "9px", color: "rgba(183,192,221,0.5)" }}>2 amb · 65 m²</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", background: "rgba(150,165,220,0.06)", border: "1px solid rgba(150,165,220,0.1)" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "linear-gradient(135deg, rgba(255,111,174,0.2), rgba(255,180,94,0.15))", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(220,228,255,0.85)" }}>Recoleta · USD 280.000</div>
              <div style={{ fontSize: "9px", color: "rgba(183,192,221,0.5)" }}>3 amb · 92 m²</div>
            </div>
          </div>
        </div>
      </div>

      {/* External event notifications */}
      <div className="sc-web__notifs">
        {eventIdx === 0 ? (
          <span className="sc-web__notif animate-fade">
            <b>+</b> Nueva consulta recibida
          </span>
        ) : (
          <span className="sc-web__notif animate-fade">
            <b>✓</b> Visita agendada · 16:30
          </span>
        )}
      </div>
    </div>
  )
}
