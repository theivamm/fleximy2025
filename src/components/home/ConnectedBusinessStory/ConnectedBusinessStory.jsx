import { useRef, useState, useEffect, useCallback } from "react"
import { useTheme } from "../../../context/ThemeContext"
import { CHAPTERS, NAV_ITEMS } from "./data"
import StoryIntro from "./parts/StoryIntro"
import StoryChapter from "./parts/StoryChapter"
import StoryNavigation from "./parts/StoryNavigation"
import ConnectionRail from "./parts/ConnectionRail"
import ClosingNote from "./parts/ClosingNote"
import FragmentedState from "./states/FragmentedState"
import SalesFlowState from "./states/SalesFlowState"
import OperationsState from "./states/OperationsState"
import ControlState from "./states/ControlState"

const DARK = {
  bg: "#090b17",
  bgSoft: "#0d1025",
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
  bgSoft: "#eef0f8",
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

const STATE_COMPONENTS = {
  fragmented: FragmentedState,
  sales: SalesFlowState,
  operations: OperationsState,
  control: ControlState,
}

export default function ConnectedBusinessStory() {
  const { theme } = useTheme()
  const c = theme === "light" ? LIGHT : DARK

  const sectionRef = useRef(null)
  const chapterRefs = useRef([])
  const stageRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const sections = chapterRefs.current
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target)
            if (idx >= 0) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    sections.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionH = section.offsetHeight
      const vh = window.innerHeight
      const scrolled = -rect.top
      const total = sectionH - vh
      if (total > 0) {
        setProgress(Math.min(1, Math.max(0, scrolled / total)))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const scrollToChapter = useCallback((idx) => {
    const el = chapterRefs.current[idx]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const ActiveState = STATE_COMPONENTS[CHAPTERS[activeIdx].id]

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: "'Inter', sans-serif",
        overflowX: "clip",
      }}
    >
      <StoryIntro c={c} />

      <div
        className="relative"
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: isMobile ? "0 var(--page-gutter)" : "0 clamp(20px, 4vw, 64px)",
        }}
      >
        {!isMobile && (
          <StoryNavigation
            items={NAV_ITEMS}
            activeIdx={activeIdx}
            progress={progress}
            c={c}
            onNavigate={scrollToChapter}
          />
        )}

        <div
          className="relative"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.40fr) minmax(0, 0.60fr)",
            gap: isMobile ? "0" : "clamp(80px, 10vw, 160px)",
            minHeight: isMobile ? "auto" : "380vh",
            alignItems: "start",
          }}
        >
          {/* Left: chapters */}
          {!isMobile && (
            <div
              className="relative z-10"
              style={{
                paddingTop: "40vh",
                paddingBottom: "40vh",
              }}
            >
              <ConnectionRail progress={progress} c={c} />

              {CHAPTERS.map((ch, i) => (
                <StoryChapter
                  key={ch.id}
                  chapter={ch}
                  c={c}
                  isActive={activeIdx === i}
                  isMobile={isMobile}
                  ref={(el) => { chapterRefs.current[i] = el }}
                />
              ))}
            </div>
          )}

          {/* Right: sticky stage */}
          {!isMobile && (
            <div
              ref={stageRef}
              className="sticky top-0 flex items-center justify-center"
              style={{ height: "100vh", zIndex: 5 }}
            >
              <ActiveState c={c} isMobile={isMobile} />
            </div>
          )}
        </div>

        {/* Mobile: inline stages */}
        {isMobile && CHAPTERS.map((ch, i) => {
          const StateComp = STATE_COMPONENTS[ch.id]
          return (
            <div key={`stage-${ch.id}`} className="my-8">
              <div
                className="mx-auto mb-6"
                style={{ maxWidth: "500px", borderRadius: "16px", overflow: "hidden" }}
              >
                <StateComp c={c} isMobile={isMobile} />
              </div>
              <StoryChapter
                chapter={ch}
                c={c}
                isActive={activeIdx === i}
                isMobile={isMobile}
                ref={(el) => { chapterRefs.current[i] = el }}
              />
            </div>
          )
        })}
      </div>

      <ClosingNote c={c} />
    </section>
  )
}
