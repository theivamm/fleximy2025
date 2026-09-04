import { useEffect, useState } from "react"
import { ArrowRight, MessageCircle, ChevronRight } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { track } from "../lib/analytics"
import {
  HERO_CUSTOMER,
  PROBLEM_BEFORE,
  PROBLEM_AFTER,
  STEPS,
  DEMO_CUSTOMERS,
  RULE_VARIANTS,
  REWARD_TYPES,
  BENEFITS,
  INDUSTRY_CASES,
  DASHBOARD_KPIS,
  DASHBOARD_SEGMENTS,
  DASHBOARD_ALERTS,
  DASHBOARD_RANKING,
  DASHBOARD_WEEKS,
  GROWTH_STAGES,
  TRUST_POINTS,
  WHATSAPP_NOTE,
  FAQS,
} from "../data/loyaltyConfig"

/* ==========================================================================
   FLEXIMY FIDELIZACIÓN — LANDING (/soluciones/fidelizacion)
   Registrá compras, conocé a tus clientes y premiá su fidelidad.
   ========================================================================== */

export default function LoyaltyPage() {
  const { theme } = useTheme()
  const dark = theme !== "light"

  useEffect(() => {
    track("view_loyalty_page")

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fleximy Fidelización de clientes",
      provider: { "@type": "Organization", name: "Fleximy" },
      areaServed: "Argentina",
    }
    const id = "loyalty-service-jsonld"
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement("script")
      el.id = id
      el.type = "application/ld+json"
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }
    const faqId = "loyalty-faq-jsonld"
    let fel = document.getElementById(faqId)
    if (!fel) {
      fel = document.createElement("script")
      fel.id = faqId
      fel.type = "application/ld+json"
      document.head.appendChild(fel)
    }
    fel.textContent = JSON.stringify(faqSchema)

    return () => {
      if (el) el.remove()
      if (fel) fel.remove()
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToWhatsApp = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" })
    track("click_loyalty_primary_cta", { cta: "hero" })
  }

  return (
      <div className="loyalty" style={vars(dark)}>
      <style>{css()}</style>

      <Hero onWhatsApp={scrollToWhatsApp} onHowItWorks={() => scrollTo(ANCHORS.comoFunciona)} />

      <Problem />

      <Steps />

      <CustomerDemo />

      <RuleBuilder />

      <Benefits />

      <Industries onDesignRule={scrollToWhatsApp} />

      <Dashboard />

      <Growth onCTA={scrollToWhatsApp} />

      <Trust />

      <Faq />
    </div>
  )
}

/* Shortcut local para anclas */
const ANCHORS = {
  comoFunciona: "como-funciona",
  ejemplos: "ejemplos",
  preguntas: "preguntas",
}

/* ==========================================================================
   MÓDULO 01 — HERO
   ========================================================================== */

