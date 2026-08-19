import { useState, useEffect } from "react"

const VARIETIES = [
  {
    id: "altura",
    name: "Altura",
    color: "#B8956A",
    colorDark: "#8B6F47",
    accent: "#D4A574",
    profile: "Frutal · suave",
    intensity: 3,
    price: "$14.200",
    weight: "250g",
    roast: "Tostado medio",
    note: "Notas de caramelo, frutos secos y un final suave.",
  },
  {
    id: "bosque",
    name: "Bosque",
    color: "#2D5A3D",
    colorDark: "#1E3D2A",
    accent: "#4A8B62",
    profile: "Chocolate · intenso",
    intensity: 4,
    price: "$15.600",
    weight: "250g",
    roast: "Tostado medio-alto",
    note: "Cacao amargo, madera y un cuerpo envolvente.",
  },
  {
    id: "nocturno",
    name: "Nocturno",
    color: "#2E1A47",
    colorDark: "#1A0F2E",
    accent: "#6B3FA0",
    profile: "Cacao · especias",
    intensity: 5,
    price: "$16.900",
    weight: "250g",
    roast: "Tostado alto",
    note: "Cacao profundo, canela y un toque de tabaco.",
  },
]

function CoffeeBag({ variety }) {
  return (
    <svg viewBox="0 0 200 280" className="w-full h-full" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
      <defs>
        <linearGradient id={`bag-${variety.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={variety.color} />
          <stop offset="100%" stopColor={variety.colorDark} />
        </linearGradient>
        <linearGradient id="fold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        <linearGradient id="label-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(240,238,234,0.95)" />
        </linearGradient>
      </defs>

      {/* Bag body — rounded pouch */}
      <path
        d="M 40 60 Q 40 45 55 40 L 145 40 Q 160 45 160 60 L 165 230 Q 165 260 130 265 L 70 265 Q 35 260 35 230 Z"
        fill={`url(#bag-${variety.id})`}
      />

      {/* Side shadow */}
      <path
        d="M 145 40 Q 160 45 160 60 L 165 230 Q 165 260 130 265 L 140 265 Q 170 260 170 230 L 170 60 Q 170 42 155 38 Z"
        fill="rgba(0,0,0,0.2)"
      />

      {/* Top fold */}
      <path
        d="M 45 42 L 155 42 Q 158 38 155 34 L 45 34 Q 42 38 45 42 Z"
        fill="url(#fold)"
      />
      <line x1="48" y1="38" x2="152" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* Heat seal top */}
      <rect x="50" y="28" width="100" height="8" rx="2" fill="rgba(0,0,0,0.25)" />
      <line x1="55" y1="30" x2="55" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="65" y1="30" x2="65" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="75" y1="30" x2="75" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="85" y1="30" x2="85" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="95" y1="30" x2="95" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="105" y1="30" x2="105" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="115" y1="30" x2="115" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="125" y1="30" x2="125" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="135" y1="30" x2="135" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="145" y1="30" x2="145" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Label background */}
      <rect x="52" y="95" width="96" height="140" rx="4" fill="url(#label-bg)" />

      {/* Label inner border */}
      <rect x="56" y="99" width="88" height="132" rx="2" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />

      {/* N isotipo */}
      <circle cx="100" cy="120" r="14" fill="none" stroke={variety.colorDark} strokeWidth="1.5" />
      <text x="100" y="124" textAnchor="middle" fill={variety.colorDark} fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
        N
      </text>

      {/* Variety name */}
      <text x="100" y="148" textAnchor="middle" fill="#1a1a2a" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif" letterSpacing="0.05em">
        {variety.name.toUpperCase()}
      </text>

      {/* Roast */}
      <text x="100" y="162" textAnchor="middle" fill="#666" fontSize="7.5" fontFamily="Inter, sans-serif">
        {variety.roast}
      </text>

      {/* Divider */}
      <line x1="70" y1="170" x2="130" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />

      {/* Weight */}
      <text x="100" y="183" textAnchor="middle" fill="#1a1a2a" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">
        {variety.weight} neto
      </text>

      {/* Intensity dots */}
      <g transform="translate(100, 198)">
        {[1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={(i - 3) * 10}
            r="3"
            fill={i <= variety.intensity ? variety.colorDark : "rgba(0,0,0,0.1)"}
          />
        ))}
      </g>

      {/* Bottom of label */}
      <text x="100" y="222" textAnchor="middle" fill="#999" fontSize="6" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
        ORIGEN · ARGENTINA
      </text>

      {/* Highlight / fold line */}
      <line x1="55" y1="80" x2="55" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="145" y1="80" x2="145" y2="250" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* Ground shadow */}
      <ellipse cx="100" cy="272" rx="55" ry="6" fill="rgba(0,0,0,0.3)" />
    </svg>
  )
}

