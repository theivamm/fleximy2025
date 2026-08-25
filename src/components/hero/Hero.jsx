import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import HeroCopy from "./HeroCopy"
import ProductStage from "./ProductStage"
import { StoryProvider } from "./hooks/useProductStory.jsx"


function HeroInner() {
  const sectionRef = useRef(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero relative overflow-clip"
      style={{
        minHeight: "calc(100svh - var(--header-height, 72px))",
        display: "grid",
        alignItems: "center",
        paddingBlock: "clamp(56px, 6vh, 88px)",
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 bg-[#070914]" />
      <div
        className="absolute inset-0 -z-20 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,225,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(220,225,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Shared radial glow between columns */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: "900px",
          height: "700px",
          left: "48%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(104,83,255,0.16), rgba(24,204,224,0.06) 42%, transparent 70%)",
        }}
      />

      {/* Pointer-reactive glow */}
      <HeroGlow sectionRef={sectionRef} />

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

      {/* Content grid */}
      <div
        className="w-full mx-auto px-[var(--page-gutter)]"
        style={{
          maxWidth: "1280px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.82fr) minmax(0, 1.38fr)",
          gap: "clamp(52px, 4vw, 84px)",
          alignItems: "center",
        }}
      >
        <HeroCopy />
        <motion.div
          initial={{ opacity: 0.88, scale: 0.99, filter: "blur(3px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductStage prefersReduced={prefersReduced} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero > div:nth-child(6) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hero {
            padding-block: clamp(32px, 4vh, 48px) !important;
          }
        }
      `}</style>
    </section>
  )
}

function HeroGlow({ sectionRef }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    let raf
    const handleMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30
        setOffset({ x, y })
      })
    }
    el.addEventListener("mousemove", handleMove, { passive: true })
    return () => {
      el.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(raf)
    }
  }, [sectionRef])

  return (
    <div
      className="absolute inset-0 -z-10 opacity-30 pointer-events-none transition-transform duration-[2000ms] ease-out"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        background:
          "radial-gradient(ellipse 600px 500px at 65% 45%, rgba(121,87,255,0.12), transparent 70%)",
      }}
    />
  )
}

export default function Hero() {
  return (
    <StoryProvider>
      <HeroInner />
    </StoryProvider>
  )
}
