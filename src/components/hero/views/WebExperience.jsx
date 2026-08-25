import { useState, useEffect, useRef } from "react"
import { useTheme } from "../../../context/ThemeContext"
import { BRUMA_PRODUCTS } from "../data/brumaData"
import croissantImg from "../../../assets/croissant-pistacho.png"
import matchaImg from "../../../assets/iced-matcha.png"
import rollImg from "../../../assets/roll-canela.png"
import focacciaImg from "../../../assets/focaccia-mortadela.png"

const PRODUCT_IMAGES = {
  "croissant-pistacho": croissantImg,
  "iced-matcha": matchaImg,
  "roll-canela": rollImg,
  "focaccia-mortadela": focacciaImg,
}

const DARK = {
  bg: "#090b17",
  surface: "#151a30",
  surfaceHover: "#1d2340",
  border: "rgba(124,108,255,0.12)",
  borderStrong: "rgba(124,108,255,0.22)",
  text: "#f8f8ff",
  textSecondary: "#b5bdd4",
  textMuted: "#7d87a3",
  primary: "#7c6cff",
  primarySoft: "rgba(124,108,255,0.14)",
  cyan: "#20d5c7",
  cyanSoft: "rgba(32,213,199,0.14)",
  accent: "#ff6fae",
  success: "#42d392",
  white: "#ffffff",
}

const LIGHT = {
  bg: "#f7f7fc",
  surface: "#ffffff",
  surfaceHover: "#f5f6fb",
  border: "rgba(101,85,232,0.13)",
  borderStrong: "rgba(101,85,232,0.24)",
  text: "#16182a",
  textSecondary: "#535a70",
  textMuted: "#7d8497",
  primary: "#6555e8",
  primarySoft: "rgba(101,85,232,0.10)",
  cyan: "#009f95",
  cyanSoft: "rgba(0,159,149,0.10)",
  accent: "#d94687",
  success: "#16855b",
  white: "#16182a",
}

export default function WebExperience({ isInteractive, story }) {
  const { theme } = useTheme()
  const c = theme === "light" ? LIGHT : DARK
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [toast, setToast] = useState(null)
  const carouselRef = useRef(null)
  const timerRef = useRef(null)

  const selectedProduct = BRUMA_PRODUCTS[selectedIdx]

  useEffect(() => {
    if (isInteractive) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % BRUMA_PRODUCTS.length)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [isInteractive])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const btn = el.children[selectedIdx]
    if (!btn) return
    const left = btn.offsetLeft - el.offsetLeft - (el.clientWidth - btn.clientWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" })
  }, [selectedIdx])

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => {
      story?.addToCart()
      setToast("Agregado a tu pedido")
    }, 2000)
    const t2 = setTimeout(() => setToast(null), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isInteractive, story])

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: c.bg, color: c.text, borderRadius: "0 0 22px 22px" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{ padding: "10px 20px", borderBottom: `1px solid ${c.border}` }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c6cff, #20d5c7)" }}
            >
              <span style={{ fontSize: "8px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk'" }}>T</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif", color: c.white }}>
              Tu negocio
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-5" style={{ fontSize: "12px" }}>
            <span style={{ color: c.primary, fontWeight: 500 }}>Menú</span>
            <span style={{ color: c.textMuted }}>Locales</span>
            <span style={{ color: c.textMuted }}>Nosotros</span>
          </nav>
        </div>
        <button
          className="rounded-lg text-[12px] font-semibold"
          style={{ padding: "6px 16px", background: c.primary, color: "#ffffff" }}
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
              color: c.cyan,
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
              color: c.white,
              maxWidth: "18ch",
            }}
          >
            Algo rico está por pasar.
          </h2>
          <p style={{ fontSize: "13px", color: c.textSecondary, marginTop: "10px", lineHeight: 1.5, maxWidth: "32ch" }}>
            Café de especialidad, cocina simple y pastelería hecha cada mañana.
          </p>
          <button
            className="mt-5 self-start rounded-lg text-[12px] font-semibold"
            style={{ padding: "8px 20px", background: c.primary, color: "#ffffff" }}
          >
            Explorar el menú
          </button>
        </div>

        {/* Right: product display */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "clamp(180px, 24vw, 260px)",
              aspectRatio: "1",
              borderRadius: "24px",
              background: `radial-gradient(circle, ${c.primarySoft}, ${c.cyanSoft}, transparent 70%)`,
            }}
          >
            <img
              src={PRODUCT_IMAGES[selectedProduct.id]}
              alt={selectedProduct.name}
              style={{
                width: "85%",
                height: "85%",
                objectFit: "contain",
                borderRadius: "16px",
                transition: "opacity 0.3s ease",
              }}
            />

            <div
              className="absolute -right-2 bottom-4 rounded-lg px-3 py-1.5"
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <span style={{ color: c.white }}>{selectedProduct.name}</span>
              <span className="block" style={{ fontSize: "10px", color: c.textMuted }}>{selectedProduct.price}</span>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "8px", fontWeight: 500 }}>
            {selectedProduct.description}
          </p>
        </div>
      </div>

      {/* Bottom product carousel */}
      <div className="shrink-0" style={{ padding: "12px 20px 14px", borderTop: `1px solid ${c.border}` }}>
        <div ref={carouselRef} className="flex gap-2 overflow-x-auto" style={{ scrollSnapType: "x mandatory" }}>
          {BRUMA_PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedIdx(i)
                clearInterval(timerRef.current)
              }}
              className="shrink-0 rounded-lg flex items-center gap-2.5 text-left transition-all"
              style={{
                padding: "8px 12px",
                minWidth: "150px",
                scrollSnapAlign: "center",
                background: selectedIdx === i ? c.primarySoft : c.surface,
                color: selectedIdx === i ? c.white : c.textSecondary,
                border: `1px solid ${selectedIdx === i ? c.borderStrong : c.border}`,
              }}
            >
              <img
                src={PRODUCT_IMAGES[p.id]}
                alt={p.name}
                className="rounded-md object-contain shrink-0"
                style={{ width: "36px", height: "36px" }}
              />
              <div className="min-w-0">
                <span className="block truncate" style={{ fontSize: "11px", fontWeight: 600 }}>{p.name}</span>
                <span className="block" style={{ fontSize: "10px", opacity: 0.7, marginTop: "1px" }}>{p.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          style={{
            background: c.surface,
            border: `1px solid ${c.primary}40`,
            fontSize: "11px",
            color: c.white,
            animation: "fade-up 0.3s ease",
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: c.success }} />
          {toast}
        </div>
      )}
    </div>
  )
}
