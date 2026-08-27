import { useState, useEffect } from "react"
import { useTheme } from "../../../context/ThemeContext"
import { BRUMA_PRODUCTS, BRUMA_ORDER } from "../data/brumaData"
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
  warning: "#ffb45e",
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
  warning: "#a86000",
  white: "#16182a",
}

const VARIANTS = ["Clásico", "Extra pistacho", "Sin frambuesa"]

export default function AppExperience({ isInteractive, story }) {
  const { theme } = useTheme()
  const c = theme === "light" ? LIGHT : DARK
  const [phase, setPhase] = useState("detail")
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [qty, setQty] = useState(1)

  const product = BRUMA_PRODUCTS.find((p) => p.id === story?.state?.selectedProductId) || BRUMA_PRODUCTS[0]
  const productImg = PRODUCT_IMAGES[product.id]

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => setSelectedVariant(1), 1500)
    const t2 = setTimeout(() => {
      story?.setVariant("extra pistacho")
      setPhase("cart")
    }, 3000)
    const t3 = setTimeout(() => {
      story?.confirmOrder()
      setPhase("confirmation")
    }, 5000)
    const t4 = setTimeout(() => setPhase("preparing"), 6500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInteractive, story])

  return (
    <div
      className="w-full h-full flex overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: c.bg, color: c.text, borderRadius: "0 0 22px 22px", minWidth: 0 }}
    >
      {/* Left panel — context */}
      <div
        className="shrink-0 flex flex-col justify-center overflow-hidden"
        style={{ width: "35%", padding: "clamp(16px, 2vw, 28px)", borderRight: `1px solid ${c.border}` }}
      >
        <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: c.cyan, fontWeight: 600 }}>
          Pedido en curso
        </p>
        <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "12px", color: c.textSecondary, marginTop: "6px", lineHeight: 1.5 }}>
          {product.description}
        </p>

        {/* Variant selector */}
        <div className="flex flex-col gap-1.5 mt-5">
          {VARIANTS.map((v, i) => (
            <button
              key={v}
              onClick={() => isInteractive && setSelectedVariant(i)}
              className="flex items-center gap-2 rounded-lg text-left transition-all"
              style={{
                padding: "8px 12px",
                fontSize: "12px",
                background: selectedVariant === i ? c.primarySoft : "transparent",
                border: `1px solid ${selectedVariant === i ? c.borderStrong : "transparent"}`,
                color: selectedVariant === i ? c.white : c.textMuted,
              }}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  border: `2px solid ${selectedVariant === i ? c.primary : c.textMuted}`,
                  background: selectedVariant === i ? c.primary : "transparent",
                }}
              />
              {v}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">
          <span style={{ fontSize: "11px", color: c.textMuted }}>Cantidad</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => isInteractive && setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded flex items-center justify-center text-[14px]"
              style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}` }}
            >
              −
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>{qty}</span>
            <button
              onClick={() => isInteractive && setQty(qty + 1)}
              className="w-7 h-7 rounded flex items-center justify-center text-[14px]"
              style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}` }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right — phone mockup */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden" style={{ minWidth: 0 }}>
        {/* Phone frame */}
        <div
          className="relative flex flex-col"
          style={{
            width: "clamp(200px, 28vw, 260px)",
            height: "85%",
            borderRadius: "28px",
            border: `2px solid ${c.borderStrong}`,
            background: c.surface,
            overflow: "hidden",
          }}
        >
          {/* Phone status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2" style={{ fontSize: "9px", color: c.textMuted }}>
            <span>9:41</span>
            <div className="flex gap-1">
              <span>●●●</span>
            </div>
          </div>

          {/* Phone content */}
          <div className="flex-1 flex flex-col overflow-hidden px-4">
            {phase === "detail" && (
              <>
                <div
                  className="rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                  style={{
                    height: "120px",
                    background: `linear-gradient(135deg, ${c.primarySoft}, ${c.cyanSoft})`,
                    marginBottom: "12px",
                  }}
                >
                  <img
                    src={productImg}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {product.name}
                </h4>
                <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "4px" }}>
                  {product.description}
                </p>
                <span style={{ fontSize: "15px", fontWeight: 700, marginTop: "10px", color: c.primary }}>
                  {product.price}
                </span>

                <button
                  className="mt-auto mb-4 w-full rounded-xl text-[13px] font-semibold py-3"
                  style={{ background: c.primary, color: "#ffffff" }}
                >
                  Agregar al pedido
                </button>
              </>
            )}

            {phase === "cart" && (
              <>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.cyan, fontWeight: 600, marginBottom: "8px" }}>
                  Tu pedido
                </p>

                <div className="rounded-lg p-3 mb-3 flex items-center gap-3" style={{ background: c.surfaceHover, border: `1px solid ${c.border}` }}>
                  <img
                    src={productImg}
                    alt={product.name}
                    className="rounded-md object-cover shrink-0"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: "12px", fontWeight: 600 }} className="truncate">{product.name}</span>
                      <span style={{ fontSize: "11px", color: c.textMuted }}>×{qty}</span>
                    </div>
                    <span style={{ fontSize: "10px", color: c.textMuted }}>{selectedVariant > 0 ? VARIANTS[selectedVariant] : VARIANTS[0]}</span>
                    <div className="flex justify-between mt-1">
                      <span style={{ fontSize: "10px", color: c.textMuted }}>Retiro · {BRUMA_ORDER.time}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600 }}>{product.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between py-2" style={{ borderTop: `1px solid ${c.border}` }}>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>{BRUMA_ORDER.total}</span>
                </div>

                <button
                  className="mt-auto mb-4 w-full rounded-xl text-[13px] font-semibold py-3"
                  style={{ background: c.primary, color: "#ffffff" }}
                >
                  Confirmar pedido
                </button>
              </>
            )}

            {phase === "confirmation" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: c.primarySoft }}>
                  <span style={{ fontSize: "24px", color: c.primary }}>✓</span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pedido {BRUMA_ORDER.id} confirmado
                </h4>
                <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "6px" }}>
                  Listo para retirar en {BRUMA_ORDER.estimatedReady}
                </p>

                <div className="flex items-center gap-2 mt-6" style={{ fontSize: "9px" }}>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.primary }} />
                    <span style={{ color: c.primary }}>Confirmado</span>
                  </span>
                  <span style={{ color: c.textMuted }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.textMuted }} />
                    <span style={{ color: c.textMuted }}>Preparando</span>
                  </span>
                  <span style={{ color: c.textMuted }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.textMuted }} />
                    <span style={{ color: c.textMuted }}>Listo</span>
                  </span>
                </div>
              </div>
            )}

            {phase === "preparing" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-3" style={{ background: c.primarySoft }}>
                  <img
                    src={productImg}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Preparando tu pedido
                </h4>
                <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "6px" }}>
                  {BRUMA_ORDER.estimatedReady}
                </p>

                <div className="flex items-center gap-2 mt-6" style={{ fontSize: "9px" }}>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.primary }} />
                    <span style={{ color: c.primary }}>Confirmado</span>
                  </span>
                  <span style={{ color: c.textMuted }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: c.warning }} />
                    <span style={{ color: c.warning }}>Preparando</span>
                  </span>
                  <span style={{ color: c.textMuted }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.textMuted }} />
                    <span style={{ color: c.textMuted }}>Listo</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