function Hero({ onWhatsApp, onHowItWorks }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const phases = [
      { visits: 8, badge: "2 compras para el próximo premio", lit: false },
      { visits: 9, badge: "1 compra para el premio", lit: true },
      { visits: 9, badge: "1 compra para el premio", lit: true },
      { visits: 8, badge: "2 compras para el próximo premio", lit: false },
    ]
    let idx = 0
    const id = setInterval(() => {
      idx = (idx + 1) % phases.length
      setPhase(idx)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const active = [
    { visits: 8, badge: "2 compras para el próximo premio", lit: false },
    { visits: 9, badge: "1 compra para el premio", lit: true },
    { visits: 9, badge: "1 compra para el premio", lit: true },
    { visits: 8, badge: "2 compras para el próximo premio", lit: false },
  ][phase]

  return (
    <section className="loyalty-hero">
      <div className="loyalty-container--wide loyalty-hero__grid">
        <div className="loyalty-hero__copy">
          <p className="kicker">FLEXIMY FIDELIZACIÓN · CLIENTES QUE VUELVEN</p>
          <h1 className="loyalty-display loyalty-hero__title font-display">
            Convertí cada compra en <span className="text-gradient">una razón para volver.</span>
          </h1>
          <p className="loyalty-lead loyalty-hero__desc">
            Creamos una plataforma para registrar cada visita, conocer mejor a tus clientes y
            premiarlos automáticamente cuando alcanzan la meta que vos definís.
          </p>
          <p className="loyalty-hero__refuerzo">Vos elegís la regla. Fleximy reconoce y premia a tus clientes.</p>

          <div className="loyalty-hero__ctas">
            <button type="button" className="loyalty-btn loyalty-btn--primary" onClick={onWhatsApp}>
              Quiero fidelizar clientes <ArrowRight size={17} />
            </button>
            <button type="button" className="loyalty-btn loyalty-btn--ghost" onClick={onHowItWorks}>
              Mirá cómo funciona
            </button>
          </div>

          <p className="loyalty-hero__micro">Clientes · Compras · Beneficios · Todo en un solo lugar</p>
        </div>

        <div className="loyalty-hero__visual">
          <div className="loyalty-hero__glow" aria-hidden="true" />
          <BrumaDashboard lit={active.lit} visits={active.visits} badge={active.badge} />
          <FloatingConfirm />
        </div>
      </div>
    </section>
  )
}

function BrumaDashboard({ lit, visits, badge }) {
  const progress = (visits / HERO_CUSTOMER.goal) * 100
  return (
    <div className={`bruma ${lit ? "bruma--lit" : ""}`} aria-hidden="true">
      <div className="bruma__bar">
        <span className="bruma__search">Buscar cliente…</span>
        <span className="bruma__loc">Palermo</span>
      </div>
      <div className="bruma__body">
        <div className="bruma__profile">
          <div className="bruma__avatar">ML</div>
          <div className="bruma__who">
            <span className="bruma__name">Martina López</span>
            <span className="bruma__status">Cliente frecuente</span>
          </div>
          <span className="bruma__visits">{visits} visitas</span>
        </div>

        <div className="bruma__card">
          <div className="bruma__card-head">
            <span className="bruma__card-title">Progreso hacia el premio</span>
            <span className="bruma__count">{visits} de {HERO_CUSTOMER.goal}</span>
          </div>
          <div className="bruma__bar-track">
            <span className="bruma__bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="bruma__next">Próximo premio: {HERO_CUSTOMER.nextReward}</span>
          <span className={`bruma__badge ${visits < HERO_CUSTOMER.goal ? "bruma__badge--near" : ""}`}>{badge}</span>
        </div>

        <div className="bruma__history">
          {HERO_CUSTOMER.history.map((h) => (
            <div className="bruma__row" key={h.date}>
              <span className="bruma__row-date">{h.date}</span>
              <span className="bruma__row-concept">{h.concept}</span>
              <span className="bruma__row-price">{h.price}</span>
            </div>
          ))}
        </div>

        <span className="bruma__cta">Registrar compra</span>
      </div>
    </div>
  )
}

function FloatingConfirm() {
  return (
    <div className="loyalty-hero__toast" aria-hidden="true">
      <span className="loyalty-hero__toast-check">✓</span>
      <span className="loyalty-hero__toast-text">Compra registrada · progreso actualizado</span>
    </div>
  )
}

/* ==========================================================================
   MÓDULO 02 — PROBLEMA
   ========================================================================== */

function Problem() {
  return (
    <section className="loyalty-sec loyalty-problem">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">VENDER ES SOLO EL PRINCIPIO</p>
          <h2 className="loyalty-h2 loyalty-problem__title font-display">
            Tus clientes vuelven. Pero hoy depende de que alguien los recuerde.
          </h2>
          <p className="loyalty-lead loyalty-problem__lead">
            Entre pedidos, turnos y mensajes, es difícil saber quién compra seguido, cuándo fue su
            última visita o quién está cerca de recibir un premio.
          </p>
        </div>

        <div className="loyalty-problem__comp">
          <div className="loyalty-panel loyalty-panel--before">
            <span className="loyalty-panel__tag font-mono">Hoy</span>
            <ul className="loyalty-panel__list">
              {PROBLEM_BEFORE.map((p) => <li key={p} className="loyalty-panel__item loyalty-panel__item--muted">{p}</li>)}
            </ul>
          </div>

          <div className="loyalty-problem__flow" aria-hidden="true">
            <svg viewBox="0 0 120 60" className="loyalty-problem__arrow">
              <path d="M4 30 H108" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="6 6" />
              <path d="M100 22 L112 30 L100 38" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="loyalty-panel loyalty-panel--after">
            <span className="loyalty-panel__tag font-mono">Con Fleximy</span>
            <ul className="loyalty-panel__list">
              {PROBLEM_AFTER.map((p) => <li key={p} className="loyalty-panel__item"><span className="loyalty-panel__check">✓</span>{p}</li>)}
            </ul>
          </div>
        </div>

        <p className="loyalty-problem__closing">De clientes que pasan a clientes que elegís cuidar.</p>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 03 — CÓMO FUNCIONA
   ========================================================================== */

const STEP_ICON = {
  id: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/></svg>,
  register: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  progress: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  reward: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="5"/><path d="M5 13v7h14v-7M12 8v12"/></svg>,
}

function Steps() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id={ANCHORS.comoFunciona} className="loyalty-sec loyalty-steps">
      <div className="loyalty-container">
        <div className="loyalty-sec__head loyalty-steps__head">
          <p className="kicker">SIMPLE PARA TU EQUIPO. CLARO PARA TUS CLIENTES.</p>
          <h2 className="loyalty-h2 loyalty-steps__title font-display">Cada visita suma. Cada premio tiene una regla.</h2>
          <p className="loyalty-lead loyalty-steps__lead">
            Definís qué acción querés reconocer y cuándo se activa el beneficio. El sistema se ocupa de
            registrar el progreso y avisar cuando llega el momento.
          </p>
        </div>

        <div className="loyalty-steps__track" aria-hidden="true">
          <div className="loyalty-track-line" />
          {STEPS.map((s, i) => (
            <span key={s.n} className={`loyalty-track__node ${i <= step ? "on" : ""}`}>
              <span className="loyalty-track__dot" />
            </span>
          ))}
          <span className="loyalty-track__card" style={{ left: `calc(${step * 25}% + ${25 / 2}% - 42px)` }}>
            <span className="loyalty-track__card-ava">ML</span>
            <span className="loyalty-track__card-txt">Martina · {["Identificada", "Compra registrada", "Progreso 9/10", "Premio activo"][step]}</span>
          </span>
        </div>

        <div className="loyalty-steps__grid">
          {STEPS.map((s) => (
            <article className="loyalty-step" key={s.n}>
              <span className="loyalty-step__num font-mono">{s.n}</span>
              <span className="loyalty-step__icon" aria-hidden="true">{STEP_ICON[s.icon]}</span>
              <h3 className="loyalty-h3 loyalty-step__title font-display">{s.title}</h3>
              <p className="loyalty-step__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 04 — DEMO CENTRAL DEL PRODUCTO
   ========================================================================== */

function CustomerDemo() {
  const [activeId, setActiveId] = useState("martina")
  const [rewardOpen, setRewardOpen] = useState(false)
  const customers = DEMO_CUSTOMERS
  const active = customers.find((c) => c.id === activeId)

  useEffect(() => { setRewardOpen(false) }, [activeId])

  const registerPurchase = () => {
    track("loyalty_register_purchase", { customer: active.id })
  }

  const progress = Math.min((active.visits / active.goal) * 100, 100)
  const hasReward = active.visits >= active.goal

  return (
    <section className="loyalty-sec loyalty-demo">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">EL CLIENTE DEJA DE SER UN NÚMERO</p>
          <h2 className="loyalty-h2 loyalty-demo__title font-display">Todo lo importante de cada cliente, en un solo perfil.</h2>
          <p className="loyalty-lead loyalty-demo__lead">
            Historial, frecuencia, preferencias, beneficios y próxima oportunidad reunidos para que tu
            equipo pueda atender mejor.
          </p>
        </div>

        <div className="loyalty-demo__app">
          <div className="loyalty-app__side" aria-label="Navegación del panel">
            {["Resumen", "Clientes", "Compras", "Beneficios", "Campañas", "Configuración"].map((n, i) => (
              <span key={n} className={`loyalty-app__nav ${i === 1 ? "on" : ""}`}>{n}</span>
            ))}
          </div>

          <div className="loyalty-app__main">
            <div className="loyalty-app__top">
              <span className="loyalty-app__search">Buscar cliente…</span>
              <span className="loyalty-app__loc">Palermo</span>
              <span className="loyalty-app__status"><span className="loyalty-app__status-dot" />Sistema activo</span>
              <span className="loyalty-app__ava">F</span>
            </div>

            <div className="loyalty-app__cols">
              <div className="loyalty-app__list" role="listbox" aria-label="Clientes">
                {customers.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    role="option"
                    aria-selected={c.id === activeId}
                    onClick={() => setActiveId(c.id)}
                    className={`loyalty-cust ${c.id === activeId ? "on" : ""}`}
                  >
                    <span className="loyalty-cust__ava">{c.name.split(" ").map((w) => w[0]).join("")}</span>
                    <span className="loyalty-cust__info">
                      <span className="loyalty-cust__name">{c.name}</span>
                      <span className="loyalty-cust__status">{c.status}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="loyalty-app__profile" aria-live="polite">
                <div className="loyalty-pp__head">
                  <span className="loyalty-pp__ava">{active.name.split(" ").map((w) => w[0]).join("")}</span>
                  <div className="loyalty-pp__who">
                    <span className="loyalty-pp__name">{active.name}</span>
                    <span className="loyalty-pp__since">{active.since}</span>
                  </div>
                  <span className={`loyalty-pp__tagpill ${hasReward ? "loyalty-pp__tagpill--reward" : ""}`}>
                    {hasReward ? "Premio disponible" : `${active.visits} compras`}
                  </span>
                </div>

                <div className="loyalty-pp__tags">
                  {active.tags.map((t) => <span key={t} className="loyalty-pp__tag">{t}</span>)}
                </div>

                <div className="loyalty-pp__progress">
                  <div className="loyalty-pp__progress-head">
                    <span>Progreso · {active.visits}/{active.goal}</span>
                    <span className="loyalty-pp__spend">Gasto acumulado {active.spend}</span>
                  </div>
                  <div className="loyalty-pp__track">
                    <span className="loyalty-pp__fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="loyalty-pp__next">Próximo premio: {active.nextReward}</span>
                </div>

                <div className="loyalty-pp__actions">
                  <button type="button" className="loyalty-pp__btn" onClick={registerPurchase} disabled={hasReward}>
                    {hasReward ? "Meta alcanzada" : "Registrar compra"}
                  </button>
                  <button type="button" className="loyalty-pp__reward" onClick={() => setRewardOpen((o) => !o)} aria-expanded={rewardOpen}>
                    {hasReward ? "Ver premio" : "Detalle del premio"} <ChevronRight size={15} />
                  </button>
                </div>

                {rewardOpen && (
                  <div className="loyalty-pp__rewardbox">
                    <span className="loyalty-pp__reward-title">Café + croissant</span>
                    <span className="loyalty-pp__reward-desc">
                      {hasReward
                        ? "Premio listo para entregar. El cliente alcanzó su meta de 10 compras."
                        : `El cliente recibe este beneficio al completar ${active.goal} compras.`}
                    </span>
                  </div>
                )}

                <div className="loyalty-pp__insight">
                  {active.insight.map((txt) => <span key={txt} className="loyalty-pp__insight-row"><span className="loyalty-pp__insight-dot" />{txt}</span>)}
                </div>

                <div className="loyalty-pp__history">
                  {active.history.map((h) => (
                    <div className="loyalty-pp__row" key={h.date + h.concept}>
                      <span className="loyalty-pp__row-date">{h.date}</span>
                      <span className="loyalty-pp__row-concept">{h.concept}</span>
                      <span className="loyalty-pp__row-place">{h.place}</span>
                      <span className="loyalty-pp__row-price">{h.price}</span>
                      <span className={`loyalty-pp__row-state ${h.state === "Disponible" ? "ok" : ""}`}>{h.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 05 — MOTOR DE REGLAS (rule builder)
   ========================================================================== */

function RuleBuilder() {
  const [amount, setAmount] = useState(10)
  const [reward, setReward] = useState("Cupón 20%")
  const [days, setDays] = useState(30)

  const summary = `Regla lista: al completar ${amount} compras, el cliente recibe un ${reward.toLowerCase()} válido por ${days} días.`

  return (
    <section className="loyalty-sec loyalty-rules">
      <div className="loyalty-container">
        <div className="loyalty-rules__grid">
          <div className="loyalty-rules__copy">
            <p className="kicker">
              VOS DECIDÍS QUÉ PREMIAR
            </p>
            <h2 className="loyalty-h2 loyalty-rules__title font-display">Diez compras, cinco visitas o el objetivo que tenga sentido para tu negocio.</h2>
            <p className="loyalty-lead loyalty-rules__lead">
              No todos los negocios funcionan igual. Configuramos las reglas, beneficios y tiempos
              alrededor de la forma en que trabajan tus clientes.
            </p>
            <div className="loyalty-rules__variants">
              {RULE_VARIANTS.map((v) => (
                <span className="loyalty-rules__variant" key={v.label}>
                  <span className="loyalty-rules__variant-label">{v.label}</span>
                  <span className="loyalty-rules__variant-desc">{v.desc}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="loyalty-builder">
            <div className="loyalty-builder__head"><span className="loyalty-builder__dot" />Constructor de reglas</div>

            <div className="loyalty-ruleline">
              <span className="loyalty-ruleline__k">CUANDO</span>
              <span className="loyalty-ruleline__l">un cliente complete</span>
              <input
                type="number"
                min={1}
                max={99}
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                className="loyalty-ruleline__input"
                aria-label="Cantidad de compras"
              />
              <span className="loyalty-ruleline__l">compras</span>
            </div>

            <div className="loyalty-ruleline">
              <span className="loyalty-ruleline__k">ENTONCES</span>
              <span className="loyalty-ruleline__l">generar</span>
              <select value={reward} onChange={(e) => setReward(e.target.value)} className="loyalty-ruleline__select" aria-label="Tipo de premio">
                {REWARD_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="loyalty-ruleline">
              <span className="loyalty-ruleline__k">VÁLIDO</span>
              <span className="loyalty-ruleline__l">durante</span>
              <input
                type="number"
                min={1}
                max={120}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(120, Number(e.target.value) || 1)))}
                className="loyalty-ruleline__input"
                aria-label="Días de validez"
              />
              <span className="loyalty-ruleline__l">días</span>
            </div>

            <div className="loyalty-ruleline">
              <span className="loyalty-ruleline__k">AVISAR</span>
              <span className="loyalty-ruleline__l">por</span>
              <button type="button" className="loyalty-ruleline__wa"><MessageCircle size={14} /> WhatsApp</button>
            </div>

            <p className="loyalty-builder__result" aria-live="polite">{summary}</p>
            <p className="loyalty-builder__note">Los valores se configuran durante la implementación según tu negocio.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 06 — BENEFICIOS
   ========================================================================== */

function Benefits() {
  const blocks = [
    { key: "clientes", className: "loyalty-ben--clientes", micro: "Progreso del cliente" },
    { key: "equipo", className: "loyalty-ben--equipo", micro: "Registro de compra" },
    { key: "negocio", className: "loyalty-ben--negocio", micro: "KPI de recurrencia" },
  ]
  return (
    <section className="loyalty-sec loyalty-benefits">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">UNA PLATAFORMA. TRES FORMAS DE GANAR.</p>
          <h2 className="loyalty-h2 loyalty-benefits__title font-display">Mejor para tus clientes. Más simple para tu equipo. Más claro para vos.</h2>
        </div>

        <div className="loyalty-benefits__surface">
          {blocks.map((b, idx) => (
            <div key={b.key} className={`loyalty-ben ${b.className}`}>
              <span className="loyalty-ben__micro font-mono">{b.micro}</span>
              <h3 className="loyalty-h3 loyalty-ben__label font-display">{BENEFITS[b.key].label}</h3>
              <ul className="loyalty-ben__list">
                {BENEFITS[b.key].points.map((p) => <li key={p} className="loyalty-ben__item"><span className="loyalty-ben__check">✓</span>{p}</li>)}
              </ul>
              <div className="loyalty-ben__mini" aria-hidden="true">
                {idx === 0 && <div className="loyalty-ben__progress"><span className="loyalty-ben__progress-fill" style={{ width: "80%" }} /></div>}
                {idx === 1 && <div className="loyalty-ben__record"><span className="loyalty-ben__record-row" /><span className="loyalty-ben__record-btn" /></div>}
                {idx === 2 && <div className="loyalty-ben__kpi"><span className="loyalty-ben__kpi-val">38%</span><span className="loyalty-ben__kpi-up">+6%</span></div>}
              </div>
            </div>
          ))}
        </div>

        <div className="loyalty-benefits__line" aria-hidden="true">
          <svg viewBox="0 0 800 40" fill="none">
            <path d="M18 20 H782" stroke="currentColor" strokeWidth="2" strokeDasharray="2 8" />
            {[18, 400, 782].map((x) => <circle key={x} cx={x} cy={20} r="5" fill="currentColor" />)}
          </svg>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 07 — EJEMPLOS POR RUBRO
   ========================================================================== */

const INDUSTRY_ICON = {
  coffee: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2M8 4v2M11 4v2M14 4v2"/></svg>,
  restaurant: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11"/><path d="M17 3v18M14 3c2 0 4 2 4 4" /></svg>,
  nails: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  ink: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3s6 7 6 12a6 6 0 0 1-12 0C6 10 12 3 12 3z"/></svg>,
  glasses: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="13" r="3"/><circle cx="17" cy="13" r="3"/><path d="M10 13h4M4 10l1-3M20 10l-1-3"/></svg>,
  gym: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h16M7 8v8M17 8v8M2 9v6M22 9v6"/></svg>,
}

function Industries({ onDesignRule }) {
  return (
    <section id={ANCHORS.ejemplos} className="loyalty-sec loyalty-industries">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">LA MISMA IDEA. REGLAS DIFERENTES.</p>
          <h2 className="loyalty-h2 loyalty-industries__title font-display">Si tus clientes pueden volver, podés darles una razón para hacerlo.</h2>
          <p className="loyalty-lead loyalty-industries__lead">
            Adaptamos la plataforma a la frecuencia, el ticket y la experiencia real de cada negocio.
          </p>
        </div>

        <div className="loyalty-industries__grid">
          {INDUSTRY_CASES.map((c) => (
            <article className={`loyalty-industry loyalty-industry--${c.accent}`} key={c.rubro}>
              <div className="loyalty-industry__top">
                <span className="loyalty-industry__icon" aria-hidden="true">{INDUSTRY_ICON[c.icon]}</span>
                <span className="loyalty-industry__rubro font-mono">{c.rubro}</span>
              </div>
              <p className="loyalty-industry__rule">{c.rule}</p>
              <div className="loyalty-industry__foot">
                <span className="loyalty-industry__registro">Registro: {c.registro}</span>
                <span className="loyalty-industry__pulse" />
              </div>
            </article>
          ))}
        </div>

        <div className="loyalty-industries__cta">
          <button type="button" className="loyalty-btn loyalty-btn--primary" onClick={onDesignRule}>
            Quiero diseñar mi regla <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 08 — DASHBOARD
   ========================================================================== */

function Dashboard() {
  const maxVal = Math.max(...DASHBOARD_WEEKS.flatMap((w) => [w.nuevos, w.recurrentes]))
  return (
    <section className="loyalty-sec loyalty-dash">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">NO MÁS INTUICIÓN SIN DATOS</p>
          <h2 className="loyalty-h2 loyalty-dash__title font-display">Mirá quién vuelve, qué funciona y dónde tenés una oportunidad.</h2>
          <p className="loyalty-lead loyalty-dash__lead">
            El dashboard reúne la actividad importante para que puedas mejorar la fidelización sin armar reportes.
          </p>
        </div>

        <div className="loyalty-dash__panel">
          <div className="loyalty-dash__side" aria-label="Navegación del dashboard">
            {["Resumen", "Clientes", "Reglas", "Campañas", "Reportes"].map((n, i) => (
              <span key={n} className={`loyalty-dash__nav ${i === 0 ? "on" : ""}`}>{n}</span>
            ))}
          </div>

          <div className="loyalty-dash__main">
            <div className="loyalty-dash__top"><span className="loyalty-dash__title-sm">Resumen general</span><span className="loyalty-dash__period">Últimos 30 días</span></div>

            <div className="loyalty-dash__kpis">
              {DASHBOARD_KPIS.map((k) => (
                <div className="loyalty-dash__kpi" key={k.label}>
                  <span className="loyalty-dash__kpi-value">{k.value}</span>
                  <span className="loyalty-dash__kpi-label">{k.label}</span>
                </div>
              ))}
            </div>

            <div className="loyalty-dash__charthead">
              <span className="loyalty-dash__chart-title">Clientes nuevos vs. recurrentes</span>
              <div className="loyalty-dash__legend">
                <span className="loyalty-dash__legend-item"><span className="loyalty-dash__legend-dot luxury-nuevos" />Nuevos</span>
                <span className="loyalty-dash__legend-item"><span className="loyalty-dash__legend-dot luxury-recurrentes" />Recurrentes</span>
              </div>
            </div>

            <div className="loyalty-dash__chart" aria-label="Gráfico de clientes nuevos vs recurrentes en 8 semanas">
              <svg viewBox="0 0 800 260" className="loyalty-dash__svg">
                {[0, 1, 2, 3].map((g) => (
                  <line key={g} x1="0" x2="800" y1={30 + g * 62} y2={30 + g * 62} className="loyalty-dash__gridline" />
                ))}
                {/* Recurrentes */}
                <polyline
                  className="loyalty-dash__area recurrentes"
                  points={`0,${chartY(DASHBOARD_WEEKS[0].recurrentes, maxVal)} ${DASHBOARD_WEEKS.map((w, i) => `${(i / 7) * 760 + 20},${chartY(w.recurrentes, maxVal)}`).join(" ")} 780,230 20,230`}
                />
                {/* Nuevos */}
                <polyline
                  className="loyalty-dash__area nuevos"
                  points={`0,${chartY(DASHBOARD_WEEKS[0].nuevos, maxVal)} ${DASHBOARD_WEEKS.map((w, i) => `${(i / 7) * 760 + 20},${chartY(w.nuevos, maxVal)}`).join(" ")} 780,230 20,230`}
                />
                {/* Week labels */}
                {DASHBOARD_WEEKS.map((w, i) => (
                  <text key={w.week} x={(i / 7) * 760 + 20} y="252" className="loyalty-dash__label">{w.week}</text>
                ))}
              </svg>
            </div>

            <div className="loyalty-dash__bottom">
              <div className="loyalty-dash__segments">
                <span className="loyalty-dash__subtitle">Segmentos</span>
                <div className="loyalty-dash__seg-list">
                  {DASHBOARD_SEGMENTS.map((s) => <span key={s} className="loyalty-dash__seg">{s}</span>)}
                </div>
              </div>

              <div className="loyalty-dash__alerts">
                <span className="loyalty-dash__subtitle">Alertas accionables</span>
                <ul className="loyalty-dash__alert-list">
                  {DASHBOARD_ALERTS.map((a) => <li key={a} className="loyalty-dash__alert"><span className="loyalty-dash__alert-dot" />{a}</li>)}
                </ul>
              </div>

              <div className="loyalty-dash__ranking">
                <span className="loyalty-dash__subtitle">Beneficios con mayor uso</span>
                <ul className="loyalty-dash__rank-list">
                  {DASHBOARD_RANKING.map((r, i) => <li key={r.label} className="loyalty-dash__rank"><span className="loyalty-dash__rank-n">{i + 1}</span><span className="loyalty-dash__rank-label">{r.label}</span><span className="loyalty-dash__rank-val">{r.value}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function chartY(v, max) {
  return 230 - (v / max) * 180
}

/* ==========================================================================
   MÓDULO 09 — EMPEZAR Y CRECER
   ========================================================================== */

function Growth({ onCTA }) {
  return (
    <section className="loyalty-sec loyalty-growth">
      <div className="loyalty-container">
        <div className="loyalty-sec__head">
          <p className="kicker">EMPEZÁ CON UNA REGLA</p>
          <h2 className="loyalty-h2 loyalty-growth__title font-display">Primero resolvemos lo que necesitás hoy. Después sumamos lo que haga crecer el sistema.</h2>
        </div>

        <div className="loyalty-growth__grid">
          {GROWTH_STAGES.map((s) => (
            <article className="loyalty-growth__stage" key={s.n}>
              <span className="loyalty-growth__num font-mono">{s.n}</span>
              <h3 className="loyalty-h3 loyalty-growth__stage-title font-display">{s.title}</h3>
              <p className="loyalty-growth__desc">{s.desc}</p>
            </article>
          ))}
        </div>

        <p className="loyalty-growth__msg">Una solución propia, con un alcance inicial claro y preparada para crecer.</p>

        <div className="loyalty-growth__cta">
          <button type="button" className="loyalty-btn loyalty-btn--primary" onClick={onCTA}>
            Contanos cómo compran tus clientes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 10 — CONFIANZA Y PRIVACIDAD
   ========================================================================== */

function Trust() {
  return (
    <section className="loyalty-sec loyalty-trust">
      <div className="loyalty-container">
        <div className="loyalty-trust__grid">
          <div className="loyalty-trust__copy">
            <h2 className="loyalty-h2 loyalty-trust__title font-display">Fácil de usar. Diseñado para cuidar la relación con tus clientes.</h2>
            <p className="loyalty-lead loyalty-trust__lead">
              La información y las comunicaciones se manejan con orden, control y transparencia.
            </p>
          </div>

          <ul className="loyalty-trust__list">
            {TRUST_POINTS.map((t) => <li key={t} className="loyalty-trust__item"><span className="loyalty-trust__check">✓</span>{t}</li>)}
          </ul>
        </div>

        <p className="loyalty-trust__note"><strong>Nota sobre WhatsApp:</strong> {WHATSAPP_NOTE}</p>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 11 — FAQ
   ========================================================================== */

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id={ANCHORS.preguntas} className="loyalty-sec loyalty-faq">
      <div className="loyalty-container--text">
        <header className="loyalty-faq__head">
          <p className="kicker">DUDAS FRECUENTES</p>
          <h2 className="loyalty-h2 loyalty-faq__title font-display">Preguntas frecuentes</h2>
        </header>
        <div className="loyalty-faq__list">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`loyalty-faq__item ${open === i ? "open" : ""}`}>
              <button
                type="button"
                className="loyalty-faq__q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`loyalty-faq-a-${i}`}
              >
                <span>{f.q}</span><span className="loyalty-faq__toggle">+</span>
              </button>
              <p className="loyalty-faq__a" id={`loyalty-faq-a-${i}`} hidden={open !== i}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   CSS — tokens + estilos por tema
   ========================================================================== */

function vars(dark) {
  return {
    "--loyalty-bg": dark ? "#080b18" : "#f5f6fb",
    "--loyalty-bg-alt": dark ? "#0b1020" : "#fafbfe",
    "--loyalty-surface": dark ? "#10162a" : "#ffffff",
    "--loyalty-surface-raised": dark ? "#151c33" : "#eef1f8",
    "--loyalty-text": dark ? "#f4f6ff" : "#101426",
    "--loyalty-muted": dark ? "#aeb7ce" : "#626d84",
    "--loyalty-faint": dark ? "#7f89a6" : "#8b93a8",
    "--loyalty-border": dark ? "rgba(151,166,220,0.15)" : "rgba(40,51,90,0.12)",
    "--loyalty-border-strong": dark ? "rgba(151,166,220,0.30)" : "rgba(40,51,90,0.20)",
    "--loyalty-purple": dark ? "#765cff" : "#5a50d8",
    "--loyalty-blue": dark ? "#418cff" : "#3a6fe0",
    "--loyalty-cyan": dark ? "#20d3d2" : "#009f95",
    "--loyalty-pink": dark ? "#f470b7" : "#d94687",
    "--loyalty-green": dark ? "#3ed99c" : "#16855b",
    "--loyalty-orange": dark ? "#ffb45d" : "#a86000",
    "--loyalty-soft-violet": dark ? "rgba(118,92,255,0.14)" : "rgba(90,80,216,0.10)",
    "--loyalty-soft-cyan": dark ? "rgba(32,211,210,0.12)" : "rgba(0,159,149,0.08)",
    "--loyalty-section": "clamp(96px, 8vw, 144px)",
    "--loyalty-section-compact": "clamp(72px, 6vw, 104px)",
    "--loyalty-gap": "clamp(40px, 5vw, 80px)",
  }
}

function css() {
  return `
  /* ===== BASE / CONTAINERS ===== */
  .loyalty { position: relative; overflow: clip; background: var(--loyalty-bg); color: var(--loyalty-text); }
  .loyalty a { color: inherit; }
  .loyalty-container { width: min(1240px, calc(100% - 48px)); margin-inline: auto; min-width: 0; }
  .loyalty-container--wide { width: min(1480px, calc(100% - 64px)); margin-inline: auto; min-width: 0; }
  .loyalty-container--text { width: min(900px, calc(100% - 48px)); margin-inline: auto; min-width: 0; }
  .loyalty-sec { padding-block: var(--loyalty-section); position: relative; }
  .loyalty-sec__head { margin-bottom: clamp(48px, 5vw, 72px); }
  .loyalty-display { font-size: clamp(58px, 6.4vw, 112px); line-height: 0.9; letter-spacing: -0.07em; text-wrap: balance; font-weight: 700; }
  .loyalty-h2 { font-size: clamp(42px, 4.4vw, 74px); line-height: 0.98; letter-spacing: -0.055em; text-wrap: balance; font-weight: 700; }
  .loyalty-h3 { font-size: clamp(28px, 2.4vw, 40px); line-height: 1.05; letter-spacing: -0.025em; font-weight: 700; }
  .loyalty-lead { font-size: clamp(18px, 1.5vw, 22px); line-height: 1.55; color: var(--loyalty-muted); }
  .kicker { color: var(--loyalty-cyan); }
  section[id] { scroll-margin-top: 96px; }

  .loyalty-btn { display: inline-flex; align-items: center; gap: 9px; height: 54px; padding: 0 26px; border-radius: 999px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: transform .22s, box-shadow .22s; }
  .loyalty-btn--primary { color: #fff; background-image: var(--gradient-primary); border: none; box-shadow: 0 10px 30px rgba(90,76,255,0.28); }
  .loyalty-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(90,76,255,0.4); }
  .loyalty-btn--ghost { color: var(--loyalty-text); border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface); }
  .loyalty-btn--ghost:hover { transform: translateY(-2px); }

  /* ===== HERO ===== */
  .loyalty-hero { min-height: calc(100svh - 72px); padding-block: clamp(72px, 8vh, 112px); display: flex; align-items: center; overflow: clip; position: relative; }
  .loyalty-hero__grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(520px, 1.1fr); gap: clamp(56px, 7vw, 108px); align-items: center; }
  .loyalty-hero__copy { max-width: 640px; min-width: 0; }
  .loyalty-hero__title { max-width: 700px; margin: 22px 0 26px; }
  .loyalty-hero__desc { max-width: 620px; margin: 0 0 20px; }
  .loyalty-hero__refuerzo { font-size: clamp(16px, 1.1vw, 18px); color: var(--loyalty-green); font-weight: 600; margin: 0 0 30px; }
  .loyalty-hero__ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 0 0 26px; }
  .loyalty-hero__micro { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--loyalty-faint); margin: 0; }
  .loyalty-hero__visual { position: relative; min-width: 0; }
  .loyalty-hero__glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, var(--loyalty-soft-violet), transparent 62%); filter: blur(14px); pointer-events: none; }

  /* Ventana BRUMA */
  .bruma { position: relative; width: 100%; max-width: 560px; margin-inline: auto; border-radius: 22px; border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface); box-shadow: 0 30px 80px rgba(0,0,0,0.4); overflow: hidden; transition: box-shadow .4s; }
  html[data-theme="light"] .bruma { box-shadow: 0 22px 55px rgba(40,51,90,0.14); }
  .bruma--lit { box-shadow: 0 0 0 3px var(--loyalty-soft-violet), 0 34px 90px rgba(0,0,0,0.46); }
  .bruma__bar { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--loyalty-border); }
  .bruma__search { font-size: 12px; color: var(--loyalty-faint); background: var(--loyalty-surface-raised); border: 1px solid var(--loyalty-border); border-radius: 999px; padding: 7px 14px; min-width: 0; }
  .bruma__loc { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--loyalty-muted); }
  .bruma__body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 18px; }
  .bruma__profile { display: flex; align-items: center; gap: 12px; }
  .bruma__avatar { width: 46px; height: 46px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 16px; }
  .bruma__who { display: flex; flex-direction: column; flex-grow: 1; min-width: 0; }
  .bruma__name { font-size: 16px; font-weight: 700; color: var(--loyalty-text); }
  .bruma__status { font-size: 12px; color: var(--loyalty-cyan); font-weight: 600; }
  .bruma__visits { font-family: var(--font-mono); font-size: 12px; color: var(--loyalty-muted); }
  .bruma__card { border: 1px solid var(--loyalty-border); border-radius: 16px; padding: 16px 18px; background: var(--loyalty-surface-raised); display: flex; flex-direction: column; gap: 10px; }
  .bruma__card-head { display: flex; align-items: center; justify-content: space-between; }
  .bruma__card-title { font-size: 13px; color: var(--loyalty-muted); }
  .bruma__count { font-size: 14px; font-weight: 700; color: var(--loyalty-text); }
  .bruma__bar-track { height: 10px; border-radius: 999px; background: var(--loyalty-surface); overflow: hidden; }
  .bruma__bar-fill { display: block; height: 100%; border-radius: 999px; background: var(--gradient-primary); transition: width .8s cubic-bezier(0.16,1,0.3,1); }
  .bruma__next { font-size: 13px; color: var(--loyalty-muted); }
  .bruma__badge { font-size: 12px; font-weight: 600; color: var(--loyalty-green); }
  .bruma__badge--near { color: var(--loyalty-orange); }
  .bruma__history { display: flex; flex-direction: column; gap: 8px; }
  .bruma__row { display: grid; grid-template-columns: 70px 1fr auto; gap: 12px; align-items: center; padding: 9px 12px; border: 1px solid var(--loyalty-border); border-radius: 11px; font-size: 13px; }
  .bruma__row-date { color: var(--loyalty-faint); font-family: var(--font-mono); font-size: 11px; }
  .bruma__row-concept { color: var(--loyalty-text); min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .bruma__row-price { color: var(--loyalty-muted); font-weight: 600; }
  .bruma__cta { display: block; text-align: center; padding: 13px; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 14px; font-weight: 600; }
  .loyalty-hero__toast { position: absolute; right: -8px; bottom: 26px; display: flex; align-items: center; gap: 9px; padding: 12px 16px; border-radius: 14px; background: var(--loyalty-surface); border: 1px solid var(--loyalty-border-strong); box-shadow: 0 20px 50px rgba(0,0,0,0.4); animation: toastFloat 7s ease-in-out infinite; }
  html[data-theme="light"] .loyalty-hero__toast { box-shadow: 0 18px 44px rgba(40,51,90,0.16); }
  .loyalty-hero__toast-check { width: 22px; height: 22px; border-radius: 50%; background: var(--loyalty-green); color: #fff; display: grid; place-items: center; font-size: 12px; }
  .loyalty-hero__toast-text { font-size: 13px; font-weight: 600; color: var(--loyalty-text); }
  @keyframes toastFloat { 0%, 12%, 84%, 100% { transform: translateY(0); opacity: 0; } 20%, 76% { transform: translateY(-8px); opacity: 1; } }

  /* ===== PROBLEMA ===== */
  .loyalty-problem { background: var(--loyalty-bg-alt); }
  .loyalty-problem__title { max-width: 900px; }
  .loyalty-problem__lead { max-width: 660px; }
  .loyalty-problem__comp { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: stretch; }
  .loyalty-panel { border: 1px solid var(--loyalty-border); border-radius: 22px; padding: 28px 30px; display: flex; flex-direction: column; gap: 16px; }
  .loyalty-panel--before { background: var(--loyalty-surface); }
  .loyalty-panel--after { background: var(--loyalty-soft-violet); border-color: var(--loyalty-purple); }
  .loyalty-panel__tag { font-size: 11px; letter-spacing: 0.18em; color: var(--loyalty-faint); text-transform: uppercase; }
  .loyalty-panel--after .loyalty-panel__tag { color: var(--loyalty-cyan); }
  .loyalty-panel__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 13px; }
  .loyalty-panel__item { display: flex; align-items: center; gap: 10px; font-size: 16px; color: var(--loyalty-text); }
  .loyalty-panel__item--muted { color: var(--loyalty-faint); text-decoration: line-through; text-decoration-color: rgba(150,158,180,0.4); }
  .loyalty-panel__check { color: var(--loyalty-green); font-weight: 700; }
  .loyalty-problem__flow { display: flex; align-items: center; justify-content: center; color: var(--loyalty-cyan); }
  .loyalty-problem__arrow { width: 120px; height: 60px; }
  .loyalty-problem__closing { margin: 44px 0 0; text-align: center; font-size: clamp(22px, 2.2vw, 30px); font-weight: 700; color: var(--loyalty-text); }

  /* ===== STEPS ===== */
  .loyalty-steps { background: var(--loyalty-bg); }
  .loyalty-steps__title { max-width: 760px; }
  .loyalty-steps__lead { max-width: 640px; }
  .loyalty-steps__track { position: relative; height: 96px; max-width: 900px; margin: 0 auto 56px; }
  .loyalty-track-line { position: absolute; top: 34px; left: 6%; right: 6%; height: 3px; border-radius: 999px; background: linear-gradient(90deg, var(--loyalty-purple), var(--loyalty-cyan)); opacity: .5; }
  .loyalty-track__node { position: absolute; top: 34px; transform: translate(-50%,-50%); }
  .loyalty-track__node:nth-child(2) { left: 12.5%; }
  .loyalty-track__node:nth-child(3) { left: 37.5%; }
  .loyalty-track__node:nth-child(4) { left: 62.5%; }
  .loyalty-track__node:nth-child(5) { left: 87.5%; }
  .loyalty-track__dot { display: block; width: 18px; height: 18px; border-radius: 50%; background: var(--loyalty-surface); border: 4px solid var(--loyalty-border-strong); }
  .loyalty-track__node.on .loyalty-track__dot { border-color: var(--loyalty-purple); background: var(--loyalty-purple); box-shadow: 0 0 0 6px var(--loyalty-soft-violet); }
  .loyalty-track__card { position: absolute; display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 999px; background: var(--loyalty-surface); border: 1px solid var(--loyalty-border-strong); box-shadow: 0 14px 40px rgba(0,0,0,0.24); transition: left .8s cubic-bezier(0.16,1,0.3,1); top: 0; }
  .loyalty-track__card-ava { width: 30px; height: 30px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: grid; place-items: center; font-size: 11px; font-weight: 700; }
  .loyalty-track__card-txt { font-size: 13px; font-weight: 600; color: var(--loyalty-text); white-space: nowrap; }
  .loyalty-steps__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
  .loyalty-step { min-height: 290px; display: flex; flex-direction: column; gap: 14px; border: 1px solid var(--loyalty-border); border-radius: 20px; padding: 28px; background: var(--loyalty-surface); }
  .loyalty-step__num { font-size: 13px; color: var(--loyalty-purple); }
  .loyalty-step__icon { width: 46px; height: 46px; border-radius: 14px; background: var(--loyalty-soft-violet); color: var(--loyalty-purple); display: grid; place-items: center; }
  .loyalty-step__title { font-size: clamp(22px, 1.7vw, 27px); margin: 0; }
  .loyalty-step__desc { font-size: 15px; line-height: 1.55; color: var(--loyalty-muted); margin: 0; }

  /* ===== DEMO ===== */
  .loyalty-demo { background: var(--loyalty-bg-alt); }
  .loyalty-demo__title { max-width: 760px; }
  .loyalty-demo__lead { max-width: 640px; }
  .loyalty-demo__app { display: grid; grid-template-columns: 210px minmax(0, 1fr); border: 1px solid var(--loyalty-border-strong); border-radius: 24px; overflow: hidden; background: var(--loyalty-surface); box-shadow: 0 34px 90px rgba(0,0,0,0.38); }
  html[data-theme="light"] .loyalty-demo__app { box-shadow: 0 26px 64px rgba(40,51,90,0.14); }
  .loyalty-app__side { background: var(--loyalty-surface-raised); border-right: 1px solid var(--loyalty-border); padding: 22px 16px; display: flex; flex-direction: column; gap: 6px; }
  .loyalty-app__nav { display: block; padding: 11px 14px; border-radius: 10px; font-size: 14px; color: var(--loyalty-muted); }
  .loyalty-app__nav.on { background: var(--loyalty-soft-violet); color: var(--loyalty-text); font-weight: 600; }
  .loyalty-app__main { min-width: 0; display: flex; flex-direction: column; }
  .loyalty-app__top { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--loyalty-border); }
  .loyalty-app__search { font-size: 13px; color: var(--loyalty-faint); background: var(--loyalty-surface-raised); border: 1px solid var(--loyalty-border); border-radius: 999px; padding: 9px 16px; flex-grow: 1; max-width: 260px; }
  .loyalty-app__loc { font-family: var(--font-mono); font-size: 12px; color: var(--loyalty-muted); }
  .loyalty-app__status { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--loyalty-green); font-weight: 600; }
  .loyalty-app__status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--loyalty-green); }
  .loyalty-app__ava { width: 30px; height: 30px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: grid; place-items: center; font-size: 12px; font-weight: 700; }
  .loyalty-app__cols { display: grid; grid-template-columns: 260px minmax(0, 1fr); min-width: 0; }
  .loyalty-app__list { border-right: 1px solid var(--loyalty-border); padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .loyalty-cust { display: flex; align-items: center; gap: 11px; padding: 12px; border-radius: 13px; border: none; background: transparent; color: var(--loyalty-muted); cursor: pointer; text-align: left; transition: background .2s; }
  .loyalty-cust:hover { background: var(--loyalty-surface-raised); }
  .loyalty-cust.on { background: var(--loyalty-soft-violet); }
  .loyalty-cust__ava { width: 38px; height: 38px; border-radius: 50%; background: var(--loyalty-surface-raised); color: var(--loyalty-text); border: 1px solid var(--loyalty-border-strong); display: grid; place-items: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .loyalty-cust.on .loyalty-cust__ava { background: var(--gradient-primary); color: #fff; border: none; }
  .loyalty-cust__info { display: flex; flex-direction: column; min-width: 0; }
  .loyalty-cust__name { font-size: 14px; font-weight: 600; color: var(--loyalty-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loyalty-cust__status { font-size: 11.5px; color: var(--loyalty-faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loyalty-app__profile { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .loyalty-pp__head { display: flex; align-items: center; gap: 12px; }
  .loyalty-pp__ava { width: 50px; height: 50px; border-radius: 50%; background: var(--gradient-primary); color: #fff; display: grid; place-items: center; font-size: 17px; font-weight: 700; }
  .loyalty-pp__who { display: flex; flex-direction: column; flex-grow: 1; min-width: 0; }
  .loyalty-pp__name { font-size: 18px; font-weight: 700; color: var(--loyalty-text); }
  .loyalty-pp__since { font-size: 12px; color: var(--loyalty-faint); }
  .loyalty-pp__tagpill { font-size: 12px; font-weight: 600; padding: 7px 13px; border-radius: 999px; background: var(--loyalty-soft-cyan); color: var(--loyalty-cyan); border: 1px solid var(--loyalty-border); }
  .loyalty-pp__tagpill--reward { background: rgba(211,176,62,0.16); color: var(--loyalty-orange); }
  .loyalty-pp__tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .loyalty-pp__tag { font-size: 12px; color: var(--loyalty-muted); background: var(--loyalty-surface-raised); border: 1px solid var(--loyalty-border); padding: 5px 11px; border-radius: 999px; }
  .loyalty-pp__progress { display: flex; flex-direction: column; gap: 9px; }
  .loyalty-pp__progress-head { display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: var(--loyalty-muted); }
  .loyalty-pp__spend { color: var(--loyalty-faint); }
  .loyalty-pp__track { height: 10px; border-radius: 999px; background: var(--loyalty-surface-raised); overflow: hidden; }
  .loyalty-pp__fill { display: block; height: 100%; border-radius: 999px; background: var(--gradient-primary); transition: width .5s ease; }
  .loyalty-pp__next { font-size: 13px; color: var(--loyalty-text); font-weight: 600; }
  .loyalty-pp__actions { display: flex; gap: 10px; }
  .loyalty-pp__btn { flex: 1; min-height: 46px; border: none; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; }
  .loyalty-pp__btn:disabled { opacity: .55; cursor: default; }
  .loyalty-pp__reward { display: inline-flex; align-items: center; gap: 6px; min-height: 46px; padding: 0 18px; border-radius: 999px; border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface-raised); color: var(--loyalty-text); font-size: 14px; font-weight: 600; cursor: pointer; }
  .loyalty-pp__rewardbox { border: 1px solid var(--loyalty-purple); border-radius: 14px; padding: 16px; background: var(--loyalty-soft-violet); display: flex; flex-direction: column; gap: 6px; }
  .loyalty-pp__reward-title { font-size: 15px; font-weight: 700; color: var(--loyalty-text); }
  .loyalty-pp__reward-desc { font-size: 13px; color: var(--loyalty-muted); }
  .loyalty-pp__insight { display: flex; flex-direction: column; gap: 8px; padding: 14px 16px; border: 1px solid var(--loyalty-border); border-radius: 14px; background: var(--loyalty-surface-raised); }
  .loyalty-pp__insight-row { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--loyalty-muted); }
  .loyalty-pp__insight-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--loyalty-cyan); flex-shrink: 0; }
  .loyalty-pp__history { display: flex; flex-direction: column; gap: 1px; border: 1px solid var(--loyalty-border); border-radius: 14px; overflow: hidden; }
  .loyalty-pp__row { display: grid; grid-template-columns: 1.1fr 2.4fr 0.8fr 0.8fr 0.9fr; gap: 12px; align-items: center; padding: 11px 16px; font-size: 12.5px; border-bottom: 1px solid var(--loyalty-border); }
  .loyalty-pp__row:last-child { border-bottom: none; }
  .loyalty-pp__row-date { color: var(--loyalty-faint); font-family: var(--font-mono); font-size: 11px; }
  .loyalty-pp__row-concept { color: var(--loyalty-text); font-weight: 500; }
  .loyalty-pp__row-place, .loyalty-pp__row-price { color: var(--loyalty-muted); }
  .loyalty-pp__row-state { color: var(--loyalty-green); }
  .loyalty-pp__row-state.ok { color: var(--loyalty-orange); }

  /* ===== RULES ===== */
  .loyalty-rules { background: var(--loyalty-bg); }
  .loyalty-rules__grid { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(460px, 1.05fr); gap: clamp(48px, 6vw, 84px); align-items: start; }
  .loyalty-rules__title { max-width: 620px; }
  .loyalty-rules__lead { max-width: 52ch; }
  .loyalty-rules__variants { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 28px; }
  .loyalty-rules__variant { display: flex; flex-direction: column; gap: 3px; padding: 14px 16px; border: 1px solid var(--loyalty-border); border-radius: 13px; background: var(--loyalty-surface); }
  .loyalty-rules__variant-label { font-size: 14px; font-weight: 600; color: var(--loyalty-text); }
  .loyalty-rules__variant-desc { font-size: 12.5px; color: var(--loyalty-muted); }
  .loyalty-builder { border: 1px solid var(--loyalty-purple); border-radius: 22px; padding: clamp(26px, 3vw, 34px); background: var(--loyalty-surface); position: relative; }
  .loyalty-builder::before { content: ""; position: absolute; inset: -1px; border-radius: 23px; background: linear-gradient(135deg, var(--loyalty-purple), var(--loyalty-cyan)); z-index: -1; opacity: .35; }
  .loyalty-builder__head { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--loyalty-text); margin-bottom: 22px; }
  .loyalty-builder__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--loyalty-green); }
  .loyalty-ruleline { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 15px 0; border-top: 1px solid var(--loyalty-border); }
  .loyalty-ruleline:first-of-type { border-top: none; }
  .loyalty-ruleline__k { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--loyalty-purple); font-weight: 600; }
  .loyalty-ruleline__l { font-size: 15px; color: var(--loyalty-muted); }
  .loyalty-ruleline__input { width: 76px; height: 46px; text-align: center; border-radius: 12px; border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface-raised); color: var(--loyalty-text); font-size: 16px; font-weight: 700; }
  .loyalty-ruleline__select { height: 46px; min-width: 150px; border-radius: 12px; border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface-raised); color: var(--loyalty-text); font-size: 14px; font-weight: 600; padding: 0 12px; }
  .loyalty-ruleline__select option { background: var(--loyalty-surface); }
  .loyalty-ruleline__wa { display: inline-flex; align-items: center; gap: 7px; height: 46px; padding: 0 18px; border-radius: 12px; border: 1px solid var(--loyalty-border-strong); background: var(--loyalty-surface-raised); color: var(--loyalty-cyan); font-size: 14px; font-weight: 600; cursor: default; }
  .loyalty-builder__result { margin: 20px 0 10px; padding: 15px 18px; border-radius: 14px; background: var(--loyalty-soft-violet); color: var(--loyalty-text); font-size: 14px; font-weight: 600; line-height: 1.5; }
  .loyalty-builder__note { font-size: 12px; color: var(--loyalty-faint); margin: 0; }

  /* ===== BENEFITS ===== */
  .loyalty-benefits { background: var(--loyalty-bg-alt); }
  .loyalty-benefits__title { max-width: 860px; }
  .loyalty-benefits__surface { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid var(--loyalty-border-strong); border-radius: 26px; overflow: hidden; background: var(--loyalty-surface); }
  .loyalty-ben { padding: clamp(26px, 3vw, 38px); display: flex; flex-direction: column; gap: 14px; border-right: 1px solid var(--loyalty-border); }
  .loyalty-ben:last-child { border-right: none; }
  .loyalty-ben__micro { font-size: 10px; letter-spacing: 0.16em; color: var(--loyalty-purple); }
  .loyalty-ben--equipo .loyalty-ben__micro { color: var(--loyalty-blue); }
  .loyalty-ben--negocio .loyalty-ben__micro { color: var(--loyalty-cyan); }
  .loyalty-ben__label { font-size: clamp(22px, 1.8vw, 28px); margin: 0; }
  .loyalty-ben__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; }
  .loyalty-ben__item { display: flex; align-items: center; gap: 9px; font-size: 15px; color: var(--loyalty-muted); }
  .loyalty-ben__check { color: var(--loyalty-green); font-weight: 700; }
  .loyalty-ben__mini { margin-top: auto; border: 1px solid var(--loyalty-border); border-radius: 12px; padding: 14px; background: var(--loyalty-surface-raised); height: 70px; }
  .loyalty-ben__progress { height: 8px; border-radius: 999px; background: var(--loyalty-surface); margin-top: 18px; overflow: hidden; }
  .loyalty-ben__progress-fill { display: block; height: 100%; background: var(--gradient-primary); border-radius: 999px; }
  .loyalty-ben__record { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
  .loyalty-ben__record-row { height: 10px; border-radius: 999px; background: var(--loyalty-surface); }
  .loyalty-ben__record-btn { height: 28px; border-radius: 999px; background: var(--gradient-primary); }
  .loyalty-ben__kpi { display: flex; align-items: baseline; gap: 10px; margin-top: 12px; }
  .loyalty-ben__kpi-val { font-size: 30px; font-weight: 700; color: var(--loyalty-text); }
  .loyalty-ben__kpi-up { font-size: 13px; color: var(--loyalty-green); font-weight: 600; }
  .loyalty-benefits__line { margin-top: 26px; color: var(--loyalty-cyan); text-align: center; }
  .loyalty-benefits__line svg { width: 100%; max-width: 800px; }

  /* ===== INDUSTRIES ===== */
  .loyalty-industries { background: var(--loyalty-bg); }
  .loyalty-industries__title { max-width: 860px; }
  .loyalty-industries__lead { max-width: 640px; }
  .loyalty-industries__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .loyalty-industry { min-height: 320px; display: flex; flex-direction: column; gap: 20px; padding: clamp(24px, 2.5vw, 32px); border: 1px solid var(--loyalty-border); border-radius: 22px; background: var(--loyalty-surface); }
  .loyalty-industry__top { display: flex; align-items: center; justify-content: space-between; }
  .loyalty-industry__icon { width: 50px; height: 50px; border-radius: 15px; display: grid; place-items: center; background: var(--loyalty-surface-raised); color: var(--loyalty-purple); }
  .loyalty-industry--cyan .loyalty-industry__icon { color: var(--loyalty-cyan); }
  .loyalty-industry--pink .loyalty-industry__icon { color: var(--loyalty-pink); }
  .loyalty-industry--blue .loyalty-industry__icon { color: var(--loyalty-blue); }
  .loyalty-industry--green .loyalty-industry__icon { color: var(--loyalty-green); }
  .loyalty-industry--orange .loyalty-industry__icon { color: var(--loyalty-orange); }
  .loyalty-industry__rubro { font-size: 12px; letter-spacing: 0.14em; color: var(--loyalty-faint); }
  .loyalty-industry__rule { font-size: clamp(19px, 1.7vw, 23px); line-height: 1.25; font-weight: 600; color: var(--loyalty-text); margin: 0; }
  .loyalty-industry__foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
  .loyalty-industry__registro { font-size: 12.5px; color: var(--loyalty-muted); }
  .loyalty-industry__pulse { width: 8px; height: 8px; border-radius: 50%; background: var(--loyalty-green); }
  .loyalty-industries__cta { display: flex; justify-content: center; margin-top: clamp(36px, 4vw, 52px); }

  /* ===== DASHBOARD ===== */
  .loyalty-dash { background: var(--loyalty-bg-alt); }
  .loyalty-dash__title { max-width: 820px; }
  .loyalty-dash__lead { max-width: 620px; }
  .loyalty-dash__panel { display: grid; grid-template-columns: 190px minmax(0, 1fr); border: 1px solid var(--loyalty-border-strong); border-radius: 24px; overflow: hidden; background: var(--loyalty-surface); box-shadow: 0 34px 90px rgba(0,0,0,0.38); }
  html[data-theme="light"] .loyalty-dash__panel { box-shadow: 0 26px 64px rgba(40,51,90,0.14); }
  .loyalty-dash__side { background: var(--loyalty-surface-raised); border-right: 1px solid var(--loyalty-border); padding: 20px 14px; display: flex; flex-direction: column; gap: 6px; }
  .loyalty-dash__nav { display: block; padding: 10px 14px; border-radius: 10px; font-size: 14px; color: var(--loyalty-muted); }
  .loyalty-dash__nav.on { background: var(--loyalty-soft-violet); color: var(--loyalty-text); font-weight: 600; }
  .loyalty-dash__main { padding: 22px 26px; display: flex; flex-direction: column; gap: 20px; min-width: 0; }
  .loyalty-dash__top { display: flex; align-items: center; justify-content: space-between; }
  .loyalty-dash__title-sm { font-size: 17px; font-weight: 700; color: var(--loyalty-text); }
  .loyalty-dash__period { font-family: var(--font-mono); font-size: 12px; color: var(--loyalty-faint); }
  .loyalty-dash__kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .loyalty-dash__kpi { border: 1px solid var(--loyalty-border); border-radius: 14px; padding: 16px; background: var(--loyalty-surface-raised); display: flex; flex-direction: column; gap: 4px; }
  .loyalty-dash__kpi-value { font-size: clamp(24px, 2vw, 32px); font-weight: 700; color: var(--loyalty-text); }
  .loyalty-dash__kpi-label { font-size: 12.5px; color: var(--loyalty-muted); }
  .loyalty-dash__charthead { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .loyalty-dash__chart-title { font-size: 15px; font-weight: 600; color: var(--loyalty-text); }
  .loyalty-dash__legend { display: flex; gap: 16px; }
  .loyalty-dash__legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--loyalty-muted); }
  .loyalty-dash__legend-dot { width: 9px; height: 9px; border-radius: 3px; }
  .loyalty-dash__legend-dot.luxury-nuevos { background: var(--loyalty-blue); }
  .loyalty-dash__legend-dot.luxury-recurrentes { background: var(--loyalty-purple); }
  .loyalty-dash__chart { border: 1px solid var(--loyalty-border); border-radius: 16px; padding: 16px 14px 10px; background: var(--loyalty-surface-raised); }
  .loyalty-dash__svg { width: 100%; height: auto; }
  .loyalty-dash__gridline { stroke: var(--loyalty-border); stroke-width: 1; }
  .loyalty-dash__area.recurrentes { fill: var(--loyalty-purple); opacity: 0.14; stroke: var(--loyalty-purple); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
  .loyalty-dash__area.nuevos { fill: var(--loyalty-blue); opacity: 0.12; stroke: var(--loyalty-blue); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
  .loyalty-dash__label { font-size: 11px; fill: var(--loyalty-faint); text-anchor: middle; }
  .loyalty-dash__bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .loyalty-dash__subtitle { display: block; font-size: 13px; font-weight: 600; color: var(--loyalty-text); margin-bottom: 12px; }
  .loyalty-dash__seg-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .loyalty-dash__seg { font-size: 12px; padding: 7px 12px; border-radius: 999px; background: var(--loyalty-surface-raised); border: 1px solid var(--loyalty-border); color: var(--loyalty-muted); }
  .loyalty-dash__alert-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
  .loyalty-dash__alert { display: flex; align-items: flex-start; gap: 8px; font-size: 12.5px; color: var(--loyalty-muted); line-height: 1.4; }
  .loyalty-dash__alert-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--loyalty-orange); flex-shrink: 0; margin-top: 4px; }
  .loyalty-dash__rank-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .loyalty-dash__rank { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--loyalty-muted); }
  .loyalty-dash__rank-n { width: 20px; height: 20px; border-radius: 6px; background: var(--loyalty-surface-raised); border: 1px solid var(--loyalty-border); display: grid; place-items: center; font-size: 10px; color: var(--loyalty-faint); }
  .loyalty-dash__rank-label { flex-grow: 1; }
  .loyalty-dash__rank-val { font-weight: 600; color: var(--loyalty-text); }

  /* ===== GROWTH ===== */
  .loyalty-growth { background: var(--loyalty-bg); }
  .loyalty-growth__title { max-width: 820px; }
  .loyalty-growth__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .loyalty-growth__stage { border-left: 2px solid var(--loyalty-border-strong); padding: 6px 0 6px 26px; display: flex; flex-direction: column; gap: 10px; }
  .loyalty-growth__num { font-size: 14px; color: var(--loyalty-cyan); }
  .loyalty-growth__stage-title { font-size: clamp(22px, 1.8vw, 28px); margin: 0; }
  .loyalty-growth__desc { font-size: 15px; line-height: 1.55; color: var(--loyalty-muted); margin: 0; max-width: 34ch; }
  .loyalty-growth__msg { margin: clamp(32px, 4vw, 48px) 0 0; text-align: center; font-size: clamp(18px, 1.5vw, 22px); font-weight: 600; color: var(--loyalty-text); }
  .loyalty-growth__cta { display: flex; justify-content: center; margin-top: 28px; }

  /* ===== TRUST ===== */
  .loyalty-trust { background: var(--loyalty-bg-alt); }
  .loyalty-trust__grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: clamp(40px, 5vw, 72px); align-items: center; }
  .loyalty-trust__title { max-width: 18ch; }
  .loyalty-trust__lead { margin-top: 18px; }
  .loyalty-trust__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .loyalty-trust__item { display: flex; align-items: center; gap: 10px; padding: 16px 18px; border: 1px solid var(--loyalty-border); border-radius: 14px; background: var(--loyalty-surface); color: var(--loyalty-muted); font-size: 14.5px; }
  .loyalty-trust__check { color: var(--loyalty-green); font-weight: 700; flex-shrink: 0; }
  .loyalty-trust__note { margin: 28px 0 0; max-width: 720px; color: var(--loyalty-muted); font-size: 13.5px; line-height: 1.65; }
  .loyalty-trust__note strong { color: var(--loyalty-text); }

  /* ===== FAQ ===== */
  .loyalty-faq { background: var(--loyalty-bg); padding-block: var(--loyalty-section-compact); }
  .loyalty-faq__head { text-align: center; margin-bottom: clamp(40px, 5vw, 56px); }
  .loyalty-faq__title { max-width: 900px; margin-inline: auto; }
  .loyalty-faq__list { display: flex; flex-direction: column; gap: 10px; }
  .loyalty-faq__item { border: 1px solid var(--loyalty-border); border-radius: 15px; background: var(--loyalty-surface); }
  .loyalty-faq__q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 19px 24px; background: transparent; border: none; color: var(--loyalty-text); font-size: 16px; font-weight: 600; text-align: left; cursor: pointer; }
  .loyalty-faq__toggle { color: var(--loyalty-cyan); font-size: 24px; line-height: 1; width: 24px; height: 24px; display: grid; place-items: center; transition: transform .25s; }
  .loyalty-faq__item.open .loyalty-faq__toggle { transform: rotate(45deg); }
  .loyalty-faq__a { padding: 0 24px 20px; margin: 0; color: var(--loyalty-muted); font-size: 14.5px; line-height: 1.6; max-width: 72ch; }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1279px) {
    .loyalty-hero__grid { grid-template-columns: minmax(0, 0.9fr) minmax(440px, 1.1fr); gap: 48px; }
    .loyalty-app__cols { grid-template-columns: 220px minmax(0, 1fr); }
    .loyalty-dash__bottom { grid-template-columns: 1fr 1fr; }
    .loyalty-dash__ranking { grid-column: 1 / -1; }
  }
  @media (max-width: 1023px) {
    .loyalty-hero__grid { grid-template-columns: 1fr; }
    .loyalty-hero__visual { max-width: 560px; margin-inline: auto; }
    .loyalty-problem__comp { grid-template-columns: 1fr; }
    .loyalty-problem__flow { transform: rotate(90deg); padding: 8px 0; }
    .loyalty-steps__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .loyalty-step { min-height: 0; }
    .loyalty-steps__track { display: none; }
    .loyalty-rules__grid { grid-template-columns: 1fr; }
    .loyalty-rules__copy { max-width: 720px; }
    .loyalty-benefits__surface { grid-template-columns: 1fr; }
    .loyalty-ben { border-right: none; border-bottom: 1px solid var(--loyalty-border); }
    .loyalty-ben:last-child { border-bottom: none; }
    .loyalty-industries__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .loyalty-demo__app { grid-template-columns: 1fr; }
    .loyalty-app__side { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--loyalty-border); }
    .loyalty-app__nav { white-space: nowrap; }
    .loyalty-dash__panel { grid-template-columns: 1fr; }
    .loyalty-dash__side { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--loyalty-border); }
    .loyalty-dash__nav { white-space: nowrap; }
    .loyalty-trust__grid { grid-template-columns: 1fr; gap: 32px; }
    .loyalty-growth__grid { grid-template-columns: 1fr; gap: 26px; }
  }
  @media (max-width: 767px) {
    .loyalty-container, .loyalty-container--wide, .loyalty-container--text { width: min(calc(100% - 40px), 560px); }
    .loyalty-sec { padding-block: var(--loyalty-section-compact); }
    .loyalty-display { font-size: clamp(46px, 11vw, 62px); }
    .loyalty-h2 { font-size: clamp(38px, 9vw, 48px); }
    .loyalty-hero__ctas { flex-direction: column; align-items: stretch; }
    .loyalty-btn { justify-content: center; }
    .loyalty-hero__toast { right: 0; bottom: -10px; }
    .loyalty-steps__grid { grid-template-columns: 1fr; }
    .loyalty-app__cols { grid-template-columns: 1fr; }
    .loyalty-app__list { border-right: none; border-bottom: 1px solid var(--loyalty-border); flex-direction: row; overflow-x: auto; padding-bottom: 12px; }
    .loyalty-cust { flex: 0 0 auto; }
    .loyalty-cust__info { display: none; }
    .loyalty-pp__row { grid-template-columns: 0.9fr 1.6fr 0.7fr; }
    .loyalty-pp__row-place { display: none; }
    .loyalty-pp__spend { display: none; }
    .loyalty-rules__variants { grid-template-columns: 1fr; }
    .loyalty-industries__grid { grid-template-columns: 1fr; }
    .loyalty-dash__kpis { grid-template-columns: 1fr 1fr; }
    .loyalty-dash__bottom { grid-template-columns: 1fr; }
    .loyalty-dash__ranking { grid-column: auto; }
    .loyalty-trust__list { grid-template-columns: 1fr; }
    .loyalty-growth__grid { grid-template-columns: 1fr; }
    .loyalty-faq__q { padding: 16px 20px; }
    .loyalty-faq__a { padding: 0 20px 16px; }
  }
  @media (max-width: 400px) {
    .loyalty-app__top { flex-wrap: wrap; }
    .loyalty-app__search { order: 3; max-width: none; width: 100%; flex-basis: 100%; }
  }

  /* ===== REDUCED MOTION ===== */
  @media (prefers-reduced-motion: reduce) {
    .loyalty-hero__toast { animation: none; }
    .loyalty-track__card { transition: none; }
  }
  `
}
