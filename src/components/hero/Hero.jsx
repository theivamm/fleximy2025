import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import HeroCopy from "./HeroCopy"
import ProductStage from "./ProductStage"
import { useHeroAutoplay } from "./hooks/useHeroAutoplay"
import { usePointerGlow } from "./hooks/usePointerGlow"

export default function Hero() {
  const sectionRef = useRef(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const { activeView, goTo, isAutoplay } = useHeroAutoplay(prefersReduced)
  const { offset } = usePointerGlow(sectionRef, { enabled: !prefersReduced })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100svh - 72px)",
        display: "grid",
        alignItems: "center",
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-20 bg-[#070914]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,225,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(220,225,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Reactive glow */}
      <div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          background:
            "radial-gradient(ellipse 600px 500px at 65% 45%, rgba(121,87,255,0.15), transparent 70%)",
        }}
      />
      {/* F-line decoration */}
      <div
        className="absolute -z-10 opacity-[0.03] pointer-events-none select-none font-display font-bold text-white"
        style={{
          fontSize: "clamp(400px, 50vw, 900px)",
          lineHeight: 0.8,
          right: "-5%",
          top: "-10%",
        }}
        aria-hidden="true"
      >
        F
      </div>

      {/* Content */}
      <div
        className="w-full mx-auto px-[var(--page-gutter)]"
        style={{
          maxWidth: "1440px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.78fr) minmax(0, 1.22fr)",
          gap: "clamp(32px, 5vw, 92px)",
          alignItems: "center",
        }}
      >
        <HeroCopy />
        <motion.div
          initial={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductStage
            activeView={activeView}
            onSelectView={goTo}
            isAutoplay={isAutoplay}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
