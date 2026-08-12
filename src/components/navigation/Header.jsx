import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import { NAV, CONTACT } from "../../data/navigation"
import { INDUSTRIES } from "../../data/industries"
import logoSvg from "../../assets/logo-fleximy.svg?raw"

function Logo({ compact = false }) {
  return (
    <Link to="/" aria-label="Fleximy — Inicio" className="flex shrink-0 items-center">
      <span
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: logoSvg }}
        className={`block shrink-0 transition-all duration-300 [&>svg]:block [&>svg]:h-full [&>svg]:w-auto ${
          compact ? "h-6" : "h-8"
        }`}
      />
    </Link>
  )
}

function MegaMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 top-full mt-3 hidden w-[min(640px,90vw)] rounded-2xl border border-outline bg-surface-elevated/95 p-2 shadow-[var(--shadow-lg)] backdrop-blur-xl lg:block"
    >
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => (
          <Link
            key={ind.slug}
            to={ind.to}
            onClick={onClose}
            className="group relative flex items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-surface-2/70"
          >
            <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: ind.accent }} />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-text-1">{ind.label}</span>
              <span className="text-xs text-text-3 group-hover:text-text-2">{ind.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-outline pt-3 pl-3.5 pr-2 pb-1">
        <span className="font-mono text-[11px] text-text-3">Siete bases listas para adaptar</span>
        <Link
          to="/soluciones"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-1 transition-colors hover:text-primary"
        >
          Ver todas las soluciones
          <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const megaTimeout = useRef(null)
  const menuRef = useRef(null)

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

  // Escape y control de foco en el menú mobile
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false)
      if (e.key === "Tab") {
        const focusables = menuRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        )
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    const prev = document.activeElement
    menuRef.current?.querySelector("a, button")?.focus()
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      prev?.focus?.()
    }
  }, [mobileOpen])

  const openMega = () => {
    clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    clearTimeout(megaTimeout.current)
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150)
  }

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/")

  const baseLink = (item, mobile = false) => (
    <Link
      key={item.label}
      to={item.to}
      onClick={mobile ? () => setMobileOpen(false) : undefined}
      className={
        mobile
          ? `rounded-xl px-4 py-3 text-[15px] font-semibold ${
              isActive(item.to) ? "text-text-1" : "text-text-2 hover:bg-surface-2"
            }`
          : `group relative rounded-lg px-3 py-2 text-sm font-medium text-text-2 transition-colors hover:text-text-1 ${
              isActive(item.to) ? "text-text-1" : ""
            }`
      }
    >
      {item.label}
      {!mobile && (
        <span
          aria-hidden="true"
          className={`absolute inset-x-3 -bottom-px h-px transition-transform duration-300 ${
            isActive(item.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
          style={{ backgroundImage: "var(--gradient-primary)" }}
        />
      )}
    </Link>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-outline bg-bg-0/75 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-site">
        <div
          className={`flex items-center justify-between gap-3 transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Logo compact={scrolled} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {baseLink(NAV.main[0])}
            {NAV.main.slice(1).map((item) =>
              item.hasMega ? (
                <div key={item.label} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onFocus={openMega}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      megaOpen || isActive(item.to) ? "text-text-1" : "text-text-2 hover:text-text-1"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>{megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}</AnimatePresence>
                </div>
              ) : (
                baseLink(item)
              )
            )}
            <Link
              to="/contacto"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-2 transition-colors hover:text-text-1"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contacto"
              data-track="cta_contanos_idea"
              className="hidden h-10 items-center rounded-[var(--radius-btn)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {CONTACT.ctaPrimary}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid size-11 place-items-center rounded-xl border border-outline bg-surface-1/60 text-text-1 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-outline bg-bg-1 lg:hidden"
          >
            <div className="container-site flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4">
              <span className="kicker px-4">Menú</span>

              {NAV.main.map((item) =>
                item.hasMega ? (
                  <div key={item.label} className="flex flex-col">
                    <span className="px-4 pb-1 pt-2 text-sm font-bold text-text-1">{item.label}</span>
                    {INDUSTRIES.map((ind) => (
                      <Link
                        key={ind.slug}
                        to={ind.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] text-text-2 hover:bg-surface-2"
                      >
                        <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: ind.accent }} />
                        {ind.label}
                      </Link>
                    ))}
                    <Link
                      to="/soluciones"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-[15px] font-semibold text-primary"
                    >
                      Ver todas las soluciones →
                    </Link>
                  </div>
                ) : (
                  baseLink(item, true)
                )
              )}

              <Link
                to="/contacto"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-semibold text-text-1 hover:bg-surface-2"
              >
                Contacto
              </Link>

              <div className="mt-3 flex items-center justify-between border-t border-outline px-4 pt-4">
                <ThemeToggle />
                <Link
                  to="/contacto"
                  onClick={() => setMobileOpen(false)}
                  data-track="cta_contanos_idea"
                  className="inline-flex h-11 items-center rounded-[var(--radius-btn)] px-5 text-sm font-semibold text-white"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {CONTACT.ctaPrimary}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
