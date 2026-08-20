import { useState, useEffect } from "react"
import { BRUMA_PRODUCTS } from "../data/brumaData"

const PALETTE = {
  crema: "#F3EBDD",
  espresso: "#241712",
  salvia: "#A8B89A",
  pistacho: "#C7D86D",
  coral: "#E47B62",
  tinta: "#171717",
}

export default function WebExperience({ isInteractive, story }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [toast, setToast] = useState(null)

  const featured = BRUMA_PRODUCTS[0]

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => setSelectedIdx(0), 1500)
    const t2 = setTimeout(() => {
      story?.addToCart()
      setToast("Agregado a tu pedido")
    }, 4000)
    const t4 = setTimeout(() => setToast(null), 5500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInteractive, story])

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: PALETTE.crema, color: PALETTE.tinta }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{ padding: "10px 20px", borderBottom: `1px solid ${PALETTE.espresso}12` }}
      >
        <div className="flex items-center gap-6">
          <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            BRUMA
          </span>
          <nav className="hidden sm:flex items-center gap-5" style={{ fontSize: "12px", color: `${PALETTE.espresso}99` }}>
            <span style={{ color: PALETTE.espresso, fontWeight: 500 }}>Menú</span>
            <span>Locales</span>
            <span>Nosotros</span>
          </nav>
        </div>
        <button
          className="rounded-lg text-[12px] font-semibold text-white"
          style={{ padding: "6px 16px", background: PALETTE.espresso }}
        >
          Pedir ahora
        </button>
      </header>

      {/* Hero section — two columns */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Left: copy */}
        <div
          className="flex flex-col justify-center min-w-0 shrink-0"
          style={{ flex: "0 0 48%", padding: "clamp(20px, 3vw, 40px)" }}
        >
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: PALETTE.coral,
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            Horneado hoy · Buenos Aires
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              lineHeight: 1.05,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: PALETTE.espresso,
              maxWidth: "18ch",
            }}
          >
            Algo rico está por pasar.
          </h2>
          <p style={{ fontSize: "13px", color: `${PALETTE.espresso}aa`, marginTop: "10px", lineHeight: 1.5, maxWidth: "32ch" }}>
            Café de especialidad, cocina simple y pastelería hecha cada mañana.
          </p>
          <button
            className="mt-5 self-start rounded-lg text-[12px] font-semibold text-white"
            style={{ padding: "8px 20px", background: PALETTE.espresso }}
          >
            Explorar el menú
          </button>
        </div>

        {/* Right: product display */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Image placeholder area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "clamp(160px, 22vw, 240px)",
              aspectRatio: "1",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${PALETTE.pistacho}30, ${PALETTE.salvia}20, transparent 70%)`,
            }}
          >
            {/* SVG Croissant */}
            <svg viewBox="0 0 120 80" style={{ width: "80%", height: "auto" }}>
              <defs>
                <linearGradient id="croissant-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={PALETTE.coral} />
                  <stop offset="50%" stopColor="#D4956B" />
                  <stop offset="100%" stopColor="#B8845A" />
                </linearGradient>
              </defs>
              {/* Croissant shape */}
              <path
                d="M 15 55 Q 10 40 20 28 Q 30 16 45 14 Q 55 12 60 16 Q 65 12 75 14 Q 90 16 100 28 Q 110 40 105 55 Q 100 65 80 68 Q 60 72 40 68 Q 20 65 15 55 Z"
                fill="url(#croissant-grad)"
              />
              {/* Score lines */}
              <path d="M 30 30 Q 45 22 55 30" fill="none" stroke={PALETTE.espresso} strokeWidth="0.8" opacity="0.3" />
              <path d="M 50 26 Q 60 20 70 26" fill="none" stroke={PALETTE.espresso} strokeWidth="0.8" opacity="0.3" />
              <path d="M 65 28 Q 75 22 85 30" fill="none" stroke={PALETTE.espresso} strokeWidth="0.8" opacity="0.3" />
              {/* Pistachio dots */}
              <circle cx="45" cy="40" r="2" fill={PALETTE.pistacho} opacity="0.7" />
              <circle cx="55" cy="38" r="1.5" fill={PALETTE.pistacho} opacity="0.6" />
              <circle cx="65" cy="42" r="2" fill={PALETTE.pistacho} opacity="0.7" />
              <circle cx="50" cy="46" r="1.5" fill={PALETTE.pistacho} opacity="0.5" />
              <circle cx="70" cy="48" r="1.5" fill={PALETTE.pistacho} opacity="0.6" />
            </svg>

            {/* Floating label */}
            <div
              className="absolute -right-2 bottom-4 rounded-lg px-3 py-1.5"
              style={{
                background: "white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <span style={{ color: PALETTE.espresso }}>{featured.name}</span>
              <span className="block" style={{ fontSize: "10px", color: `${PALETTE.espresso}88` }}>{featured.price}</span>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: PALETTE.salvia, marginTop: "8px", fontWeight: 500 }}>
            {featured.description}
          </p>
        </div>
      </div>

      {/* Bottom product carousel */}
      <div className="shrink-0" style={{ padding: "12px 20px 14px", borderTop: `1px solid ${PALETTE.espresso}10` }}>
        <div className="flex gap-2 overflow-x-auto">
          {BRUMA_PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => isInteractive && setSelectedIdx(i)}
              className="shrink-0 rounded-lg text-left transition-all"
              style={{
                padding: "10px 14px",
                minWidth: "130px",
                background: selectedIdx === i ? PALETTE.espresso : `${PALETTE.espresso}08`,
                color: selectedIdx === i ? PALETTE.crema : PALETTE.espresso,
                border: `1px solid ${selectedIdx === i ? PALETTE.espresso : "transparent"}`,
              }}
            >
              <span style={{ fontSize: "18px", display: "block", marginBottom: "4px" }}>{p.emoji}</span>
              <span className="block" style={{ fontSize: "12px", fontWeight: 600 }}>{p.name}</span>
              <span className="block" style={{ fontSize: "11px", opacity: 0.7, marginTop: "2px" }}>{p.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg"
          style={{
            background: PALETTE.espresso,
            color: PALETTE.crema,
            fontSize: "11px",
            animation: "fade-up 0.3s ease",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
