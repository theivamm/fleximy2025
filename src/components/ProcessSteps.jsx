import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

gsap.registerPlugin(ScrollTrigger)

function Step1Audit() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm border border-slate-200/60 dark:border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Reporte de Auditoría Web</span>
        </div>
        <div className="text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-semibold">v2.4.1</div>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "SEO", pct: 92, bar: "from-emerald-400 to-emerald-500" },
            { label: "Rendimiento", pct: 78, bar: "from-indigo-400 to-purple-500" },
            { label: "Accesibilidad", pct: 85, bar: "from-cyan-400 to-blue-500" },
          ].map((m, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 text-center">
              <div className="text-[10px] text-slate-400 mb-1 font-medium">{m.label}</div>
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2 gsap-counter">{m.pct}<span className="text-sm text-slate-400">%</span></div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${m.bar} gsap-bar`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { label: "Meta tags optimizados", done: true },
            { label: "Compresión de imágenes", done: true },
            { label: "Lazy loading configurado", done: true },
            { label: "Caching de recursos", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 gsap-check" style={{ opacity: 0 }}>
              <div className={`w-4 h-4 rounded-md flex items-center justify-center ${item.done ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700 ring-1 ring-indigo-400/50 animate-pulse"}`}>
                {item.done && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={item.done ? "" : "text-indigo-600 dark:text-indigo-400 font-medium"}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2Editor() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm border border-slate-200/60 dark:border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">Editor No-Code</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-500 dark:text-emerald-400 font-semibold">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Guardado
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-4 border-r border-slate-100 dark:border-white/5 space-y-3">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Estilos</div>
          <div className="space-y-2.5">
            <div>
              <div className="text-[10px] text-slate-400 mb-1">Color primario</div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 ring-2 ring-indigo-400/50 ring-offset-2 ring-offset-transparent gsap-swatch" />
                <div className="w-6 h-6 rounded-full bg-cyan-500 ring-2 ring-cyan-400/40 ring-offset-2 ring-offset-transparent gsap-swatch" />
                <div className="w-6 h-6 rounded-full bg-amber-500 ring-2 ring-amber-400/40 ring-offset-2 ring-offset-transparent gsap-swatch" />
                <div className="w-6 h-6 rounded-full bg-rose-500 ring-2 ring-rose-400/40 ring-offset-2 ring-offset-transparent gsap-swatch" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 mb-1">Tipografía</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">Inter · Sistema</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 mb-1">Esquinas</div>
              <div className="flex gap-1.5">
                <div className="flex-1 h-6 rounded bg-slate-100 dark:bg-slate-700" />
                <div className="flex-1 h-6 rounded-lg bg-slate-100 dark:bg-slate-700" />
                <div className="flex-1 h-6 rounded-full bg-indigo-500/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 flex flex-col gsap-preview">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Preview</div>
          <div className="flex-1 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">F</div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Fleximy</div>
            <div className="flex gap-1.5">
              <div className="w-6 h-1.5 rounded-full bg-indigo-500/60" />
              <div className="w-6 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="w-6 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="w-6 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
            <div className="text-[8px] text-slate-400 mt-1">Vista previa en vivo</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step3Video() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm border border-slate-200/60 dark:border-white/5 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Módulo 1: Manejo de Dashboard</span>
          </div>
          <span className="text-[10px] text-slate-400">12:34 / 45:00</span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 aspect-video flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
          <div className="relative flex flex-col items-center gap-2 gsap-play-btn">
            <div className="w-14 h-14 rounded-full bg-indigo-500/90 flex items-center justify-center shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 transition-transform gsap-pulse">
              <svg className="w-6 h-6 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
            <span className="text-[10px] text-slate-400">Reproducir tutorial</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full w-[28%] bg-indigo-500 rounded-r gsap-progress" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["bg-indigo-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-white dark:border-slate-800 gsap-avatar`} style={{ opacity: 0 }} />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 ml-1">+3 viendo ahora</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-500 dark:text-emerald-400 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            En vivo
          </div>
        </div>
      </div>
    </div>
  )
}

function Step4Monitor() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm border border-slate-200/60 dark:border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cloud Monitoring · Fleximy</span>
        </div>
        <div className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Todos los sistemas operativos</div>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Uptime", value: "99.9%", color: "text-emerald-500" },
            { label: "Latencia", value: "24ms", color: "text-cyan-500" },
            { label: "Solicitudes/min", value: "1,847", color: "text-indigo-500" },
          ].map((m, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 text-center">
              <div className="text-[10px] text-slate-400 mb-1">{m.label}</div>
              <div className={`text-xl font-bold ${m.color} gsap-metric`}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
          <div className="text-[10px] text-slate-400 mb-2 font-medium">Tráfico · Últimas 24hs</div>
          <div className="flex items-end gap-1 h-16">
            {[35, 50, 28, 65, 45, 80, 55, 70, 90, 60, 75, 40, 85, 50, 30, 55, 70, 85, 95, 65, 45, 75, 60, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-indigo-500 to-purple-400 dark:from-indigo-400 dark:to-purple-400 gsap-chart-bar origin-bottom" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-1.5 gsap-log">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Log de seguridad</div>
          {[
            { time: "14:32:18", msg: "SSL certificate renewed OK", ok: true },
            { time: "14:28:04", msg: "Firewall rules updated", ok: true },
            { time: "14:22:41", msg: "Automated backup completed", ok: true },
            { time: "14:15:09", msg: "DDoS mitigation active", ok: true },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono gsap-log-entry" style={{ opacity: 0 }}>
              <div className={`w-1.5 h-1.5 rounded-full ${log.ok ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className="text-slate-400 w-16 flex-shrink-0">{log.time}</span>
              <span className="text-slate-500 dark:text-slate-400">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const stepData = [
  { key: "step1", sim: Step1Audit },
  { key: "step2", sim: Step2Editor },
  { key: "step3", sim: Step3Video },
  { key: "step4", sim: Step4Monitor },
]

export default function ProcessSteps() {
  const { lang } = useLang()
  const t = translations.home

  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const stepsRef = useRef([])
  const timeline = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    const stepEls = stepsRef.current
    if (!section || !line || stepEls.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "bottom 60%",
          scrub: 1.5,
        },
      })
      tl.fromTo(line, { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, duration: 1, ease: "none" })
      timeline.current = tl

      stepEls.forEach((el, i) => {
        const text = el.querySelector(".gsap-text")
        const sim = el.querySelector(".gsap-sim")
        const check = el.querySelector(".gsap-check")
        const bar = el.querySelector(".gsap-bar")
        const counter = el.querySelector(".gsap-counter")
        const swatches = el.querySelectorAll(".gsap-swatch")
        const preview = el.querySelector(".gsap-preview")
        const playBtn = el.querySelector(".gsap-play-btn")
        const pulse = el.querySelector(".gsap-pulse")
        const progress = el.querySelector(".gsap-progress")
        const avatars = el.querySelectorAll(".gsap-avatar")
        const metric = el.querySelector(".gsap-metric")
        const chartBars = el.querySelectorAll(".gsap-chart-bar")
        const logEntries = el.querySelectorAll(".gsap-log-entry")

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(text, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
            gsap.to(sim, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power3.out" })

            if (bar) gsap.to(bar, { scaleX: 1, duration: 0.8, delay: 0.3, ease: "power2.out", transformOrigin: "left center" })
            if (counter) gsap.from(counter, { innerText: 0, duration: 1.2, delay: 0.3, snap: { innerText: 1 }, ease: "power1.out" })
            if (check) gsap.to(check, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, ease: "back.out(1.4)" })
            if (swatches.length) gsap.to(swatches, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: "back.out(2)" })
            if (preview) gsap.from(preview, { opacity: 0, x: 10, duration: 0.6, delay: 0.3, ease: "power2.out" })
            if (pulse) gsap.to(pulse, { scale: 1.15, duration: 0.8, yoyo: true, repeat: -1, ease: "sine.inOut" })
            if (progress) gsap.to(progress, { width: "28%", duration: 1, delay: 0.4, ease: "power2.out" })
            if (avatars.length) gsap.to(avatars, { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, ease: "back.out(1.4)" })
            if (metric) gsap.from(metric, { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.2, ease: "back.out(2)" })
            if (chartBars.length) gsap.to(chartBars, { scaleY: 1, stagger: 0.02, duration: 0.5, delay: 0.2, ease: "power2.out" })
            if (logEntries.length) gsap.to(logEntries, { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, delay: 0.3, ease: "power2.out" })
          },
          once: true,
        })
      })
    }, section)

    return () => {
      ctx.revert()
      if (timeline.current) timeline.current.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {t.processBadge[lang]}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl">
            {t.processTitle[lang]}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {t.processSub[lang]}
          </p>
        </div>

        <div className="relative pb-20 md:pb-28">
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />
          <div ref={lineRef} className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 origin-top" style={{ scaleY: 0 }} />

          <div className="space-y-20 md:space-y-28">
            {stepData.map(({ key, sim: Sim }, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={key}
                  ref={(el) => { stepsRef.current[i] = el }}
                  className="relative"
                >
                  <div className="hidden lg:flex items-center gap-8">
                    {isLeft ? (
                      <>
                        <div className="w-1/2">
                          <div className="gsap-text pr-8" style={{ opacity: 0, y: 50 }}>
                            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-5 py-1.5 rounded-full text-xl font-bold tracking-wider mb-4">
                              <span>0{i + 1}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">{t[`${key}Title`][lang]}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{t[`${key}Desc`][lang]}</p>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="gsap-sim pl-8" style={{ opacity: 0, y: 50 }}>
                            <Sim />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2">
                          <div className="gsap-sim pr-8" style={{ opacity: 0, y: 50 }}>
                            <Sim />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="gsap-text pl-8" style={{ opacity: 0, y: 50 }}>
                            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-5 py-1.5 rounded-full text-xl font-bold tracking-wider mb-4">
                              <span>0{i + 1}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">{t[`${key}Title`][lang]}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{t[`${key}Desc`][lang]}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="lg:hidden relative pl-10">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 origin-top" style={{ scaleY: 0 }} />
                    <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-400/30" />
                    <div className="gsap-text" style={{ opacity: 0, y: 30 }}>
                      <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-5 py-1.5 rounded-full text-xl font-bold tracking-wider mb-4">
                        <span>0{i + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">{t[`${key}Title`][lang]}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2 mb-4">{t[`${key}Desc`][lang]}</p>
                    </div>
                    <div className="gsap-sim" style={{ opacity: 0, y: 30 }}>
                      <Sim />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
