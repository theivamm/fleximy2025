import { useState, useEffect } from "react"

const VARIETIES = [
  { id: "altura", name: "Altura", color: "#8B6F47", intensity: 3, price: "$4.200", note: "Notas de cacao y avellana" },
  { id: "bosque", name: "Bosque", color: "#2D5A3D", intensity: 4, price: "$4.800", note: "Notas amaderadas y especiadas" },
  { id: "nocturno", name: "Nocturno", color: "#1a1a2e", intensity: 5, price: "$5.100", note: "Intenso, notas de tabaco" },
]

export default function WebExperience({ isInteractive }) {
  const [selected, setSelected] = useState("altura")
  const [cartCount, setCartCount] = useState(1)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => setSelected("bosque"), 1500)
    const t2 = setTimeout(() => setCartCount(2), 2500)
    const t3 = setTimeout(() => setToast("Bosque agregado al pedido"), 2800)
    const t4 = setTimeout(() => setToast(null), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInteractive])

  const current = VARIETIES.find((v) => v.id === selected)

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0f1a] text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-5">
          <span className="font-display text-sm font-bold tracking-tight text-white">NOMADA</span>
          <nav className="hidden sm:flex items-center gap-4 text-[11px] text-[#8a8a8a]">
            <span className="text-white">Cafe</span>
            <span>Suscripcion</span>
            <span>Locales</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8a8a8a]">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-1 -right-1.5 min-w-[14px] h-3.5 flex items-center justify-center rounded-full bg-[#7957ff] text-[8px] font-bold text-white px-1">
              {cartCount}
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-5 overflow-hidden">
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="text-[10px] font-mono tracking-widest text-[#7957ff] uppercase mb-2">Cafe de origen</p>
          <h2 className="font-display text-[22px] sm:text-[28px] font-bold leading-[1.05] tracking-tight text-white max-w-[28ch]">
            Cafe de origen, tostado para tu ritmo.
          </h2>
          <p className="text-[11px] text-[#8a8a8a] mt-2 max-w-[38ch] leading-relaxed">
            Seleccionamos granos de fincas directas y los tostamos en lotes pequenos para preservar cada nota.
          </p>
          <button className="mt-4 self-start px-5 py-2 rounded-lg text-[11px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #7957ff, #5268ff)" }}>
            Elegir mi cafe
          </button>
        </div>

        {/* Product display */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-[140px] h-[190px] sm:w-[170px] sm:h-[230px]" key={selected}>
            <div
              className="absolute inset-0 rounded-xl shadow-2xl transition-colors duration-500"
              style={{ background: `linear-gradient(160deg, ${current.color}, ${current.color}dd)` }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mb-2">
                <span className="text-[8px] font-display font-bold text-white">N</span>
              </div>
              <span className="font-display text-[13px] font-bold text-white tracking-tight">{current.name}</span>
              <span className="text-[9px] text-white/60 mt-0.5">250g · Tostado medio</span>
              <div className="mt-3 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= current.intensity ? "bg-white/90" : "bg-white/20"}`} />
                ))}
              </div>
              <span className="mt-2 text-[14px] font-bold text-white">{current.price}</span>
            </div>
          </div>
          <p className="mt-3 text-[9px] text-[#45e2d5] font-medium">Entrega en 24-48h</p>
        </div>
      </div>

      {/* Variety selector */}
      <div className="px-5 pb-4">
        <div className="flex gap-2">
          {VARIETIES.map((v) => (
            <button
              key={v.id}
              onClick={() => isInteractive && setSelected(v.id)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-semibold transition-all ${
                selected === v.id
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/[0.03] text-[#6a6a6a] border border-transparent hover:bg-white/[0.06]"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[8px] text-[#5a5a5a] tracking-wider uppercase">Suscripcion mensual · $3.800/mes</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-[#1a1a2e] border border-white/10 text-[10px] text-white shadow-lg animate-[fade-up_0.3s_ease]">
          {toast}
        </div>
      )}
    </div>
  )
}
