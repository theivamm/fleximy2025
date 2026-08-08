import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

function TimeSaverWidget() {
  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">Ahorro de Tiempo</span>
        </div>
        <span className="text-lg font-bold text-emerald-400">+15 hrs/sem</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Automatización de procesos</span>
          <span>92%</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
        </div>
      </div>
      <div className="space-y-1.5 mt-3">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Reducción de errores manuales</span>
          <span>78%</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
        </div>
      </div>
    </div>
  )
}

const itemsTraditional = [
  { text: { en: "Only shows static photos and info", es: "Solo muestra fotos e información estática" } },
  { text: { en: "Client asks and you reply via WhatsApp manually", es: "El cliente consulta y tenés que responder todo por WhatsApp manualmente" } },
  { text: { en: "Outdated prices because you have no time to edit them", es: "Precios desactualizados por falta de tiempo para editarlos" } },
  { text: { en: "No sales tracking or agenda/task control", es: "No sabés qué vendiste ni tenés control de tu agenda o tareas" } },
  { text: { en: "You depend on a developer for every simple change", es: "Dependés de un programador cada vez que querés cambiar algo simple" } },
]

const itemsFleximy = [
  { text: { en: "Website + Control Panel: clients browse, you manage from within", es: "Sitio Web + Panel de Control: Tus clientes navegan y vos gestionás todo por dentro" } },
  { text: { en: "Direct Automation: bookings, orders, projects enter the dashboard automatically", es: "Automatización Directa: Reservas, turnos, pedidos y proyectos ingresan solos al dashboard" } },
  { text: { en: "Ultra Intuitive Panel: change prices, stock, or availability in 2 clicks from your phone", es: "Panel Ultra Intuitivo: Cambiás precios, stock o disponibilidad en 2 clics desde tu celular" } },
  { text: { en: "Metrics & Operations: full control of tasks, clients, and sales in real time", es: "Métricas y Operación: Control absoluto de tareas, clientes y ventas en tiempo real" } },
  { text: { en: "Support & Maintenance Included: you are never alone, we handle the infrastructure", es: "Soporte y Mantenimiento Incluido: Nunca te quedás solo, nos encargamos de la infraestructura" } },
]

export default function ComparisonTable() {
  const { lang } = useLang()
  const t = translations.home

  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top+=200",
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-[#0b0f19] via-[#0d0a1a] to-[#0b0f19]">
      {/* Horizontal connection — draws from center to viewport edges when vertical timeline hits */}
      <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-screen">
        <div ref={lineRef}
             className="h-[2px] origin-center"
             style={{
               width: "100vw",
               background: "linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4)",
               transform: "scaleX(0)"
             }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6 border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_20px_-4px_rgba(99,102,241,0.3)]">
            <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            {t.compareBadge[lang]}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
            {t.compareTitle[lang]}
          </h2>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">
            {t.compareSub[lang]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="rounded-2xl p-6 lg:p-8 bg-slate-900/60 border border-slate-700/50 opacity-80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-slate-300">{t.compareTraditional[lang]}</div>
                <div className="text-[11px] text-slate-500">WordPress / Wix / HTML</div>
              </div>
            </div>
            <div className="space-y-3">
              {itemsTraditional.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-400 leading-relaxed">{item.text[lang]}.</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-indigo-500/[0.07] to-cyan-500/[0.05] border border-indigo-500/30 shadow-[0_0_40px_-12px_rgba(99,102,241,0.25)] transition-all duration-500 hover:shadow-[0_0_60px_-8px_rgba(99,102,241,0.4)] hover:border-indigo-400/40 relative group">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              {t.compareRecommended[lang]}
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-white">{t.compareFleximy[lang]}</div>
                <div className="text-[11px] text-indigo-400">Fleximy OS</div>
              </div>
            </div>
            <div className="space-y-3">
              {itemsFleximy.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{item.text[lang]}.</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-indigo-500/10">
              <TimeSaverWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
