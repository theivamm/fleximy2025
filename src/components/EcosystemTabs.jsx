import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCw, ArrowRight, Coffee, UtensilsCrossed, ShoppingBag, Pill, Wrench, PawPrint, Scissors, Dumbbell } from "lucide-react"
import gsap from "gsap"
import { useLang } from "../context/LangContext"
import { useTheme } from "../context/ThemeContext"
import { translations } from "../content/translations"
import { businessTypes, getShapes, typeLabels, typeDescs, typeColorSchemes, clr } from "./ecosystemData"

const iconMap = {
  coffee: Coffee,
  utensils: UtensilsCrossed,
  bag: ShoppingBag,
  pill: Pill,
  wrench: Wrench,
  paw: PawPrint,
  scissors: Scissors,
  dumbbell: Dumbbell,
}

function Shape({ s, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, scale: 0.6, x: gsap.utils.random(-30, 30), y: gsap.utils.random(-30, 30) })
    gsap.to(el, {
      opacity: 1, scale: 1, x: 0, y: 0,
      duration: 0.5, delay: index * 0.04,
      ease: "back.out(1.4)",
    })

    if (s.anims) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "sine.inOut" })
      if (s.anims.y) tl.to(el, { y: s.anims.y[1], duration: gsap.utils.random(2, 4) })
      if (s.anims.h) tl.to(el, { height: `+=${s.anims.h[1]}`, duration: gsap.utils.random(1.5, 3) }, 0)
      if (s.anims.w) tl.to(el, { width: `+=${s.anims.w[1]}`, duration: gsap.utils.random(2, 3.5) }, 0)
      if (s.anims.scale) tl.to(el, { scale: s.anims.scale[1], duration: gsap.utils.random(1.5, 3) }, 0)
    }

    return () => { gsap.killTweensOf(el) }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.w}%`,
        height: `${s.h}%`,
        background: clr(s.name, s.shade, s.opacity),
        borderRadius: s.rad,
        transform: s.rot ? `rotate(${s.rot}deg)` : undefined,
        willChange: "transform, opacity",
      }}
    />
  )
}

function MockupScene({ type, view }) {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const shapes = getShapes(type, view)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const moveCursor = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      if (x >= 0 && x <= 100 && y >= 0 && y <= 100 && cursorRef.current) {
        gsap.to(cursorRef.current, { left: `${x}%`, top: `${y}%`, duration: 0.6, ease: "power2.out" })
        gsap.to(cursorRef.current, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 })
      }
    }

    container.addEventListener("mousemove", moveCursor)
    return () => container.removeEventListener("mousemove", moveCursor)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 p-4 sm:p-6">
      {shapes.map((s, i) => (
        <Shape key={`${type}-${view}-${i}`} s={s} index={i} />
      ))}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 20,
          background: view === "website"
            ? "radial-gradient(circle, rgba(99,102,241,0.5), transparent)"
            : "radial-gradient(circle, rgba(168,85,247,0.5), transparent)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  )
}

export default function EcosystemTabs() {
  const { lang } = useLang()
  const [active, setActive] = useState("cafe")
  const [view, setView] = useState("website")
  const [isFlipping, setIsFlipping] = useState(false)
  const { dark } = useTheme()
  const sectionRef = useRef(null)
  const sceneKey = `${active}-${view}`
  const t = translations.home
  const cs = typeColorSchemes[active]

  const handleFlip = useCallback(() => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setView((v) => (v === "website" ? "dashboard" : "website"))
      setIsFlipping(false)
    }, 300)
  }, [isFlipping])

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current?.querySelector(".ecosystem-stats"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
    )
  }, [active])

  return (
    <div ref={sectionRef} className="glass p-4 sm:p-6 md:p-10 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
        {/* ─── LEFT ─── */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-2">
            {t.ecosystemTitle[lang]}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">
            {t.ecosystemSub[lang]}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {businessTypes.map(({ id, icon }) => {
              const Icon = iconMap[icon]
              const isActive = active === id
              const cs2 = typeColorSchemes[id]
              return (
                <button
                  key={id}
                  onClick={() => { setActive(id); setView("website") }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border-[0.5px] ${
                    isActive
                      ? "shadow-sm"
                      : "border-transparent hover:bg-white/50 dark:hover:bg-slate-700/30"
                  }`}
                  style={{
                    background: isActive ? (dark ? clr(cs2.primary, 950, 0.4) : clr(cs2.primary, 50, 1)) : undefined,
                    color: isActive ? (dark ? clr(cs2.primary, 400, 1) : clr(cs2.primary, 600, 1)) : undefined,
                    borderColor: isActive ? (dark ? clr(cs2.primary, 800, 0.5) : clr(cs2.primary, 200, 1)) : undefined,
                  }}

                >
                  <Icon size={14} />
                  <span>{typeLabels[id][lang]}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className="min-h-[120px]"
            >
              <p
                className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-1"
                style={{ color: view === "website" ? clr("indigo", 500, 1) : clr("purple", 500, 1) }}
              >
                {view === "website"
                  ? (lang === "es" ? "Sitio Web Público" : "Public Website")
                  : (lang === "es" ? "Dashboard Vessel" : "Vessel Dashboard")}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {typeDescs[active][view][lang]}
              </p>

              <div className="ecosystem-stats mt-4 flex gap-3 flex-wrap">
                <div
                  className="px-3 py-1.5 rounded-lg border"
                  style={{
                    background: dark ? clr(cs.primary, 950, 0.3) : clr(cs.primary, 50, 0.6),
                    borderColor: dark ? clr(cs.primary, 800, 0.2) : clr(cs.primary, 200, 0.4),
                  }}
                >
                  <div className="text-xs font-semibold" style={{ color: dark ? clr(cs.primary, 400, 1) : clr(cs.primary, 600, 1) }}>
                    {lang === "es" ? "Web + Dashboard" : "Web + Dashboard"}
                  </div>
                  <div className="text-slate-400 dark:text-slate-500 text-[10px]">
                    {lang === "es" ? "Un solo sistema" : "One system"}
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg border"
                  style={{
                    background: dark ? clr(cs.primary, 950, 0.3) : clr(cs.primary, 50, 0.6),
                    borderColor: dark ? clr(cs.primary, 800, 0.2) : clr(cs.primary, 200, 0.4),
                  }}
                >
                  <div className="text-xs font-semibold" style={{ color: dark ? clr(cs.primary, 400, 1) : clr(cs.primary, 600, 1) }}>
                    {lang === "es" ? "Tiempo real" : "Real-time"}
                  </div>
                  <div className="text-slate-400 dark:text-slate-500 text-[10px]">
                    {lang === "es" ? "Datos sincronizados" : "Synced data"}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleFlip}
            disabled={isFlipping}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer group"
          >
            <RotateCw size={14} className={`transition-transform ${isFlipping ? "animate-spin" : "group-hover:rotate-180"}`} />
            {view === "website"
              ? (lang === "es" ? "Ver Dashboard" : "View Dashboard")
              : (lang === "es" ? "Ver Sitio Web" : "View Website")}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ─── RIGHT: Mockup ─── */}
        <div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer select-none"
          style={{
            perspective: "1200px",
            background: dark
              ? "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))"
              : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
          }}
          onClick={handleFlip}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: dark ? 0.08 : 0.04,
              background: `linear-gradient(135deg, ${clr(cs.primary, 500, 1)}, ${clr(cs.secondary, 500, 1)})`,
            }}
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={sceneKey}
              layout
              initial={{ rotateY: view === "dashboard" ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: view === "dashboard" ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              {view === "website" ? (
                <>
                  <div className="absolute top-2 left-3 right-3 h-5 flex items-center gap-1.5 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="ml-2 h-3 flex-1 rounded bg-slate-200 dark:bg-slate-700/50" />
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-medium tracking-widest uppercase bg-white/70 dark:bg-slate-800/70 px-2 py-0.5 rounded-full backdrop-blur-sm z-10 text-slate-400 dark:text-slate-500">
                    {lang === "es" ? "Sitio Web" : "Website"}
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-2 left-2 right-2 h-5 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 16, height: 16, borderRadius: 6, background: clr(cs.primary, 500, 1) }} />
                      <div className="h-2 w-12 rounded bg-slate-200 dark:bg-slate-700/50" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700/50" />
                      <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700/50" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 z-10 flex gap-1">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: clr(cs.primary, 400, 1) }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: clr(cs.primary, 300, 1) }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: clr(cs.primary, 200, 1) }} />
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-medium tracking-widest uppercase bg-white/70 dark:bg-slate-800/70 px-2 py-0.5 rounded-full backdrop-blur-sm z-10 text-purple-400">
                    Dashboard
                  </div>
                </>
              )}
              <MockupScene type={active} view={view} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