export default function WebExperience({ isInteractive }) {
  const [selected, setSelected] = useState("altura")
  const [cartCount, setCartCount] = useState(1)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => setSelected("bosque"), 1500)
    const t2 = setTimeout(() => setCartCount(2), 2500)
    const t3 = setTimeout(() => setToast("Bosque agregado a tu pedido"), 2800)
    const t4 = setTimeout(() => setToast(null), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInteractive])

  const current = VARIETIES.find((v) => v.id === selected)

  return (
    <div className="w-full h-full flex flex-col text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif", background: "#0d0f1a" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{ padding: "10px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-6">
          <span
            className="font-display font-bold tracking-tight text-white"
            style={{ fontSize: "15px" }}
          >
            NÓMADA
          </span>
          <nav className="hidden sm:flex items-center gap-5" style={{ fontSize: "12px", color: "#8a8a8a" }}>
            <span className="text-white cursor-default">Café</span>
            <span className="cursor-default">Suscripción</span>
            <span className="cursor-default">Locales</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8a8a8a]">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#7957ff] text-[9px] font-bold text-white px-1">
              {cartCount}
            </span>
          </div>
        </div>
      </header>

      {/* Hero section — two columns */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: copy */}
        <div
          className="flex flex-col justify-center min-w-0"
          style={{ flex: "0 0 45%", padding: "clamp(20px, 3vw, 40px)" }}
        >
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#7957ff",
              marginBottom: "8px",
            }}
          >
            Café de origen
          </p>
          <h2
            className="font-display font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", maxWidth: "20ch" }}
          >
            Café tostado para tu ritmo.
          </h2>
          <p
            className="mt-3 leading-relaxed"
            style={{ fontSize: "13px", color: "#8a8a8a", maxWidth: "34ch" }}
          >
            Granos seleccionados de fincas directas, tostados en pequeños lotes para preservar cada nota.
          </p>
          <button
            className="mt-5 self-start px-6 py-2.5 rounded-lg text-[12px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7957ff, #5268ff)" }}
          >
            Elegir mi café
          </button>
        </div>

        {/* Right: product display */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Ambient color shift */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${current.color}15, transparent 70%)`,
            }}
          />

          <div
            className="relative z-10"
            key={selected}
            style={{ width: "clamp(140px, 16vw, 190px)", aspectRatio: "200/280" }}
          >
            <CoffeeBag variety={current} />
          </div>

          <p
            className="mt-2 font-medium"
            style={{ fontSize: "11px", color: current.accent || "#45e2d5" }}
          >
            {current.note}
          </p>
        </div>
      </div>

      {/* Bottom variety cards */}
      <div className="shrink-0" style={{ padding: "12px 20px 14px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex gap-2">
          {VARIETIES.map((v) => (
            <button
              key={v.id}
              onClick={() => isInteractive && setSelected(v.id)}
              className="flex-1 rounded-lg transition-all text-left"
              style={{
                padding: "10px 12px",
                fontSize: "11px",
                background: selected === v.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                border: selected === v.id ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                color: selected === v.id ? "#fff" : "#6a6a6a",
                cursor: isInteractive ? "pointer" : "default",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: v.color }}
                />
                <span className="font-semibold" style={{ fontSize: "12px" }}>{v.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "10px" }}>{v.profile}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: i <= v.intensity ? (selected === v.id ? "#fff" : v.accent) : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
              </div>
              <span
                className="block mt-1 font-semibold"
                style={{ fontSize: "12px", color: selected === v.id ? "#fff" : "#8a8a8a" }}
              >
                {v.price}
              </span>
            </button>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "9px", color: "#5a5a5a", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            Tostado esta semana · Envío 24–48 h · Suscripción flexible
          </span>
          <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg"
          style={{
            background: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "11px",
            color: "#fff",
            animation: "fade-up 0.3s ease",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
