import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "../../../context/ThemeContext"
import ProcessHeader from "./ProcessHeader"
import BusinessInputs from "./BusinessInputs"
import FleximyCore from "./FleximyCore"
import PlatformOutput from "./PlatformOutput"
import ProcessSteps from "./ProcessSteps"
import ProcessClosing from "./ProcessClosing"
import "./module-three-process.css"

const DARK = {
  bg: "#070916",
  surface: "rgba(17,21,42,.58)",
  line: "rgba(150,165,220,.14)",
  text: "#f5f7ff",
  muted: "#a8b0c7",
  stroke: "rgba(245,247,255,.05)",
  glow: ".14",
}

const LIGHT = {
  bg: "#f4f6ff",
  surface: "rgba(255,255,255,.70)",
  line: "rgba(34,44,86,.13)",
  text: "#101329",
  muted: "#59617a",
  stroke: "rgba(16,19,41,.08)",
  glow: ".09",
}

export default function ModuleThreeProcess() {
  const { theme } = useTheme()
  const t = theme === "light" ? LIGHT : DARK

  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqPointer = window.matchMedia("(pointer: fine)")
    setReducedMotion(mqMotion.matches)
    setFinePointer(mqPointer.matches)
    const onMotion = (e) => setReducedMotion(e.matches)
    const onPointer = (e) => setFinePointer(e.matches)
    mqMotion.addEventListener?.("change", onMotion)
    mqPointer.addEventListener?.("change", onPointer)
    return () => {
      mqMotion.removeEventListener?.("change", onMotion)
      mqPointer.removeEventListener?.("change", onPointer)
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onMove = useCallback((e) => {
    const el = sectionRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty("--mx", `${x}px`)
    el.style.setProperty("--my", `${y}px`)
    el.style.setProperty("--px", `${(((x / r.width) - 0.5) * 6).toFixed(1)}`)
    el.style.setProperty("--py", `${(((y / r.height) - 0.6) * 6).toFixed(1)}`)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`m3p ${inView ? "is-inview" : ""}`}
      style={{
        "--m3-bg": t.bg,
        "--m3-surface": t.surface,
        "--m3-line": t.line,
        "--m3-text": t.text,
        "--m3-muted": t.muted,
        "--m3-stroke": t.stroke,
        "--m3-glow": t.glow,
        "--m3-grad": "linear-gradient(105deg, #765dff 0%, #4d7dff 35%, #18d6d2 100%)",
      }}
      onPointerMove={finePointer ? onMove : undefined}
    >
      <div className="m3p-halo" aria-hidden="true" />

      <div className="m3p-container">
        <ProcessHeader />
        <div className="m3p-machine">
          <span className="m3p-bgwords" aria-hidden="true">HECHO PARA VOS</span>
          <span className="m3p-bgwords m3p-bgwords--fill" aria-hidden="true">HECHO PARA VOS</span>
          <span className="m3p-bgwords m3p-bgwords--stack" aria-hidden="true">
            <span>HECHO</span>
            <span>PARA</span>
            <span>VOS</span>
          </span>

          <div className="m3p-glow m3p-glow--violet" aria-hidden="true" />
          <div className="m3p-glow m3p-glow--cyan" aria-hidden="true" />
          <div className="m3p-glow m3p-glow--pink" aria-hidden="true" />
          <div className="m3p-techgrid" aria-hidden="true" />

          <BusinessInputs active={inView} reducedMotion={reducedMotion} />
          <FleximyCore active={inView} reducedMotion={reducedMotion} finePointer={finePointer} />
          <PlatformOutput active={inView} reducedMotion={reducedMotion} />
        </div>
        <ProcessSteps active={inView} reducedMotion={reducedMotion} />
        <ProcessClosing />
      </div>
    </section>
  )
}
