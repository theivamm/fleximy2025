import { forwardRef, useRef, useEffect } from "react"

const StoryChapter = forwardRef(function StoryChapter({ chapter, c, isActive, isMobile }, ref) {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el || isMobile) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    el.style.opacity = "0.3"
    el.style.transform = "translateY(20px)"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        } else {
          el.style.transition = "opacity 0.4s ease"
          el.style.opacity = "0.3"
        }
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <div
      ref={(el) => {
        innerRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      }}
      className="relative"
      style={{
        padding: isMobile ? "32px 0" : "0 0 80px 40px",
        minHeight: isMobile ? "auto" : "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: isActive ? c.primary : c.textMuted,
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          transition: "color 0.3s ease",
        }}
      >
        {chapter.num} · {chapter.label}
      </span>

      <h3
        className="mt-4 font-display font-bold"
        style={{
          fontSize: "clamp(28px, 2.5vw, 42px)",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          color: c.text,
          maxWidth: "22ch",
        }}
      >
        {chapter.title}
      </h3>

      <p
        className="mt-4"
        style={{
          fontSize: "clamp(15px, 1vw, 18px)",
          lineHeight: 1.6,
          color: c.textSecondary,
          maxWidth: "42ch",
        }}
      >
        {chapter.text}
      </p>

      <div
        className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: isActive ? c.primarySoft : "transparent",
          border: `1px solid ${isActive ? c.borderStrong : c.border}`,
          width: "fit-content",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: isActive ? c.primary : c.textMuted }}
        />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: isActive ? c.primary : c.textMuted,
            letterSpacing: "0.02em",
          }}
        >
          {chapter.micro}
        </span>
      </div>
    </div>
  )
})

export default StoryChapter
