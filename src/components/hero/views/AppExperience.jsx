import { useState, useEffect } from "react"
import { BRUMA_PRODUCTS, BRUMA_ORDER } from "../data/brumaData"

const PALETTE = {
  crema: "#F3EBDD",
  espresso: "#241712",
  salvia: "#A8B89A",
  pistacho: "#C7D86D",
  coral: "#E47B62",
  tinta: "#171717",
}

const VARIANTS = ["Clásico", "Extra pistacho", "Sin frambuesa"]

export default function AppExperience({ isInteractive, story }) {
  const [phase, setPhase] = useState("detail")
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [qty, setQty] = useState(1)

  const product = BRUMA_PRODUCTS.find((p) => p.id === story?.state?.selectedProductId) || BRUMA_PRODUCTS[0]

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
      style={{ fontFamily: "'Inter', sans-serif", background: PALETTE.tinta, color: PALETTE.crema }}
    >
      {/* Left panel — context */}
      <div
        className="shrink-0 flex flex-col justify-center overflow-hidden"
        style={{ width: "35%", padding: "clamp(16px, 2vw, 28px)", borderRight: `1px solid ${PALETTE.crema}12` }}
      >
        <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: PALETTE.coral, fontWeight: 600 }}>
          Pedido en curso
        </p>
        <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "12px", color: `${PALETTE.crema}88`, marginTop: "6px", lineHeight: 1.5 }}>
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
                background: selectedVariant === i ? `${PALETTE.crema}12` : "transparent",
                border: `1px solid ${selectedVariant === i ? PALETTE.pistacho + "40" : "transparent"}`,
                color: selectedVariant === i ? PALETTE.crema : `${PALETTE.crema}77`,
              }}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  border: `2px solid ${selectedVariant === i ? PALETTE.pistacho : `${PALETTE.crema}33`}`,
                  background: selectedVariant === i ? PALETTE.pistacho : "transparent",
                }}
              />
              {v}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">
          <span style={{ fontSize: "11px", color: `${PALETTE.crema}77` }}>Cantidad</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => isInteractive && setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded flex items-center justify-center text-[14px]"
              style={{ background: `${PALETTE.crema}10`, color: PALETTE.crema }}
            >
              −
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>{qty}</span>
            <button
              onClick={() => isInteractive && setQty(qty + 1)}
              className="w-7 h-7 rounded flex items-center justify-center text-[14px]"
              style={{ background: `${PALETTE.crema}10`, color: PALETTE.crema }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right — phone mockup */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Phone frame */}
        <div
          className="relative flex flex-col"
          style={{
            width: "clamp(200px, 28vw, 260px)",
            height: "85%",
            borderRadius: "28px",
            border: `2px solid ${PALETTE.crema}22`,
            background: "#1a1b2e",
            overflow: "hidden",
          }}
        >
          {/* Phone status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2" style={{ fontSize: "9px", color: `${PALETTE.crema}77` }}>
            <span>9:41</span>
            <div className="flex gap-1">
              <span>●●●</span>
            </div>
          </div>

          {/* Phone content */}
          <div className="flex-1 flex flex-col overflow-hidden px-4">
            {phase === "detail" && (
              <>
                {/* Product image placeholder */}
                <div
                  className="rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    height: "120px",
                    background: `linear-gradient(135deg, ${PALETTE.pistacho}20, ${PALETTE.salvia}15)`,
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "48px" }}>🥐</span>
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {product.name}
                </h4>
                <p style={{ fontSize: "11px", color: `${PALETTE.crema}77`, marginTop: "4px" }}>
                  {product.description}
                </p>
                <span style={{ fontSize: "15px", fontWeight: 700, marginTop: "10px", color: PALETTE.pistacho }}>
                  {product.price}
                </span>

                {/* Add button */}
                <button
                  className="mt-auto mb-4 w-full rounded-xl text-[13px] font-semibold py-3"
                  style={{ background: PALETTE.crema, color: PALETTE.espresso }}
                >
                  Agregar al pedido
                </button>
              </>
            )}

            {phase === "cart" && (
              <>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: PALETTE.coral, fontWeight: 600, marginBottom: "8px" }}>
                  Tu pedido
                </p>

                <div className="rounded-lg p-3 mb-3" style={{ background: `${PALETTE.crema}08`, border: `1px solid ${PALETTE.crema}12` }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>{product.name}</span>
                    <span style={{ fontSize: "11px", color: `${PALETTE.crema}77` }}>×{qty}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: `${PALETTE.crema}66` }}>{selectedVariant > 0 ? VARIANTS[selectedVariant] : VARIANTS[0]}</span>
                  <div className="flex justify-between mt-2">
                    <span style={{ fontSize: "12px", color: `${PALETTE.crema}77` }}>Retiro · {BRUMA_ORDER.time}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>{product.price}</span>
                  </div>
                </div>

                <div className="flex justify-between py-2" style={{ borderTop: `1px solid ${PALETTE.crema}12` }}>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>{BRUMA_ORDER.total}</span>
                </div>

                <button
                  className="mt-auto mb-4 w-full rounded-xl text-[13px] font-semibold py-3"
                  style={{ background: PALETTE.crema, color: PALETTE.espresso }}
                >
                  Confirmar pedido
                </button>
              </>
            )}

            {phase === "confirmation" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: `${PALETTE.salvia}30` }}>
                  <span style={{ fontSize: "24px" }}>✓</span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pedido {BRUMA_ORDER.id} confirmado
                </h4>
                <p style={{ fontSize: "11px", color: `${PALETTE.crema}77`, marginTop: "6px" }}>
                  Listo para retirar en {BRUMA_ORDER.estimatedReady}
                </p>

                {/* Progress */}
                <div className="flex items-center gap-2 mt-6" style={{ fontSize: "9px" }}>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: PALETTE.salvia }} />
                    <span style={{ color: PALETTE.salvia }}>Confirmado</span>
                  </span>
                  <span style={{ color: `${PALETTE.crema}33` }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: `${PALETTE.crema}33` }} />
                    <span style={{ color: `${PALETTE.crema}55` }}>Preparando</span>
                  </span>
                  <span style={{ color: `${PALETTE.crema}33` }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: `${PALETTE.crema}33` }} />
                    <span style={{ color: `${PALETTE.crema}55` }}>Listo</span>
                  </span>
                </div>
              </div>
            )}

            {phase === "preparing" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: `${PALETTE.coral}30` }}>
                  <span style={{ fontSize: "24px" }}>☕</span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Preparando tu pedido
                </h4>
                <p style={{ fontSize: "11px", color: `${PALETTE.crema}77`, marginTop: "6px" }}>
                  {BRUMA_ORDER.estimatedReady}
                </p>

                <div className="flex items-center gap-2 mt-6" style={{ fontSize: "9px" }}>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: PALETTE.salvia }} />
                    <span style={{ color: PALETTE.salvia }}>Confirmado</span>
                  </span>
                  <span style={{ color: `${PALETTE.crema}33` }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PALETTE.coral }} />
                    <span style={{ color: PALETTE.coral }}>Preparando</span>
                  </span>
                  <span style={{ color: `${PALETTE.crema}33` }}>—</span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: `${PALETTE.crema}33` }} />
                    <span style={{ color: `${PALETTE.crema}55` }}>Listo</span>
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
