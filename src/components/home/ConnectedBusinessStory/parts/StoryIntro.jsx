import { useRef, useEffect } from "react"

export default function StoryIntro({ c }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative mx-auto text-center"
      style={{
        maxWidth: "780px",
        padding: "clamp(80px, 12vh, 160px) var(--page-gutter) clamp(60px, 8vh, 100px)",
      }}
    >
      <span
        className="inline-block"
        style={{
          fontSize: "clamp(11px, 0.7vw, 12px)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: c.primary,
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
        }}
      >
        WEBSITE + APP DE GESTIÓN
      </span>

      <h2
        className="mt-5 font-display font-bold"
        style={{
          fontSize: "clamp(32px, 3vw, 48px)",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          color: c.text,
        }}
      >
        Una web por fuera.{" "}
        <span
          style={{
            background: "linear-gradient(110deg, #7b61ff 0%, #5277ff 44%, #20c8df 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Todo tu negocio por dentro.
        </span>
      </h2>

      <p
        className="mt-5 mx-auto"
        style={{
          maxWidth: "520px",
          fontSize: "clamp(16px, 1.05vw, 19px)",
          lineHeight: 1.55,
          color: c.textSecondary,
        }}
      >
        Creamos tu website completo, con una aplicación de gestión a medida para vender,
        administrar clientes y manejar toda la operación desde un solo lugar.
      </p>

      <p
        className="mt-3"
        style={{
          fontSize: "clamp(12px, 0.8vw, 14px)",
          color: c.textMuted,
          fontStyle: "italic",
        }}
      >
        Tecnología a medida, al alcance de tu negocio.
      </p>
    </div>
  )
}
