import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { NAV, CONTACT } from "../../data/navigation"
import { INDUSTRIES } from "../../data/industries"
import logoSvg from "../../assets/logo-fleximy.svg?raw"

function Logo() {
  return (
    <Link to="/" aria-label="Fleximy — Inicio" className="flex items-center shrink-0 text-ink">
      <span
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: logoSvg }}
        className="block h-8 md:h-9 w-auto [&>svg]:block [&>svg]:h-full [&>svg]:w-auto"
      />
    </Link>
  )
}

function IndustryIcon({ accent }) {
  return (
    <span
      aria-hidden="true"
      className="w-9 h-9 rounded-lg grid place-items-center border"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-paper-bright) 90%, transparent)", borderColor: accent }}
    >
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
    </span>
  )
}

function MegaMenu({ open, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[42rem] rounded-2xl bg-paper-bright border border-line shadow-[var(--shadow-lift)] overflow-hidden"
    >
      <div className="grid grid-cols-2 gap-1 p-2">
        {INDUSTRIES.map((industry) => (
          <Link
            key={industry.slug}
            to={industry.to}
            onClick={onClose}
            className="flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-ink hover:text-text-invert group"
          >
            <IndustryIcon accent={industry.accent} />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">{industry.label}</span>
              <span className="text-xs text-muted group-hover:text-text-invert/70">
                {industry.tagline}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="border-t border-line px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-muted">Siete bases listas para adaptar a tu negocio.</span>
        <Link
          to="/soluciones"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ink/60 transition-colors"
        >
          Ver todas las soluciones
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSolucionesOpen, setMobileSolucionesOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const megaTimeout = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const openMega = () => {
    clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    clearTimeout(megaTimeout.current)
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120)
  }

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/")

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-[var(--motion-base)] ${
        scrolled
          ? "bg-paper-bright/90 backdrop-blur-xl border-b border-line shadow-[var(--shadow-soft)]"
          : "bg-paper-bright/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
            {NAV.main.map((item) =>
              item.hasMega ? (
                <div key={item.label} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onFocus={openMega}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      megaOpen ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-[var(--motion-fast)] ${megaOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {megaOpen && <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.to) ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/contacto"
              data-track="cta_diagnostico"
              className="hidden lg:inline-flex h-11 items-center gap-2 px-5 rounded-[var(--radius-btn)] bg-accent text-ink text-sm font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,white)]"
            >
              {CONTACT.ctaPrimary}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-lg border border-line text-text"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-paper-bright border-t border-line"
          >
            <nav className="container-site py-4 flex flex-col gap-1" aria-label="Principal mobile">
              <button
                type="button"
                aria-expanded={mobileSolucionesOpen}
                onClick={() => setMobileSolucionesOpen((o) => !o)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-text hover:bg-paper"
              >
                Soluciones
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-[var(--motion-fast)] ${mobileSolucionesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {mobileSolucionesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-2 flex flex-col gap-1 pb-2">
                      {INDUSTRIES.map((industry) => (
                        <Link
                          key={industry.slug}
                          to={industry.to}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted hover:text-text hover:bg-paper"
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: industry.accent }}
                          />
                          {industry.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV.main
                .filter((item) => !item.hasMega)
                .map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`px-4 py-3 rounded-lg text-sm font-semibold hover:bg-paper ${
                      isActive(item.to) ? "text-text" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              <Link
                to="/contacto"
                data-track="cta_diagnostico"
                className="mt-3 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[var(--radius-btn)] bg-accent text-ink text-sm font-semibold"
              >
                {CONTACT.ctaPrimary}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
